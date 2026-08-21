export type PageId = 'home' | 'whos-me' | 'works' | 'thoughts' | 'connect';

export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  logoText: string;
  logoUnderlineTarget: string; // e.g. "natiglao" or "atigl"
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'UI/UX Design' | 'Graphic Design' | 'Tools' | 'Methodology';
  level: number; // 1-100
  iconName?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ProfileContent {
  name: string;
  title: string;
  greeting: string;
  shortBio: string;
  longBio: string[];
  philosophy: string;
  avatarUrl: string;
  location: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  skills: SkillItem[];
  experiences: ExperienceItem[];
  services: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'UI/UX Design' | 'Graphic Design' | 'Branding' | 'Web Design' | 'Mobile App';
  client: string;
  year: string;
  role: string;
  duration: string;
  shortDesc: string;
  challenge: string;
  solution: string;
  impact: string;
  coverImage: string;
  galleryImages: string[];
  tags: string[];
  figmaUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ThoughtPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  category: string;
  coverImage: string;
  tags: string[];
  published: boolean;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  behance: string;
  dribbble?: string;
  github?: string;
  email: string;
}

export interface ConnectContent {
  heading: string;
  subheading: string;
  email: string;
  location: string;
  availability: string;
  socials: SocialLinks;
}

export interface SiteData {
  hero: HeroContent;
  profile: ProfileContent;
  projects: ProjectItem[];
  thoughts: ThoughtPost[];
  connect: ConnectContent;
}
