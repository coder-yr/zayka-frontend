"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";
import CardIconSection from '../components/Home/CardIconSection';
import { useTranslation } from "react-i18next";
const service = [
  {
    title: "Mobile App Development",
    description:
      "Mobile app development is a process for building mobile applications that run on mobile devices. These applications can either be pre-installed or downloaded and installed by the user later...",
    image: "https://static.sooperarticles.com/media/5/7/89e47e3473ca3442a771b8bdbd9912e7-best-mobile-app-development-services.jpg", // Update with your actual image path
  },
  {
    title: "Website Development",
    description:
      "Web development refers to the building, creating, and maintaining of websites. It includes aspects such as web design, web programming, and database management...",
    image: "https://static.vecteezy.com/system/resources/previews/000/111/203/original/free-web-development-vector-background.jpg", // Update with your actual image path
  },
  {
    title: "E-commerce Solutions",
    description:
      "We create e-commerce platforms best suited for your business model. Our solutions offer seamless UI, secure payments, and a great shopping experience...",
    image: "https://www.radicalcloudsolutions.com/wp-content/uploads/2020/07/745129a7-ecommerce_solutions.png",
  },
];
const faqs = [
  { question: "Can I get more credits?", answer: "Yes, you can purchase additional credits anytime." },
  { question: "Can I change my plan later?", answer: "Absolutely! You can upgrade or downgrade your plan anytime." },
  { question: "What if I decide to cancel?", answer: "You can cancel your subscription without any extra charges." },
  { question: "Will my unused credits roll over to the next month?", answer: "No, unused credits do not roll over." },
  { question: "Is the payment service secure?", answer: "Yes, we use secure and encrypted payment services." },
];
const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    businessDescription: "",
  });
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
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

    const baseURL = window.location.hostname === "localhost" ? "#" : "#";

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(t("pages.partner.successAlert"));
        setFormData({
          name: "",
          phone: "",
          pincode: "",
          businessDescription: "",
        });
      } else {
        const errorResponse = await response.json();
        alert(`${t("pages.partner.errorPrefix")}: ${errorResponse.error || t("pages.partner.genericError")}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t("pages.partner.failedAlert"));
    }
  };

  return (
    <>
      <div className="bg-screenBackground text-blackColor">
        <div className="flex flex-col h-auto justify-center items-center pb-16">
          <div className="max-w-7xl w-full flex flex-col md:flex-row justify-center items-center mt-24">
            <div
              className="flex flex-col w-full md:w-3/5 justify-start items-start px-4 py-12"
              data-aos="fade-right"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 leading-snug md:leading-[1.8]">
                {t("pages.partner.heroHeadingLine1")} <br /> {t("pages.partner.heroHeadingLine2")}
              </h2>

              <ul className="space-y-6 text-lg text-gray-700 w-full">
                <li className="flex items-start space-x-3">
                  <MdOutlineCheckCircle className="text-primary text-2xl mt-1" />
                  <p>
                    {t("pages.partner.point1")}
                  </p>
                </li>

                <li className="flex items-start space-x-3">
                  <MdOutlineCheckCircle className="text-primary text-2xl mt-1" />
                  <p>{t("pages.partner.point2")}</p>
                </li>

                <li className="flex items-start space-x-3">
                  <MdOutlineCheckCircle className="text-primary text-2xl mt-1" />
                  <p>{t("pages.partner.point3")}</p>
                </li>
              </ul>
            </div>

            <div
              className="flex flex-col w-full md:w-2/5 shadow-lg p-12 rounded-lg bg-cardWhite"
              data-aos="fade-left"
            >
              <h4
                className="text-[30px] font-semibold mb-6 text-primary"
                style={{ fontFamily: "Noto Sans, sans-serif" }}
              >
                {t("pages.partner.sendUsMessage")}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("pages.contact.placeholderName")}
                    className="w-full p-4 border border-ash rounded-md text-blackColor"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("pages.contact.placeholderPhone")}
                    className="w-full p-4 border border-ash rounded-md text-blackColor"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder={t("pages.partner.placeholderPincode")}
                    className="w-full p-4 border border-ash rounded-md text-blackColor"
                    required
                  />
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    placeholder={t("pages.contact.placeholderBusiness")}
                    className="w-full p-3 border border-ash rounded-md text-blackColor"
                    rows="4"
                    required
                  />
                  <button
                    type="submit"
                    className="w-1/2 p-3 text-whiteOnly rounded-md shadow-lg bg-primary"
                    style={{ borderRadius: "40px", fontSize: 19 }}
                  >
                    {t("pages.contact.sendMessage")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <section className="text-blackLight py-16 px-4 lg:px-24  bg-screenBackground">
        {service.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-start justify-center text-center md:text-left gap-8 mb-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } ${index === 1 ? "md:ml-auto md:mr-12" : ""
              }`}
          >
            {/* Image Section */}
            <div className={`w-full md:w-1/2 flex justify-center ${index === 1 ? "md:justify-end" : "md:justify-start"
              } self-start`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-[80%] md:w-full max-w-sm rounded-lg shadow-lg shadow-primary/40"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 self-start">
                <h2 className="text-4xl font-bold text-primary">{t(`pages.partner.services.${index}.title`, { defaultValue: service.title })}</h2>
                <p className="text-ashDark mt-4">{t(`pages.partner.services.${index}.description`, { defaultValue: service.description })}</p>
            </div>
          </div>
        ))}
      </section>
      <CardIconSection />
      <section className='py-16 px-8 text-black bg-screenBackground' data-aos="fade-up">
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mt-2'>
              {t("pages.partner.faqHeading")}
          </h1>
          <div className='mt-8 space-y-6'>
            {faqs.map((faq, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className='border-b border-gray-300 pb-4'>
                <button className='w-full flex justify-between items-center text-left text-lg text-gray-700 font-medium hover:text-gray-900' onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                  {t(`pages.partner.faqs.${index}.question`, { defaultValue: faq.question })}
                  <span className='text-gray-500 text-lg'>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <p className='mt-3 text-gray-600 text-sm'>
                    {t(`pages.partner.faqs.${index}.answer`, { defaultValue: faq.answer })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
