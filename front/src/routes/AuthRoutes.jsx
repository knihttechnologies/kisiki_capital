import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import navlinks from './navlinks';
import Loader from '@/common/Loader';
import PageTitle from '@/components/PageTitle';
//start user pages
import ECommerce from '../pages/Dashboard/ECommerce';
import Profile from '../pages/Dashboard/Profile';
import LiveSupport from '../pages/Dashboard/LiveSupport';
import Orders from '../pages/Dashboard/Orders';
//end user pages
//Start Admin pages
import AdminDash from '../pages/Admin/AdminDash';
import AdminOrder from '../pages/Admin/AdminOrder';
import AdminUser from '../pages/Admin/AdminUser';
import Payments from '../pages/Admin/Payments';
//end Admin Pages
import NewChallenge from '../pages/NewChallenge';
import { useAuthContext } from '../context/AuthContext';
import RequireAuth from '../hooks/RequireAuth';
import PersistLogin from '../hooks/PersistLogin';
import LandingPage from '@/pages/LandingPage';
import CheckOut from '../pages/CheckOut';
import AuthTabs from '../pages/Authentication/AuthTabs';
import WhyUs from '../pages/WhyUs';
import { GetStarted, Rules, OnePhaseChallenges } from '../pages/AllCollections';
import AdminCreateUser from '../pages/Admin/AdminCreateUser';
import AdminProfile from '../pages/Admin/AdminProfile';
import Success from '../pages/Success';
import Verify from '../pages/Verify';

 const AuthRoutes = () => {
  const {loading, setLoading} = useAuthContext();
  const { pathname } = useLocation();
  const ROLES = {
    "Superadmin": "Superadmin",
    "User": "User",
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* Routes for the landing page */}
      {(pathname == '/home') && (
          <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
            <Navbar routes={navlinks} />
          </div>
        )
      }
      <Routes>
        {/* routes for home, rules and why us */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        {navlinks.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        {/* routes for the other pages */}
        <Route path="/checkout"
          element={
            <>
              <PageTitle title="Checkout | Kisiki Capital" />
              <CheckOut />
            </>
          }
        />
        <Route path="/verify"
          element={
            <>
              <PageTitle title="Verify | Kisiki Capital" />
              <Verify />
            </>
          }
        />
        <Route path="/success"
          element={
            <>
              <PageTitle title="Success | Kisiki Capital" />
              <Success />
            </>
          }
        />
        <Route path="/auth"
          element={
            <>
              <PageTitle title="Signin or Signup | Kisiki Capital" />
              <AuthTabs />
            </>
          }
        />
        <Route path="/get-started"
          element={
            <>
              <PageTitle title="Getting Started | Kisiki Capital" />
              <GetStarted />
            </>
          }
        />
        <Route path="/rules"
          element={
            <>
              <PageTitle title="Rules | Kisiki Capital" />
              <Rules />
            </>
          }
        />
        <Route path="/one-phase-challenges"
          element={
            <>
              <PageTitle title="One Phase Challenges | Kisiki Capital" />
              <OnePhaseChallenges />
            </>
          }
        />
        <Route path="/chat"
          element={
            <>
              <PageTitle title="Live Support | Kisiki Capital" />
              <LiveSupport />
            </>
          }
        />
        {/* <Route
            path="/new-challenge"
            element={
              <>
                <PageTitle title="New Challenge | Kisiki Capital" />
                <NewChallenge />
              </>
            }
          /> */}
          {/* <Route path="/admindash" element={
            <>
              <PageTitle title="AdminDash | Kisiki Capital" />
              <AdminDash />
            </>
            }
          /> */}
      </Routes>
      {/*  */}
      {/* <Routes element={<PersistLogin />}> */}
        <Routes  element={<RequireAuth allowedRoles={ROLES.Superadmin} />}>
          <Route path="/admin-dash" element={
            <>
              <PageTitle title="AdminDash | Kisiki Capital | Admin Dashboard" />
              <AdminDash />
            </>
            }
          />
          <Route path="/admin/create/user"element={
              <>
                <PageTitle title="Admin create user | Kisiki Capital" />
                <AdminCreateUser />
              </>
            }
          />
          <Route path="/admin/view/all-orders" element={
              <>
                <PageTitle title="Admin all orders | Kisiki Capital" />
                <AdminOrder />
              </>
            }
          />
          <Route path="/admin/view/all-users" element={
              <>
                <PageTitle title="Admin all users | Kisiki Capital" />
                <AdminUser />
              </>
            }
          />
          <Route path="/admin/view/all-payments" element={
              <>
                <PageTitle title="Admin all payments | Kisiki Capital" />
                <Payments />
              </>
            }
          />
          <Route path="/admin/chat"
            element={
              <>
                <PageTitle title="Live Support | Kisiki Capital" />
                <LiveSupport />
              </>
            }
          />
          <Route path="/admin/profile"
            element={
              <>
                <PageTitle title="Live Support | Kisiki Capital" />
                <AdminProfile />
              </>
            }
          />
        </Routes>
      {/* </Routes> */}
      <Routes element={<RequireAuth allowedRoles={ROLES.User} />}>
        <Route  >
          <Route
            path="/new-challenge"
            element={
              <>
                <PageTitle title="New Challenge | Kisiki Capital | Admin Dashboard" />
                <NewChallenge />
              </>
            }
          />
          <Route path="/dashboard" element={
            <>
              <PageTitle title="Dash | Kisiki Capital" />
              <ECommerce />
            </>
            }
          />
          <Route path="/my-orders"element={
              <>
                <PageTitle title="My Orders | Kisiki Capital" />
                <Orders />
              </>
            }
          />
          <Route path="/profile" element={
              <>
                <PageTitle title="Profile | Kisiki Capital" />
                <Profile />
              </>
            }
          />
         </Route>
      </Routes>
    </>
  );
}

export default AuthRoutes;