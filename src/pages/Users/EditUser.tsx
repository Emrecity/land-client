import Modal from '../../components/Modal'
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { user } from '../../helpers/types'
import axios from 'axios'
import toast from 'react-hot-toast'

type EditUserType = {
    close:()=>void,
    name?: string,
    email?: string,
    role?: string,
    id?:string
}


const EditUser = ({close, name, email, role, id}:EditUserType) => {

const {register,handleSubmit,reset}= useForm<user>()
const queryClient = useQueryClient()

const {mutate} = useMutation({
  mutationKey:['userUpdate'],
  mutationFn:async(data:user)=>{
    const response = await axios.put(`/api/v1/user/${id}`,data)
    if(response.status==200){
      queryClient.refetchQueries({queryKey:['users']})
      queryClient.refetchQueries({queryKey:['user_stats']})
      toast.success('User updated')
      close()
    }
  }
})

useEffect(()=>{
  reset()
},[id])

  return (
     <Modal onClose={close} modalId='edit-user-modal'>
            <form onSubmit={handleSubmit((data)=>mutate(data))}>
                 <h1 className='font-extrabold text-center text-blue-400 text-3xl'>Update <span className='text-yellow-400'>User</span> Info</h1>
                 <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      defaultValue={name}
                      {...register('fullname')}
                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                  </div>
                 <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={email}
                      {...register('email')}
                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                  </div>
                  <div className='mb-5'>
                  <label className="mb-1 block text-black dark:text-white">
                      Role
                    </label>
                    <select
                    {...register('role')}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white">
                        <option selected>{role}</option>
                        <option value='admin'>Admin</option>
                        <option value='guest'>Guest</option>
                        <option value='secretary'>Secretary</option>
                    </select>
                  </div>
                  <div className=' place-self-end'>
                  <button className="cursor-pointer rounded-lg border border-primary bg-primary py-1 px-4 text-white transition hover:bg-opacity-90 grid place-items-center font-bold">
                    Submit
                  </button>
                  </div>
            </form>
        </Modal>
  )
}

export default EditUser