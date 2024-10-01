import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import DollarCircleIcon from "./DolarIcon";
import LockIcon from "./LockIcon";
import Mail01Icon from "./Mail01Icon";
import UserIcon from "./UserIcon";

const icons = {
	mail: Mail01Icon,
	lock: LockIcon,
	user: UserIcon,
	dolar: DollarCircleIcon,
};

const Icon = ({ name, ...props }) => {
	const IconComponent = icons[name];
	return (
		<IconComponent
			height={props.size || SIZES.large}
			width={props.size || SIZES.large}
			color={props.color || COLORS.black}
			{...props}
		/>
	);
};

export default Icon;
