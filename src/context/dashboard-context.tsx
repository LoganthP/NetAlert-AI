import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FullFlowData, Alert } from '@/lib/types';
import { getMockData } from '@/lib/mock-data';
import { subHours, subDays, isAfter, parseISO } from 'date-fns';

type TimeRange = '1h' | '24h' | '7d';

interface DashboardContextType {
    flows: FullFlowData[];
    alerts: Alert[];
    loading: boolean;
    error: string | null;
    timeRange: TimeRange;
    setTimeRange: (range: TimeRange) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    refreshData: () => Promise<void>;
    addFlow: (flow: FullFlowData) => void;
    deleteFlow: (id: string) => void;
    updateFlow: (flow: FullFlowData) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [allFlows, setAllFlows] = useState<FullFlowData[]>([]);
    const [allAlerts, setAllAlerts] = useState<Alert[]>([]);
    const [filteredFlows, setFilteredFlows] = useState<FullFlowData[]>([]);
    const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState<TimeRange>('24h');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getMockData();
            setAllFlows(data.flows);
            setAllAlerts(data.alerts);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            setError("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Combined Filter logic
    useEffect(() => {
        const now = new Date();
        let cutoffTime: Date;

        switch (timeRange) {
            case '1h':
                cutoffTime = subHours(now, 1);
                break;
            case '24h':
                cutoffTime = subHours(now, 24);
                break;
            case '7d':
                cutoffTime = subDays(now, 7);
                break;
            default:
                cutoffTime = subDays(now, 7);
        }

        const matchesSearch = (text: string) => {
            if (!searchQuery) return true;
            return text.toLowerCase().includes(searchQuery.toLowerCase());
        };

        const filterFlow = (flow: FullFlowData) => {
            const timeMatch = isAfter(parseISO(flow.timestamp), cutoffTime);
            if (!timeMatch) return false;

            const searchMatch = matchesSearch(flow.src_ip) ||
                matchesSearch(flow.dst_ip) ||
                matchesSearch(flow.protocol) ||
                matchesSearch(flow.src_country || '');
            return searchMatch;
        };

        const filterAlert = (alert: Alert) => {
            const timeMatch = isAfter(parseISO(alert.timestamp), cutoffTime);
            if (!timeMatch) return false;

            const searchMatch = matchesSearch(alert.message) ||
                matchesSearch(alert.severity) ||
                matchesSearch(alert.src_ip || '') ||
                matchesSearch(alert.dst_ip || '');
            return searchMatch;
        };

        setFilteredFlows(allFlows.filter(filterFlow));
        setFilteredAlerts(allAlerts.filter(filterAlert));

    }, [timeRange, searchQuery, allFlows, allAlerts]);

    const addFlow = (newFlow: FullFlowData) => {
        setAllFlows(prev => [newFlow, ...prev]);
    };

    const deleteFlow = (id: string) => {
        setAllFlows(prev => prev.filter(f => f.id !== id));
    };

    const updateFlow = (updatedFlow: FullFlowData) => {
        setAllFlows(prev => prev.map(f => f.id === updatedFlow.id ? updatedFlow : f));
    };

    const value = {
        flows: filteredFlows,
        alerts: filteredAlerts,
        loading,
        error,
        timeRange,
        setTimeRange,
        searchQuery,
        setSearchQuery,
        refreshData: fetchData,
        addFlow,
        deleteFlow,
        updateFlow
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboardContext() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
}
