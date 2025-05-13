// This is a mock implementation that simulates calls to the Gemini API
// In a real app, this would make actual API calls to Google's Gemini API

import { toast } from "sonner";
import axios from 'axios';

// Mock team logos
const teamLogos: Record<string, string> = {
  "Lakers": "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
  "Warriors": "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
  "Celtics": "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
  "Heat": "https://a.espncdn.com/i/teamlogos/nba/500/mia.png",
  "Chiefs": "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
  "Eagles": "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
  "Cowboys": "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
  "Bills": "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
  "Yankees": "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
  "Dodgers": "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
  "Red Sox": "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
  "Cubs": "https://a.espncdn.com/i/teamlogos/mlb/500/chc.png"
};

export interface GamePrediction {
  id: string;
  league: string;
  sport: string;
  date: string;
  time: string;
  homeTeam: {
    name: string;
    logo: string;
    winProbability: number;
    stats: {
      recentForm: string;
      avgPoints: number;
      homeAdvantage: number;
    };
  };
  awayTeam: {
    name: string;
    logo: string;
    winProbability: number;
    stats: {
      recentForm: string;
      avgPoints: number;
      awayPerformance: number;
    };
  };
  confidence: number;
  keyFactors: string[];
  analysis: string;
}

// Mock predictions data
const mockPredictions: GamePrediction[] = [
  {
    id: "game-1",
    league: "NBA",
    sport: "basketball",
    date: "Apr 21, 2025",
    time: "7:30 PM",
    homeTeam: {
      name: "Lakers",
      logo: teamLogos["Lakers"],
      winProbability: 45,
      stats: {
        recentForm: "WWLWL",
        avgPoints: 112.5,
        homeAdvantage: 7.2
      }
    },
    awayTeam: {
      name: "Warriors",
      logo: teamLogos["Warriors"],
      winProbability: 55,
      stats: {
        recentForm: "WWWLW",
        avgPoints: 118.3,
        awayPerformance: 8.5
      }
    },
    confidence: 65,
    keyFactors: [
      "Warriors' 3-point shooting accuracy (42% last 5 games)",
      "Lakers missing key defensive player",
      "Warriors on 3-game winning streak"
    ],
    analysis: "The Warriors have shown exceptional form in their recent games, particularly with their 3-point shooting efficiency reaching 42% over the last 5 games. Though the Lakers have home court advantage, they are missing a key defensive player who would normally help contain the Warriors' perimeter threats. With the Warriors on a 3-game winning streak and showing stronger offensive statistics, they have a 55% probability of winning this matchup."
  },
  {
    id: "game-2",
    league: "NBA",
    sport: "basketball",
    date: "Apr 21, 2025",
    time: "8:00 PM",
    homeTeam: {
      name: "Celtics",
      logo: teamLogos["Celtics"],
      winProbability: 68,
      stats: {
        recentForm: "WWWWL",
        avgPoints: 115.8,
        homeAdvantage: 9.3
      }
    },
    awayTeam: {
      name: "Heat",
      logo: teamLogos["Heat"],
      winProbability: 32,
      stats: {
        recentForm: "LWLLW",
        avgPoints: 106.2,
        awayPerformance: 6.1
      }
    },
    confidence: 78,
    keyFactors: [
      "Celtics' strong home record (18-3)",
      "Heat struggling on the road (7-12)",
      "Celtics leading scorer in peak form"
    ],
    analysis: "The Celtics present a formidable challenge at home with an impressive 18-3 record. Their offensive efficiency has been remarkable, averaging 115.8 points per game, while their leading scorer has been in peak form. The Heat, conversely, have struggled on the road with a 7-12 record and have shown inconsistent performance as evidenced by their recent form. The combination of the Celtics' home court advantage and the Heat's road struggles gives Boston a substantial 68% probability of winning."
  },
  {
    id: "game-3",
    league: "NFL",
    sport: "football",
    date: "Apr 22, 2025",
    time: "1:00 PM",
    homeTeam: {
      name: "Chiefs",
      logo: teamLogos["Chiefs"],
      winProbability: 72,
      stats: {
        recentForm: "WWWLW",
        avgPoints: 28.5,
        homeAdvantage: 6.8
      }
    },
    awayTeam: {
      name: "Eagles",
      logo: teamLogos["Eagles"],
      winProbability: 28,
      stats: {
        recentForm: "LWLWL",
        avgPoints: 22.7,
        awayPerformance: 5.2
      }
    },
    confidence: 82,
    keyFactors: [
      "Chiefs' quarterback performance (112.8 passer rating)",
      "Eagles' defensive injuries",
      "Chiefs' superior offensive line stats"
    ],
    analysis: "The Chiefs present a significant challenge with their quarterback performing at an elite level, maintaining a 112.8 passer rating. The Eagles are further disadvantaged by key defensive injuries, which leaves them vulnerable against the Chiefs' potent offense. Additionally, the Chiefs' offensive line has demonstrated superior protection metrics, allowing their quarterback more time in the pocket. These factors combine to give the Chiefs a 72% probability of victory."
  },
  {
    id: "game-4",
    league: "NFL",
    sport: "football",
    date: "Apr 22, 2025",
    time: "4:25 PM",
    homeTeam: {
      name: "Bills",
      logo: teamLogos["Bills"],
      winProbability: 58,
      stats: {
        recentForm: "WLWWL",
        avgPoints: 26.3,
        homeAdvantage: 7.5
      }
    },
    awayTeam: {
      name: "Cowboys",
      logo: teamLogos["Cowboys"],
      winProbability: 42,
      stats: {
        recentForm: "LWWLW",
        avgPoints: 25.8,
        awayPerformance: 6.7
      }
    },
    confidence: 62,
    keyFactors: [
      "Bills' weather advantage (forecasted snow)",
      "Cowboys' inconsistent road performance",
      "Bills' strong defensive stats against passing"
    ],
    analysis: "The Bills have a moderate advantage in this matchup, bolstered by the forecasted snowy conditions which typically favor the home team that's accustomed to such weather. The Cowboys have shown inconsistency in road games, particularly in adverse weather conditions. Additionally, the Bills' defense has shown strength against passing attacks, which is a key component of the Cowboys' offensive strategy. These factors give the Bills a 58% probability of winning in what should be a competitive game."
  },
  {
    id: "game-5",
    league: "MLB",
    sport: "baseball",
    date: "Apr 23, 2025",
    time: "7:05 PM",
    homeTeam: {
      name: "Yankees",
      logo: teamLogos["Yankees"],
      winProbability: 63,
      stats: {
        recentForm: "WWLWW",
        avgPoints: 5.2,
        homeAdvantage: 0.8
      }
    },
    awayTeam: {
      name: "Red Sox",
      logo: teamLogos["Red Sox"],
      winProbability: 37,
      stats: {
        recentForm: "LWLLW",
        avgPoints: 4.1,
        awayPerformance: 0.6
      }
    },
    confidence: 70,
    keyFactors: [
      "Yankees' starting pitcher stats (2.1 ERA)",
      "Red Sox struggling against left-handed pitching",
      "Yankees' home run advantage in current ballpark"
    ],
    analysis: "The Yankees have a significant advantage with their starting pitcher boasting an impressive 2.1 ERA. The Red Sox have shown difficulties against left-handed pitching, which plays directly into the Yankees' strengths for this matchup. Additionally, the Yankees have demonstrated power at home, with favorable home run statistics in their current ballpark. Given these factors, the Yankees have a 63% probability of winning this rivalry game."
  },
  {
    id: "game-6",
    league: "MLB",
    sport: "baseball",
    date: "Apr 23, 2025",
    time: "10:10 PM",
    homeTeam: {
      name: "Dodgers",
      logo: teamLogos["Dodgers"],
      winProbability: 60,
      stats: {
        recentForm: "WLWWW",
        avgPoints: 5.5,
        homeAdvantage: 0.9
      }
    },
    awayTeam: {
      name: "Cubs",
      logo: teamLogos["Cubs"],
      winProbability: 40,
      stats: {
        recentForm: "WLLWL",
        avgPoints: 4.3,
        awayPerformance: 0.7
      }
    },
    confidence: 68,
    keyFactors: [
      "Dodgers' batting average (.285 last 10 games)",
      "Cubs' bullpen fatigue (heavy usage last 3 games)",
      "Dodgers' favorable head-to-head record (7-3 last 10)"
    ],
    analysis: "The Dodgers enter this game with a strong batting average of .285 over their last 10 games and have historically performed well against the Cubs with a 7-3 record in their last 10 meetings. The Cubs may face additional challenges due to their bullpen fatigue, having heavily relied on their relievers in the last three games. The Dodgers' consistent home performance, combined with their offensive capabilities, gives them a 60% probability of winning this matchup."
  }
];

