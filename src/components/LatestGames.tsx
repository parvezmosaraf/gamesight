import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUpcomingGames, Game, LEAGUES } from '@/services/sportsApiService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const categories = [
  { id: 'all', name: 'All Leagues' },
  { id: 'premier_league', name: 'Premier League' },
  { id: 'la_liga', name: 'La Liga' },
  { id: 'bundesliga', name: 'Bundesliga' },
  { id: 'serie_a', name: 'Serie A' },
  { id: 'ligue_1', name: 'Ligue 1' },
  { id: 'champions_league', name: 'Champions League' },
  { id: 'europa_league', name: 'Europa League' },
  { id: 'world_cup', name: 'World Cup' }
];

export const LatestGames = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: games, isLoading, error } = useQuery({
    queryKey: ['upcomingGames', selectedCategory],
    queryFn: () => getUpcomingGames(selectedCategory === 'all' ? undefined : LEAGUES[selectedCategory as keyof typeof LEAGUES]),
  });

  if (isLoading) {
    return <div className="text-center">Loading upcoming games...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading games</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select league" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games?.map((game) => (
          <Card key={game.fixture.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-gray-500">
                {format(new Date(game.fixture.date), 'MMM d, yyyy h:mm a')}
              </CardTitle>
              <Badge variant={game.fixture.status.short === 'NS' ? 'default' : 'secondary'}>
                {game.fixture.status.short}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={game.teams.home.logo}
                    alt={game.teams.home.name}
                    className="w-8 h-8"
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
        ))}
      </div>
    </div>
  );
}; 