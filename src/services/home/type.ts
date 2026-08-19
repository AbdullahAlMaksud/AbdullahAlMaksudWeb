export interface HeroData {
  greeting: string;
  firstName: string;
  subtitlePrefix: string;
  subtitleHighlight: string;
  exploreText: string;
  portraitImage: string;
  portraitAlt: string;
}

export interface AboutSummaryData {
  badge: string;
  headlineLines: string[];
  signature: string;
  infoBadges: Array<{
    text: string;
    icon: string;
  }>;
}

export interface FeaturedProjectsConfig {
  tagText: string;
  viewAllText: string;
  viewAllLink: string;
  defaultMockup: string;
}

export interface SimpleSectionConfig {
  badge?: string;
  headlineLines: string[];
  exploreText?: string;
  exploreLink?: string;
  highlightIndex?: number;
  ctaText?: string;
  email?: string;
}

export interface SocialLinkConfig {
  platform: string;
  url: string;
}

export interface FooterConfig {
  connectText: string;
  copyright: string;
  socials: SocialLinkConfig[];
}

export interface HomeData {
  hero: HeroData;
  about: AboutSummaryData;
  featuredProjects: FeaturedProjectsConfig;
  books: SimpleSectionConfig;
  writing: SimpleSectionConfig;
  quote: {
    lines: string[];
    highlightIndex: number;
  };
  graphicDesign: SimpleSectionConfig;
  contact: SimpleSectionConfig;
  footer: FooterConfig;
}
