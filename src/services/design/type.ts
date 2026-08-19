export interface GraphicDesign {
  _id?: string;
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  description: string;
  category: string;
  bg?: string;
  tools?: string[];
  link?: string;
  featured?: boolean;
  year?: string;
}

export interface DesignQueryParams {
  category?: string;
  featured?: boolean;
}

export interface DesignMutationInput {
  id: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  description?: string;
  category?: string;
  bg?: string;
  tools?: string[];
  link?: string;
  featured?: boolean;
  year?: string;
}
