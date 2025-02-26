type companyList ={
    id: number;
    name: string;
    email: string;
    phone: string;
    logo: string|null|undefined;
}

type street={
    _id?:string,
    name:string,
    locality:string,
    status:string
}

type locality={
    _id?:string,
    name:string,
    status:string,
    streets?:[street]
}


type user ={
    _id?:string,
    fullname:string,
    email:string,
    role:string,
}

type land = {
    _id?:string,
    plotNo:string,
    plotsize:string,
    locality:string,
    streetname:string,
    isRegistered?:string,
    owners_name?:string,
    owners_phone?:string,
    owners_gender?:string,
    owners_image?:string,
    close?:()=>void
}

export type {
    companyList,
    locality,
    street,
    user,
    land
}