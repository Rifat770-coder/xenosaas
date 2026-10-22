export interface Client {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  category?: string;
  isPlaceholder?: boolean;
}

export const clients: Client[] = [
  { id: "chapter", name: "Your next chapter", category: "PARTNERSHIP SPACE 01", isPlaceholder: true },
  { id: "idea", name: "Your ambitious idea", category: "PARTNERSHIP SPACE 02", isPlaceholder: true },
  { id: "business", name: "Your growing business", category: "PARTNERSHIP SPACE 03", isPlaceholder: true },
  { id: "future", name: "Your digital future", category: "PARTNERSHIP SPACE 04", isPlaceholder: true },
];
