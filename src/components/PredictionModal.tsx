import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';

interface PredictionData {
  winningTeam: string;
  probability: number;
  reasoning: string;
  keyPlayers: string[];
  teamLogos?: { [team: string]: string };
}

interface PredictionModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  error?: string;
  prediction?: PredictionData;
  homeTeam: string;
  awayTeam: string;
  predictionMarkdown?: string;
}

// Helper to extract summary block from markdown
function parseSummaryBlock(markdown: string, homeTeam: string, awayTeam: string) {
  // Regex for summary block
  const winningTeamMatch = /Winning Team:\s*(.*)/i.exec(markdown);
  const probabilityMatch = /Win Probability:\s*(\d+)%/i.exec(markdown);
  const keyFactorsHomeMatch = new RegExp(`Key Factors ${homeTeam}:[\r\n]+((?:- .*\n?)+)`, 'i').exec(markdown);
  const keyFactorsAwayMatch = new RegExp(`Key Factors ${awayTeam}:[\r\n]+((?:- .*\n?)+)`, 'i').exec(markdown);

  const winningTeam = winningTeamMatch ? winningTeamMatch[1].trim() : '';
  const probability = probabilityMatch ? parseInt(probabilityMatch[1], 10) : undefined;
  const keyFactorsHome = keyFactorsHomeMatch ? keyFactorsHomeMatch[1].split(/- /).filter(Boolean).map(f => f.replace(/\r|\n/g, '').trim()) : [];
  const keyFactorsAway = keyFactorsAwayMatch ? keyFactorsAwayMatch[1].split(/- /).filter(Boolean).map(f => f.replace(/\r|\n/g, '').trim()) : [];

  // Remove ALL summary block lines from markdown for the rest
  let restMarkdown = markdown;
  restMarkdown = restMarkdown.replace(/Winning Team:.*[\r\n]*/gi, '');
  restMarkdown = restMarkdown.replace(/Win Probability:.*[\r\n]*/gi, '');
  restMarkdown = restMarkdown.replace(new RegExp(`Key Factors ${homeTeam}:[\r\n]+((?:- .*\n?)+)`, 'gi'), '');
  restMarkdown = restMarkdown.replace(new RegExp(`Key Factors ${awayTeam}:[\r\n]+((?:- .*\n?)+)`, 'gi'), '');
  // Remove any repeated 'Win Probability' or 'Key Factors' lines in the rest
  restMarkdown = restMarkdown.replace(/Win Probability:.*[\r\n]*/gi, '');
  restMarkdown = restMarkdown.replace(/Key Factors.*:[\r\n]+((?:- .*\n?)+)/gi, '');

  return { winningTeam, probability, keyFactorsHome, keyFactorsAway, restMarkdown };
}

// Helper to fix flat key player lists into nested markdown lists
function fixKeyPlayersMarkdown(md: string) {
  // Find lines like '- **Team Name**' or '- Team Name' and indent following '- ' lines until the next '- ' or end
  return md.replace(/(- \*\*[\w\s]+\*\*|- [A-Za-z\s]+)\n((?:- (?!\*\*|[A-Za-z\s]+).+\n?)+)/g, (match, team, players) => {
    const indented = players.replace(/^- /gm, '  - ');
    return team + '\n' + indented;
  });
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
  open,
  onClose,
  loading,
  error,
  prediction,
  homeTeam,
  awayTeam,
  predictionMarkdown,
}) => {
  let summary = null;
  let restMarkdown = predictionMarkdown;
  if (predictionMarkdown) {
    const parsed = parseSummaryBlock(predictionMarkdown, homeTeam, awayTeam);
    summary = parsed;
    restMarkdown = parsed.restMarkdown;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Game Prediction</DialogTitle>
          <DialogDescription>
            {homeTeam} vs {awayTeam}
          </DialogDescription>
        </DialogHeader>
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <span className="text-muted-foreground">Generating prediction...</span>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-4">{error}</div>
        )}
        {!loading && !error && predictionMarkdown && summary && (
          <>
            {/* Visual summary block */}
            <div className="mb-4 p-4 rounded-lg bg-muted/80 border border-muted-foreground/10">
              <div className="flex flex-col items-center gap-2">
                <Badge className="text-lg px-4 py-2 bg-betting-win/20 text-betting-win">
                  {summary.winningTeam ? `${summary.winningTeam} will likely win` : 'Will likely win'}
                </Badge>
                {typeof summary.probability === 'number' && (
                  <div className="text-2xl font-bold text-betting-accent">
                    Win Probability: {summary.probability}%
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-3 shadow-sm border">
                  <div className="font-semibold mb-1 text-center md:text-left">Key Factors: {homeTeam}</div>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {summary.keyFactorsHome.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background rounded-lg p-3 shadow-sm border">
                  <div className="font-semibold mb-1 text-center md:text-left">Key Factors: {awayTeam}</div>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {summary.keyFactorsAway.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Rest of markdown analysis */}
            {restMarkdown && restMarkdown.trim() && (
              <div className="prose prose-invert max-w-none bg-background/80 rounded-lg p-4 overflow-y-auto max-h-[40vh] border border-muted-foreground/10 shadow">
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => <h2 className="mt-6 mb-2 text-xl font-bold text-primary" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-base leading-relaxed" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-primary font-semibold" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                  }}
                >
                  {fixKeyPlayersMarkdown(restMarkdown)}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
        {!loading && !error && !predictionMarkdown && prediction && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              {prediction.teamLogos?.[homeTeam] && (
                <img src={prediction.teamLogos[homeTeam]} alt={homeTeam} className="w-12 h-12 rounded-full border" />
              )}
              <span className="font-bold text-lg">VS</span>
              {prediction.teamLogos?.[awayTeam] && (
                <img src={prediction.teamLogos[awayTeam]} alt={awayTeam} className="w-12 h-12 rounded-full border" />
              )}
            </div>
            <div className="text-center">
              <Badge className="text-base px-4 py-2 bg-betting-win/20 text-betting-win">
                {prediction.winningTeam} will likely win
              </Badge>
              <div className="mt-2 text-lg font-semibold">
                Win Probability: <span className="text-betting-accent">{prediction.probability}%</span>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Why this team will win:</div>
              <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
                {prediction.reasoning}
              </div>
            </div>
            {prediction.keyPlayers && prediction.keyPlayers.length > 0 && (
              <div>
                <div className="font-semibold mb-1">Key Players to Watch:</div>
                <ul className="list-disc list-inside text-sm">
                  {prediction.keyPlayers.map((player, idx) => (
                    <li key={idx}>{player}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <DialogClose asChild>
          <button className="mt-6 w-full py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal; 