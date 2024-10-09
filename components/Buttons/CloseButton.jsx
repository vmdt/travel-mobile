import React from "react";
import { TouchableOpacity } from "react-native";
import { SIZES } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const CloseButton = ({ onClose, style, styleText }) => {
	return (
		<TouchableOpacity onPress={onClose} style={style}>
			<ReusableText text="✖" size={SIZES.large} style={styleText} />
		</TouchableOpacity>
	);
};

export default CloseButton;
