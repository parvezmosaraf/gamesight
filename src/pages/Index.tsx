import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import PredictionStats from '@/components/PredictionStats';
import { SportsGames } from '@/components/SportsGames';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <div className="container py-10">
          <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
          <PredictionStats />
          
          <div className="mt-12">
            <SportsGames />
          </div>
          
          <div className="mt-16 bg-betting-card rounded-lg p-6 border border-betting-card">
            <h2 className="text-2xl font-bold mb-4">How GameSight Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-betting-accent/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-betting-accent font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  We gather historical game data and real-time factors through various sports APIs.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-betting-accent/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-betting-accent font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced algorithm analyzes the data, considering team performance, player stats, and other key factors.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-betting-accent/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-betting-accent font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Prediction Output</h3>
                <p className="text-sm text-muted-foreground">
                  We generate accurate predictions with confidence scores that you can use to make informed betting decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
