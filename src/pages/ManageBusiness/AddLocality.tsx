import Modal from '../../components/Modal'
import { yupResolver } from '@hookform/resolvers/yup';
import {Localityschema} from '../../helpers/validate';   
import { locality } from '../../helpers/types'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader } from 'lucide-react';


type AddBusinessType = {
    close:()=>void
}
const AddLocality = ({close}:AddBusinessType)=> {
     const { register, handleSubmit, reset ,formState: { errors } } = useForm<locality>({
        resolver: yupResolver(Localityschema),
      });

      const queryClient = useQueryClient()

    const {mutate,isPending} = useMutation({
        mutationFn: async(data:locality)=>{
            const response = await axios.post('/api/v1/setting/locality',data)
            if(response.status === 201){
                queryClient.refetchQueries({queryKey:['get-locality']})
                toast.success('Locality created successfully')
                close()
            }
            else{
                toast.error('Locality created failed')
            }
            reset()
        }
    })

    const onSubmit = (data:locality)=>{
        console.log(data)
        mutate(data)
    }
  return (
    <Modal modalId="add-locality-modal" onClose={()=>close()} size='small'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl text-center uppercase mb-5">Create Locality</h1>
            <div className='flex flex-col sm:flex-row gap-x-10 mb-5'>
                <label className='place-self-center'>Name </label>
                <input type='text' required placeholder='Enter locality name' 
                {...register('name')}
                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className='flex flex-col sm:flex-row gap-x-10'>
                <label className='place-self-center'>Status </label>
                <select
                {...register('status')}
                className= 'w-full border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                     <option value=''>--select-status--</option>
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

export default AddLocality