'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FullFlowData } from '@/lib/types';
import { FlowDetailSheet } from '@/components/dashboard/flow-detail-sheet';
import { EditFlowDialog } from '@/components/dashboard/edit-flow-dialog';
import { format } from 'date-fns';
import { Search, Edit2, Trash2, MoreVertical, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { useDashboardData } from '@/hooks/use-dashboard-data';

interface NetworkFlowsTableProps {
  flows: FullFlowData[];
}

type SortOrder = 'asc' | 'desc' | null;

export default function NetworkFlowsTable({ flows }: NetworkFlowsTableProps) {
  const { deleteFlow, updateFlow } = useDashboardData();
  const [selectedFlow, setSelectedFlow] = useState<FullFlowData | null>(null);
  const [editingFlow, setEditingFlow] = useState<FullFlowData | null>(null);

  // Local Filtering State
  const [localSearch, setLocalSearch] = useState('');
  const [protocolFilter, setProtocolFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSortedFlows = useMemo(() => {
    let result = [...flows];

    // Filter by search
    if (localSearch) {
      const query = localSearch.toLowerCase();
      result = result.filter(f =>
        f.src_ip.toLowerCase().includes(query) ||
        f.dst_ip.toLowerCase().includes(query) ||
        f.id.toLowerCase().includes(query)
      );
    }

    // Filter by protocol
    if (protocolFilter !== 'all') {
      result = result.filter(f => f.protocol === protocolFilter);
    }

    // Sort by timestamp
    if (sortOrder) {
      result.sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return result;
  }, [flows, localSearch, protocolFilter, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // ... (imports)

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-secondary/40 p-3 rounded-lg border border-border/50">
        <div className="relative w-full sm:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-cyan-500 transition-colors" />
          <Input
            placeholder="Search flows..."
            className="pl-9 bg-background/50 border-border/50 h-9 placeholder:text-muted-foreground text-foreground"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={protocolFilter} onValueChange={setProtocolFilter}>
              <SelectTrigger className="w-[120px] bg-background/50 border-border/50 h-9 text-foreground">
                <SelectValue placeholder="Protocol" />
              </SelectTrigger>
              <SelectContent className="glass-card border-border/50">
                <SelectItem value="all">All Protocols</SelectItem>
                <SelectItem value="TCP">TCP</SelectItem>
                <SelectItem value="UDP">UDP</SelectItem>
                <SelectItem value="ICMP">ICMP</SelectItem>
                <SelectItem value="OTHER">OTHER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSort}
            className="h-9 hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
          >
            {sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 mr-2 text-cyan-500" /> : <ArrowDown className="h-4 w-4 mr-2 text-cyan-500" />}
            Time
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Source IP</TableHead>
              <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Destination IP</TableHead>
              <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Protocol</TableHead>
              <TableHead className="text-right text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Anomaly Score</TableHead>
              <TableHead className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Timestamp</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedFlows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No network flows found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedFlows.map(flow => (
                <TableRow
                  key={flow.id}
                  className="group hover:bg-muted/50 border-border/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedFlow(flow)}
                >
                  <TableCell className="font-mono text-foreground">{flow.src_ip}</TableCell>
                  <TableCell className="font-mono text-foreground">{flow.dst_ip}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/50 border-border/50 text-muted-foreground">
                      {flow.protocol}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {flow.is_anomaly ? (
                      <Badge className="bg-red-500/10 text-red-500 border-red-500/20 shadow-sm">
                        {flow.anomaly_score?.toFixed(3)}
                      </Badge>
                    ) : (
                      <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
                        {flow.anomaly_score?.toFixed(3)}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm italic">
                    {format(new Date(flow.timestamp), 'MMM d, HH:mm:ss')}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card border-border/50">
                        <DropdownMenuItem className="focus:bg-cyan-500/10 focus:text-cyan-500 cursor-pointer" onClick={() => setEditingFlow(flow)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          <span>Edit Flow</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-500 text-red-500 cursor-pointer" onClick={() => deleteFlow(flow.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <FlowDetailSheet
        flow={selectedFlow}
        isOpen={!!selectedFlow}
        onClose={() => setSelectedFlow(null)}
      />

      <EditFlowDialog
        flow={editingFlow}
        isOpen={!!editingFlow}
        onClose={() => setEditingFlow(null)}
        onFlowUpdated={updateFlow}
      />
    </div>
  );
}
