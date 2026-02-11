'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { History, LogIn, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { AuthHistoryItem } from '@/context/auth-context';

export function LoginHistoryTable() {
    const [history, setHistory] = useState<AuthHistoryItem[]>([]);

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('netalert-auth-history');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to load auth history", error);
        }
    }, []);

    return (
        <Card className="glass-card border-white/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <History className="h-5 w-5 text-cyan-400" />
                    Login & Security Logs
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Recent authentication events for all users.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-white/5 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-950/20">
                            <TableRow className="hover:bg-transparent border-white/5">
                                <TableHead className="text-slate-400">Event</TableHead>
                                <TableHead className="text-slate-400">User</TableHead>
                                <TableHead className="text-slate-400 text-right">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center text-slate-500">
                                        No history available.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                history.map((event, index) => (
                                    <TableRow key={index} className="hover:bg-white/5 border-white/5">
                                        <TableCell>
                                            {event.type === 'LOGIN' ? (
                                                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20">
                                                    <LogIn className="mr-1 h-3 w-3" /> Login
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20">
                                                    <LogOut className="mr-1 h-3 w-3" /> Logout
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-slate-300">
                                            {event.user}
                                        </TableCell>
                                        <TableCell className="text-right text-slate-400 font-mono text-sm">
                                            {format(new Date(event.timestamp), 'PPpp')}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
