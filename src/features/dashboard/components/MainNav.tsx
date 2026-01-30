import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

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
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to="/courses"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Courses
      </Link>
      <Link
        to="/achievements"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Achievements
      </Link>
      <Link
        to="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
