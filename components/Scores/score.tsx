import React, { useEffect, useState } from 'react';
import { AxiosReqInstance } from '../accounts/utils/axiosInstance';
import { ScoreDataInterface } from './interface';
import { Trophy, Star } from 'lucide-react';
import { getGameIcon } from './GameIcon';

const ScoreCard = ({ score }: { score: ScoreDataInterface }) => {
  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out 
        hover:scale-[1.02] hover:shadow-lg
        bg-white rounded-xl shadow-md 
        p-5 flex items-center space-x-4
        border-l-4 ${getGameBorderColor(score.game)}
      `}
    >
      <div className="flex-shrink-0">
        {getGameIcon(score.game)}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{score.game}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <p className="text-gray-600 font-medium">Score: {score.score}</p>
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
    'spaceShotter': 'border-blue-500',
    'zoomLand': 'border-green-500',
    'snakeGame': 'border-purple-500',
    'Rail Rush': 'border-yellow-500',
    'carGame': 'border-red-500',
    'MarioGo': 'border-indigo-500',
    'default': 'border-gray-300'
  };

  return gameColors[gameName] || gameColors['default'];
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
        const sortedScores = response.data.sort((a: ScoreDataInterface, b: ScoreDataInterface) => b.score - a.score);
        setLoading(false);
        setScoreData(sortedScores);
      }
    } catch (error) {
      console.error('Error while getting score at score.tsx in Rewards', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 bg-gray-50 rounded-xl">
      <div className="flex items-center justify-center mb-6">
        <Star className="w-8 h-8 text-yellow-500 mr-2" />
        <h2 className="text-3xl font-bold text-gray-800">Your Scores</h2>
      </div>

      {scoreData.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
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