// Function to fetch predictions
export const fetchPredictions = async (sport?: string): Promise<GamePrediction[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Filter by sport if provided
    if (sport && sport !== 'all') {
      return mockPredictions.filter(prediction => prediction.sport === sport);
    }
    
    return mockPredictions;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    toast.error('Failed to load predictions. Please try again.');
    return [];
  }
};

// Function to fetch a specific game prediction by ID
export const fetchPredictionById = async (id: string): Promise<GamePrediction | null> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const prediction = mockPredictions.find(p => p.id === id);
    
    if (!prediction) {
      toast.error('Game prediction not found');
      return null;
    }
    
    return prediction;
  } catch (error) {
    console.error('Error fetching prediction details:', error);
    toast.error('Failed to load game details. Please try again.');
    return null;
  }
};

export interface GeminiPredictionRequest {
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  players?: string[];
  extraStats?: Record<string, any>;
}

export interface GeminiPredictionResponse {
  winningTeam: string;
  probability: number;
  reasoning: string;
  keyPlayers: string[];
}

export const getGeminiPrediction = async (input: GeminiPredictionRequest): Promise<GeminiPredictionResponse> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  // Compose a prompt for OpenAI
  const prompt = `Given the following match details, provide a detailed, markdown-formatted analysis and prediction for the game.\n\nFirst, start your response with a summary block in this format (use these exact labels):\n\nWinning Team: <team name>\nWin Probability: <number>%\nKey Factors ${input.homeTeam}:\n- ...\n- ...\nKey Factors ${input.awayTeam}:\n- ...\n- ...\n\nAfter this summary block, provide the rest of your analysis in markdown, including:\n- A summary of the matchup.\n- A final prediction and reasoning.\n- Key players to watch (format as a nested markdown list, with team name as the parent bullet and players as indented sub-bullets):\n  - New York Knicks\n    - Julius Randle: A crucial component of the Knicks' offense and defense.\n    - Jalen Brunson: Known for his playmaking ability.\n  - Boston Celtics\n    - Jayson Tatum: The team's leading scorer.\n    - Jaylen Brown: Provides strong perimeter defense.\n\nMatch details:\nLeague: ${input.league}\nDate: ${input.date}\nHome Team: ${input.homeTeam}\nAway Team: ${input.awayTeam}\n${input.players ? `Players: ${input.players.join(', ')}` : ''}\n${input.extraStats ? `Extra Stats: ${JSON.stringify(input.extraStats)}` : ''}\n\nFormat your response in markdown, with clear sections and bullet points where appropriate.`;

  try {
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-4o',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 400
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    const text = response.data.choices?.[0]?.message?.content || '';
    let parsed: GeminiPredictionResponse | null = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Fallback: simple regex extraction (improve as needed)
      const winningTeam = /"?winningTeam"?\s*[:=]\s*"([^"]+)"/i.exec(text)?.[1] || '';
      const probability = parseInt(/"?probability"?\s*[:=]\s*(\d+)/i.exec(text)?.[1] || '0', 10);
      const reasoning = /"?reasoning"?\s*[:=]\s*"([^"]+)"/i.exec(text)?.[1] || text;
      const keyPlayersMatch = /"?keyPlayers"?\s*[:=]\s*\[([^\]]*)\]/i.exec(text)?.[1];
      const keyPlayers = keyPlayersMatch ? keyPlayersMatch.split(',').map(s => s.replace(/"/g, '').trim()) : [];
      parsed = { winningTeam, probability, reasoning, keyPlayers };
    }
    return parsed;
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to get prediction from OpenAI');
  }
};
