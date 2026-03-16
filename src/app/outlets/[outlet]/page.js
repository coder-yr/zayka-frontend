/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMobileAlt, FaLaptopCode, FaBullhorn, FaShoppingCart, FaGamepad, FaGlobe ,FaUtensils, FaStore, FaCoffee, FaIceCream, FaBirthdayCake, FaBeer, FaPizzaSlice} from "react-icons/fa";
import Typewriter from "react-typewriter-effect";

const categoriesData = {
    "fine-dine": {
      name: "Fine Dine",
      icon: <FaUtensils size={150} />,
      image: "https://www.opentable.co.uk/blog/wp-content/uploads/sites/110/2023/04/safeimagekit-grpetrus1890october202238_rpiipf-3-scaled.jpg",
    },
    "qsr": {
      name: "QSR",
      icon: <FaStore size={150} />,
      image: "https://s15543.pcdn.co/wp-content/uploads/2021/10/qsr-digital-signage-technology-900x450.jpg",
    },
    "cafe": {
      name: "Cafe",
      icon: <FaCoffee size={150} />,
      image: "/images/cafe.jpg",
    },
    "food-court": {
      name: "Food Court",
      icon: <FaStore size={150} />,
      image: "/images/food-court.jpg",
    },
    "kitchen": {
      name: "Kitchen",
      icon: <FaUtensils size={150} />,
    
      image: "/images/kitchen.jpg",
    },
    "icecream-desserts": {
      name: "IceCream Desserts",
      icon: <FaIceCream size={150} />,
      image: "/images/icecream.jpg",
    },
    "bakery": {
      name: "Bakery",
      icon: <FaBirthdayCake size={150} />,

      image: "/images/bakery.jpg",
    },
    "bar-brewery": {
      name: "Bar and Brewery",
      icon: <FaBeer size={150} />,
      image: "/images/bar.jpg",
    },
    "pizzeria": {
      name: "Pizzeria",
      icon: <FaPizzaSlice size={150} />,
      
      image: "/images/pizzeria.jpg",
    },
    "large-chain": {
      name: "Large Chain",
      icon: <FaStore size={150} />,
      image: "/images/large-chain.jpg",
    },
  };
  
const services = [
    { title: "Mobile App Development", description: "World-class Android and IOS app development.", icon: <FaMobileAlt size={30} /> },
    { title: "Software Development", description: "Desktop software for billing or other business purposes.", icon: <FaLaptopCode size={30} /> },
    { title: "Digital Marketing", description: "Advertising your business on platforms like Facebook, Instagram, Google, etc.", icon: <FaBullhorn size={30} /> },
    { title: "Website Development", description: "Designing websites for business, personal, or professional use.", icon: <FaGlobe size={30} /> },
    { title: "Ecommerce Stores", description: "We design e-commerce platforms best suited for your business model.", icon: <FaShoppingCart size={30} /> },
    { title: "Games Development", description: "Designing and developing games for mobile and desktop.", icon: <FaGamepad size={30} /> },
];

const faqs = [
    { question: "Can I get more credits?", answer: "Yes, you can purchase additional credits anytime." },
    { question: "Can I change my plan later?", answer: "Absolutely! You can upgrade or downgrade your plan anytime." },
    { question: "What if I decide to cancel?", answer: "You can cancel your subscription without any extra charges." },
    { question: "Will my unused credits roll over to the next month?", answer: "No, unused credits do not roll over." },
    { question: "Is the payment service secure?", answer: "Yes, we use secure and encrypted payment services." },
];
const products = [
    {
        id: 1,
        title: "SR 16 Grid Makeup Organizer Drawer Desk Multipurpose Plastic",
        price: "₹199",
        oldPrice: "₹499",
        discount: "60% off",
        image: "https://www.katiesbliss.com/wp-content/uploads/2019/08/Best-Amazon-Products-7.jpg",
        tag: "Featured now",
    },
    {
        id: 2,
        title: "Zollyss Makeup Brush Holder Organizer, 360° Rotating Makeup Brush",
        price: "₹299",
        oldPrice: "₹899",
        discount: "67% off",
        image: "https://www.katiesbliss.com/wp-content/uploads/2019/08/Best-Amazon-Products.jpg",
    },
    {
        id: 3,
        title: "Kuber Industries Makeup Storage Organizer | Limited Time Deal",
        price: "₹499",
        oldPrice: "₹2,699",
        discount: "82% off",
        tag: "Limited time deal",
        image: "https://www.katiesbliss.com/wp-content/uploads/2019/08/Best-Amazon-Products.jpg",
    },
    {
        id: 4,
        title: "Zollyss 360° Rotating Makeup Organizer, Bathroom Makeup Stand",
        price: "₹299",
        oldPrice: "₹1,599",
        discount: "81% off",
        image: "https://www.katiesbliss.com/wp-content/uploads/2019/08/Best-Amazon-Products.jpg",
    },
    {
        id: 5,
        title: "JEEJEX Acrylic Cosmetic Organizer Makeup Brush Holder",
        price: "₹248",
        oldPrice: "₹500",
        discount: "50% off",
        image: "https://www.katiesbliss.com/wp-content/uploads/2019/08/Best-Amazon-Products.jpg",
    },
    {
        id: 6,
        title: "Vitalogy - Cosmetic Makeup Organizer for Professional Use",
        price: "₹674",
        oldPrice: "₹2,999",
        discount: "78% off",
        tag: "Limited time deal",
        image: "https://www.katiesbliss.com/wp-content/uploads/2019/08/Best-Amazon-Products.jpg",
    },
];

