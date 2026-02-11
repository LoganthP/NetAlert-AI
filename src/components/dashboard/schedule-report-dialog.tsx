'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar, Mail, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly']),
    email: z.string().email({ message: "Invalid email address" }),
    reportType: z.enum(['executive', 'technical', 'full']),
});

interface ScheduleReportDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ScheduleReportDialog({ isOpen, onClose }: ScheduleReportDialogProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            frequency: 'weekly',
            email: '',
            reportType: 'executive',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Simulate API call
        setTimeout(() => {
            console.log("Scheduling report:", values);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                form.reset();
            }, 2000);
        }, 1000);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md glass-card border-white/10">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <Calendar className="h-5 w-5 text-cyan-400" />
                        Schedule Automated Reports
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Configure regular report delivery to your inbox.
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Schedule Updated!</h3>
                        <p className="text-slate-400 text-sm mt-1">You will receive your first report shortly.</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="reportType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Report Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-slate-950/40 border-white/10 text-white">
                                                    <SelectValue placeholder="Select report type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="glass-card border-white/10">
                                                <SelectItem value="executive">Executive Summary</SelectItem>
                                                <SelectItem value="technical">Threat Analysis (Technical)</SelectItem>
                                                <SelectItem value="full">Full System Logs</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Frequency</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-slate-950/40 border-white/10 text-white">
                                                        <SelectValue placeholder="Select frequency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="glass-card border-white/10">
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Recipient Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                                <Input placeholder="admin@company.com" {...field} className="pl-9 bg-slate-950/40 border-white/10 text-white" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="pt-4">
                                <Button type="button" variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">Cancel</Button>
                                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold">
                                    Save Schedule
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
