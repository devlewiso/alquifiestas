import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "verified";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary text-white": variant === "default",
          "bg-muted text-muted-foreground": variant === "secondary",
          "border border-border text-foreground": variant === "outline",
          "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300": variant === "verified",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
