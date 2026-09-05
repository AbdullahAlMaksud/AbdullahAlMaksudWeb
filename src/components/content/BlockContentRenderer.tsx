"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Check, Copy } from "lucide-react";
import type { ContentBlock, ContentPayload } from "@/types/block";

interface BlockContentRendererProps {
  content: ContentPayload;
  className?: string;
}

/**
 * Technical code block with copy button and language badge
 */
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-black/10 bg-[#0F131A] text-white shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-white/60">
        <span>{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 transition-colors hover:text-white focus:outline-none"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-emerald-300/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Renders an individual structured block
 */
function RenderBlock({ block }: { block: ContentBlock }) {
  const { type, data } = block;

  switch (type) {
    case "heading": {
      const level = data.level || 2;
      const text = data.text || "";
      const baseClass = "font-serif tracking-tight text-black font-semibold";
      switch (level) {
        case 1:
          return <h1 className={`mt-10 mb-4 text-3xl md:text-4xl ${baseClass}`}>{text}</h1>;
        case 2:
          return <h2 className={`mt-8 mb-4 text-2xl md:text-3xl ${baseClass}`}>{text}</h2>;
        case 3:
          return <h3 className={`mt-6 mb-3 text-xl md:text-2xl ${baseClass}`}>{text}</h3>;
        case 4:
          return <h4 className={`mt-5 mb-2 text-lg md:text-xl ${baseClass}`}>{text}</h4>;
        case 5:
          return <h5 className={`mt-4 mb-2 text-base md:text-lg ${baseClass}`}>{text}</h5>;
        case 6:
        default:
          return <h6 className={`mt-3 mb-1 text-sm md:text-base ${baseClass}`}>{text}</h6>;
      }
    }

    case "paragraph":
      return (
        <p className="my-4 font-sans text-base leading-relaxed whitespace-pre-line text-black/85 md:text-lg">
          {data.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className="my-6 rounded-r border-l-2 border-black/80 bg-black/[0.02] py-2 pr-4 pl-6 font-serif text-lg leading-relaxed text-black/90 italic md:text-xl">
          <p>{data.text}</p>
          {data.caption && (
            <footer className="mt-2 font-sans text-sm text-black/50 not-italic">
              — {data.caption}
            </footer>
          )}
        </blockquote>
      );

    case "code":
      return <CodeBlock code={data.code || data.text || ""} language={data.language} />;

    case "list": {
      const isNumbered = data.listType === "number";
      const items = data.items || [];
      if (isNumbered) {
        return (
          <ol className="my-4 list-decimal space-y-2 pl-6 font-sans text-base leading-relaxed text-black/85 md:text-lg">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="my-4 list-disc space-y-2 pl-6 font-sans text-base leading-relaxed text-black/85 marker:text-black/50 md:text-lg">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }

    case "divider":
      return <hr className="my-8 border-t border-black/10" />;

    case "image":
      if (!data.url) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-black/10 bg-black/5">
            <Image
              src={data.url}
              alt={data.alt || data.caption || "Content image"}
              fill
              className="object-cover"
            />
          </div>
          {data.caption && (
            <figcaption className="mt-2 text-center font-sans text-sm text-black/60 italic">
              {data.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      if (data.text) {
        return <p className="my-3 font-sans text-base text-black/80">{data.text}</p>;
      }
      return null;
  }
}

/**
 * Parses raw input and normalizes it into ContentBlock[] if possible
 */
function parseContentToBlocks(
  content: ContentPayload
): { blocks: ContentBlock[] } | { isMarkdown: boolean; rawString: string } {
  if (!content) {
    return { blocks: [] };
  }

  // Case 1: Already an array of ContentBlocks
  if (Array.isArray(content)) {
    return { blocks: content };
  }

  // Case 2: Object with { blocks: [...] }
  if (typeof content === "object" && content !== null && "blocks" in content) {
    const obj = content as { blocks?: ContentBlock[] };
    if (Array.isArray(obj.blocks)) {
      return { blocks: obj.blocks };
    }
  }

  // Case 3: Lexical root format { root: { children: [...] } }
  if (
    typeof content === "object" &&
    content !== null &&
    "root" in content &&
    content.root?.children
  ) {
    const lexicalBlocks: ContentBlock[] = [];
    const children = content.root.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === "heading") {
        const text = (child.children || []).map((c: any) => c.text || "").join("");
        const tagLevel = Number(child.tag?.replace("h", "")) || 2;
        lexicalBlocks.push({
          id: `lexical-h-${i}`,
          type: "heading",
          data: { text, level: tagLevel as 1 | 2 | 3 | 4 | 5 | 6 },
        });
      } else if (child.type === "quote") {
        const text = (child.children || []).map((c: any) => c.text || "").join("");
        lexicalBlocks.push({
          id: `lexical-q-${i}`,
          type: "quote",
          data: { text },
        });
      } else if (child.type === "code") {
        const text = (child.children || []).map((c: any) => c.text || "").join("");
        lexicalBlocks.push({
          id: `lexical-c-${i}`,
          type: "code",
          data: { code: text, language: child.language },
        });
      } else if (child.type === "list") {
        const items: string[] = (child.children || []).map((li: any) =>
          (li.children || []).map((c: any) => c.text || "").join("")
        );
        lexicalBlocks.push({
          id: `lexical-l-${i}`,
          type: "list",
          data: {
            items,
            listType: child.listType === "number" ? "number" : "bullet",
          },
        });
      } else {
        const text = (child.children || []).map((c: any) => c.text || "").join("");
        if (text) {
          lexicalBlocks.push({
            id: `lexical-p-${i}`,
            type: "paragraph",
            data: { text },
          });
        }
      }
    }
    return { blocks: lexicalBlocks };
  }

  // Case 4: String
  if (typeof content === "string") {
    const trimmed = content.trim();
    // Try to check if it's a JSON string representing blocks
    if (
      (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
      (trimmed.startsWith("{") && trimmed.endsWith("}"))
    ) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseContentToBlocks(parsed);
      } catch {
        // Fall back to markdown string
      }
    }
    return { isMarkdown: true, rawString: content };
  }

  return { blocks: [] };
}

/**
 * Editorial-grade unified Block Content Renderer
 */
export function BlockContentRenderer({ content, className = "" }: BlockContentRendererProps) {
  const parsed = parseContentToBlocks(content);

  if ("isMarkdown" in parsed && parsed.isMarkdown) {
    return (
      <div className={`prose max-w-none text-black ${className}`}>
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="mt-10 mb-4 font-serif text-3xl font-bold text-black md:text-4xl">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-8 mb-4 font-serif text-2xl font-bold text-black md:text-3xl">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-6 mb-3 font-serif text-xl font-semibold text-black md:text-2xl">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="my-4 font-sans text-base leading-relaxed text-black/85 md:text-lg">
                {children}
              </p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-6 rounded-r border-l-2 border-black bg-black/[0.02] py-2 pr-4 pl-6 font-serif text-lg leading-relaxed text-black/90 italic md:text-xl">
                {children}
              </blockquote>
            ),
            ul: ({ children }) => (
              <ul className="my-4 list-disc space-y-2 pl-6 font-sans text-base leading-relaxed text-black/85 marker:text-black/50 md:text-lg">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-4 list-decimal space-y-2 pl-6 font-sans text-base leading-relaxed text-black/85 md:text-lg">
                {children}
              </ol>
            ),
            code: ({ className: codeClass, children }) => {
              const match = /language-(\w+)/.exec(codeClass || "");
              const isInline = !match && !String(children).includes("\n");
              if (isInline) {
                return (
                  <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-sm text-black">
                    {children}
                  </code>
                );
              }
              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={match ? match[1] : undefined}
                />
              );
            },
            hr: () => <hr className="my-8 border-t border-black/10" />,
          }}
        >
          {parsed.rawString}
        </ReactMarkdown>
      </div>
    );
  }

  const blocks = "blocks" in parsed ? parsed.blocks : [];

  return (
    <div className={`space-y-1 text-black ${className}`}>
      {blocks.map((block, index) => (
        <RenderBlock key={block.id || `block-${index}`} block={block} />
      ))}
    </div>
  );
}
