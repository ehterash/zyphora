
import { 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  BrainCircuit 
} from 'lucide-react';
import { Feature, PricingTier, Stat, NavItem, Testimonial } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Why Us', href: '#why-us' },
  { label: 'Mission', href: '#mission' },
  { label: 'Features', href: '#features' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Neural Networks',
    description: 'Advanced deep learning algorithms that adapt to your business data in real-time.',
    icon: BrainCircuit,
  },
  {
    id: '2',
    title: 'Global Latency',
    description: 'Edge computing distributed across 200+ regions for sub-millisecond response times.',
    icon: Globe,
  },
  {
    id: '3',
    title: 'Quantum Security',
    description: 'Next-gen encryption protocols designed to withstand post-quantum threats.',
    icon: ShieldCheck,
  },
  {
    id: '4',
    title: 'Predictive Analytics',
    description: 'Forecast market trends with 99.8% accuracy using our proprietary models.',
    icon: BarChart3,
  },
  {
    id: '5',
    title: 'Instant Scaling',
    description: 'Serverless architecture that handles traffic spikes of any magnitude effortlessly.',
    icon: Zap,
  },
  {
    id: '6',
    title: 'Hardware Acceleration',
    description: 'Optimized for the latest GPU clusters to deliver maximum throughput.',
    icon: Cpu,
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Nexus',
    price: { monthly: 49, yearly: 470 },
    features: ['100k API Requests', 'Basic Analytics', 'Email Support', '1 Team Member'],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Synergy',
    price: { monthly: 149, yearly: 1430 },
    features: ['5M API Requests', 'Advanced Analytics', 'Priority Support', '5 Team Members', 'Custom Models'],
    cta: 'Upgrade to Synergy',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Omni',
    price: { monthly: 499, yearly: 4790 },
    features: ['Unlimited Requests', 'Real-time Insights', '24/7 Dedicated Agent', 'Unlimited Seats', 'On-premise Deployment'],
    cta: 'Contact Sales',
  },
];

export const STATS: Stat[] = [
  { id: '1', label: 'Predictions Daily', value: 850, suffix: 'M+' },
  { id: '2', label: 'Uptime', value: 99, suffix: '.99%' },
  { id: '3', label: 'Global Nodes', value: 240, suffix: '+' },
  { id: '4', label: 'Enterprise Clients', value: 500, suffix: '+' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    content: "Zyphora has completely transformed how we handle data processing. The speed and accuracy are unmatched in the industry.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    name: "Elena Rodriguez",
    role: "CTO",
    company: "TechFlow Inc."
  },
  {
    id: '2',
    content: "The integration was seamless, and the results were immediate. Our customer satisfaction scores have increased by 40%.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    name: "David Chen",
    role: "VP of Product",
    company: "GlobalStream"
  },
  {
    id: '3',
    content: "Finally, an AI infrastructure that scales with us. The predictive analytics have given us a massive competitive edge.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    name: "Sarah Williams",
    role: "Director of Innovation",
    company: "FutureScale"
  }
];
