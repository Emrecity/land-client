import React from 'react';
import QuickLinks from './quick-link/QuickLinks';
import { LandPlotIcon,Landmark, UserCheck, User2,UserCircle} from 'lucide-react';
import StatisticCards from '../../components/StatCard';
import { useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { user,land } from '../../helpers/types';
import DataTable from 'react-data-table-component';

const Dashboard: React.FC = () => {

  const {data,isLoading} = useQuery({
    queryKey:['business-stats'],
    queryFn:async () => {
      const response = await axios.get('/api/v1/business')
      if(response.status===200){
        return response.data
      }
    }
  })


  const DashboardStats = [
    { icon: LandPlotIcon, title: 'Total Lands', value:data?.stats?.TotalLand, color: 'bg-yellow-500'},
    { icon: Landmark, title: 'Registered Land', value: data?.stats?.Registerlands, color: 'bg-green-500'},
    { icon: User2, title: 'Total Users', value: data?.stats?.TotalUser, color: 'bg-blue-500'},
    { icon: UserCheck, title: 'Admins', value: data?.stats?.Admins, color: 'bg-red-500'},
  ];

  const landcolumns =[
    {
      name:'Pic',
      cell:(row:land)=>{
       if(row.owners_image){
        return <img src={row.owners_image} className='w-10 h-8 rounded-full hover:scale-150'/>
       }
       if(!row.owners_image){
       return <UserCircle className='w-10 h-8'/>
       }
      }
    },
    {
      name:'Plot NO',
      selector:(row:land)=>row.plotNo,
      sortable:true
    },
    {
      name:'Plot Size',
      selector:(row:land)=>row.plotsize,
      sortable:true
    },
    {
      name:'Is Registered',
      selector:(row:land)=>{return(row?.isRegistered =='1')?'yes':'no'}
    },
    {
      name:'Owner',
      selector:(row:land)=>row?.owners_name||'no owner',
      sortable:true
    },
    {
      name:'Owner Contact',
      selector:(row:land)=>row?.owners_phone||'no owner',
      sortable:true
    },
  ]


  const Usercolumns = [
    {
      name:'Full Name',
      selector:(row:user)=>row?.fullname,
      sortable:true
    },
    {
      name:'Email',
      selector:(row:user)=>row?.email,
      sortable:true
    },
  ]

  return (
    <>
      <div>
        <StatisticCards stats={DashboardStats} isLoading={isLoading} />
      </div>
      <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <QuickLinks />
      </div>

      <div className="mt-4 grid bg-white md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <DataTable responsive title='Registered Lands' columns={landcolumns} data={data?.data?.lands} pagination/>
      </div>

      <div className="mt-4 grid bg-white md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <DataTable responsive title='Admin Users' columns={Usercolumns} data={data?.data?.admins} pagination/>
      </div>
    </>
  );
};

export default Dashboard;