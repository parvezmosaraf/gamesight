
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { fetchPredictionById, GamePrediction } from '@/services/geminiService';
import { cn } from '@/lib/utils';

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const [prediction, setPrediction] = useState<GamePrediction | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPrediction = async () => {
      if (id) {
        setLoading(true);
        const data = await fetchPredictionById(id);
        setPrediction(data);
        setLoading(false);
      }
    };
    
    loadPrediction();
  }, [id]);
  
  // Determine which team has the higher win probability
  const favoredTeam = prediction ? 
    (prediction.homeTeam.winProbability > prediction.awayTeam.winProbability ? 
      prediction.homeTeam : prediction.awayTeam) : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-betting-accent hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Predictions
        </Link>
        
        {loading ? (
          <div className="animate-pulse-opacity space-y-6">
            <div className="h-8 bg-betting-card rounded-md w-2/3"></div>
            <div className="h-64 bg-betting-card rounded-lg"></div>
            <div className="h-40 bg-betting-card rounded-lg"></div>
          </div>
        ) : prediction ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">
                {prediction.awayTeam.name} vs {prediction.homeTeam.name}
              </h1>
              
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{prediction.league}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                  <span className="text-xs text-muted-foreground">
                    {prediction.date} • {prediction.time}
                  </span>
                </div>
                
                <div className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  prediction.confidence >= 70 ? "bg-betting-win/20 text-betting-win" : 
                  prediction.confidence >= 50 ? "bg-betting-accent/20 text-betting-accent" : 
                  "bg-betting-neutral/20 text-betting-neutral"
                )}>
                  {prediction.confidence}% Confidence
                </div>
              </div>
            </div>
            
            <Card className="overflow-hidden bg-betting-card border-betting-card">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                  {/* Away Team */}
                  <div className="md:col-span-3 flex flex-col items-center text-center p-4 rounded-lg bg-betting-dark">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden mb-3">
                      <img src={prediction.awayTeam.logo} alt={prediction.awayTeam.name} className="w-16 h-16 object-contain" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{prediction.awayTeam.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Away Team</p>
                    
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Win Probability</span>
                        <span className="font-medium">{prediction.awayTeam.winProbability}%</span>
                      </div>
                      <div className="h-2 bg-betting-neutral/20 rounded-full mb-4">
                        <div 
                          className={cn(
                            "h-full rounded-full", 
                            favoredTeam?.name === prediction.awayTeam.name ? 
                              "bg-betting-win" : "bg-betting-accent"
                          )}
                          style={{ width: `${prediction.awayTeam.winProbability}%` }}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Recent Form</span>
                          <span className="font-medium">{prediction.awayTeam.stats.recentForm}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg Points</span>
                          <span className="font-medium">{prediction.awayTeam.stats.avgPoints}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Away Performance</span>
                          <span className="font-medium">{prediction.awayTeam.stats.awayPerformance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* VS */}
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-betting-accent/20 flex items-center justify-center">
                      <span className="text-betting-accent font-medium text-sm">VS</span>
                    </div>
                  </div>
                  
                  {/* Home Team */}
                  <div className="md:col-span-3 flex flex-col items-center text-center p-4 rounded-lg bg-betting-dark">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden mb-3">
                      <img src={prediction.homeTeam.logo} alt={prediction.homeTeam.name} className="w-16 h-16 object-contain" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{prediction.homeTeam.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Home Team</p>
                    
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Win Probability</span>
                        <span className="font-medium">{prediction.homeTeam.winProbability}%</span>
                      </div>
                      <div className="h-2 bg-betting-neutral/20 rounded-full mb-4">
                        <div 
                          className={cn(
                            "h-full rounded-full", 
                            favoredTeam?.name === prediction.homeTeam.name ? 
                              "bg-betting-win" : "bg-betting-accent"
                          )}
                          style={{ width: `${prediction.homeTeam.winProbability}%` }}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Recent Form</span>
                          <span className="font-medium">{prediction.homeTeam.stats.recentForm}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg Points</span>
                          <span className="font-medium">{prediction.homeTeam.stats.avgPoints}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Home Advantage</span>
                          <span className="font-medium">{prediction.homeTeam.stats.homeAdvantage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-betting-card border-betting-card h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Key Factors</h3>
                  <ul className="space-y-3">
                    {prediction.keyFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="min-w-5 min-h-5 w-5 h-5 rounded-full bg-betting-accent/20 flex items-center justify-center mt-0.5">
                          <span className="text-betting-accent text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-betting-card border-betting-card h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Analysis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {prediction.analysis}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-betting-dark">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Prediction:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                          <img src={favoredTeam?.logo} alt={favoredTeam?.name} className="w-4 h-4 object-contain" />
                        </div>
                        <span className="font-bold text-betting-win">{favoredTeam?.name} Win</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="bg-betting-card p-8 rounded-lg text-center">
            <h3 className="text-xl font-medium mb-2">Game not found</h3>
            <p className="text-muted-foreground mb-6">
              The prediction you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
