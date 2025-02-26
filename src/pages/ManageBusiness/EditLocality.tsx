import Modal from '../../components/Modal'
import { locality } from '../../helpers/types'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

type EditLocality={
    close:()=>void,
    id?:string,
    name:string,
    status:string
}


const EditLocality = ({close,id,name,status}:EditLocality) => {
    const { register, handleSubmit, reset ,formState: { errors } } = useForm<locality>();

      const queryClient = useQueryClient()

      const {mutate,isPending} = useMutation({
        mutationKey:['locality-Update'],
        mutationFn:async(data:locality)=>{
          const response = await axios.patch(`/api/v1/setting/locality/${id}`,data)
          if(response.status==200){
            queryClient.refetchQueries({queryKey:['get-locality']})
            toast.success('locality updated')
            close()
          }
        }
      })
      
      useEffect(()=>{
        reset()
      },[id])
  return (
    <Modal modalId="edit-locality-modal" onClose={()=>close()} size='small'>
            <form onSubmit={handleSubmit((data)=>mutate(data))}>
                <h1 className="text-xl text-center uppercase mb-5">Update Locality</h1>
                <div className='flex flex-col sm:flex-row gap-x-10 mb-5'>
                    <label className='place-self-center'>Name </label>
                    <input type='text' defaultValue={name} 
                    {...register('name')}
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className='flex flex-col sm:flex-row gap-x-10'>
                    <label className='place-self-center'>Status </label>
                    <select
                    {...register('status')}
                    className= 'w-full border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                         <option value={status}>{(status=='1')?'Active':'Inactive'}</option>
                         <option value={1}>Active</option>
                         <option value={0}>Inactive</option>
                    </select>
                    {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                </div>
                <button className="cursor-pointer w-full mt-5 rounded-lg border border-primary bg-primary py-1 px-4 text-white transition hover:bg-opacity-90 grid  place-self-center font-bold">
                {isPending ? <Loader className='animate-spin' /> : 'Save'}
                </button>
            </form>
        </Modal>
  )
}

export default EditLocality