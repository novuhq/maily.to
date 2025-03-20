'use client';

import { cn } from '@/utils/classname';
import { CopyEmailHtml } from './copy-email-html';
import { PreviewEmail } from './preview-email';

type EditorTopbarProps = {
  className?: string;
};

export function EditorTopbar(props: EditorTopbarProps) {
  const { className } = props;

  return (
    <div className={cn('flex items-center justify-between gap-1.5', className)}>
      <div className="flex items-center gap-1.5">
        <PreviewEmail />
        <CopyEmailHtml />
      </div>
    </div>
  );
}
