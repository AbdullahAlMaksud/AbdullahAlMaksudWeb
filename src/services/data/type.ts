export type LocaleParam = "en" | "bn";

export interface SiteMetadata {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  url?: string;
}

export interface SiteNavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SiteData {
  meta?: SiteMetadata;
  navigation?: SiteNavigationItem[];
  socialLinks?: SocialLink[];
  footer?: Record<string, any>;
  [key: string]: any;
}

export interface ContentBundleData {
  hero?: Record<string, any>;
  about?: Record<string, any>;
  skills?: Record<string, any>;
  experience?: Record<string, any>;
  faq?: Record<string, any>;
  [key: string]: any;
}
