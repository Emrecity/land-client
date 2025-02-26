import * as yup from "yup";

const Loginschema = yup.object().shape({
    email: yup.string().required('Email or Phone number is required'),
    password: yup.string().required('Password is required'),
  });

const Localityschema = yup.object().shape({
    name: yup.string().required('Name is required'),
    status: yup.string().required('Status is required'),
  });

const Streetschema = yup.object().shape({
    name: yup.string().required('Name is required'),
    locality:yup.string().required('Locality is required'),
    status: yup.string().required('Status is required'),
  });

  const UserSchema = yup.object().shape({
    fullname: yup.string().required('Name is required'),
    email: yup.string().email('provide a valid email').required(),
    role: yup.string().required('role is required')
  })

 export{
    Loginschema,
    Localityschema,
    Streetschema,
    UserSchema
 }