import {
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  GlobeAltIcon
} from "@heroicons/react/24/solid";
import { CurrencyPoundIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline";

export const tabformdata = [
  {
    title: "Standard Offer",
    heading: "Trading Currency",
    content: [
      { 
        icon:  CurrencyDollarIcon,
        input: "USD"
      },
      { 
        icon: CurrencyPoundIcon,
        input: "GBP"

      
      },
      { 
        icon: CurrencyEuroIcon,
        input: "EUR"
      },
    ],
    headingtwo: "Account Balance",
    contenttwo: [
      { 
        icon:  CurrencyDollarIcon,
        input: "10,000"
      },
      { 
        icon: CurrencyPoundIcon,
        input: "25,000"

      
      },
      { 
        icon: CurrencyEuroIcon,
        input: "50,000"
      },
      { 
        icon: CurrencyEuroIcon,
        input: "100,000"
      },
      { 
        icon: CurrencyEuroIcon,
        input: "200,000"
      },
    ],
    
    headingthree: "Platform",
    contentthree: [
      { 
        icon:  CurrencyDollarIcon,
        input: "Match-Trader"
      },
      { 
        icon: CurrencyPoundIcon,
        input: "cTrader"

      
      },
    ],
    headingfour: "Type",
    contentfour: [
      { 
        icon:  CurrencyDollarIcon,
        input: "Regular"
      },
      { 
        icon: CurrencyPoundIcon,
        input: "Swap-free"

      
      },
    ],
  },
];

export const featuresData = [
  
  {
    color: "gray",
    title: "Countries",
    icon: GlobeAltIcon,
    description:
      "90",
  },
  {
    color: "gray",
    title: "Profit share",
    icon: GlobeAltIcon,
    description:
      "90%",
  },
];

export default featuresData;
