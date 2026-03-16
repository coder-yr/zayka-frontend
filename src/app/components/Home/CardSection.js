"use client";
import React from "react";
import { FaMobileAlt, FaLaptopCode, FaBullhorn, FaShoppingCart, FaGamepad, FaGlobe } from "react-icons/fa";
const services = [
    {
        title: "Mobile App Development",
        description: "World-class Android and IOS app development.",
        icon: <FaMobileAlt size={30} />,
    },
    {
        title: "Software Development",
        description: "Desktop software for billing or other business purposes.",
        icon: <FaLaptopCode size={30} />,
    },
    {
        title: "Digital Marketing",
        description: "Advertising your business on platforms like Facebook, Instagram, Google, etc.",
        icon: <FaBullhorn size={30} />,
    },
    {
        title: "Website Development",
        description: "Designing websites for business, personal, or professional use.",
        icon: <FaGlobe size={30} />,
    },
    {
        title: "Ecommerce Stores",
        description: "We design e-commerce platforms best suited for your business model.",
        icon: <FaShoppingCart size={30} />,
    },
    {
        title: "Games Development",
        description: "Designing and developing games for mobile and desktop.",
        icon: <FaGamepad size={30} />,
    },
];
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
const cardsection = () => {
    return (
        <>
       <section className="dark:bg-black px-6 lg:px-28 py-16 bg-screenBackground">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-blackLight dark:text-white">
      Which <span className="text-primary">Services</span> We Provide
    </h2>
    <p className="text-ashDark mt-2">
      Sm digital develops and maintains Websites, Mobile Applications (Android and iOS), 
      Desktop Software, Games, and E-commerce stores.
    </p>
  </div>

  {/* Services Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {services.map((service, index) => (
      <div 
        key={index} 
        className="flex items-center space-x-4 p-4 rounded-lg shadow-lg 
                 bg-gradient-to-br from-primaryLight via-primary to-redLight 
                 w-full max-w-md mx-auto
                 transition-all duration-300 ease-in-out transform 
                 hover:scale-105 hover:shadow-[0_4px_20px_#E80F88]"
      >
        <div className="bg-blackColor text-whiteOnly p-3 rounded-lg">
          {service.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-whiteOnly">{service.title}</h3>
          <p className="text-ashLight text-sm">{service.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>

<section className=" dark:bg-black text-blackLight py-16 px-4 lg:px-24 bg-screenBackground">
  {service.map((service, index) => (
    <div
      key={index}
      className={`flex flex-col md:flex-row items-start justify-center text-center md:text-left gap-8 mb-16 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } ${
        index === 1 ? "md:ml-auto md:mr-12" : ""
      }`}
    >
      {/* Image Section */}
      <div className={`w-full md:w-1/2 flex justify-center ${
          index === 1 ? "md:justify-end" : "md:justify-start"
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
        <h2 className="text-4xl font-bold text-primary">{service.title}</h2>
        <p className="text-ashDark mt-4">{service.description}</p>
      </div>
    </div>
  ))}
</section>


     </>
    );
};
export default cardsection;