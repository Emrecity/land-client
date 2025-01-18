import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserStore } from '../../controllers/UserStore';
import * as yup from 'yup';
import { Loader } from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
}

// Yup validation schema
const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });
  const submit = useUserStore((state) => state.login);
  const userData = useUserStore((state) => state);
  const navigate = useNavigate();

  const handleSignIn = async (data: SignInFormData) => {
      const response = await submit(data);
      const newPassword = localStorage.getItem('newPassword');
      if (response) {
        if(newPassword === '1'){
          navigate("/authentication/reset-password");
        }
        else{
          navigate('/dashboard');
        }
      }

    
  };

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('newPassword');
  }, []);

  return (
    <div className="w-full grid place-items-center h-[100dvh] bg-cover bg-center">
      <div className="sm:w-3/4 rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
        <div className="w-full flex flex-wrap">
          <div className="hidden w-full xl:block xl:w-1/2 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 relative overflow-hidden rounded">
            
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 z-999999">
            <div className="w-full p-5 sm:p-12.5 xl:p-17.5">
              <h1 className="font-semibold text-lg sm:text-2xl text-gray-600 mb-4">
                Log into <span className='text-blue-400'>Microfinance</span> <span className="text-yellow-400">Pal</span>
              </h1>
              <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    {...register('email')}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                  <input
                    type="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    {...register('password')}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-white transition hover:bg-opacity-90 grid place-items-center text-xl font-bold"
                  >{userData.isProcessing ? <Loader className='animate-spin' /> : 'Sign In'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
