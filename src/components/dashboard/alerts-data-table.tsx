import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert } from "@/lib/types";
import { useState } from "react";
import { MoreHorizontal, ArrowUpDown, Filter } from "lucide-react";

interface AlertsDataTableProps {
    initialAlerts: Alert[];
}

export function AlertsDataTable({ initialAlerts }: AlertsDataTableProps) {
    const [filter, setFilter] = useState("");
    const [severityFilter, setSeverityFilter] = useState<string | null>(null);

    const filteredAlerts = initialAlerts.filter((alert) => {
        const matchesSearch =
            alert.message.toLowerCase().includes(filter.toLowerCase()) ||
            alert.src_ip.includes(filter) ||
            alert.dst_ip.includes(filter);
        const matchesSeverity = severityFilter ? alert.severity === severityFilter : true;
        return matchesSearch && matchesSeverity;
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Filter alerts..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            <Filter className="mr-2 h-4 w-4" />
                            Severity
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSeverityFilter(null)}>
                            All Severities
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSeverityFilter("Critical")}>
                            Critical
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSeverityFilter("High")}>
                            High
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSeverityFilter("Medium")}>
                            Medium
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSeverityFilter("Low")}>
                            Low
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Severity</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Source IP</TableHead>
                            <TableHead>Destination IP</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAlerts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No alerts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAlerts.map((alert) => (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <Badge variant={
                                            alert.severity === 'Critical' ? 'destructive' :
                                                alert.severity === 'High' ? 'default' :
                                                    'secondary'
                                        }>
                                            {alert.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{alert.message}</TableCell>
                                    <TableCell>{alert.src_ip}</TableCell>
                                    <TableCell>{alert.dst_ip}</TableCell>
                                    <TableCell>{new Date(alert.timestamp).toLocaleTimeString()}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Acknowledge</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500">Block IP</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {filteredAlerts.length} of {initialAlerts.length} alerts
                </div>
            </div>
        </div>
    );
}
