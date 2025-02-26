import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoaderIcon, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { route } from '../../helpers/routes';
import { CircleUserIcon } from 'lucide-react';

type FormValues = {
    email: string;  
  };


const ForgetPassword :React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const navigate = useNavigate();
    const {mutate,isPending} = useMutation({
        mutationFn: async (data: FormValues) => {
          const formData = new FormData();
          formData.append('email', data.email);
          const response = await axios.post('/api/v1/authencation/forgot-password', formData)
          if(response.status === 200){
            localStorage.setItem('user_id',response.data?.id)
            toast.success('Email sent successfully');
            navigate(route.DEFAULT_PASSWORD)
          }
          if(response.status === 400){
            toast.error('Email is not valid')
          }
        },
      });
    
      const onSubmit = (data: FormValues) => {
        mutate(data);
      };
    
  return (
    <div className="w-full grid place-items-center h-[100dvh]">
         <div className="sm:w-3/4  rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
           <div className="w-full flex flex-wrap">
             <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 z-999999">
               <div className="w-full xl:p-17.5">
                 <div className='grid sm:grid-cols-2 p-5 sm:p-0 justify-center sm:gap-x-5'>
                 <div className="hidden sm:block w-full xl:block xl:w-1/2 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 relative overflow-hidden rounded h-full">
                   <h1 className='text-white sm:text-2xl xl:text-3xl font-bold absolute my-10 text-center left-[15%]'>Welcome To Stool<span className="text-yellow-400">Lands</span></h1>
                   <CircleUserIcon width={100} height={100} color="white" className="absolute top-28 xl:top-45 left-45"/>
                   </div>
                   <form onSubmit={handleSubmit(onSubmit)} className='sm:m-10'>
   
                   <h1  className="font-semibold py-10 text-lg sm:text-2xl text-gray-600 mb-4">
                   Forgot Password
                 </h1>
                     <div className="mb-4">
                         <label className="mb-2.5 block font-medium text-black dark:text-white">
                             Email
                         </label>
                         <div className="relative">
                            <input
                             type="email"
                             placeholder="Enter your working email"
                            {...register('email', { required: 'Password is required' })}
                                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        {errors.email?.message && <p className="text-red-500">{errors.email.message.toString()}</p>}
                        </div>
                        </div>
                     <div className="mb-5">
                      <button
                       type="submit"
                       value="Create account"
                       className="w-full cursor-pointer sm:text-lg rounded-lg border border-primary bg-primary py-2 px-4 text-white transition hover:bg-opacity-90 grid place-items-center"
                       >{isPending ? <LoaderIcon /> : 'submit'}</button>
                     </div>
                   </form>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
  )
}

export default ForgetPassword