import React from 'react';
export function TeamCard(){
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = React.useRef(null);
  React.useEffect(() => {
// If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
// If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
// When it is, it will automatically load the TrustBox.
if (window.Trustpilot) {
  window.Trustpilot.loadFromElement(ref.current, true);
}
  }, []);
  return (
<div
  ref={ref} // We need a reference to this element to load the TrustBox in the effect.
 className="trustpilot-widget" // Renamed this to className.
 // [ long list of data attributes...]
>
  <a href="https://www.trustpilot.com/review/example.com" target="_blank" rel="noopener"> Trustpilot
  </a>
</div>
  );
};
export default TeamCard;

// import PropTypes from "prop-types";
// import { Card, Avatar, Typography } from "@material-tailwind/react";

// export function TeamCard({ img, name, position, socials }) {
//   return (
//     <div>
//       <script
//         type="text/javascript"
//         src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min/js"
//         async
//       />
//       <Card color="transparent" shadow={false} className="text-center w-full justify-center">
//         <Avatar
//           src={img}
//           alt={name}
//           size="xxl"
//           variant="rounded"
//           className=" shadow-lg shadow-gray-500/25"
//         />
//         <Typography variant="h5" color="blue-gray" className="mt-6 mb-1">
//           {name}
//         </Typography>
//         {position && (
//           <Typography className="font-bold text-white">
//             {position}
//           </Typography>
//         )}
//         {socials && <div className="mx-auto mt-5">{socials}</div>}
//       </Card>
//     </div>
//   );
// }

// TeamCard.defaultProps = {
//   position: "",
//   socials: null,
// };

// TeamCard.propTypes = {
//   img: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   position: PropTypes.string,
//   socials: PropTypes.node,
// };

// TeamCard.displayName = "/src/widgets/layout/team-card.jsx";

// export default TeamCard;
