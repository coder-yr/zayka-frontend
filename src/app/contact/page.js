"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { MdOutlineEmail } from "react-icons/md";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessDescription: "",
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const baseURL =
      window.location.hostname === "localhost"
        ? "#"
        : "#";

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
          businessDescription: "",
        });
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <div className="bg-screenBackground text-blackColor">
      <div className="flex flex-col h-auto justify-center items-center pb-16">
        <div className="max-w-7xl w-full flex flex-col md:flex-row justify-center items-center mt-24">
          
          {/* Left Div with AOS Animation */}
          <div
            className="flex flex-col w-full md:w-1/2 justify-center items-center md:items-start text-center md:text-left px-4 py-8"
            data-aos="fade-right"
          >
            <h6 className="text-[25px] font-semibold mb-6 text-primary" style={{ fontFamily: "sans-serif" }}>
              Get in Touch
            </h6>
            <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-10 text-primaryOnly" style={{ fontFamily: "sans-serif" }}>
              Are you ready to talk to <br />
              us?
            </h2>
            <div className="h-px w-3/4 bg-ashDark mb-6"></div>
            <div className="flex justify-center md:justify-start items-center space-x-4 text-blackLight">
              <MdOutlineEmail className="text-3xl text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-blackColor">query@company.com</p>
              </div>
            </div>
          </div>

          {/* Right Div with AOS Animation */}
          <div
            className="flex flex-col w-full md:w-2/5 shadow-lg p-12 rounded-lg bg-cardWhite"
            data-aos="fade-left"
          >
            <h4
              className="text-[30px] font-semibold mb-6 text-primaryOnly"
              style={{ fontFamily: "Noto Sans, sans-serif" }}
            >
              Send us a message
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full p-4 border border-ashDark rounded-md text-blackColor bg-whiteOnly"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full p-4 border border-ashDark rounded-md text-blackColor bg-whiteOnly"
                    required
                  />
                </div>

                {/* Business Description */}
                <div>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    placeholder="Describe your business"
                    className="w-full p-3 border border-ashDark rounded-md text-blackColor bg-whiteOnly"
                    rows="4"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-1/2 p-3 text-whiteColor rounded-md shadow-lg"
                  style={{ borderRadius: "40px", fontSize: 19, backgroundColor: "#E80F88" }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