const CategoryPage = () => {
  const { outlet } = useParams();
  const [outletData, setOutletData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (outlet && categoriesData[outlet]) {
      setOutletData(categoriesData[outlet]);
    }
  }, [outlet]);
  useEffect(() => {
    const handleScroll = () => {
        setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);


  if (!outletData) return <p className="text-center mt-20 text-2xl">Loading...</p>;

  return (
    <>
    <section className="min-h-screen flex items-center py-20 px-4 sm:px-8 lg:px-40 bg-screenBackground">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
        {/* Content Section */}
        <div className="flex flex-col justify-center lg:pr-8" data-aos="fade-right">
          <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl tracking-normal capitalize leading-normal font-bold max-w-2xl">
            {outletData.name}{" "}
            <span className="text-[#E80F88]">
              <Typewriter
                multiText={[
                  "Discover the best!",
                  "Tailored for your needs!",
                  "Elevate your experience!"
                ]}
                cursor
                cursorColor="#E80F88"
                typeSpeed={100}
                eraseSpeed={50}
                eraseDelay={1000}
                loop={true}
              />
            </span>
          </h1>
          <p className="text-base font-medium text-muted mt-3 capitalize">
            Experience the best {outletData.name} services tailored to your needs.
          </p>
          <button className="lg:mt-16 mt-4 w-2/3 px-0 py-2 bg-white text-black border border-[#E80F88] font-medium rounded-lg lg:text-lg hover:bg-black hover:text-white transition-colors duration-300">
            Explore {outletData.name}
          </button>
        </div>

        {/* Image/Icon Section */}
        <div className="flex items-center justify-center lg:justify-start lg:ml-24" data-aos="fade-left">
          {outletData.image ? (
            <img
              src={outletData.image}
              alt={outletData.name}
              className="w-full max-w-lg xl:max-w-xl h-auto object-contain rounded-lg"
            />
          ) : (
            <div className="text-[#E80F88] text-9xl">{outletData.icon}</div>
          )}
        </div>
      </div>
    </section>
    <section className="flex flex-col items-center text-center py-12 px-4 lg:px-24 bg-screenBackground">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-['DM_Sans',sans-serif]">
          How to Setup Billing Business on Zaykapos App
        </h2>

        {/* Video Wrapper */}
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    <section className="px-6 lg:px-28 w-screen py-16  bg-screenBackground">
    <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blackLight">
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
<section className="py-12 px-6 bg-screenBackground">
    <h2 className="text-3xl font-bold text-blackLight mb-8 text-center">
        Best <span className="text-primary">Deals</span> For You
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
            <div
                key={product.id}
                className="bg-cardWhite rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 relative"
            >
                {product.tag && (
                    <span className="absolute top-2 left-2 bg-red text-whiteOnly text-xs px-2 py-1 rounded">
                        {product.tag}
                    </span>
                )}
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-contain rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-blackLight truncate mb-2">
                    {product.title}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl font-bold text-blackColor">{product.price}</span>
                    <span className="line-through text-ash text-sm">{product.oldPrice}</span>
                    <span className="text-greenDark text-sm font-medium">{product.discount}</span>
                </div>
                <button className="w-full py-2 mt-3 bg-primary hover:bg-primaryLight text-whiteOnly rounded-lg transition">
                    Add to Cart
                </button>
            </div>
        ))}
    </div>
</section>


<section className='py-16 px-8   text-black bg-screenBackground' data-aos="fade-up">
    <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mt-2'>
            Frequently Asked Questions
        </h1>
        <div className='mt-8 space-y-6'>
            {faqs.map((faq, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className='border-b border-gray-300 pb-4'>
                    <button className='w-full flex justify-between items-center text-left text-lg text-gray-700 font-medium hover:text-gray-900' onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                        {faq.question}
                        <span className='text-gray-500 text-lg'>
                            {activeIndex === index ? "−" : "+"}
                        </span>
                    </button>
                    {activeIndex === index && (
                        <p className='mt-3 text-gray-600 text-sm'>
                            {faq.answer}
                        </p>
                    )}
                </div>
            ))}
        </div>
    </div>
</section>

{showButton && (
    <button className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-black border border-[#E80F88] font-bold py-3 px-6 rounded-full shadow-lg hover:text-white hover:bg-black hover:shadow-xl transition z-[1000]">
        Download App
    </button>
)}
</>
  );
};

export default CategoryPage;
