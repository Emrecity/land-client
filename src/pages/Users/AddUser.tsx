import Modal from '../../components/Modal'
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import {user} from '../../helpers/types'
import { UserSchema } from '../../helpers/validate';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader } from 'lucide-react';

type AddUserType = {
    close:()=>void
}

const AddUser = ({close}:AddUserType) => {
  const { register, handleSubmit, reset ,formState: { errors } } = useForm<user>({
    resolver: yupResolver(UserSchema),
  });
  const queryClient = useQueryClient()

  const {mutate,isPending} = useMutation({
    mutationFn: async(data:user)=>{
        const response = await axios.post('/api/v1/user',data)
        if(response.status === 201){
            queryClient.refetchQueries({queryKey:['users']})
            queryClient.refetchQueries({queryKey:['user_stats']})
            toast.success('User created successfully')
            close()
        }
        if(response.data.status == 'fail'){
          toast.error(response?.data?.message)
          toast.error('failed')
        }
        reset()
    }
})

const onsubmit = (data:user)=>{
    console.log(data)
    mutate(data)
}

  return (
    <Modal onClose={close} modalId='add-user-modal'>
        <form onSubmit={handleSubmit(onsubmit)}>
             <h1 className='font-extrabold text-center text-blue-400 text-3xl'>Register<span className='text-yellow-400'> New </span>User</h1>
             <div className='mb-5'>
                <label className="mb-1 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name Here"
                  {...register('fullname')}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
                {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
              </div>
             <div className='mb-5'>
                <label className="mb-1 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Active Email Here"
                  {...register('email')}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className='mb-5'>
              <label className="mb-1 block text-black dark:text-white">
                  Role
                </label>
                <select 
                {...register('role')}
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white">
                    <option value=''>--role--</option>
                    <option value='admin'>Admin</option>
                    <option value='guest'>Guest</option>
                    <option value='secretary'>Secretary</option>
                </select>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
              </div>
              <button className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-1 px-4 text-white transition hover:bg-opacity-90 grid place-items-center font-bold">
              {isPending ? <Loader className='animate-spin' /> : 'Save'}
              </button>
        </form>
    </Modal>
  )
}

export default AddUser