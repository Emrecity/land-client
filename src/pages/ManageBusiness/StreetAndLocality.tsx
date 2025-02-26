import React, {useState} from 'react'
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from '../../components/useModalActions'
import AddLocality from './AddLocality'
import AddStreet from './AddStreet'
import DataTable from 'react-data-table-component';
import DeleteButton from '../../components/Actionbuttons/DeleteButton';
import EditButton from '../../components/Actionbuttons/EditButton';
import { locality,street } from '../../helpers/types'
import axios from 'axios'
import toast from 'react-hot-toast'
import EditLocality from './EditLocality'
import ViewButton from '../../components/Actionbuttons/ViewButton'
import EditStreet from './EditStreet'

const StreetAndLocality:React.FC = () => {
  const{open:OpenAddLocalityModal,close:CloseAddLocalityModal} = useModal('add-locality-modal')
  const{open:OpenEditLocalityModal,close:CloseEditLocalityModal} = useModal('edit-locality-modal')
  const{open:OpenAddStreetModal,close:CloseAddStreetModal} = useModal('add-street-modal')
  const{open:OpenEditStreetModal,close:CloseEditStreetModal} = useModal('edit-street-modal')

  const queryClient = useQueryClient()

  const {data} =     useQuery({
    queryKey: ['get-locality'],
    queryFn: async()=>{
        const response = await axios.get('/api/v1/setting/locality')
        if(response.status === 200){
            return response.data.data
        }
    }
})

const {mutate} = useMutation({
  mutationKey:['delete-locality'],
  mutationFn:async(id:string|undefined)=>{
    const response = await axios.delete(`/api/v1/setting/locality/${id}`)
    if(response.status==200){
      queryClient.refetchQueries({queryKey:['get-locality']})
      toast.success('Locality deleted')
    }
  }
})

const DeleteStreet = useMutation({
  mutationKey:['delete-street'],
  mutationFn:async(id:string|undefined)=>{
    const response = await axios.delete(`/api/v1/setting/street/${id}`)
    if(response.status==200){
      queryClient.refetchQueries({queryKey:['get-locality']})
      toast.success('Street deleted')
    }
  }
})

const [update,setUpdate] = useState<locality>({
  _id:'',
  name:'',
  status:''
})

const [streetUpdate,setStreetUpdate] = useState<street>({
  _id:'',
  name:'',
  status:'',
  locality:''
})

const [viewItem,setViewItem] = useState<string|any>('')

const streetData = data?.find((item:locality)=>item._id==viewItem)


const [toggle,setToggle] = useState(false)

  const column = [
    {
      name:'Name',
      selector:(row:locality)=>row.name,
      sortable:true
    },
    {
      name:'Status',
      selector:(row:locality)=>{ return (row.status=='1')?'Active':'Inactive'},
      sortable:true
    },
    {
      name:'No of Streets',
      selector:(row:locality)=>{
        let total:number|any = row.streets?.length
        return total
      }
    },
   
    {
      name:'Actions',
      button:true,
      cell:(row:locality)=>{return <div className='flex gap-4'>
     <EditButton handleClick={()=>{
      setUpdate({
        _id:row._id,
        name:row.name,
        status:row.status
      })
      OpenEditLocalityModal()
     }} title='Edit'/>
     <ViewButton handleClick={()=>{
      setToggle(!toggle)
      setViewItem(row._id)
      }} title='streets'/>
      <DeleteButton handleClick={()=>{mutate(row._id)}} title="Delete" />
      </div>}
    },
  ]

  const streets_column = [
    {
      name:'Name',
      selector:(row:street)=>row.name,
      sortable:true
    },
    {
      name:'Status',
      selector:(row:street)=>{ return (row.status=='1')?'Active':'Inactive'},
      sortable:true
    },
    {
      name:'Actions',
      cell:(row:street)=>{
        return(
          <div className='flex gap-2'>
            <EditButton handleClick={()=>{
              setStreetUpdate({
                _id:row._id,
                name:row.name,
                status:row.status,
                locality:row.locality
              })
              OpenEditStreetModal()
            }}/>
            <DeleteButton handleClick={()=>{DeleteStreet.mutate(row._id)}} title="Delete" />
          </div>
        )
      }
    }
   
  ]

  return (
    <>
        <section className=' border-b-2'>
          {
            !toggle?
            <>
              <div className='flex justify-between my-16'>
            <h1 className='font-bold capitalize text-2xl'>Localities </h1>
            <div className='flex flex-col sm:flex-row'>
            <button
            onClick={()=>OpenAddLocalityModal()}
            className='px-4 bg-blue-400 text-white hover:bg-blue-500 rounded py-1'>Add Locality</button>
            <button onClick={()=>OpenAddStreetModal()} className='px-4 mx-5 bg-blue-400 text-white hover:bg-blue-500 rounded py-1'>Add Street</button>
            </div>
        </div>
        <div>
          <DataTable responsive columns={column} data={data} pagination/>
        </div>
            </> 
            :
            <>
              <div className='my-5 flex text-center justify-between mt-16'>
                 <h1 className='font-bold text-xl mb-5 uppercase '>{streetData?.name} Streets</h1> 
                 <div onClick={()=>setToggle(!toggle)} className='flex items-center justify-center w-8 h-8 bg-white border rounded hover:scale-110 border-stroke dark:border-strokedark dark:bg-boxdark' title='back'>
                  <svg fill="currentcolor" className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m24 10.64h-18.24v-4.24l-5.76 5.76 5.76 5.76v-4.24h18.24z"/></svg>
                </div>
              </div>             
              
              <DataTable responsive columns={streets_column} data={streetData?.streets} pagination/>
              <EditStreet close={CloseEditStreetModal} id={streetUpdate._id} name={streetUpdate.name}  status={streetUpdate.status} />
            </>
          }
        
        </section>
        <AddLocality close={CloseAddLocalityModal}/>
        <AddStreet close={CloseAddStreetModal}/>
        <EditLocality close={CloseEditLocalityModal} id={update._id} name={update.name} status={update.status} />
    </>
  )
}

export default StreetAndLocality