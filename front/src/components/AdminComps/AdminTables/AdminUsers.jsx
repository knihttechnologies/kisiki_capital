import { userFetch } from '../../../hooks/useFetch';
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

const AdminUsers = () => {
  const urls = {
    usersurl: '/api/users/allusers'
    }
  const {user, usersLoading, errMsg} = userFetch(urls.usersurl)
  console.log(user)
  if (user == null || user == "") return <p>No registered user </p> 
  if (usersLoading) {
      return <p>Loading...</p>;
  }
  if (errMsg) {
      return <p>Error: {errMsg}</p>;
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
          <p className="font-medium">Title</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">First Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Last Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Country</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Address</p>
        </div>
      </div>

      {user && user.map((use) => (
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {use.user_id}
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                {/* <img src={`${user.user_title}`} alt="Mr" /> */}
              </div>
              <p className="text-sm text-black dark:text-white">
                {use.user_firstname}
              </p>
            </div>
          </div>
          <div className="col-span-1 items-center">
            <p className="text-sm text-black dark:text-white">
              {use.user_lastname}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {use.user_email}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {use.user_phone}
              </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">
              {use.user_country}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">
              {use.user_address}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
