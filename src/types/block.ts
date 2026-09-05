export type BlockType = "paragraph" | "heading" | "quote" | "code" | "list" | "divider" | "image";

export interface ContentBlock {
  id: string;
  type: BlockType;
  data: {
    text?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    listType?: "bullet" | "number";
    items?: string[];
    code?: string;
    language?: string;
    url?: string;
    caption?: string;
    alt?: string;
    markdown?: string;
  };
}

export type ContentPayload =
  | string
  | ContentBlock[]
  | { blocks: ContentBlock[] }
  | { root: Record<string, any> }
  | null
  | undefined;
