import React from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChatCard from '../../components/Chat/ChatCard';
import TableOne from '../../components/Tables/TableOne';
import QuickLinks from './quick-link/QuickLinks';
import { Award, DollarSign, CreditCard, ArrowDownCircle } from 'lucide-react';
import StatisticCards from '../../components/StatCard';

const Dashboard: React.FC = () => {

  const isLoadingStats = false;

  const stats = {
    data: {
      total_awards: '10',
      total_revenue: '5000.00',
      balance: '3000.00',
      withdrawals: '2000.00',
    }
  };

  const DashboardStats = [
    { icon: Award, title: 'Total Award', value: stats.data.total_awards, color: 'bg-yellow-500'},
    { icon: DollarSign, title: 'Total Revenue', value: stats.data.total_revenue, color: 'bg-green-500'},
    { icon: CreditCard, title: 'Total Balance', value: stats.data.balance, color: 'bg-blue-500'},
    { icon: ArrowDownCircle, title: 'Total Withdrawals', value: stats.data.withdrawals, color: 'bg-red-500'},
  ];

  return (
    <>
      <div>
        <StatisticCards stats={DashboardStats} isLoading={isLoadingStats} />
      </div>
      <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <QuickLinks />
      </div>

      <div className="mt-4 grid  md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
      </div>
    </>
  );
};

export default Dashboard;