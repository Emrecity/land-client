import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });
  const submit = useUserStore((state) => state.login);
  const data = useUserStore((state) => state);
  const navigate = useNavigate();

  const handleSignIn = async (data: SignInFormData) => {
   
      navigate('/dashboard');
    
  };

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="w-full grid place-items-center h-[100dvh] bg-cover bg-center">
      <div className="w-3/4 rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
        <div className="w-full flex flex-wrap">
          <div className="hidden w-full xl:block xl:w-1/2 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 relative overflow-hidden rounded">
          <h1 className="w-full grid place-items-center">
              <p className="text-white text-4xl font-semibold pt-15 pl-5">
                Welcome to OpenCast<span className="text-yellow-400">GH</span>
              </p>
            </h1>
            <img src="/C.png" alt="image" width="100%" className="object-cover h- w-full absolute xl:top-45 top-35 left-5" />
            <img src="./service.png" alt="image" width="100%" className="object-cover h- w-52 absolute top-[79%] -left-1" />
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 z-999999">
            <div className="w-full sm:p-12.5 xl:p-17.5">
              <h1 className="font-semibold text-2xl text-gray-600 mb-4">
                Log into OpenCast<span className="text-yellow-400">GH</span>
              </h1>
              <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                  <input
                    type="email"
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
                  >{data.isProcessing ? <Loader className='animate-spin' /> : 'Sign In'}</button>
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account? <Link to="/authentication/sign-up" className="text-primary">sign up</Link>
                  </p>
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
