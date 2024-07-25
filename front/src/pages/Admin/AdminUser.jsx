import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AdminUsers from '../../components/AdminComps/AdminTables/AdminUsers';
import AdminDefaultLayout from '../../layout/AdminDefaultLayout';

const AdminUser = () => {
  return (
    <AdminDefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <AdminUsers />
      </div>
    </AdminDefaultLayout>
  )
}

export default AdminUser