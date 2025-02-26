import  { ElementType} from 'react'
import { ArrowBigRightIcon} from 'lucide-react'


type ManagListType = {
    Icon:ElementType,
    title:string,
    description:string
}

const ManageList= ({Icon, title, description}:ManagListType) => {
  return (
    <div className='flex justify-between px-5 border-b-2 mb-5 hover:bg-slate-100 hover:cursor-pointer'>
        <div className='flex gap-x-10'>
            <Icon className='align-middle place-self-center'/>
            <div>
                <h1 className='text-xl font-bold'>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
        <ArrowBigRightIcon className='align-middle place-self-center'/>
    </div>
  )
}

export default ManageList