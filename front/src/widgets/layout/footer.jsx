import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  FaInstagram, FaTelegram, FaEnvelope
} from "react-icons/fa";
const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  let circleClasses = "inline-block p-5 rounded-full w-15 h-15";
  let iconStyles = { color: "white", fontSize: "20px" };
  return (
    <footer className="rounded-lg mb-10 shadow-xl shadow-white bg-black opacity-[85%]">
      <div className="lg:container flex flex-col flex-wrap content-center items-center">
        <h1 className="text-lg mb-1 mt-5 text-black/100 dark:text-white">
          Follow Us or Get In Touch
        </h1>
        <hr className="mt-3 border border-1 w-[400px] border-slate-800" />
        <div className="flex flex-row flex-wrap pt-6 gap-5 text-center lg:text-center">
          
          <Link to="https://t.me/kisiki_capital">
            <span style={{ background: "#3B5998" }} className={circleClasses}>
              <FaTelegram style={iconStyles} />
            </span>
          </Link>
          
          <span style={{ background: "#c13584" }} className={circleClasses}>
            <Link to="https://instagram.com/kisiki_capital">
              <FaInstagram style={iconStyles} />
            </Link>
          </span>
          <Link to="https://x.com/kisiki_capital">
            <span style={{ background: "#1da1f2" }} className={circleClasses}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
            </span>
          </Link>
          <Link to='javascript:void(0)' onClick={() => window.location = 'mailto:enquiries@kisikicapital.com'}>
            <span style={{ background: "#f4b400" }} className={circleClasses}>
              <FaEnvelope style={iconStyles}/>
            </span>
          </Link>
        </div>
        <hr className="my-4 border border-1 w-[400px] border-slate-800" />
        <div className="flex flex-wrap items-center mb-10 justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "KISIKI CAPITAL",
  description:
    "Your Trading journey begins here",
  socials: [
    {
      color: "gray",
      name: "twitter",
      path: "https://www.twitter.com/",
    },
    {
      color: "gray",
      name: "youtube",
      path: "https://www.youtube.com/channel/",
    },
    {
      color: "gray",
      name: "instagram",
      path: "https://www.instagram.com/",
    },
    {
      color: "black",
      name: "github",
      path: "https://github.com/",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        { name: "About Us", path: "https://" },
        { name: "Blog", path: "https://" },
        {
          name: "Github",
          path: "https://",
        },
        {
          name: "Free Products",
          path: "https://",
        },
      ],
    },
    {
      name: "other resources",
      items: [
        {
          name: "MIT License",
          path: "https://",
        },
        {
          name: "Contribute",
          path: "https://",
        },
        {
          name: "Change Log",
          path: "https://",
        },
        {
          name: "Contact Us",
          path: "https://",
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} Kisiki Capital{" "}
      <a
        href="https://kisikicapital.com"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        - powered by <Link to="https://knihttechnologies.com">Kniht Technologies</Link>
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";
export default Footer;
