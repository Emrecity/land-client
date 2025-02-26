import React, { useState } from 'react'
import StatCard from '../../components/StatCard'
import { LandPlot,LandmarkIcon,LandPlotIcon,LocateIcon,UserCircle} from 'lucide-react';
import { useModal } from '../../components/useModalActions';
import AddLand from './AddLand';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { land } from '../../helpers/types';
import DataTable from 'react-data-table-component';
import DeleteButton from '../../components/Actionbuttons/DeleteButton';
import EditButton from '../../components/Actionbuttons/EditButton';
import toast from 'react-hot-toast';
import EditLand from './EditLand';


const Main:React.FC = () => {

  const { open:OpenAddLand, close:CloseAddLand } = useModal('add-land-modal')
  const { open:OpenEditLand, close:CloseEditLand } = useModal('edit-land-modal')

  let queryClient = useQueryClient()


   const {data} = useQuery({
    queryKey:['land-stats'],
    queryFn:async()=>{
      const response = await axios.get('/api/v1/land/stats')
      if(response.status==200){
        console.log(response.data.stats)
        return response.data.stats
      }
    }
  })

  const {data:Data1}= useQuery({
    queryKey:['get-lands'],
    queryFn:async()=>{
      const response = await axios.get('/api/v1/land')
      if(response.status == 200){
        queryClient.refetchQueries({queryKey:['land-stats'],})
        return response.data.data
      }
    }
  })

  const data1 =[{title:'Total Land',value:data?.TotalLands||0, color:'bg-blue-500', icon:LandPlot},
    {title:'Registered',value:data?.registered||0, color:'bg-slate-500',icon:LandPlotIcon},
    {title:'Unregistered',value:data?.unreg||0, color:'bg-lime-500',icon:LandmarkIcon},
    {title:'Total Localities',value:data?.TotalLocalities||0, color:'bg-red-500',icon:LocateIcon}
  ]

  const [filterwords,setFilterWords]= useState({
    isRegistered:'',
    size:'',
    keyword:''
  })

  const [updateData, setUpdateData] = useState<land>()

  const filterData = Data1?.filter((item:land)=>{
      if(filterwords.isRegistered !=''){
        return item?.isRegistered == filterwords?.isRegistered
      }
      if(filterwords.size !=''){
        return item.plotsize?.toLowerCase().includes(filterwords.size.toLowerCase())
      }
      if(filterwords.keyword != ''){
        return item.locality.toLowerCase().includes(filterwords.keyword.toLowerCase())||item.owners_name?.toLowerCase().includes(filterwords.keyword.toLowerCase())||item.owners_phone?.includes(filterwords.keyword)||item.streetname.toLowerCase().includes(filterwords.keyword.toLowerCase())
      }
      return item
  })


  const {mutate} = useMutation({
    mutationKey:['delete-land'],
    mutationFn:async(id:string|any)=>{
      const response = await axios.delete(`/api/v1/land/${id}`)
      if(response.status==200){
        queryClient.refetchQueries({queryKey:['get-lands']})
        queryClient.refetchQueries({queryKey:['land-stats'],})
        toast.success('land deleted')
      }
    }
  })

  const column =[
    {
      name:'Pic',
      cell:(row:land)=>{
       if(row.owners_image){
        return <img src={row.owners_image} className='w-10 h-8 rounded-full hover:scale-150'/>
       }
       if(!row.owners_image){
       return <UserCircle className='w-10 h-8'/>
       }
      }
    },
    {
      name:'Plot NO',
      selector:(row:land)=>row.plotNo,
      sortable:true
    },
    {
      name:'Plot Size',
      selector:(row:land)=>row.plotsize,
      sortable:true
    },
    {
      name:'Is Registered',
      selector:(row:land)=>{return(row?.isRegistered =='1')?'yes':'no'}
    },
    {
      name:'Owner',
      selector:(row:land)=>row?.owners_name||'no owner',
      sortable:true
    },
    {
      name:'Owner Contact',
      selector:(row:land)=>row?.owners_phone||'no owner',
      sortable:true
    },
    {
      name:'Action',
      cell:(row:land)=>{
        return (
        <>
          <EditButton handleClick={()=>{
            setUpdateData({
              _id:row._id,
              plotNo:row.plotNo,
              plotsize:row.plotsize,
              locality:row.locality,
              streetname:row.streetname,
              isRegistered:row.isRegistered,
              owners_name:row.owners_name,
              owners_image:row.owners_image,
              owners_gender:row.owners_gender,
              owners_phone:row.owners_phone
            })
            OpenEditLand()
          }}/>
          <DeleteButton handleClick={()=>mutate(row._id)} />
          </>
        )
      }
    }
  ]

  return (
    <>
        <StatCard stats={data1} isLoading={false}/>
        <div className='my-5 p-5 bg-white'>
          <div className='space-y-5 sm:flex justify-between'>
              <h1 className='font-bold align-middle place-self-center'>Manage Land</h1>
              <button
              onClick={()=>OpenAddLand()}
              className="w-full sm:w-fit cursor-pointer rounded-lg border border-primary bg-primary px-4 text-white transition hover:bg-opacity-90 grid place-items-center font-bold">Add New</button>
            </div>
            <div className='flex flex-col gap-y-2 sm:flex-row sm:justify-between my-5'>
              <div className='flex gap-x-5'>
               <select value={filterwords.isRegistered} onChange={(e)=>{
                setFilterWords({
                  isRegistered:e.target.value,
                  size:'',
                  keyword:''
                })
              }}  className='border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                <option value=''>--Is Registered--</option>
                <option value={0}>Not registered</option>
                <option value={1}>registered</option>
               </select>
               <select value={filterwords.size} onChange={(e)=>{
                setFilterWords({
                  isRegistered:'',
                  size:e.target.value,
                  keyword:''
                })
              }} className='border-slate-500 bg-slate-200 border rounded focus:outline-none'>
                <option value=''>--size--</option>
                <option value='1/2 plot'>1/2 plot</option>
                  <option value='full plot'>full plot</option>
                  <option value='1/2 Acre'>1/2 Acre</option>
                  <option value='1 Acre'>1 Acre</option>
                  <option value='2 Acre'>2 Acre</option>
                  <option value='3 Acre'>3 Acre</option>
                  <option value='4 Acre'>4 Acre</option>
                  <option value='5 Acre'>5 Acre</option>
               </select>
              </div>
              <input type='search' value={filterwords.keyword} onChange={(e)=>{
                setFilterWords({
                  isRegistered:'',
                  size:'',
                  keyword:e.target.value
                })
              }} placeholder='search keyword' className='border-slate-500 border rounded focus:outline-none px-3 bg-slate-200'/>
            </div>
            <DataTable responsive columns={column} data={filterData}/>
            <AddLand close={CloseAddLand}/>
            <EditLand close={CloseEditLand} id={updateData?._id} plotNo ={updateData?.plotNo} plotsize={updateData?.plotsize} locality={updateData?.locality} owners_image={updateData?.owners_image} owners_name={updateData?.owners_name} owners_phone={updateData?.owners_phone} owners_gender={updateData?.owners_gender} isRegistered={updateData?.isRegistered} streetname={updateData?.streetname}
             />
        </div>
    </>
  )
}

export default Main