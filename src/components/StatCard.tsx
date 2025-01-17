import { FC } from 'react';
import { LucideProps } from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  value: string;
  color: string;
}

const StatCard: FC<StatCardProps> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-start space-x-4 w-full">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="text-white" size={30} />
    </div>
    <div>
      <h3 className="text-base text-gray-500 font-bold">{title}</h3>
      <p className="text-2xl font-bold mt-1 text-black-2">{value}</p>
    </div>
  </div>
);

interface StatisticCardsProps {
  stats: StatCardProps[];
  isLoading: boolean;
}

const StatisticCards: FC<StatisticCardsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-4 w-full">
        <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-start space-x-4 animate-pulse w-full">
              <div className="p-2 rounded-lg bg-gray-300 w-12 h-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatisticCards;