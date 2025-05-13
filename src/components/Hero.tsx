import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-betting-accent/10 to-transparent py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          <span className="text-betting-accent">AI-Powered</span> Sports Predictions
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          GameSight uses advanced AI to analyze historical data, team stats, and real-time factors
          to predict game outcomes with high accuracy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              How It Works
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 bg-betting-card rounded-lg p-4 text-center border border-betting-accent/20">
          <div className="flex justify-center">
            <div className="px-3 py-1 bg-betting-accent/20 rounded-full text-betting-accent text-sm font-medium mb-2">
              Powered by Gemini AI
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Our predictions leverage Google's Gemini AI to analyze thousands of data points for each game.
          </p>
        </div>
      </div>
    </div>
  );
}
