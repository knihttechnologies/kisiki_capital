import React, { useState, useEffect, ReactNode } from 'react';
import Header from '../components/Header/index';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import useAuth from '../hooks/useAuth';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { makeRequest } from '../api/makeRequest';

const AdminDefaultLayout = ({ children }) => {
  const auth = useAuthContext()
  const { sidebarOpen, setSidebarOpen } = useAppContext()
  // useEffect(()=>{
    makeRequest.get("/api/auth/authenticate")
    .then(res => {
        const role = res?.data?.user?.user_role?.role_name
        if(res?.data?.valid){
          auth?.setUser(res?.data?.user)
          if(role == "User") return navigate("/dashboard");
          if(role == "Superadmin") return navigate("/admindash")
        }else{
          auth?.setAuthErrMsg("You are not logged in")
          return navigate('/auth')
        }
    }).catch(err => {
        auth?.setAuthErrMsg("Failed to authenticate", err)
    })
  // })

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default AdminDefaultLayout;