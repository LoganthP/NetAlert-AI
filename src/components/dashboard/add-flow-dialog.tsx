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
import { FilePlus2 } from 'lucide-react';

interface AddFlowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFlowAdded: (newFlow: FullFlowData) => void;
}

export function AddFlowDialog({ isOpen, onClose, onFlowAdded }: AddFlowDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePlus2 className="h-5 w-5 text-primary" />
            Add New Network Flow
          </DialogTitle>
          <DialogDescription>
            Enter the details of the network flow you want to add manually.
          </DialogDescription>
        </DialogHeader>
        <AddFlowForm onFlowAdded={onFlowAdded} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}