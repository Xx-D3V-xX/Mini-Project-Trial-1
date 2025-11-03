import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { MapPin, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [location] = useLocation();
  const isLanding = location === "/";
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        isLanding
          ? "bg-background/80 backdrop-blur-md"
          : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 -ml-3 cursor-pointer">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-xl font-serif font-bold">Mumbai Explorer</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/explore" data-testid="link-explore">
              <span className={`text-base font-medium cursor-pointer hover:text-primary transition-colors ${location === "/explore" ? "text-primary" : ""}`}>
                Explore
              </span>
            </Link>
            <Link href="/itinerary" data-testid="link-itinerary">
              <span className={`text-base font-medium cursor-pointer hover:text-primary transition-colors ${location === "/itinerary" ? "text-primary" : ""}`}>
                Plan Trip
              </span>
            </Link>
            {isLoggedIn && (
              <Link href="/profile" data-testid="link-profile">
                <span className={`text-base font-medium cursor-pointer hover:text-primary transition-colors ${location === "/profile" ? "text-primary" : ""}`}>
                  Profile
                </span>
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link href="/profile" data-testid="link-profile-icon">
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  data-testid="button-logout"
                  className="hidden md:inline-flex"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" data-testid="link-login">
                <Button variant="default">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
