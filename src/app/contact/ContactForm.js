"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Form submission failed");

      setSubmitted(true);
      reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000); // Remove the success message after 5 seconds
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      {submitted && <p className="alert alert-success">Form submitted successfully!</p>}

      <div className="col-lg-6">
        <input
          {...register("contact_name", { required: "Name is required" })}
          type="text"
          className={`form-control ${errors.contact_name ? "is-invalid" : ""}`}
          placeholder="Your Name *"
        />
        {errors.contact_name && <div className="invalid-feedback">{errors.contact_name.message}</div>}
      </div>

      <div className="col-lg-6">
        <input
          {...register("contact_email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
          })}
          type="email"
          className={`form-control ${errors.contact_email ? "is-invalid" : ""}`}
          placeholder="Your Email Address *"
        />
        {errors.contact_email && <div className="invalid-feedback">{errors.contact_email.message}</div>}
      </div>

      <div className="col-lg-6">
        <input
          {...register("contact_mobile", { required: "Mobile number is required" })}
          type="text"
          className={`form-control ${errors.contact_mobile ? "is-invalid" : ""}`}
          placeholder="Your Mobile Number *"
        />
        {errors.contact_mobile && <div className="invalid-feedback">{errors.contact_mobile.message}</div>}
      </div>

      <div className="col-lg-6">
        <input
          {...register("contact_phone")}
          type="text"
          className="form-control"
          placeholder="Phone Number"
        />
      </div>

      <div className="col-lg-6">
        <input
          {...register("company_name", { required: "Company name is required" })}
          type="text"
          className={`form-control ${errors.company_name ? "is-invalid" : ""}`}
          placeholder="Company Name *"
        />
        {errors.company_name && <div className="invalid-feedback">{errors.company_name.message}</div>}
      </div>

      <div className="col-lg-6">
        <input
          {...register("contact_country", { required: "Country is required" })}
          type="text"
          className={`form-control ${errors.contact_country ? "is-invalid" : ""}`}
          placeholder="Country *"
        />
        {errors.contact_country && <div className="invalid-feedback">{errors.contact_country.message}</div>}
      </div>

      <div className="col-12">
        <input
          {...register("contact_address", { required: "Address is required" })}
          type="text"
          className={`form-control ${errors.contact_address ? "is-invalid" : ""}`}
          placeholder="Address *"
        />
        {errors.contact_address && <div className="invalid-feedback">{errors.contact_address.message}</div>}
      </div>

      <div className="col-12">
        <textarea
          {...register("contact_message", { required: "Message is required" })}
          className={`form-control ${errors.contact_message ? "is-invalid" : ""}`}
          rows="3"
          placeholder="Your Message *"
        />
        {errors.contact_message && <div className="invalid-feedback">{errors.contact_message.message}</div>}
      </div>

      <div className="col-12 text-center">
        <button className="btn btn-outline-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;