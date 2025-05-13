import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import axios from 'axios';
import React, { useState } from 'react';
import { getGeminiPrediction, GeminiPredictionResponse } from '@/services/geminiService';
import PredictionModal from './PredictionModal';

const API_KEY = '7779b541d6d3b6677b193ba851ee6642';
const BASE_URL = 'https://v3.football.api-sports.io';

interface SoccerGame {
  fixture: {
    id: number;
    date: string;
    status: {
      long: string;
      short: string;
    };
    venue: {
      name: string;
      city: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}

const formatGameTime = (dateStr: string) => {
  try {
    return formatInTimeZone(new Date(dateStr), 'America/New_York', 'h:mm a zzz');
  } catch (error) {
    console.error('Error formatting date:', dateStr, error);
    return 'Time TBD';
  }
};

const getGameStatus = (status: { long: string; short: string }) => {
  switch (status.short) {
    case 'FT':
      return 'Final';
    case 'HT':
      return 'Halftime';
    case '1H':
    case '2H':
      return status.long;
    default:
      return 'Scheduled';
  }
};

export const SoccerGames = () => {
  const { data: games, isLoading, error } = useQuery({
    queryKey: ['soccerGames'],
    queryFn: async () => {
      const today = new Date();
      const formattedDate = format(today, 'yyyy-MM-dd');
      
      const response = await axios.get(`${BASE_URL}/fixtures`, {
        params: {
          date: formattedDate,
          timezone: 'America/New_York'
        },
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      });

      return response.data.response as SoccerGame[];
    },
    refetchInterval: 30000,
    retry: 3
  });

  // Prediction modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | undefined>(undefined);
  const [modalPrediction, setModalPrediction] = useState<GeminiPredictionResponse | undefined>(undefined);
  const [modalTeams, setModalTeams] = useState<{ home: string; away: string }>({ home: '', away: '' });
  const [modalPredictionMarkdown, setModalPredictionMarkdown] = useState<string | undefined>(undefined);

  const handleGetPrediction = async (game: SoccerGame) => {
    setModalTeams({ home: game.teams.home.name, away: game.teams.away.name });
    setModalOpen(true);
    setModalLoading(true);
    setModalError(undefined);
    setModalPrediction(undefined);
    setModalPredictionMarkdown(undefined);
    try {
      const prediction = await getGeminiPrediction({
        homeTeam: game.teams.home.name,
        awayTeam: game.teams.away.name,
        league: game.league.name,
        date: game.fixture.date,
      });
      if (typeof prediction === 'string') {
        setModalPredictionMarkdown(prediction);
      } else if (typeof prediction === 'object' && prediction !== null && (prediction as any).reasoning) {
        setModalPredictionMarkdown((prediction as any).reasoning);
      }
      setModalPrediction(undefined);
    } catch (err: any) {
      setModalError(err.message || 'Failed to get prediction');
    } finally {
      setModalLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading soccer games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <h3 className="text-lg font-medium mb-2">Error loading soccer games</h3>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">No soccer games scheduled for today</h3>
        <p className="text-sm text-gray-500">Check back later for upcoming games</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PredictionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        loading={modalLoading}
        error={modalError}
        prediction={modalPrediction}
        homeTeam={modalTeams.home}
        awayTeam={modalTeams.away}
        predictionMarkdown={modalPredictionMarkdown}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.fixture.id} className="relative group">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-gray-500">
                  {formatGameTime(game.fixture.date)}
                </CardTitle>
                <Badge 
                  variant={
                    game.fixture.status.short === 'FT' ? 'secondary' :
                    game.fixture.status.short === '1H' || game.fixture.status.short === '2H' || game.fixture.status.short === 'HT' ? 'destructive' :
                    'default'
                  }
                >
                  {getGameStatus(game.fixture.status)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={game.teams.home.logo}
                      alt={game.teams.home.name}
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.src = '/soccer-default-logo.png';
                      }}
                    />
                    <span>{game.teams.home.name}</span>
                  </div>
                  <div className="font-bold">
                    {game.goals.home !== null ? game.goals.home : '-'}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={game.teams.away.logo}
                      alt={game.teams.away.name}
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.src = '/soccer-default-logo.png';
                      }}
                    />
                    <span>{game.teams.away.name}</span>
                  </div>
                  <div className="font-bold">
                    {game.goals.away !== null ? game.goals.away : '-'}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {game.league.name} - {game.league.country}
                </div>
              </CardContent>
            </Card>
            {/* Get Prediction button on hover */}
            <button
              className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-0 group-hover:opacity-100 transition bg-primary text-white px-4 py-2 rounded shadow-lg font-semibold z-10"
              onClick={() => handleGetPrediction(game)}
            >
              Get Prediction
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 