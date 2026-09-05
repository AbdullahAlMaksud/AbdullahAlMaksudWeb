export interface NavItem {
  label: string;
  href: string;
}

export interface EnterpriseProject {
  id: string;
  tag: string;
  title: string;
  description: string;
  fullContent?: string;
  techStack?: string[];
  metrics?: string[];
}

export interface EssayPublication {
  id: string;
  tag: string; // "ESSAY" | "PUBLICATION"
  title: string;
  description: string;
  fullContent?: string;
  date?: string;
  readTime?: string;
  isFullWidth?: boolean;
}

export interface DesignSystemModule {
  id: string;
  tag: string; // "VISUALIZER" | "FRAMEWORK" | "ARCHITECTURE" | "GOVERNANCE"
  title: string;
  description: string;
  isInteractive?: boolean;
  type: "interactive" | "article" | "standard";
  details?: {
    overview?: string;
    keyPoints?: string[];
  };
}

export interface StrategicPillar {
  number: string;
  title: string;
  description: string;
}

export interface StrategicAdvisory {
  badge: string;
  availability: string;
  category: string;
  headline: string;
  statement: string;
  pillars: StrategicPillar[];
  cta: {
    primaryText: string;
    secondaryText: string;
    email: string;
  };
}

export interface ConsultationOffering {
  label: string;
  category: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface PortfolioData {
  meta: {
    issue: string;
    folio: string;
    badge: string;
    verticalLabel: string;
  };
  identity: {
    name: string;
    role: string;
    subRole: string;
    consultation: {
      tag: string;
      headline: string;
      offerings: ConsultationOffering[];
      ctaText: string;
    };
    navItems: NavItem[];
  };
  heroBanner: {
    imageUrl: string;
    alt: string;
    caption?: string;
  };
  enterpriseArchitecture: {
    category: string;
    titleLine1: string;
    titleLine2: string;
    projects: EnterpriseProject[];
  };
  literatureEssays: {
    category: string;
    titleLine1: string;
    titleLine2: string;
    imageUrl: string;
    imageAlt: string;
    items: EssayPublication[];
  };
  designSystems: {
    category: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
    modules: DesignSystemModule[];
  };
  strategicAdvisory: StrategicAdvisory;
  footer: {
    copyright: string;
    rights: string;
    socials: SocialLink[];
  };
}
