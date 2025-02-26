import React, { useState } from 'react'
import ManageList from '../../components/ManageList'
import { 
  Building2,
  Building
 } from 'lucide-react'
import BusinessDetails from './BusinessDetails'
import StreetAndLocality from './StreetAndLocality'

const Main:React.FC = () => {

  const data = [{id:1, title:'Business Details',desc:'Get all your business details settings here',icon:Building2},{id:3, title:'Streets and Locality', desc:'Manage streets and localities',icon:Building}]
  const [page, setPage] = useState('')

  return (
    <>
      <div className='mb-10 space-y-3 sm:space-y-0 sm:flex justify-between'>
        <h1>Manage Business</h1>
        <button
        className=' hidden px-4 bg-blue-400 text-white hover:bg-blue-500 rounded py-1'>Create Business</button>
      </div>
      <div className='bg-white p-5 mx-auto'>
      { page != '' && <button onClick={()=>setPage('')} className='px-4 bg-slate-400 text-white hover:bg-slate-500 rounded py-1 float-right'>Back</button> }
        { page == ''  &&
          data.map((item,index)=>{
            return <div onClick={()=>setPage(item.title)}> <ManageList key={index} Icon={item.icon} title={item.title} description={item.desc}/></div>
          })
        }
        {
          page == data[0].title &&
          <BusinessDetails/>
        }
        {
          page == data[1].title &&
          <StreetAndLocality/>
        }
      </div>
    </>
  )
}

export default Main