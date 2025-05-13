import { useQuery } from '@tanstack/react-query';
import { getTodayGames, NBAGame, NBA_TEAM_ID_MAPPING } from '@/services/nbaApiService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import React, { useState } from 'react';
import { getGeminiPrediction, GeminiPredictionResponse } from '@/services/geminiService';
import PredictionModal from './PredictionModal';

const formatGameTime = (dateStr: string) => {
  try {
    return formatInTimeZone(new Date(dateStr), 'America/New_York', 'h:mm a zzz');
  } catch (error) {
    console.error('Error formatting date:', dateStr, error);
    return 'Time TBD';
  }
};

const getTeamLogo = (abbreviation: string) => {
  try {
    // Using Wikipedia's NBA team logos which are more reliably accessible
    const logoMap: { [key: string]: string } = {
      'ATL': 'https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg',
      'BOS': 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg',
      'BKN': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg',
      'CHA': 'https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg',
      'CHI': 'https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg',
      'CLE': 'https://upload.wikimedia.org/wikipedia/en/4/4b/Cleveland_Cavaliers_logo.svg',
      'DAL': 'https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg',
      'DEN': 'https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg',
      'DET': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Pistons_logo17.svg',
      'GSW': 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg',
      'HOU': 'https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg',
      'IND': 'https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg',
      'LAC': 'https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg',
      'LAL': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
      'MEM': 'https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg',
      'MIA': 'https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg',
      'MIL': 'https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg',
      'MIN': 'https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg',
      'NOP': 'https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg',
      'NYK': 'https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg',
      'OKC': 'https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg',
      'ORL': 'https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg',
      'PHI': 'https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg',
      'PHX': 'https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg',
      'POR': 'https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg',
      'SAC': 'https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg',
      'SAS': 'https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg',
      'TOR': 'https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg',
      'UTA': 'https://upload.wikimedia.org/wikipedia/en/0/04/Utah_Jazz_logo_%282016%29.svg',
      'WAS': 'https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg'
    };

    const logoUrl = logoMap[abbreviation];
    if (!logoUrl) {
      console.warn(`No logo found for abbreviation: ${abbreviation}`);
      return 'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg';
    }
    return logoUrl;
  } catch (error) {
    console.error('Error getting team logo:', error);
    return 'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg';
  }
};

export const NBAGames = () => {
  const { data: games, isLoading, error } = useQuery({
    queryKey: ['nbaGames'],
    queryFn: getTodayGames,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3 // Retry failed requests 3 times
  });

  // Prediction modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | undefined>(undefined);
  const [modalPrediction, setModalPrediction] = useState<GeminiPredictionResponse | undefined>(undefined);
  const [modalTeams, setModalTeams] = useState<{ home: string; away: string }>({ home: '', away: '' });
  const [modalPredictionMarkdown, setModalPredictionMarkdown] = useState<string | undefined>(undefined);

  const handleGetPrediction = async (game: NBAGame) => {
    setModalTeams({ home: game.home_team.full_name, away: game.visitor_team.full_name });
    setModalOpen(true);
    setModalLoading(true);
    setModalError(undefined);
    setModalPrediction(undefined);
    setModalPredictionMarkdown(undefined);
    try {
      const prediction = await getGeminiPrediction({
        homeTeam: game.home_team.full_name,
        awayTeam: game.visitor_team.full_name,
        league: 'NBA',
        date: game.date,
      });
      // If the response is a markdown string, store it for rendering
      if (typeof prediction === 'string') {
        setModalPredictionMarkdown(prediction);
      } else if (typeof prediction === 'object' && prediction !== null && (prediction as any).reasoning) {
        setModalPredictionMarkdown((prediction as any).reasoning);
      }
      setModalPrediction(undefined); // fallback to markdown only
    } catch (err: any) {
      setModalError(err.message || 'Failed to get prediction');
    } finally {
      setModalLoading(false);
    }
  };

  console.log('Games data:', games);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading NBA games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <h3 className="text-lg font-medium mb-2">Error loading NBA games</h3>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">No NBA games scheduled for today</h3>
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
          <div key={game.id} className="relative group">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-gray-500">
                  {formatGameTime(game.date)}
                </CardTitle>
                <Badge 
                  variant={
                    game.status === 'Final' ? 'secondary' :
                    game.status.includes('Q') || game.status === 'Halftime' ? 'destructive' :
                    'default'
                  }
                >
                  {game.status || 'Scheduled'}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={getTeamLogo(game.home_team.abbreviation)}
                      alt={game.home_team.full_name}
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.src = 'https://cdn.nba.com/logos/nba/default/primary/L/logo.svg';
                      }}
                    />
                    <span>{game.home_team.city} {game.home_team.name}</span>
                  </div>
                  <div className="font-bold">
                    {typeof game.home_team_score === 'number' ? game.home_team_score : '-'}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={getTeamLogo(game.visitor_team.abbreviation)}
                      alt={game.visitor_team.full_name}
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.src = 'https://cdn.nba.com/logos/nba/default/primary/L/logo.svg';
                      }}
                    />
                    <span>{game.visitor_team.city} {game.visitor_team.name}</span>
                  </div>
                  <div className="font-bold">
                    {typeof game.visitor_team_score === 'number' ? game.visitor_team_score : '-'}
                  </div>
                </div>
                {game.postseason && (
                  <div className="mt-2">
                    <Badge variant="outline">Playoffs</Badge>
                  </div>
                )}
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