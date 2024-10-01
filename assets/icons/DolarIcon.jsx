import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DollarCircleIcon = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		color="#000000"
		fill="none"
		{...props}
	>
		<Path
			d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
			stroke="currentColor"
			strokeWidth={props.strokeWidth || 1.5}
		/>
		<Path
			d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998"
			stroke="currentColor"
			strokeWidth={props.strokeWidth || 1.5}
			strokeLinecap="round"
		/>
	</Svg>
);

export default DollarCircleIcon;