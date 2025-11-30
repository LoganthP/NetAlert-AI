'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getFlowsSummary } from '@/app/actions/summarize-flows';
import { FullFlowData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

interface AnalyseFlowsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  flows: FullFlowData[];
}

export function AnalyseFlowsDialog({ isOpen, onClose, flows }: AnalyseFlowsDialogProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setSummary(null);
      getFlowsSummary(flows)
        .then(result => setSummary(result.summary))
        .catch(() => setSummary('Could not load AI summary.'))
        .finally(() => setIsLoading(false));
    }
  }, [flows, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Network Flow Analysis
          </DialogTitle>
          <DialogDescription>
            An AI-powered summary of the recent network flows.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {isLoading && (
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </div>
          )}
          {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
