import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPORTS_API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

const sportsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
});

export interface Game {
  fixture: {
    id: number;
    date: string;
    status: {
      long: string;
      short: string;
    };
    timestamp: number;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
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

export const LEAGUES = {
  premier_league: 39,
  la_liga: 140,
  bundesliga: 78,
  serie_a: 135,
  ligue_1: 61,
  champions_league: 2,
  europa_league: 3,
  world_cup: 1
};

export const getUpcomingGames = async (leagueId?: number): Promise<Game[]> => {
  try {
    const response = await sportsApi.get('/fixtures', {
      params: {
        league: leagueId,
        season: new Date().getFullYear(),
        next: 10, // Get next 10 upcoming games
        status: 'NS' // Only get Not Started games
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    throw error;
  }
};

export const getLiveGames = async (): Promise<Game[]> => {
  try {
    const response = await sportsApi.get('/fixtures', {
      params: {
        live: 'all'
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching live games:', error);
    throw error;
  }
}; 