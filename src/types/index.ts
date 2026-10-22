export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  detail: string;
}
export interface Blog {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  body: string;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
