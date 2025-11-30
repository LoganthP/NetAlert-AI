'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FullFlowData } from '@/lib/types';

const formSchema = z.object({
  src_ip: z.string().ip({ version: 'v4', message: 'Invalid source IP address.' }),
  dst_ip: z.string().ip({ version: 'v4', message: 'Invalid destination IP address.' }),
  src_port: z.coerce.number().min(1).max(65535, 'Port must be between 1 and 65535.'),
  dst_port: z.coerce.number().min(1).max(65535, 'Port must be between 1 and 65535.'),
  protocol: z.enum(['TCP', 'UDP', 'ICMP', 'OTHER']),
});

interface AddFlowFormProps {
  onClose: () => void;
  onFlowAdded: (newFlow: FullFlowData) => void;
}

export function AddFlowForm({ onClose, onFlowAdded }: AddFlowFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      src_ip: '192.168.1.100',
      dst_ip: '8.8.8.8',
      src_port: 49152,
      dst_port: 443,
      protocol: 'TCP',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const bytes = Math.floor(Math.random() * 10000);
    const packets = Math.floor(Math.random() * 100);
    const duration = Math.random() * 5;
    const isAnomaly = Math.random() < 0.1;
    
    const newFlow: FullFlowData = {
      ...values,
      id: `flow_${Date.now()}`,
      timestamp: new Date().toISOString(),
      bytes,
      packets,
      duration,
      anomaly_score: isAnomaly ? 0.85 : 0.1,
      is_anomaly: isAnomaly,
      bytes_per_packet: bytes / (packets || 1),
      packets_per_second: packets / (duration || 1),
      port_category: values.dst_port < 1024 ? 'well-known' : 'registered',
      protocol_tcp: values.protocol === 'TCP' ? 1 : 0,
      protocol_udp: values.protocol === 'UDP' ? 1 : 0,
      protocol_other: !['TCP', 'UDP'].includes(values.protocol) ? 1 : 0,
      scored_at: new Date().toISOString()
    };
    onFlowAdded(newFlow);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="src_ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source IP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dst_ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination IP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
         <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="src_port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Port</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dst_port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Port</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="protocol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Protocol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a protocol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TCP">TCP</SelectItem>
                  <SelectItem value="UDP">UDP</SelectItem>
                  <SelectItem value="ICMP">ICMP</SelectItem>
                  <SelectItem value="OTHER">OTHER</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Flow</Button>
        </div>
      </form>
    </Form>
  );
}
