import React, { useState, FormEvent, ChangeEvent } from "react";
import "./forget-password.css";
import axios from "../../api/axios";

interface FormState {
  email: string;
}

interface FormErrors {
  email?: string;
}

const Forgetpassword: React.FC = () => {
  // State for form data and validation
  const [formData, setFormData] = useState<FormState>({
    email: ""
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error when user types
    if (formErrors[id as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [id]: undefined
      });
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;
    
    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Replace with your actual API endpoint for password reset
        await axios.post("/auth/forgot-password", {
          email: formData.email
        });
        
        setSubmitSuccess(true);
        setFormData({ email: "" });
      } catch (error) {
        console.error("Error requesting password reset:", error);
        setFormErrors({ 
          email: "Failed to process your request. Please try again." 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="forgetPassword relative sm:h-screen">
      <div className="flex flex-col justify-center items-center sm:pt-16 h-[100vh]">
        <div className="max-w-5xl flex flex-col justify-center sm:flex-row mobile:m-10">
          <img
            className="shadow-md sm:rounded-l-xl object-cover sm:max-w-[200px] md:max-w-sm lg:max-w-lg xl:max-w-xl"
            src="../../public/imagecard2.jpg"
            alt="imagecard"
          />
          {submitSuccess ? (
            <div className="flex flex-col justify-center bg-white shadow-md sm:rounded-r-xl px-5 md:max-w-[250px] xl:max-w-[350px] py-5">
              <div className="flex text-gray-700 text-2xl font-bold mb-6">
                Email Sent
              </div>
              <p className="text-gray-600 mb-4">
                If an account exists with this email, you will receive a password reset link shortly.
              </p>
              <button
                className="bg-[#E4665F] hover:bg-[#EDC8D5] text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline mt-4"
                onClick={() => setSubmitSuccess(false)}
                type="button"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form 
              className="flex flex-col justify-center bg-white shadow-md sm:rounded-r-xl px-5 md:max-w-[250px] xl:max-w-[350px] py-5"
              onSubmit={handleSubmit}
            >
              <div className="flex text-gray-700 text-2xl font-bold mb-10">
                Forget Password
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`shadow appearance-none border-b ${
                    formErrors.email ? "border-red-500" : "border-[#32312d]"
                  } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="email"
                  type="email"
                  placeholder="example@immifit.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs italic mt-1">{formErrors.email}</p>
                )}
              </div>
              <div className="flex items-center justify-between align-middle">
                <button
                  className="bg-[#E4665F] hover:bg-[#EDC8D5] text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Confirmation Email"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
