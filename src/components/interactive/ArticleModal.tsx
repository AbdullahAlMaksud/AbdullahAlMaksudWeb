"use client";

import React from "react";
import { BlockContentRenderer } from "@/components/content/BlockContentRenderer";
import type { ContentPayload } from "@/types/block";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export interface ModalArticleData {
  tag: string;
  title: string;
  category?: string;
  description: string;
  fullContent?: ContentPayload;
  techStack?: string[];
  metrics?: string[];
  date?: string;
  readTime?: string;
}

interface ArticleModalProps {
  article: ModalArticleData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-black bg-white p-6 sm:p-8">
        <DialogHeader className="border-b border-black/10 pb-4">
          <div className="mb-1 flex items-center space-x-2">
            <Badge variant="outline">{article.tag}</Badge>
            {article.readTime && (
              <span className="font-mono text-[10px] text-neutral-500">
                {"//"} {article.readTime}
              </span>
            )}
          </div>
          <DialogTitle className="font-sans text-xl font-bold tracking-tight text-black sm:text-2xl">
            {article.title}
          </DialogTitle>
          <DialogDescription className="font-mono text-xs text-neutral-500">
            {article.category || "ARCHITECTURAL BRIEF & SPECIFICATION"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Main summary in editorial serif callout box */}
          <div className="font-editorial-body border-l-2 border-black bg-neutral-50 p-4 text-base leading-relaxed text-neutral-800">
            {article.description}
          </div>

          {/* Tech stack or tags if present */}
          {article.techStack && article.techStack.length > 0 && (
            <div className="space-y-2">
              <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                ENGINEERING STACK & PROTOCOLS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {article.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="border border-neutral-300 bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metrics if present */}
          {article.metrics && article.metrics.length > 0 && (
            <div className="space-y-2">
              <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                KEY ARCHITECTURAL METRICS
              </div>
              <ul className="space-y-1.5 font-mono text-xs text-neutral-700">
                {article.metrics.map((metric, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-black">▪</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rendered Block / Markdown Content */}
          {article.fullContent && (
            <div className="border-t border-neutral-200 pt-4">
              <BlockContentRenderer content={article.fullContent} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
