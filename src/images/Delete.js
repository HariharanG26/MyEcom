import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgDelete = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FA4A0C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.325 7.468s-.543 6.735-.858 9.572c-.15 1.355-.987 2.15-2.358 2.174-2.61.047-5.221.05-7.83-.005-1.318-.027-2.141-.83-2.288-2.162-.317-2.862-.857-9.579-.857-9.579M17.708 4.24H.75M14.44 4.24a1.648 1.648 0 0 1-1.614-1.324L12.583 1.7a1.28 1.28 0 0 0-1.237-.95H7.113a1.28 1.28 0 0 0-1.237.95l-.243 1.216A1.648 1.648 0 0 1 4.018 4.24"
    />
  </Svg>
)
export default SvgDelete
