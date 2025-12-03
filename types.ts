
import { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: string;
  content: string;
  avatar: string;
  name: string;
  role: string;
  company: string;
}
