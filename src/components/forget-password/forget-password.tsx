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
    email: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Clear error when user types
    if (formErrors[id as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [id]: undefined,
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
          email: formData.email,
        });

        setSubmitSuccess(true);
        setFormData({ email: "" });
      } catch (error) {
        console.error("Error requesting password reset:", error);
        setFormErrors({
          email: "Failed to process your request. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="forgetPassword relative sm:h-screen">
      <div className="flex h-[100vh] flex-col items-center justify-center sm:pt-16">
        <div className="flex max-w-5xl flex-col justify-center mobile:m-10 sm:flex-row">
          <img
            className="object-cover shadow-md sm:max-w-[200px] sm:rounded-l-xl md:max-w-sm lg:max-w-lg xl:max-w-xl"
            src="/imagecard2.jpg"
            alt="imagecard"
          />
          {submitSuccess ? (
            <div className="flex flex-col justify-center bg-white px-5 py-5 shadow-md sm:rounded-r-xl md:max-w-[250px] xl:max-w-[350px]">
              <div className="mb-6 flex text-2xl font-bold text-gray-700">
                Email Sent
              </div>
              <p className="mb-4 text-gray-600">
                If an account exists with this email, you will receive a
                password reset link shortly.
              </p>
              <button
                className="focus:shadow-outline mt-4 w-full rounded bg-[#E4665F] py-2 font-bold text-white hover:bg-[#EDC8D5] focus:outline-none"
                onClick={() => setSubmitSuccess(false)}
                type="button"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form
              className="flex flex-col justify-center bg-white px-5 py-5 shadow-md sm:rounded-r-xl md:max-w-[250px] xl:max-w-[350px]"
              onSubmit={handleSubmit}
            >
              <div className="mb-10 flex text-2xl font-bold text-gray-700">
                Forget Password
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`appearance-none border-b shadow ${
                    formErrors.email ? "border-red-500" : "border-[#32312d]"
                  } focus:shadow-outline w-full rounded py-2 px-3 leading-tight text-gray-700 focus:outline-none`}
                  id="email"
                  type="email"
                  placeholder="example@immifit.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs italic text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between align-middle">
                <button
                  className="focus:shadow-outline w-full rounded bg-[#E4665F] py-2 font-bold text-white hover:bg-[#EDC8D5] focus:outline-none"
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
