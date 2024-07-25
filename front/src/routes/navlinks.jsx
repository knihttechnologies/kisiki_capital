import LandingPage from "@/pages/LandingPage";
import AllCollections from "../pages/AllCollections";
import WhyUs from "../pages/WhyUs";
import { HomeIcon, DocumentIcon, QuestionMarkCircleIcon, EyeIcon  } from "@heroicons/react/24/solid";
import TermsCondtions from "../pages/TermsCondtions"; 

export const navlinks = [
  {
    name: "Home",
    path: "/home",
    icon: HomeIcon,
    element: <LandingPage />,
  },
  {
    name: "Rules",
    path: "/all-collections",
    icon: DocumentIcon,
    element: <AllCollections />,
  },
  {
    name: "Why us",
    path: "/why",
    icon: QuestionMarkCircleIcon,
    element: <WhyUs />,
  },
  {
    name: "Terms & Conditions",
    path: "/terms-and-conditions",
    icon: EyeIcon,
    element: <TermsCondtions />,
  },
];

export default navlinks;