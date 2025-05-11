import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-betting-dark border-b border-betting-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-betting-accent w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">GS</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">GameSight</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-betting-accent transition-colors">
              Home
            </Link>
            <Link to="/predictions" className="text-sm font-medium text-foreground hover:text-betting-accent transition-colors">
              Predictions
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-betting-accent transition-colors">
              How It Works
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-[200px] hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search games..."
              className="w-full bg-secondary rounded-md border border-input pl-8 pr-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-betting-accent"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" size="sm">Log In</Button>
                </Link>
                <Link to="/auth/signup">
                  <Button variant="default" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 z-50 bg-betting-dark md:hidden",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="container py-6 flex flex-col gap-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search games..."
              className="w-full bg-secondary rounded-md border border-input pl-8 pr-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-betting-accent"
            />
          </div>
          
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-lg font-medium p-2 hover:bg-betting-card rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/predictions" 
              className="text-lg font-medium p-2 hover:bg-betting-card rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Predictions
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium p-2 hover:bg-betting-card rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
          </nav>
          
          <div className="flex flex-col gap-2 mt-4">
            {user ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
