import * as yup from 'yup';
// make schema or validation for contact page
export const contactSchema= yup.object({
    name:yup.string().min(2).required("Enter your name"),
    email:yup.string().email().required("Enter your email"),
    message:yup.string().min(9).required("Enter your message")
});