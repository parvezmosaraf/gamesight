import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PredictionCard } from '@/components/predictions/PredictionCard';
import { PredictionFilters } from '@/components/predictions/PredictionFilters';
import { fetchPredictions, GamePrediction } from '@/services/geminiService';

export default function Predictions() {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { data: predictions, isLoading, error } = useQuery({
    queryKey: ['predictions', selectedSport],
    queryFn: () => fetchPredictions(selectedSport === 'all' ? undefined : selectedSport),
  });

  const filteredPredictions = predictions?.filter(prediction => {
    if (selectedStatus !== 'all') {
      const now = new Date();
      const matchTime = new Date(`${prediction.date} ${prediction.time}`);
      
      if (selectedStatus === 'upcoming' && matchTime <= now) return false;
      if (selectedStatus === 'live' && (matchTime > now || matchTime < new Date(now.getTime() - 3 * 60 * 60 * 1000))) return false;
      if (selectedStatus === 'completed' && matchTime > new Date(now.getTime() - 3 * 60 * 60 * 1000)) return false;
    }
    
    if (selectedDate) {
      const predictionDate = new Date(prediction.date);
      const filterDate = new Date(selectedDate);
      return (
        predictionDate.getFullYear() === filterDate.getFullYear() &&
        predictionDate.getMonth() === filterDate.getMonth() &&
        predictionDate.getDate() === filterDate.getDate()
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Game Predictions</h1>
          
          <div className="bg-betting-card rounded-lg p-6 mb-8">
            <PredictionFilters
              selectedSport={selectedSport}
              selectedStatus={selectedStatus}
              selectedDate={selectedDate}
              onSportChange={setSelectedSport}
              onStatusChange={setSelectedStatus}
              onDateChange={setSelectedDate}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading predictions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <h3 className="text-lg font-medium mb-2">Error loading predictions</h3>
              <p className="text-sm">{(error as Error).message}</p>
            </div>
          ) : filteredPredictions?.length === 0 ? (
            <div className="text-center py-12 bg-betting-card rounded-lg">
              <h3 className="text-lg font-medium mb-2">No predictions found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPredictions?.map((prediction) => (
                <PredictionCard
                  key={prediction.id}
                  id={prediction.id}
                  homeTeam={prediction.homeTeam}
                  awayTeam={prediction.awayTeam}
                  league={prediction.league}
                  matchTime={`${prediction.date} ${prediction.time}`}
                  prediction={{
                    winner: prediction.homeTeam.winProbability > prediction.awayTeam.winProbability ? 'home' : 'away',
                    confidence: prediction.confidence
                  }}
                  status={(() => {
                    const now = new Date();
                    const matchTime = new Date(`${prediction.date} ${prediction.time}`);
                    if (matchTime > now) return 'upcoming';
                    if (matchTime > new Date(now.getTime() - 3 * 60 * 60 * 1000)) return 'live';
                    return 'completed';
                  })()}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 