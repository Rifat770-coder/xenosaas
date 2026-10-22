import { ArrowUpRight } from "lucide-react";
export default function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={`button ${secondary ? "secondary" : "primary"}`}>
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
