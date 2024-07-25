import React from "react";
import PropTypes from "prop-types";
import Logo from "../../images/kisiki-capital-04.png"
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaInstagram, FaTelegram, FaEnvelope, FaPhoneSquare } from "react-icons/fa";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold hover:text-warning"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              className="flex items-center gap-1 p-1 font-bold hover:text-warning"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar  color="transparent" className="p-3 mb-10 -mt-2">
      <div className="container flex-row items-center justify-between text-white mb-1 hidden lg:flex">
        <div className="flex flex-row flex-wrap gap-10">
          <p className="ml-10 text-xs">Tel: <Link to="tel:+255767743057" className="hover:text-warning">+255 767743057</Link></p>
          <p className="ml-5 text-xs">Email: <Link to='javascript:void(0)' onClick={() => window.location = 'mailto:enquiries@kisikicapital.com'} className="hover:text-warning">enquiries@kisikicapital.com</Link></p>
        </div>
        <div className=" flex flex-row flex-wrap gap-4 mr-10 ">
          <Link to="tel:+255767743057" className="hover:text-warning"><FaPhoneSquare /></Link>
          <Link to="https://t.me/kisiki_capital" className="hover:text-warning"><FaTelegram /></Link>
          <Link to="https://instagram.com/kisiki_capital" className="hover:text-warning"><FaInstagram /></Link>
          <Link to="https://x.com/kisiki_capital" className="bg-white hover:bg-warning rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="10px" height="10px" viewBox="0 0 24 24" xml:space="preserve">
            <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
          </svg>
          </Link>
          <Link className="hover:text-warning" to='javascript:void(0)' onClick={() => window.location = 'mailto:enquiries@kisikicapital.com'}>
              <FaEnvelope />
          </Link>
        </div>
      </div>
      
      <div className="hidden lg:flex border-2 rounded-lg bg- mt-2"></div>
      <div className="container mx-auto flex flex-row items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            <img className="w-35 h-15 xs:w-35 xs:h-15 sm:w-35 sm:h-15 md:w-35 md:h-15" src={Logo} alt="Logo" />
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          <Link to="/auth">
            <button className="text-white hover:bg-warning p-2 rounded-lg" >
              Login
            </button>
          </Link>
          {/* {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })} */}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <div className="hidden lg:flex border-2 rounded-lg bg-warning"></div>
      <Collapse
        className="rounded-xl bg-slate-300 px-3 pt-2 pb-4 text-blue-gray-900 lg:hidden"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          <Link
            to="/auth"
            className="mb-2 block"
          >
            {/* <Button variant="text" size="sm" fullWidth>
              Client Area
            </Button> */}
          </Link>
          {/* {React.cloneElement(action, {
            className: "w-full block",
          })} */}
        </div>
      </Collapse>
    </MTNavbar>
  );
}



export default Navbar;
