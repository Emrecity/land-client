type searchType={
    plotNo:string,
    plotsize:string,
    streetname?:string,
    name?:string,
    pic?:string
    phone?:string
}

const SearchCard = ({pic,plotNo,plotsize,streetname,name,phone}:searchType) => {
  return (
    <div className='border-2 border-blue-500 rounded-lg grid grid-cols-2 gap-5 my-5'>
        <img src={pic}alt='owners picture'/>
        <section className="flex flex-col space-y-2">
            <h1 className="font-bold text-center underline">Land Details</h1>
            <h4>Owner Name: <b>{name}</b></h4>
            <h4>Phone Number: <b>{phone}</b></h4>
            <h4>Plot Number: <b>{plotNo}</b></h4>
            <h4>Plot Size: <b>{plotsize}</b></h4>
            <h4>Street Name: <b>{streetname}</b></h4>
        </section>
    </div>
  )
}

export default SearchCard