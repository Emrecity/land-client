import Modal from '../../components/Modal'
import { useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { land } from '../../helpers/types'
import SearchCard from '../../components/SearchCard'


type modalSearchType ={
    close:()=>void
}

const SearchModal = ({close}:modalSearchType) => {

  const [keyword,setKeyword] = useState('')
  const [result,setResult] = useState<land>()

  const {data:Data1}= useQuery({
    queryKey:['get-lands'],
    queryFn:async()=>{
      const response = await axios.get('/api/v1/land')
      if(response.status == 200){
        return response.data.data
      }
    }
  })

  const handleSearch=(e:FormEvent)=>{
      e.preventDefault()
      if(keyword!=''){
        const filterData = Data1?.find((item:land)=>{
          return item.owners_phone?.includes(keyword)||item.owners_name?.toLowerCase().includes(keyword.toLowerCase())
        })
        setResult(filterData)
      }
      if(keyword==''){
        toast.error('Provide field value')
        return
      }
  }

  return (
    <Modal onClose={close} modalId='search_modal'>
        <>
            <form>
            <h1 className='font-extrabold text-center text-blue-400 text-3xl'>Registration<span className='text-yellow-400'> Search </span>Page</h1>
                <div className='my-5'>
                 <label className="mb-1 block text-black dark:text-white">
                  CUSTOMER'S NAME /CUSTOMER'S PHONE:
                 </label>
                 <input
                  type="text"
                  placeholder="Search here"
                  value={keyword}
                  onChange={(e)=>setKeyword(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                 />
               </div>
               <button 
               onClick={handleSearch}
               className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-1 px-4 text-white transition hover:bg-opacity-90 grid place-items-center font-bold">
                Search</button>
            </form>
            {
              (result)?
              <SearchCard plotNo={result.plotNo} plotsize={result.plotsize} pic={result.owners_image} streetname={result.streetname}  name={result.owners_name} phone={result.owners_phone} />
              :
              <h1>No results ...</h1>
            }
        </>
    </Modal>
  )
}

export default SearchModal