import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, Calendar, Loader2, Lock } from 'lucide-react';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { ScheduleReportDialog } from '@/components/dashboard/schedule-report-dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ReportsPage() {
    const { flows } = useDashboardData();
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

    const handleDownloadPDF = () => {
        setIsDownloadingPdf(true);

        try {
            const doc = new jsPDF();

            // Header
            doc.setFillColor(15, 23, 42); // slate-900 like
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.text("NetAlert AI - Executive Summary", 14, 25);

            doc.setFontSize(10);
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 35);

            // Summary Stats
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text("Network Activity Overview", 14, 50);

            const anomalyCount = flows.filter(f => f.is_anomaly).length;
            const totalFlows = flows.length;
            const avgScore = flows.reduce((acc, curr) => acc + (curr.anomaly_score || 0), 0) / totalFlows;

            const summaryData = [
                ['Total Network Flows', totalFlows.toString()],
                ['Detailed Anomalies', anomalyCount.toString()],
                ['Average Threat Score', avgScore.toFixed(4)],
                ['Active Alerts', '0'] // Mock for now or pull from alert context if available
            ];

            autoTable(doc, {
                startY: 55,
                head: [['Metric', 'Value']],
                body: summaryData,
                theme: 'striped',
                headStyles: { fillColor: [6, 182, 212] }, // cyan-500
                styles: { fontSize: 10 }
            });

            // Recent Anomalies Table
            const anomalies = flows.filter(f => f.is_anomaly).slice(0, 10);

            if (anomalies.length > 0) {
                doc.text("Top Detected Anomalies", 14, (doc as any).lastAutoTable.finalY + 15);

                const tableData = anomalies.map(flow => [
                    flow.src_ip,
                    flow.dst_ip,
                    flow.protocol,
                    flow.anomaly_score?.toFixed(3) || '0.000',
                    new Date(flow.timestamp).toLocaleTimeString()
                ]);

                autoTable(doc, {
                    startY: (doc as any).lastAutoTable.finalY + 20,
                    head: [['Source IP', 'Dest IP', 'Proto', 'Score', 'Time']],
                    body: tableData,
                    theme: 'grid',
                    headStyles: { fillColor: [220, 38, 38] }, // red-600
                    styles: { fontSize: 8 }
                });
            }

            // Footer
            const pageCount = (doc as any).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text('Confidential - Internal Use Only', 14, 285);
                doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
            }

            doc.save(`NetAlert_Executive_Summary_${new Date().toISOString().split('T')[0]}.pdf`);

        } catch (error) {
            console.error("PDF Generation failed:", error);
            alert("Failed to generate PDF report.");
        } finally {
            setIsDownloadingPdf(false);
        }
    };

    const handleDownloadCSV = () => {
        const headers = ["ID", "Source IP", "Destination IP", "Protocol", "Timestamp", "Anomaly Score", "Is Anomaly"];
        const rows = flows.map(flow => [
            flow.id,
            flow.src_ip,
            flow.dst_ip,
            flow.protocol,
            flow.timestamp,
            flow.anomaly_score,
            flow.is_anomaly ? "Yes" : "No"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `netalert_threat_analysis_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Reports & Logs</h2>
                    <p className="text-slate-400">Generate insights and manage automated reporting.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-white/5 hover:border-cyan-500/30 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <FileText className="h-5 w-5 text-cyan-400" /> Executive Summary
                        </CardTitle>
                        <CardDescription className="text-slate-400">Weekly high-level overview of network health</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold" onClick={handleDownloadPDF} disabled={isDownloadingPdf}>
                            {isDownloadingPdf ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" /> Download PDF
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="glass-card border-white/5 hover:border-cyan-500/30 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <FileText className="h-5 w-5 text-purple-400" /> Threat Analysis
                        </CardTitle>
                        <CardDescription className="text-slate-400">Detailed breakdown of all detected anomalies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full border-white/10 hover:bg-white/5 text-white" variant="outline" onClick={handleDownloadCSV}>
                            <Download className="mr-2 h-4 w-4" /> Download CSV
                        </Button>
                    </CardContent>
                </Card>

                <Card className="glass-card border-white/5 hover:border-cyan-500/30 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Calendar className="h-5 w-5 text-emerald-400" /> Automated Reports
                        </CardTitle>
                        <CardDescription className="text-slate-400">Schedule regular reports to your inbox</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" variant="secondary" onClick={() => setIsScheduleOpen(true)}>
                            Configure Schedule
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="border border-dashed border-white/10 rounded-lg p-12 flex flex-col items-center justify-center bg-slate-950/30 text-center">
                <div className="h-16 w-16 bg-slate-900/50 rounded-full flex items-center justify-center mb-4">
                    <Lock className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Archive Access</h3>
                <p className="text-slate-400 mt-2 max-w-md">
                    Access to system logs older than 30 days requires an extended storage plan.
                    Upgrade your retention policy to access historical data.
                </p>
                <Button variant="link" className="mt-4 text-cyan-400" onClick={() => alert("Redirecting to subscription page...")}>
                    Upgrade Storage Plan &rarr;
                </Button>
            </div>

            <ScheduleReportDialog
                isOpen={isScheduleOpen}
                onClose={() => setIsScheduleOpen(false)}
            />
        </div>
    );
}
