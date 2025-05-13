import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-betting-card bg-betting-dark py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-betting-accent w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold">GS</span>
              </div>
              <span className="font-bold text-xl">GameSight</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered sports predictions using advanced analytics and real-time data.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-betting-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-betting-accent transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-betting-card flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 GameSight. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            For entertainment purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
