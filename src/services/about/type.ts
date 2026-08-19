export interface AboutHeaderData {
  badge: string;
  headline: string;
  intro: string;
  subIntro: string;
  signature: string;
  location: string;
  experienceYears: string;
  focusAreas: string;
  learningMindset: string;
  cvUrl: string;
  email: string;
}

export interface AboutPillar {
  id: string;
  title: string;
  icon: string;
  tag: string;
  description: string;
  skills: string[];
}

export interface AboutExperience {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  type: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface AboutEducation {
  id: string;
  year: string;
  degree: string;
  institution: string;
  location: string;
  status: string;
  description: string;
  highlights: string[];
  courses: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface AboutData {
  header: AboutHeaderData;
  pillars: AboutPillar[];
  experience: AboutExperience[];
  education: AboutEducation[];
  skillsCategories: SkillCategory[];
}
