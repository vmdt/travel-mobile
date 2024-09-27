import * as yup from "yup";

const forgotPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email must be required"),
});

const resetPasswordShema = yup.object().shape({
	password: yup
		.string()
		.required("Password must be required")
		.min(8, "Password must be at least 8 characters"),
	confirmPassword: yup.string().required("Confirm password must be required"),
});

export { forgotPasswordSchema, resetPasswordShema };
