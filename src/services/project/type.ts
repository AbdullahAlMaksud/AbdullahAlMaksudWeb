export interface CoreFeature {
  icon?: string;
  text: string;
  desc?: string;
}

export interface Project {
  _id?: string;
  id?: string;
  index?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  coverImage?: string;
  image?: string;
  imageBg?: string;
  barColor?: string;
  logo?: string;
  stack?: string[];
  tags?: string[];
  coreFeatures?: CoreFeature[];
  gitRepo?: string;
  github?: string;
  liveLink?: string;
  link?: string;
  categories?: string[];
  category?: string;
  tag?: string;
  status?: "live" | "building" | "archived" | string;
  isFeatured?: boolean;
  featured?: boolean;
  year?: string;
  createdAt?: string;
  lastUpdate?: string;
}

export interface ProjectQueryParams {
  category?: string;
  featured?: boolean;
}

export interface ProjectMutationInput {
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  logo?: string;
  stack?: string[];
  coreFeatures?: CoreFeature[];
  gitRepo?: string;
  liveLink?: string;
  categories?: string[];
  tag?: string;
  status?: string;
  isFeatured?: boolean;
}
