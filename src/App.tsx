import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import SignUp from './pages/Authentication/ResetPassword';
import ECommerce from './pages/Dashboard/Dashboard';

import axios from 'axios';




const App =()=> {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []); 

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/authentication/sign-in" element={<SignIn />} />
      <Route path="/authentication/reset-password" element={<SignUp />} />
      <Route element={<DefaultLayout children={undefined} />}>
        <Route
          path="/dashboard"
          element={
           <>
           <PageTitle title="Dashboard OpenCastGH" />
              <ECommerce />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;