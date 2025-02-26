import axios, { AxiosError } from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';

type User = {
  name: string;
  email: string;
  phone: string;
  token: string | null;
  role: { id: number; name: string; status: string; permissions: { id: number; status: string }[] } | null;
  isProcessing: boolean;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
};

export const useUserStore = create<User>((set) => ({
  name: '',
  email: '',
  phone: '',
  token: null,
  role: null,
  isProcessing: false,

  login: async (data) => {
    set({ isProcessing: true });
    try {
      const res = await axios.post('/api/v1/authencation/login', data);
      if (res?.status === 200) {
        console.log(res?.data?.data)
        // const { token, user } = res?.data?.data;
      //  await localStorage.setItem('token', token);
      //  await localStorage.setItem('newPassword', user?.change_password);
      //   set({
      //     token,
      //     name: user?.name,
      //     email: user?.email,
      //     phone: user?.phone,
      //     role: user?.roles,
      //     isProcessing: false,
      //   });
      //   toast.success('User Login Successful');
      //   return true;
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error?.response?.status === 401) {
        toast.error('Invalid credentials');
      } else {
        toast.error(error.message);
      }
    } finally {
      set({ isProcessing: false });
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('newPassword');
    localStorage.removeItem('companyId');
    set({
      name: '',
      email: '',
      phone: '',
      token: null,
      role: null,
      isProcessing: false,
    });
    toast('User logged out');
  },
}));