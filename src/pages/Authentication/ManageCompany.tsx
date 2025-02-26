import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, {useEffect} from 'react';
import { LoaderIcon, } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { route } from '../../helpers/routes';
import { useUserStore } from '../../controllers/UserStore';
import { CircleUserIcon, LogOutIcon } from 'lucide-react';
import { companyList } from '../../helpers/types';

const ManageCompany:React.FC = () => {
    const navigate = useNavigate();
    const { name, email} = useUserStore((state) => state);
   const {isLoading, data, isFetched} = useQuery({
    queryKey: ['companyList'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/companies', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420"
        },
      });
      if (response?.status === 200) {
        console.log(response.data);
        return response.data.data;
      }
      return [];
    },
  });
  useEffect(()=>{
    localStorage.removeItem('companyId');
  },[])
  return (
    <div className="w-full grid place-items-center h-[100dvh]">
    <div className="sm:w-3/4  rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
      <div className="w-full flex flex-wrap">
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 z-999999">
          <div className="w-full xl:p-17.5">
            <div className='grid sm:grid-cols-2 p-5 sm:p-0 justify-center sm:gap-x-5'>
            <div className="hidden sm:block w-full xl:block xl:w-1/2 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 relative overflow-hidden rounded h-full">
              <CircleUserIcon width={100} height={100} color="white" className="absolute top-28 xl:top-45 left-45"/>
                <h1 className='text-white font-bold text-2xl absolute top-44 my-10 text-center left-[25%]'><span className="text-yellow-400 text-4xl">{name}</span></h1>
                <h3 className='text-white font-bold  absolute top-56 my-10 text-center left-[30%]'>{email}</h3>
                <span className='absolute hover:cursor-pointer bottom-5 left-5 text-white flex gap-x-2' onClick={()=>navigate(route.LOGIN)}><LogOutIcon/>Logout</span>
              </div>
              <section  className='sm:m-10 min-h-72 flex flex-col relative'>
                <h1 className='font-bold text-2xl text-black'>Select Your Company</h1>
                <span className='sm:hidden text-sm absolute bottom-0 left-2 hover:cursor-pointer text-blue-400  flex gap-x-2' onClick={()=>navigate(route.LOGIN)}><LogOutIcon height={20} width={20}/>Logout</span>
                {
                    isLoading  && <LoaderIcon/>
                    
                }
                {
                    (isFetched && data?.length === 0) ? <h1 className='text-center text-gray-400 text-sm'>NO COMPANY FOUND</h1>:data?.map((company:companyList)=>{
                        return <div
                                onClick={()=>{
                                  navigate(route.DASHBOARD)
                                  localStorage.setItem('companyId', company?.id.toString());
                                  console.log(company?.id)
                                }}
                                className='flex flex-col gap-y-2 mb-3 border-b-2 hover:bg-slate-200 hover:cursor-pointer border-black p-5  rounded-lg'>
                                 <h1 className='text-blue-400 font-bold text-xl'>{company.name}</h1>
                                 <p className='text-gray-400 text-sm'>{company.email}</p>
                              </div>
                    })
                }
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ManageCompany