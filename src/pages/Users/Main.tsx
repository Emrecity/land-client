import React,{useState} from 'react'
import StatCard from '../../components/StatCard'
import { User2,Heading1Icon, UserPlus2, UserMinus2 } from 'lucide-react';
import { useModal  } from '../../components/useModalActions';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { user } from '../../helpers/types';
import DeleteButton from '../../components/Actionbuttons/DeleteButton';
import EditButton from '../../components/Actionbuttons/EditButton';
import toast from 'react-hot-toast';

const Main:React.FC = () => {

  const {data,} = useQuery({
    queryKey:['users'],
    queryFn:async()=>{
      const response = await axios.get('/api/v1/user')
      if(response.status==200){
        return response.data?.data
      }
    }
  })

  const stats = useQuery({
    queryKey:['user_stats'],
    queryFn:async () => {
      const response =  await axios.get('/api/v1/user/stats')
      if(response.status == 200){
        console.log(response.data.stats.TotalUsers)
        return response.data
      }
    }
  })

  const [keyword,setKeyword] = useState<string>('')
  const [roleFilter,setRoleFilter] = useState<string>('')

  const filterData = data?.filter((item:user)=>{
    if (roleFilter != '') {
      return item.role.toLowerCase().includes(roleFilter.toLowerCase())
  }
  if (keyword != '') {
      return item.role.includes(keyword)|| item.fullname.toLowerCase().includes(keyword.toLowerCase())|| item.email.toLowerCase().includes(keyword.toLowerCase())
  }
  return item
  })

  const [update,setUpdate]= useState<user>({
    _id:'',
    role:'',
    fullname:'',
    email:''
  })

  const {mutate} = useMutation({
    mutationKey:['delete_user'],
    mutationFn:async(id:string|any)=>{
      const queryClient = useQueryClient()
      const response = await  axios.delete(`/api/v1/user/${id}`)
      if(response.status==200){
        queryClient.refetchQueries({ queryKey: ['users'] })
        toast.success('User deleted')
      }
    }
  })

  const columns = [
    {
      name:'Full Name',
      selector:(row:user)=>row?.fullname,
      sortable:true
    },
    {
      name:'Email',
      selector:(row:user)=>row?.email,
      sortable:true
    },
    {
      name:'Role',
      selector:(row:user)=>row?.role,
      sortable:true
    },
    {
      name:'Actions',
      button:true,
      cell:(row:user)=>{return <div className='flex gap-4'>
      <EditButton handleClick={()=>{
        setUpdate({
          _id:row._id,
          fullname:row.fullname,
          email:row.email,
          role:row.role
        }),
        OpenEditUser()
      }} title="Edit" />
      <DeleteButton handleClick={()=>{mutate(row._id)}} title="Delete" />
      </div>}
    },
  ]

  const udata =[{title:'Total Users',value:stats.data?.stats?.TotalUsers, color:'bg-blue-500', icon:User2},
    {title:' Admin',value:stats.data?.stats?.TotalAdmin, color:'bg-slate-500',icon:Heading1Icon},
    {title:' Secretary',value:stats.data?.stats?.TotalSec, color:'bg-lime-500',icon:UserPlus2},
    {title:'Guest',value:stats.data?.stats?.TotalGuest, color:'bg-red-500',icon:UserMinus2}
  ]

  const { open:OpenCreateUser, close:CloseCreateUser} = useModal('add-user-modal')
  const { open:OpenEditUser, close:CloseEditUser} = useModal('edit-user-modal')

  return (
    <>
        <StatCard stats={udata} isLoading={false}/>
        <div className='my-5 p-5 bg-white'>
            <div className='space-y-5 sm:flex justify-between'>
              <h1 className='font-bold align-middle place-self-center'>Manage User</h1>
              <button
              onClick={()=>OpenCreateUser()}
              className="w-full sm:w-fit cursor-pointer rounded-lg border border-primary bg-primary px-4 text-white transition hover:bg-opacity-90 grid place-items-center font-bold">Add New</button>
            </div>
           
            <AddUser close={CloseCreateUser}/>
            <EditUser close={CloseEditUser} id={update._id} name={update.fullname} email={update.email} role={update.role}/>
            
        </div>
        <div className='my-5 p-5 bg-white'>
        <div className='flex justify-between my-5'>
              <select 
              value={roleFilter}
              onChange={(e)=>{
                setKeyword(''),
                setRoleFilter(e.target.value)
              }}
              className='border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                <option value=''>--role--</option>
                <option value='admin'>Admin</option>
                <option value='secretary'>Secretary</option>
                <option value='guest'>Guest</option>
              </select>
              <input type='search' value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder='search keyword' className='border-slate-500 border rounded focus:outline-none px-3 bg-slate-200'/>
            </div>
            <DataTable responsive columns={columns} data={filterData} pagination/>
        </div>
    </>
  )
}

export default Main