import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgBuy = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      // stroke="#200E32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.422 19.82a.766.766 0 0 1 0 1.53.764.764 0 1 1 0-1.53ZM18.675 19.82a.766.766 0 1 1-.002 1.532.766.766 0 0 1 .002-1.532Z"
      clipRule="evenodd"
    />
    <Path
      // stroke="#200E32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m2.75 3.25 2.08.36.963 11.473a1.802 1.802 0 0 0 1.797 1.653h10.912c.896 0 1.656-.658 1.785-1.546l.949-6.558a1.34 1.34 0 0 0-1.327-1.533H5.164M14.125 10.795h2.773"
    />
  </Svg>
);
export default SvgBuy;
