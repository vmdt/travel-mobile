import * as yup from "yup";

const personalInfoSchema = yup.object().shape({
	fullname: yup.string().required("Fullname must be required"),
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email must be required"),
	phone: yup
		.string()
		.required("Phone number must be required")
		.min(10, "Phone number must be at least 10 characters"),
});

export { personalInfoSchema };
