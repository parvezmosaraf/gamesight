import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface PredictionCardProps {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  league: string;
  matchTime: string;
  prediction: {
    winner: 'home' | 'away' | 'draw';
    confidence: number;
  };
  status: 'upcoming' | 'live' | 'completed';
}

export function PredictionCard({
  id,
  homeTeam,
  awayTeam,
  league,
  matchTime,
  prediction,
  status,
}: PredictionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'destructive';
      case 'completed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getWinnerText = (winner: string) => {
    switch (winner) {
      case 'home':
        return homeTeam.name;
      case 'away':
        return awayTeam.name;
      default:
        return 'Draw';
    }
  };

  return (
    <Link to={`/game/${id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {format(new Date(matchTime), 'MMM d, yyyy h:mm a')}
          </CardTitle>
          <Badge variant={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img
                src={homeTeam.logo}
                alt={homeTeam.name}
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.src = '/team-default-logo.png';
                }}
              />
              <span>{homeTeam.name}</span>
            </div>
            <span className="text-muted-foreground">vs</span>
            <div className="flex items-center space-x-2">
              <span>{awayTeam.name}</span>
              <img
                src={awayTeam.logo}
                alt={awayTeam.name}
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.src = '/team-default-logo.png';
                }}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-betting-card">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Prediction:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-betting-win">
                  {getWinnerText(prediction.winner)}
                </span>
                <Badge variant="outline" className="ml-2">
                  {prediction.confidence}% confidence
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {league}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 