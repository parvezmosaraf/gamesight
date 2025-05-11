import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NBAGames } from "./NBAGames";
import { MLBGames } from "./MLBGames";
import { SoccerGames } from "./SoccerGames";

export const SportsGames = () => {
  return (
    <Tabs defaultValue="nba" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="nba">NBA</TabsTrigger>
        <TabsTrigger value="mlb">MLB</TabsTrigger>
        <TabsTrigger value="soccer">Soccer</TabsTrigger>
      </TabsList>
      <TabsContent value="nba">
        <h2 className="text-2xl font-bold mb-6">Today's NBA Games</h2>
        <NBAGames />
      </TabsContent>
      <TabsContent value="mlb">
        <h2 className="text-2xl font-bold mb-6">Today's MLB Games</h2>
        <MLBGames />
      </TabsContent>
      <TabsContent value="soccer">
        <h2 className="text-2xl font-bold mb-6">Today's Soccer Games</h2>
        <SoccerGames />
      </TabsContent>
    </Tabs>
  );
}; 