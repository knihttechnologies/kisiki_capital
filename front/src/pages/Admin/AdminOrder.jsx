import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AdminOrders from '../../components/AdminComps/AdminTables/AdminOrders';
import AdminDefaultLayout from '../../layout/AdminDefaultLayout';

const AdminOrder = () => {
  return (
    <>
      <AdminDefaultLayout>
        <Breadcrumb pageName="User Orders" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <AdminOrders />
        </div>
      </AdminDefaultLayout>
    </>
  );
};

export default AdminOrder;