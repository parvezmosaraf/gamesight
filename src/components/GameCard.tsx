
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface TeamInfo {
  name: string;
  logo: string;
  winProbability: number;
}

interface GameCardProps {
  id: string;
  league: string;
  date: string;
  time: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  confidence: number;
}

export default function GameCard({ id, league, date, time, homeTeam, awayTeam, confidence }: GameCardProps) {
  // Determine which team has the higher win probability
  const favoredTeam = homeTeam.winProbability > awayTeam.winProbability ? homeTeam : awayTeam;
  
  return (
    <Link to={`/game/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 bg-betting-card hover:bg-betting-hover border-betting-card">
        <div className="p-4">
          <div className="flex justify-between mb-3 text-xs text-muted-foreground">
            <span>{league}</span>
            <span>{date} • {time}</span>
          </div>
          
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-4">
            {/* Away Team */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden mb-2">
                <img src={awayTeam.logo} alt={awayTeam.name} className="w-10 h-10 object-contain" />
              </div>
              <span className="font-semibold text-sm">{awayTeam.name}</span>
            </div>
            
            {/* VS */}
            <div className="text-muted-foreground text-xs">VS</div>
            
            {/* Home Team */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden mb-2">
                <img src={homeTeam.logo} alt={homeTeam.name} className="w-10 h-10 object-contain" />
              </div>
              <span className="font-semibold text-sm">{homeTeam.name}</span>
            </div>
          </div>
          
          {/* Prediction */}
          <div className="mt-3 p-3 bg-betting-dark rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium">Win Probability</span>
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                confidence >= 70 ? "bg-betting-win/20 text-betting-win" : 
                confidence >= 50 ? "bg-betting-accent/20 text-betting-accent" : 
                "bg-betting-neutral/20 text-betting-neutral"
              )}>
                {confidence}% Confidence
              </span>
            </div>
            
            {/* Prediction bars */}
            <div className="space-y-2">
              <div className="prediction-bar bg-betting-neutral/20">
                <div 
                  className="prediction-bar-fill bg-betting-accent" 
                  style={{ width: `${awayTeam.winProbability}%` }}
                />
              </div>
              <div className="prediction-bar bg-betting-neutral/20">
                <div 
                  className="prediction-bar-fill bg-betting-accent" 
                  style={{ width: `${homeTeam.winProbability}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between text-xs mt-1">
              <span>{awayTeam.winProbability}%</span>
              <span>{homeTeam.winProbability}%</span>
            </div>
            
            <div className="mt-3 text-sm font-medium">
              Prediction: <span className="text-betting-win">{favoredTeam.name}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
