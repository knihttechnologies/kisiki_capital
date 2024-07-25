import { paymentsFetch } from "../../../hooks/useFetch";
const userData = [
  {
    title: 'Mr',
    firstname: 'Somebody',
    lastname: 'Alex',
    email: 'somebody@gmail.com',
    phone: +25676967393,
    country: 'Tanzania',
    Address: 'Mwanza',
  },
  {
    title: 'Mr',
    firstname: 'Nobody',
    lastname: 'James',
    email: 'nobody@gmail.com',
    phone: +25678965493,
    country: 'Uganda',
    Address: 'kulambiro',
  },
  
];

const AdminPayments = () => {
  const urls = {
    usersurl: '/api/users/allusers'
    }
  const {payments, errPaymentsMsg, paymentsLoading } = paymentsFetch(urls.usersurl)
  
  if (payments == null || payments == "") return <p>No registered user </p> 
  if (paymentsLoading) {
      return <p>Loading...</p>;
  }
  if (errPaymentsMsg) {
      return <p>Error: {errPaymentsMsg}</p>;
  }
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Users
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">PID</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Method</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Amount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Is Verified</p>
        </div>
      </div>

      {payments && payments.map((payment) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={payment?.payment_id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                {/* <img src={`${user.user_title}`} alt="Mr" /> */}
              </div>
              <p className="text-sm text-black dark:text-white">
                {payment?.payment_id}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {payment?.payment_method}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              $ {payment?.amount_paid}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{payment?.payment_status}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{payment?.isVerified_payer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPayments;
