import Modal from '../../components/Modal'
import {  useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {Streetschema} from '../../helpers/validate';   
import {  street } from '../../helpers/types'; 
import {useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader } from 'lucide-react';


type AddStreetType = {
    close:()=>void
}

const AddStreet = ({close}:AddStreetType) => {

    const queryClient = useQueryClient()

    const { register, handleSubmit, reset ,formState: { errors } } = useForm<street>({
        resolver: yupResolver(Streetschema),
      });

      useEffect(()=>{
        queryClient.refetchQueries({queryKey:['get-locality']})
      },[])
 
   const data2 = useQuery({
        queryKey: ['get-locality'],
        queryFn: async()=>{
            const response = await axios.get('/api/v1/setting/locality')
            if(response.status === 200){
                return response.data.data
            }
        }
    })

    const {mutate,isPending} = useMutation({
        mutationKey: ['create-street'],
        mutationFn:async (data:street)=>{
            const id = data.locality
            data.locality = ''
            const response = await axios.post(`/api/v1/setting/street/${id}`,data)
            if(response.status === 201){
                queryClient.refetchQueries({queryKey:['get-locality']})
                toast.success('Street created successfully')
                close()
            }
            else{
                toast.error('Street created failed')
            }
            reset()
        }
    })

    const onsubmit = (data:street)=>{
        console.log(data)
        mutate(data)
    }

  return (
     <Modal modalId="add-street-modal" onClose={()=>close()} size='small'>
            <form onSubmit={handleSubmit(onsubmit)}>
                <h1 className="text-xl text-center uppercase mb-5">Create Street</h1>
                <div className='flex flex-col sm:flex-row gap-x-10 mb-5'>
                    <label className='place-self-center'>Name </label>
                    <input type='text' required placeholder='Enter locality name'
                    {...register('name')}
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                     {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className='flex flex-col sm:flex-row gap-x-10 my-5'>
                    <label className='place-self-center'>Locality </label>
                    <select 
                    {...register('locality')}
                    className= 'w-[70%] border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                         <option>--select-locality--</option>
                         {data2.data?.map((item:any)=>{
                            return <option value={item._id}>{item.name}</option>
                         })}
                    </select>
                    {errors.locality && <p className="text-red-500">{errors.locality.message}</p>}
                </div>
                <div className='flex flex-col sm:flex-row gap-x-10'>
                    <label className='place-self-center'>Status : </label>
                    <select
                    {...register('status')}
                    className= 'w-[70%] border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                         <option>--select-status--</option>
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

export default AddStreet