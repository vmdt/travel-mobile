import * as yup from "yup";

const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email must be required"),
	password: yup
		.string()
		.required("Password must be required")
		.min(8, "Password must be at least 8 characters"),
});

const signupSchema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email must be required"),
	password: yup
		.string()
		.required("Password must be required")
		.min(8, "Password must be at least 8 characters"),
	confirmPassword: yup
		.string()
		.required("Confirm password must be required")
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

export { loginSchema, signupSchema };
