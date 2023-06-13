import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgGoogle = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={55}
    height={55}
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <Path
      fill="#fff"
      d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
    />
    <Path
      fill="#EA4335"
      d="M24 17.621c1.953 0 3.27.844 4.021 1.549l2.936-2.866C29.154 14.629 26.808 13.6 24 13.6c-4.067 0-7.58 2.334-9.29 5.732l3.362 2.611c.844-2.507 3.178-4.322 5.928-4.322Z"
    />
    <Path
      fill="#4285F4"
      d="M33.984 24.231c0-.855-.07-1.479-.22-2.126H24v3.86h5.732c-.116.959-.74 2.403-2.127 3.374l3.282 2.542c1.965-1.814 3.097-4.484 3.097-7.65Z"
    />
    <Path
      fill="#FBBC05"
      d="M18.084 26.057A6.401 6.401 0 0 1 17.737 24c0-.716.127-1.41.335-2.057l-3.363-2.611A10.408 10.408 0 0 0 13.6 24c0 1.676.405 3.259 1.11 4.668l3.374-2.611Z"
    />
    <Path
      fill="#34A853"
      d="M24 34.4c2.808 0 5.166-.924 6.887-2.52l-3.281-2.541c-.879.612-2.057 1.04-3.606 1.04-2.75 0-5.084-1.815-5.916-4.322l-3.363 2.612c1.71 3.397 5.212 5.731 9.28 5.731Z"
    />
  </Svg>
)
export default SvgGoogle