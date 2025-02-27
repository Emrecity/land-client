import Modal from '../../components/Modal'
import { useState,useEffect, FormEvent } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useMutation , useQueryClient} from '@tanstack/react-query';
import { set } from 'react-hook-form';



type EditLand = {
    close:()=>void,
    id?:string,
    plotNo?:string,
    plotsize?:string,
    locality?:string,
    streetname?:string,
    isRegistered?:string,
    owners_name?:string,
    owners_image?:string,
    owners_gender?:string,
    owners_phone?:string,
}

const EditLand = ({close,id,plotNo,plotsize,locality,streetname,isRegistered,owners_name,owners_phone,owners_gender,owners_image}:EditLand) => {

  const [landData,setLandData] = useState<any>({
    plotNo,
    plotsize,
    locality,
    streetname,
    isRegistered,
    owners_name,
    owners_gender,
    owners_phone,
    owners_image
  })
   
      const [page , setPage ] = useState(1)
      const [img,setImg] = useState<string|any>('')
      const [toggle,setToggle] = useState(false)

      useEffect(()=>{
          setPage(1)
          setToggle(false)
          setImg(null)
          setLandData({
            plotNo:plotNo,
            plotsize:plotsize,
            locality:locality,
            streetname:streetname,
            isRegistered:isRegistered,
            owners_name:owners_name,
            owners_gender:owners_gender,
            owners_phone:owners_phone,
            owners_image:owners_image
          })
      },[id,close])
  
  
      const queryClient = useQueryClient()
  
      const {mutate} = useMutation({
        mutationKey:['create-land'],
        mutationFn:async(data:any)=>{
          const response = await axios.patch(`/api/v1/land/${id}`,data,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          })
          if(response.status==200){
           await queryClient.refetchQueries({queryKey:['get-lands']})
           await queryClient.refetchQueries({queryKey:['land-stats'],})
            toast.success('land updated')
            close()
          }
        }
      })

     

    function handleSave(e:FormEvent){
      e.preventDefault()

        if(page == 1 && landData.isRegistered =='0'){
          const uploadData = new FormData()
          uploadData.append('plotNo',landData.plotNo)
          uploadData.append('plotsize',landData.plotsize)
          uploadData.append('locality',landData.locality)
          uploadData.append('streetname',landData.streetname)
          uploadData.append('isRegistered',landData.isRegistered)
          uploadData.append('owners_name','')
          uploadData.append('owners_gender','')
          uploadData.append('owners_phone','')
          uploadData.append('owners_image','')
          mutate(uploadData)
        } 
        if(page == 2 && landData.isRegistered =='1'){
          const uploadFormData = new FormData()
          uploadFormData.append('plotNo',landData.plotNo)
          uploadFormData.append('plotsize',landData.plotsize)
          uploadFormData.append('locality',landData.locality)
          uploadFormData.append('streetname',landData.streetname)
          uploadFormData.append('isRegistered',landData.isRegistered)
          uploadFormData.append('owners_name',landData.owners_name)
          uploadFormData.append('owners_gender',landData.owners_gender)
          uploadFormData.append('owners_phone',landData.owners_phone)
          uploadFormData.append('owners_image',img)
          mutate(uploadFormData)
        }
        if(page == 1 && landData.isRegistered =='1'){
          toast.success('Saved,Moving to next page')
          setPage(page+1)
        }
    }


  return (
     <Modal modalId='edit-land-modal' onClose={close}>
            <form>
                <h1 className='font-extrabold text-center text-blue-400 text-3xl'>Edit<span className='text-yellow-400'> Land</span> Details</h1>
                {page == 1 && 
                <>
                <h2 className='font-bold text-lg my-2 '>Land Details</h2>
                <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Plot Number*
                    </label>
                    <input
                      type="text"
                      value={landData?.plotNo}
                      onChange={(e)=>setLandData({...landData,plotNo:e.target.value})}
                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                  </div>
                <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Plot size*
                    </label>
                    <select 
                    value={landData?.plotsize}
                    onChange={(e)=>setLandData({...landData,plotsize:e.target.value})}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    >
                      <option value={plotsize}>{plotsize}</option>
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
                <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Locality*
                    </label>
                    <input type='text'
                    value={landData?.locality}
                    onChange={(e)=>setLandData(set(landData, 'locality', e.target.value))}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />       
                </div>
                <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Street Name*
                    </label>
                    <input type='text'
                     value={landData?.streetname}
                     onChange={(e)=>setLandData({...landData,streetname:e.target.value})}
                   className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                  </div>
                <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Is Registerd*
                    </label>
                    <select
                    value={landData?.isRegistered}
                    onChange={(e)=>setLandData({...landData,isRegistered:e.target.value})}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white">
                        <option selected value={isRegistered}>{isRegistered =='1'?'Yes':'No'}</option>
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>
                </div> </>}
                        {
                            page == 2  && <>
                              <h2 className='font-bold text-lg my-2 '>Owner's
                                Details</h2>
                           {
                        owners_image && !toggle?<><img src={owners_image} className='h-56 mb-5'/> <button onClick={()=>setToggle(!toggle)} className="p-1 text-white bg-blue-500 rounded-md">Change Picture</button></>:<>
                      {!img?<div
                      id="FileUpload"
                      className="relative mt-5 mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                           >
                    <input
                      type="file"
                      accept="image/*"
                      value={img}
                      onChange={(e)=>setImg(e.target.files[0])}
                      className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                    />
                      <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex items-center justify-center w-10 h-10 bg-white border rounded-full border-stroke dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                    </div>:<><img src={URL.createObjectURL(img)} alt="img" className="h-56 rounded-md "/>
                    <button onClick={()=>setImg(null)} className="p-1 text-white bg-blue-500 rounded-md">Change Picture</button>
                  </>}</>
                  }
                    <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Owner's Name
                    </label>
                    <input
                      type="text"
                      value={landData.owners_name}
                      onChange={(e)=>setLandData({...landData,owners_name:e.target.value})}
                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                  </div>
                  <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Gender
                    </label>
                    <select
                    value={landData?.owners_gender}
                    onChange={(e)=>setLandData({...landData,owners_gender:e.target.value})}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white">
                        <option value=''>{owners_gender}</option>
                        <option value='female'>Female</option>
                        <option value='male'>Male</option>
                    </select>
                </div>
                <div className='mb-5'>
                    <label className="mb-1 block text-black dark:text-white">
                      Owner's Contact
                    </label>
                    <input
                      type="number"
                      value={landData?.owners_phone}
                      onChange={(e)=>setLandData({...landData,owners_phone:e.target.value})}                     
                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                    />
                  </div>
                </>
                }
                
                <div className='flex justify-center gap-x-5'>
                <button onClick={(e)=>{
                    e.preventDefault()
                    if(page>1){
                        setPage(page-1)
                    }
                    if(page==1){
                      close()
                    }
                }} className={` ${page == 1?'bg-red-500':'bg-slate-500'} py-1 px-4 rounded-lg text-white transition hover:bg-opacity-90`}>{page == 1?'close':'Back'}</button>
                <button onClick={(e)=>{
                    
                    handleSave(e)}} className="cursor-pointer  rounded-lg border border-primary bg-primary py-1 px-4 text-white transition hover:bg-opacity-90 grid place-items-center font-bold">
                        Save
                </button>
                
                </div>
            </form>
        </Modal>
  )
}

export default EditLand