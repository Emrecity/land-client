import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoaderIcon, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { route } from '../../helpers/routes';

type FormValues = {
  password: string;
  password_confirmation:string,

};

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const {mutate,isPending} = useMutation({
    mutationFn: async(data: FormValues) => {
      const id = localStorage.getItem('user_id');
      if(!id){
        toast.error('Please login first')
        navigate(route.LOGIN)
        return
      }
      if(data.password !== data.password_confirmation){
        toast.error('Password and Confirm password mismatch')
      }
      if(id){
        const query = await axios.post(`/api/v1/authencation/change-default-password/${id}`,{password:data.password})
        if(query.status === 200){
          toast.success('Password changed successfully')
          navigate(route.LOGIN)
        }
        else{
          toast.error('Password changed failed')
        }
      }
      return
    }
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <div className="w-full grid place-items-center h-[100dvh]">
      <div className="sm:w-3/4  rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
        <div className="w-full flex flex-wrap">
          <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2 z-999999">
            <div className="w-full xl:p-17.5">
              <div className='grid sm:grid-cols-2 p-5 sm:p-0 justify-center sm:gap-x-5'>
              <div className="hidden sm:block w-full xl:block    bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 relative overflow-hidden rounded h-full">
                <h1 className='text-white sm:text-2xl xl:text-3xl font-bold absolute my-10 text-center left-[15%]'>Welcome To Microfinance <span className="text-yellow-400">Pal</span></h1>
                <img src="/adinkra1.PNG" alt="image" width="100%" className="  w-full absolute  md:top-15 xl:top-25 bottom-5 " />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='sm:m-10'>

                <h1  className="font-semibold py-10 text-lg sm:text-2xl text-gray-600 mb-4">
                Reset Password
              </h1>
                  <div className="mb-4">
  <label className="mb-2.5 block font-medium text-black dark:text-white">
    New Password
  </label>
  <div className="relative">
    <input
      type="password"
      placeholder="Enter your password"
      {...register('password', { required: 'Password is required' })}
      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    {errors.password?.message && <p className="text-red-500">{errors.password.message.toString()}</p>}
    <span className="absolute right-4 top-2">
      <svg
        className="fill-current"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path
            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
            fill=""
          />
          <path
            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
            fill=""
          />
        </g>
      </svg>
    </span>
  </div>
                  </div>
                  <div className="mb-4">
  <label className="mb-2.5 block font-medium text-black dark:text-white">
    Confirm Password
  </label>
  <div className="relative">
    <input
      type="password"
      placeholder="Enter your password"
      {...register('password_confirmation', { required: 'Confirm Password is required' })}
      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    {errors.password_confirmation?.message && <p className="text-red-500">{errors.password_confirmation.message.toString()}</p>}
    <span className="absolute right-4 top-2">
      <svg
        className="fill-current"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path
            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
            fill=""
          />
          <path
            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
            fill=""
          />
        </g>
      </svg>
    </span>
  </div>
                  </div>
 
                  <div className="mb-5">
                   <button
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer sm:text-lg rounded-lg border border-primary bg-primary py-2 px-4 text-white transition hover:bg-opacity-90 grid place-items-center"
                    >{isPending ? <LoaderIcon /> : 'Reset Password'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;