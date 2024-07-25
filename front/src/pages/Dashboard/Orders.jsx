import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import UserOrders from '../../components/UserComps/Users/UserOrders';
import DefaultLayout from '../../layout/DefaultLayout';

const Orders = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Orders" />
      <div className="flex flex-col gap-10">
        <UserOrders />
      </div>
    </DefaultLayout>
  );
};

export default Orders; 
