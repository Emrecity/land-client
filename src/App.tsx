import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import ResetPassword from './pages/Authentication/ResetPassword';
import ForgotPassword from './pages/Authentication/ForgetPassword';
import ECommerce from './pages/Dashboard/Dashboard';
import ManageLands from './pages/Lands/Main'
import ManageUsers from './pages/Users/Main'
import Mailing from './pages/Maling/Main';
import ManageBusiness from './pages/ManageBusiness/Main'
import axios from 'axios';
import { route } from './helpers/routes';





const App =()=> {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.baseURL = `https://land-server.vercel.app/`

  // `https://land-server.vercel.app/`
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
      <Route path={route.LOGIN} element={<SignIn />} />
      <Route path={route.DEFAULT_PASSWORD} element={<ResetPassword />} />
      <Route path={route.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route element={<DefaultLayout children={undefined} />}>
        <Route
          path="/dashboard"
          element={
           <>
           <PageTitle title="Dashboard" />
              <ECommerce />
            </>
          }
        />
        <Route
          path={route.MANAGE_LANDS}
          element={
            <>
              <PageTitle title="Manage Lands"/>
              <ManageLands/>
            </>
          }
        />
        <Route
          path={route.MANAGE_USERS}
          element={
            <>
              <PageTitle title="Manage Users"/>
              <ManageUsers/>
            </>
          }
        />
        <Route
          path={route.MAILING}
          element={
            <>
              <PageTitle title="Mailing"/>
              <Mailing/>
            </>
          }
        />
        <Route
          path={route.SETTINGS}
          element={
            <>
              <PageTitle title="Settings"/>
              <ManageBusiness/>
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;