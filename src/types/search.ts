import { LucideIcon } from 'lucide-react';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'vm' | 'container' | 'pod' | 'job' | 'pipeline';
  icon: LucideIcon;
  onClick: () => void;
}