"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
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
  fullContent?: string;
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

          {/* Rendered & Formatted Markdown Content */}
          {article.fullContent && (
            <div className="border-t border-neutral-200 pt-4">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="mt-5 mb-3 border-b border-neutral-200 pb-1.5 font-sans text-lg font-bold tracking-tight text-black uppercase sm:text-xl">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-5 mb-2 font-sans text-base font-bold tracking-tight text-black uppercase sm:text-lg">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-4 mb-2 font-sans text-sm font-bold tracking-tight text-black uppercase sm:text-base">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="font-editorial-body mb-3 text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-sans font-bold text-black">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-3 list-disc space-y-1.5 pl-4 marker:text-black">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-3 list-decimal space-y-2.5 pl-5 marker:font-mono marker:font-semibold marker:text-black">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="font-editorial-body pl-1 text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="font-editorial-body my-3 border-l-2 border-black pl-4 text-neutral-700 italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-900">
                      {children}
                    </code>
                  ),
                }}
              >
                {article.fullContent.trim()}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
