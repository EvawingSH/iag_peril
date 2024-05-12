import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="https://www.linkedin.com/in/sijie-liu%EF%BC%8Cphd-700388227/"
        target="_blank"
        className="hover:text-primary text-muted-foreground text-sm font-medium transition-colors"
      >
        Sijie Liu
      </Link>
      <Link
        href="https://github.com/EvawingSH/iag_peril"
        target="_blank"
        className="hover:text-primary text-sm font-medium transition-colors"
      >
        GitHub Repo
      </Link>
    </nav>
  );
}
