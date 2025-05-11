import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import axios from 'axios';

// MLB Stats API base URL
const BASE_URL = 'https://statsapi.mlb.com/api/v1';

interface MLBGame {
  gamePk: number;
  gameDate: string;
  status: {
    abstractGameState: string;
    detailedState: string;
    statusCode: string;
  };
  teams: {
    home: {
      team: {
        id: number;
        name: string;
        teamName: string;
      };
      score: number;
    };
    away: {
      team: {
        id: number;
        name: string;
        teamName: string;
      };
      score: number;
    };
  };
  linescore?: {
    currentInning: number;
    inningState: string;
  };
  seriesDescription?: string;
  description?: string;
}

const formatGameTime = (dateStr: string) => {
  try {
    return formatInTimeZone(new Date(dateStr), 'America/New_York', 'h:mm a zzz');
  } catch (error) {
    console.error('Error formatting date:', dateStr, error);
    return 'Time TBD';
  }
};

const getTeamLogo = (teamId: number) => {
  return `https://www.mlbstatic.com/team-logos/${teamId}.svg`;
};

const getGameStatus = (game: MLBGame) => {
  const { abstractGameState, detailedState } = game.status;
  
  if (abstractGameState === 'Final') return 'Final';
  if (abstractGameState === 'Live') {
    const inning = game.linescore?.currentInning || 0;
    const inningState = game.linescore?.inningState || '';
    return `${inningState} ${inning}`;
  }
  if (abstractGameState === 'Preview') return 'Scheduled';
  return detailedState;
};

export const MLBGames = () => {
  const { data: games, isLoading, error } = useQuery({
    queryKey: ['mlbGames'],
    queryFn: async () => {
      const today = new Date();
      const formattedDate = format(today, 'yyyy-MM-dd');
      
      const response = await axios.get(`${BASE_URL}/schedule`, {
        params: {
          sportId: 1,  // MLB
          date: formattedDate,
          hydrate: 'team,linescore,game(description)',
        }
      });

      return response.data.dates[0]?.games || [] as MLBGame[];
    },
    refetchInterval: 30000,
    retry: 3
  });

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading MLB games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <h3 className="text-lg font-medium mb-2">Error loading MLB games</h3>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">No MLB games scheduled for today</h3>
        <p className="text-sm text-gray-500">Check back later for upcoming games</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <Card key={game.gamePk} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex flex-row items-center justify-between mb-2">
                <CardTitle className="text-sm text-gray-500">
                  {formatGameTime(game.gameDate)}
                </CardTitle>
                <Badge 
                  variant={
                    game.status.abstractGameState === 'Final' ? 'secondary' :
                    game.status.abstractGameState === 'Live' ? 'destructive' :
                    'default'
                  }
                >
                  {getGameStatus(game)}
                </Badge>
              </div>
              {(game.seriesDescription || game.description) && (
                <p className="text-xs text-muted-foreground">
                  {game.seriesDescription || game.description}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={getTeamLogo(game.teams.home.team.id)}
                    alt={game.teams.home.team.name}
                    className="w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.src = 'https://www.mlbstatic.com/team-logos/mlb-default.svg';
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{game.teams.home.team.teamName}</span>
                    <span className="text-xs text-muted-foreground">{game.teams.home.team.name}</span>
                  </div>
                </div>
                <div className="font-bold">
                  {typeof game.teams.home.score === 'number' ? game.teams.home.score : '-'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={getTeamLogo(game.teams.away.team.id)}
                    alt={game.teams.away.team.name}
                    className="w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.src = 'https://www.mlbstatic.com/team-logos/mlb-default.svg';
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{game.teams.away.team.teamName}</span>
                    <span className="text-xs text-muted-foreground">{game.teams.away.team.name}</span>
                  </div>
                </div>
                <div className="font-bold">
                  {typeof game.teams.away.score === 'number' ? game.teams.away.score : '-'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}; 