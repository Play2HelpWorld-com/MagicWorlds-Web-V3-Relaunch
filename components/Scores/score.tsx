import React, { useEffect, useState } from "react";
import { AxiosReqInstance } from "../accounts/utils/axiosInstance";
import { ScoreDataInterface } from "./interface";
import { Trophy, Star } from "lucide-react";
import { getGameIcon } from "./GameIcon";

const ScoreCard = ({ score }: { score: ScoreDataInterface }) => {
  return (
    <div
      className={`
        flex transform items-center space-x-4
        rounded-xl border-l-4
        bg-white p-5 shadow-md
        transition-all duration-300 ease-in-out hover:scale-[1.02]
        hover:shadow-lg ${getGameBorderColor(score.game)}
      `}
    >
      <div className="flex-shrink-0">{getGameIcon(score.game)}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{score.game}</h3>
        <div className="mt-1 flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <p className="font-medium text-gray-600">Score: {score.score}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-md font-medium text-gray-600">Reward</p>
        <p className="text-sm font-bold text-blue-600">{score.reward} Token </p>
      </div>
    </div>
  );
};
const getGameBorderColor = (gameName: string) => {
  const gameColors: { [key: string]: string } = {
    spaceShotter: "border-blue-500",
    zoomLand: "border-green-500",
    snakeGame: "border-purple-500",
    "Rail Rush": "border-yellow-500",
    carGame: "border-red-500",
    MarioGo: "border-indigo-500",
    default: "border-gray-300",
  };

  return gameColors[gameName] || gameColors["default"];
};

const Score = () => {
  const [scoreData, setScoreData] = useState<ScoreDataInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const protectedRoute = AxiosReqInstance();

  const getScore = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/games/getScores/`;
    try {
      const response = await protectedRoute.get(url);
      if (response.status === 200) {
        const sortedScores = response.data.sort(
          (a: ScoreDataInterface, b: ScoreDataInterface) => b.score - a.score,
        );
        setLoading(false);
        setScoreData(sortedScores);
      }
    } catch (error) {
      console.error("Error while getting score at score.tsx in Rewards", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl rounded-xl bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-center">
        <Star className="mr-2 h-8 w-8 text-yellow-500" />
        <h2 className="text-3xl font-bold text-gray-800">Your Scores</h2>
      </div>

      {scoreData.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No scores available yet. Start playing to set your first score!
        </div>
      ) : (
        <div className="space-y-4">
          {scoreData.map((score, index) => (
            <ScoreCard key={index} score={score} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Score;
