'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { AddFlowForm } from './add-flow-form';
import { FullFlowData } from '@/lib/types';
import { Edit3 } from 'lucide-react';

interface EditFlowDialogProps {
    flow: FullFlowData | null;
    isOpen: boolean;
    onClose: () => void;
    onFlowUpdated: (updatedFlow: FullFlowData) => void;
}

export function EditFlowDialog({ flow, isOpen, onClose, onFlowUpdated }: EditFlowDialogProps) {
    if (!flow) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md glass-card border-white/10">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <Edit3 className="h-5 w-5 text-cyan-400" />
                        Edit Network Flow
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Modify the parameters for flow ID: <code className="text-cyan-500">{flow.id}</code>
                    </DialogDescription>
                </DialogHeader>
                <AddFlowForm
                    initialData={flow}
                    onFlowUpdated={onFlowUpdated}
                    onClose={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}
