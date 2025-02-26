import axios, { AxiosError } from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';

type Land={
    createLand:(data:{})=>Promise<boolean>
    updateLand:(data:{id:string})=>Promise<boolean>
    deleteLand:(id:string)=>Promise<boolean>
    isProcessing:boolean
}

export const useLandStore = create<Land>((set)=>({
    isProcessing:false,
    createLand: async(data)=>{
        set({isProcessing:true})
        try {
           const res =  await axios.post('/api/v1/land',data)
           if(res.status==201){
            toast.success("Land Registered Successfully")
           }
            return true
        } catch (err){
            const error = err as AxiosError;
            if (error?.response?.status === 401) {
              toast.error('Invalid credentials');
            } else {
              toast.error(error.message);
            } 
        }finally {
            set({ isProcessing: false });
          }
          return false;
    },
    updateLand: async(data)=>{
        set({isProcessing:true})
        try {
           const res =  await axios.patch(`/api/v1/land/${data?.id}`,data)
           if(res.status==201){
            toast.success("Land Registered Successfully")
           }
            return true
        } catch (err){
            const error = err as AxiosError;
            if (error?.response?.status === 401) {
              toast.error('Invalid credentials');
            } else {
              toast.error(error.message);
            } 
        }finally {
            set({ isProcessing: false });
          }
          return false;
    },
    deleteLand:async(id)=>{
        set({isProcessing:true})
        try {
           const res =  await axios.delete(`/api/v1/land/${id}`)
           if(res.status==200){
            toast.success("Land Deleted Successfully")
           }
            return true
        } catch (err){
            const error = err as AxiosError;
            if (error?.response?.status === 401) {
              toast.error('Invalid id');
            } else {
              toast.error(error.message);
            } 
        }finally {
            set({ isProcessing: false });
          }
          return false;
    }
}))