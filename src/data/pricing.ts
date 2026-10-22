import { site } from "@/config/site";

export type PricingPlan = {
  id: string;
  name: string;
  priceUSD: number | null;
  priceLabel?: string;
  billingPeriod: "month" | "project" | "custom";
  description: string;
  features: string[];
  featured: boolean;
  ctaLabel: string;
  ctaHref: string;
};

// Set priceUSD only after the owner approves the commercial USD amount.
// null supports negotiated plans; priceLabel supplies their display text.
export const supportPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    priceUSD: 10,
    billingPeriod: "month",
    description: "Essential care for small businesses and their digital presence.",
    features: [
      "Website maintenance",
      "Basic technical support",
      "Routine content updates",
      "Basic performance checks",
    ],
    featured: false,
    ctaLabel: "Get Started",
    ctaHref: `${site.whatsapp}?text=${encodeURIComponent("I'd like to discuss the Basic support plan.")}`,
  },
  {
    id: "pro",
    name: "Pro",
    priceUSD: 50,
    billingPeriod: "month",
    description: "Ongoing improvements for businesses ready for their next chapter.",
    features: [
      "Everything in Basic",
      "Priority technical support",
      "Monthly feature improvements",
      "Performance optimization",
      "Basic automation support",
    ],
    featured: true,
    ctaLabel: "Get Started",
    ctaHref: `${site.whatsapp}?text=${encodeURIComponent("I'd like to discuss the Pro support plan.")}`,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceUSD: null,
    priceLabel: "Contract",
    billingPeriod: "custom",
    description: "Flexible support for larger businesses and custom projects.",
    features: [
      "Custom development support",
      "Advanced integrations",
      "Automation solutions",
      "Dedicated technical consultation",
      "Scalable service arrangements",
    ],
    featured: false,
    ctaLabel: "Contact Sales",
    ctaHref: `${site.whatsapp}?text=${encodeURIComponent("I'd like to discuss the Enterprise support plan.")}`,
  },
];
