import React from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <section className="mt-28 mb-5 p-5 h-auto flex flex-col xl:flex-row gap-8 justify-center">
      <div className="w-full flex flex-col gap-3 items-center justify-center mb-5 text-[#6b4e34]">
        <h1 className="text-5xl lg:text-7xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl flex items-center gap-1">brewnbrewcoffees@gmail.com</p>
        <p className="text-xl flex items-center gap-2">123-456-789</p>
        <div className="flex flex-col md:flex-row gap-2 ">
          <ContactCards title={'Customer Support'} email={'bnb.cs@gmail.com'} description={'Our dedicated customer support team is here to assist you with any inquiries or issues you may have, ensuring a smooth and pleasant experience.'}/>
          <ContactCards title={'Bulk Orders'} email={'bnb.order@gmail.com'} description={'We offer flexible options for bulk orders, catering to both personal and business needs with competitive pricing and reliable delivery.'}/>
          <ContactCards title={'Subscription'} 
          email={'bnb.subs@gmail.com'} description={'Enjoy exclusive benefits and discounts by subscribing to our newsletter, and stay updated with our latest offers and new product launches.'}/>
        </div>
      </div>
      <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[50%]  shadow-md p-5 rounded-xl border border-[#6b4e34] bg-[#f4ece3] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-[#6b4e34]">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <h3 className="text-xl">We'd love to hear from you!</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="firstName" className="block text-sm font-semibold text-[#6b4e34] mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName", { required: "First Name is required" })}
                  className="p-2 rounded-md w-full border border-[#6b4e34] bg-[#ffffff]"
                  placeholder="First Name"
                />
                {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block text-sm font-semibold text-[#6b4e34] mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName", { required: "Last Name is required" })}
                  className="p-2 rounded-md w-full border border-[#6b4e34] bg-[#ffffff]"
                  placeholder="Last Name"
                />
                {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-semibold text-[#6b4e34] mb-1">
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                    message: "Invalid Email Format",
                  },
                })}
                className="p-2 rounded-md w-full border border-[#6b4e34] bg-[#ffffff]"
                placeholder="Your email"
              />
              {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-semibold text-[#6b4e34] mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                {...register("phone")}
                className="p-2 rounded-md w-full border border-[#6b4e34] bg-[#ffffff]"
                placeholder="Phone Number"
              />
              {errors.phone && <p className="text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div className="w-full">
              <label htmlFor="message" className="block text-sm font-semibold text-[#6b4e34] mb-1">
                Message
              </label>
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                className="p-2 h-32 rounded-md w-full border border-[#6b4e34] bg-[#ffffff]"
                placeholder="How can we help?"
              />
              {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button type="submit" className="w-full bg-amber-600 p-2 rounded-md text-white hover:bg-amber-700">
              Submit
            </button>
            <p className="text-[#6b4e34] mt-2 text-center text-sm">
              By contacting us, you agree to our{" "}
              <span className="font-bold">Terms of Service</span> and{" "}
              <span className="font-bold">Privacy Policy</span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}


const ContactCards = ({title,email,description})=>{

  return(
    <div className="container m-2 p-5 space-y-3 flex flex-col text-center text-balance border-2 border-[#6b4e34] shadow-md rounded-lg">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="font-semibold">{email}</p>
      <p className="font-light">{description}</p>
    </div>
  );
}