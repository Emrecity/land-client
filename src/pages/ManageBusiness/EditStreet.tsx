import Modal from '../../components/Modal'
import { street } from '../../helpers/types'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';


type EditStreetType = {
    close:()=>void,
    id?:string,
    name:string,
    status:string
}

const EditStreet = ({close,id,name,status}:EditStreetType) => {

    const queryClient = useQueryClient()

    const { register, handleSubmit, reset } = useForm<street>();

    useEffect(()=>{
        reset()
    },[id])

    const { mutate, isPending} = useMutation({
        mutationKey:['edit-street'],
        mutationFn:async(data:street)=>{
            const response = await axios.patch(`/api/v1/setting/street/${id}`,data)
            if(response.status){
                queryClient.refetchQueries({queryKey:['get-locality']})
                toast.success('Street updated')
                close()
            }
        }
    })

  return (
    <Modal modalId="edit-street-modal" onClose={()=>close()} size='small'>
                <form onSubmit={handleSubmit((data)=>mutate(data))}>
                    <h1 className="text-xl text-center uppercase mb-5">Create Street</h1>
                    <div className='flex flex-col sm:flex-row gap-x-10 mb-5'>
                        <label className='place-self-center'>Name </label>
                        <input type='text' defaultValue={name}
                        {...register('name')}
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                        
                    </div>
                   
                    <div className='flex flex-col sm:flex-row gap-x-10'>
                        <label className='place-self-center'>Status : </label>
                        <select
                        {...register('status')}
                        className= 'w-[70%] border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                             <option>{(status=='1')?'Acitve':'Inactive'}</option>
                             <option value={1}>Active</option>
                             <option value={0}>Inactive</option>
                        </select>
                    </div>
                    <button className="cursor-pointer w-full mt-5 rounded-lg border border-primary bg-primary py-1 px-4 text-white transition hover:bg-opacity-90 grid  place-self-center font-bold">
                    {isPending ? <Loader className='animate-spin' /> : 'Save'}
                    </button>
                </form>
            </Modal>
  )
}

export default EditStreet