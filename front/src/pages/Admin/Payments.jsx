import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AdminPayments from '../../components/AdminComps/AdminTables/AdminPayments';
import AdminDefaultLayout from '../../layout/AdminDefaultLayout';

const Payments = () => {
  return (
    <>
      <AdminDefaultLayout>
        <Breadcrumb pageName="User Payments" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <AdminPayments />
        </div>
      </AdminDefaultLayout>
    </>
  );
};

export default Payments;