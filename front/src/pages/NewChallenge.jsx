import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Header from '../components/Header';
import StepForm from '../components/Tabs/StepForm';
import Sidebar from '../components/Sidebar/Sidebar';
import { useAppContext } from '../context/AppContext';
//import useAuth from '../hooks/useAuth';

const NewChallenge = () => {
  const {sidebarOpen, setSidebarOpen} = useAppContext()
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
    {/* <!-- ===== Page Wrapper Start ===== --> */}
    <div className="flex h-screen overflow-hidden">
      {/* <!-- ===== Sidebar Start ===== --> */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Sidebar End ===== --> */}
      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Header Start ===== --> */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <Breadcrumb pageName="New Challenge" />
          <div className="flex flex-col gap-10">
            <StepForm />
          </div>
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

export default NewChallenge;