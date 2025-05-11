import axios from 'axios';

const API_KEY = '8d94a5c8-b6b6-4079-867f-70f458020436';
const BASE_URL = 'https://api.balldontlie.io/v1';

// NBA team ID mappings for logos
export const NBA_TEAM_ID_MAPPING: { [key: string]: number } = {
  'ATL': 1610612737, // Atlanta Hawks
  'BOS': 1610612738, // Boston Celtics
  'BKN': 1610612751, // Brooklyn Nets
  'CHA': 1610612766, // Charlotte Hornets
  'CHI': 1610612741, // Chicago Bulls
  'CLE': 1610612739, // Cleveland Cavaliers
  'DAL': 1610612742, // Dallas Mavericks
  'DEN': 1610612743, // Denver Nuggets
  'DET': 1610612765, // Detroit Pistons
  'GSW': 1610612744, // Golden State Warriors
  'HOU': 1610612745, // Houston Rockets
  'IND': 1610612754, // Indiana Pacers
  'LAC': 1610612746, // Los Angeles Clippers
  'LAL': 1610612747, // Los Angeles Lakers
  'MEM': 1610612763, // Memphis Grizzlies
  'MIA': 1610612748, // Miami Heat
  'MIL': 1610612749, // Milwaukee Bucks
  'MIN': 1610612750, // Minnesota Timberwolves
  'NOP': 1610612740, // New Orleans Pelicans
  'NYK': 1610612752, // New York Knicks
  'OKC': 1610612760, // Oklahoma City Thunder
  'ORL': 1610612753, // Orlando Magic
  'PHI': 1610612755, // Philadelphia 76ers
  'PHX': 1610612756, // Phoenix Suns
  'POR': 1610612757, // Portland Trail Blazers
  'SAC': 1610612758, // Sacramento Kings
  'SAS': 1610612759, // San Antonio Spurs
  'TOR': 1610612761, // Toronto Raptors
  'UTA': 1610612762, // Utah Jazz
  'WAS': 1610612764, // Washington Wizards
};

const nbaApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': API_KEY
  }
});

export interface NBAGame {
  id: number;
  date: string;
  status: string;
  period: number;
  time: string;
  home_team: {
    id: number;
    name: string;
    full_name: string;
    city: string;
    conference: string;
    abbreviation: string;
  };
  visitor_team: {
    id: number;
    name: string;
    full_name: string;
    city: string;
    conference: string;
    abbreviation: string;
  };
  home_team_score: number;
  visitor_team_score: number;
  postseason: boolean;
}

const getETDate = (): Date => {
  const date = new Date();
  // Convert to ET (UTC-4 or UTC-5 depending on daylight savings)
  const etDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return etDate;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getTodayGames = async (): Promise<NBAGame[]> => {
  try {
    // Get today's date in ET timezone
    const etDate = getETDate();
    const formattedDate = formatDate(etDate);
    
    console.log('Fetching games for ET date:', formattedDate);
    
    const response = await nbaApi.get('/games', {
      params: {
        dates: [formattedDate],
        per_page: 100
      }
    });
    
    console.log('API Response:', response.data);

    if (!response.data.data || response.data.data.length === 0) {
      console.log('No games found for today (ET)');
      return [];
    }

    // Sort games by date/time
    const games = response.data.data;
    return games.sort((a: NBAGame, b: NBAGame) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  } catch (error: any) {
    console.error('Error fetching NBA games:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const getLiveNBAGames = async (): Promise<NBAGame[]> => {
  try {
    const games = await getTodayGames();
    const liveGames = games.filter(game => 
      game.status === 'In Progress' || 
      game.status.includes('Q') || 
      game.status.includes('Half')
    );
    console.log('Live games:', liveGames);
    return liveGames;
  } catch (error) {
    console.error('Error fetching live NBA games:', error);
    throw error;
  }
}; 