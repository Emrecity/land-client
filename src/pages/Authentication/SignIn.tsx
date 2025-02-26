import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { Loader } from 'lucide-react';
import { route } from '../../helpers/routes';
import toast from 'react-hot-toast';
import axios from 'axios';

interface SignInFormData {
  email: string;
  password: string;
}

// Yup validation schema
const schema = yup.object().shape({
  email: yup.string().required('Email or Phone number is required'),
  password: yup.string().required('Password is required'),
});

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const {mutate,isPending} = useMutation({
    mutationFn: async (data: SignInFormData) => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      const response = await axios.post('/api/v1/authencation/login', formData);
      if (response.status === 200) {
        await localStorage.setItem('user_id',response.data.data?._id)
        await localStorage.setItem('user_name',response.data.data?.fullname)
        toast.success('Login Successful');
        if(response.data.data?.change_password == 1){
          navigate(route.DEFAULT_PASSWORD);
        }
        else{
          navigate(route.DASHBOARD);
        }
      }
      else {
        toast.error('Login Failed');
      }
    },
  });
  const handleSignIn = async (data: SignInFormData) => {
    console.log(data)
    mutate(data)
  };

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('newPassword');
  }, []);

  return (
    <div className="w-full grid place-items-center h-[100dvh] bg-cover bg-center">
      <div className="sm:w-3/4  rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
        <div className="w-full flex flex-wrap">
          <div className="w-full border-stroke dark:border-strokedark  xl:border-l-2 z-999999">
            <div className="w-full xl:p-17.5">
              <div className='grid sm:grid-cols-2 p-5 sm:p-0 justify-center sm:gap-x-5'>
                <div className="hidden sm:block w-full xl:block  bg-gradient-to-b from-lime-900 via-lime-700 to-lime-400 relative overflow-hidden rounded h-full">
                <h1 className='text-white sm:text-2xl xl:text-3xl font-bold absolute my-10 text-center left-[15%]'>Welcome To Stool <span className="text-yellow-400">Lands</span></h1>
                <img src="/adinkra1.PNG" alt="image" width="100%" className="  w-full absolute md:top-15 xl:top-25 bottom-5 " />
                </div>
                <form onSubmit={handleSubmit(handleSignIn)} className='sm:m-10'>
                <h1 className="font-semibold py-10 text-lg sm:text-2xl text-gray-600 mb-4">
                Sign into <span className='text-blue-400'>Stool</span> <span className="text-yellow-400">Lands</span>
              </h1>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                  <input
                    type="text"
                    placeholder="Enter your email or phone number"
                    {...register('email')}
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-white transition hover:bg-opacity-90 grid place-items-center sm:text-xl font-bold"
                  >{isPending ? <Loader className='animate-spin' /> : 'Sign In'}</button>
                </div>
                <p className='text-gray-400 text-sm text-center'>
                  Don't remember your password? <Link to={route.FORGOT_PASSWORD} className='text-blue-400'>Reset Password</Link>
                </p>
              </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
