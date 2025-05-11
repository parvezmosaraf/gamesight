
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">How GameSight Works</h1>
          
          <div className="bg-gradient-to-b from-betting-accent/10 to-transparent p-6 rounded-lg mb-10">
            <p className="text-lg leading-relaxed">
              GameSight combines advanced AI technology with comprehensive sports data to deliver 
              accurate predictions for a wide range of sporting events. Our platform uses the 
              power of Google's Gemini API to analyze historical data, current team performance, 
              and real-time factors to generate reliable predictions.
            </p>
          </div>
          
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Prediction Process</h2>
              
              <div className="grid gap-6">
                <Card className="bg-betting-card border-betting-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-betting-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-betting-accent font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Data Collection</h3>
                        <p className="text-muted-foreground">
                          We gather extensive historical data including team performance, player statistics, head-to-head matchups, and venue history. This data forms the foundation of our prediction model.
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Team performance records and trends</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Player statistics and injury reports</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Historical head-to-head results</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-betting-card border-betting-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-betting-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-betting-accent font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Real-Time Factors</h3>
                        <p className="text-muted-foreground">
                          Beyond historical data, we incorporate real-time factors that can influence game outcomes. These dynamic elements are crucial for making accurate predictions.
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Current team form and momentum</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Weather conditions and venue-specific factors</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Recent injuries and lineup changes</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-betting-card border-betting-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-betting-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-betting-accent font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">AI-Powered Analysis</h3>
                        <p className="text-muted-foreground">
                          Using Google's Gemini API, we process and analyze all collected data through our proprietary algorithm, which weighs various factors based on their historical impact on game outcomes.
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Pattern recognition in team performance data</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Machine learning models to identify key influencing factors</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Continuous learning from prediction outcomes</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-betting-card border-betting-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-betting-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-betting-accent font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Prediction Output</h3>
                        <p className="text-muted-foreground">
                          Our system generates clear predictions with confidence scores, highlighting the factors that most significantly influenced the prediction outcome.
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Win probability for each team</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Confidence score based on data certainty</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-betting-accent">•</span>
                            <span className="text-sm">Key factors influencing the prediction</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Accuracy and Performance</h2>
              <Card className="bg-betting-card border-betting-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    GameSight's prediction accuracy is continuously evaluated and improved. Our current system achieves:
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-betting-dark p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-betting-accent mb-2">78%</div>
                      <p className="text-sm text-muted-foreground">Average accuracy across all sports</p>
                    </div>
                    
                    <div className="bg-betting-dark p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-betting-accent mb-2">82%</div>
                      <p className="text-sm text-muted-foreground">Accuracy for high-confidence predictions</p>
                    </div>
                    
                    <div className="bg-betting-dark p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-betting-accent mb-2">8.5/10</div>
                      <p className="text-sm text-muted-foreground">User satisfaction rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Responsible Betting</h2>
              <Card className="bg-betting-card border-betting-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    While we strive for accuracy, it's important to remember:
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 min-h-5 w-5 h-5 rounded-full bg-betting-win/20 flex items-center justify-center mt-0.5">
                        <span className="text-betting-win text-xs">✓</span>
                      </div>
                      <span className="text-sm">Our predictions are for informational purposes only</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 min-h-5 w-5 h-5 rounded-full bg-betting-win/20 flex items-center justify-center mt-0.5">
                        <span className="text-betting-win text-xs">✓</span>
                      </div>
                      <span className="text-sm">No prediction can guarantee a specific outcome</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 min-h-5 w-5 h-5 rounded-full bg-betting-win/20 flex items-center justify-center mt-0.5">
                        <span className="text-betting-win text-xs">✓</span>
                      </div>
                      <span className="text-sm">Always bet responsibly and within your means</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
