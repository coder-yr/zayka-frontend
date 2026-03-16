// "use client"
// import React, { useState } from "react";

// const Pricing = () => {
//   const [billingCycle, setBillingCycle] = useState("Cloud Based");

//   const toggleBillingCycle = (cycle) => {
//     setBillingCycle(cycle);
//   };

//   const plans = [
//     {
//       name: "Start",
//       price: "Free",
//       features: ["Vexillologist pitchfork", "Turmeric plaid portland", "Mixtape chillwave tumeric"],
//     },
//     {
//       name: "Pro",
//       price: billingCycle === "Cloud Based" ? "$38/mo" : "$380/yr",
//       features: ["Vexillologist pitchfork", "Turmeric plaid portland", "Hexagon neutra unicorn", "Mixtape chillwave tumeric"],
//       popular: true,
//     },
//     {
//       name: "Business",
//       price: billingCycle === "Cloud Based" ? "$56/mo" : "$560/yr",
//       features: ["Vexillologist pitchfork", "Turmeric plaid portland", "Hexagon neutra unicorn", "Mixtape chillwave tumeric"],
//     },
//     {
//       name: "Special",
//       price: billingCycle === "Cloud Based" ? "$72/mo" : "$720/yr",
//       features: ["Vexillologist pitchfork", "Turmeric plaid portland", "Hexagon neutra unicorn", "Mixtape chillwave tumeric"],
//     },
//   ];

//   return (
//     <div className="bg-screenBackground text-blackColor">
//       <div className="flex flex-col items-center px-4 py-28">
//         <h1 className="text-3xl font-bold text-blackColor">Pricing</h1>
//         <p className="text-ashDark mt-2 text-center max-w-md">
//           Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
//         </p>
//         <div className="mt-6 flex space-x-4">
//           <button
//             className={`px-4 py-2 font-medium rounded-lg ${
//               billingCycle === "Cloud Based" ? "bg-primary text-whiteOnly" : "bg-ashLight text-blackColor"
//             }`}
//             onClick={() => toggleBillingCycle("Cloud Based")}
//           >
//            Cloud Based
//           </button>
//           <button
//             className={`px-4 py-2 font-medium rounded-lg ${
//               billingCycle === "Offline" ? "bg-primary text-whiteOnly" : "bg-ash text-blackColor"
//             }`}
//             onClick={() => toggleBillingCycle("Offline")}
//           >
//            Offline
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`border rounded-lg p-6 shadow-sm flex flex-col items-center bg-cardWhite ${
//                 plan.popular ? "border-primary" : "border-ash"
//               }`}
//             >
//               {plan.popular && (
//                 <span className="px-3 py-1 text-sm font-semibold text-whiteOnly bg-primary rounded-full mb-4">
//                   Popular
//                 </span>
//               )}
//               <h3 className="text-lg font-semibold text-blackColor">{plan.name}</h3>
//               <p className="text-2xl font-bold text-blackColor mt-4">{plan.price}</p>
//               <ul className="mt-4 space-y-2">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-center text-ashDark">
//                     <svg
//                       className="w-5 h-5 text-greenDark mr-2"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//               <button className="mt-6 w-full px-4 py-2 bg-ash text-blackColor font-medium rounded-lg flex justify-center items-center hover:bg-primary hover:text-whiteOnly transition">
//                 Button
//                 <svg
//                   className="w-5 h-5 ml-2"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
"use client";
import React, { useState } from "react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("Cloud Based");
  const [deviceType, setDeviceType] = useState("Desktop Only");

  const toggleBillingCycle = (cycle) => setBillingCycle(cycle);
  const handleDeviceChange = (event) => setDeviceType(event.target.value);

  const allPlans = {
    "Desktop Only": [
      { name: "Start", price: "Free", features: ["Feature 1", "Feature 2", "Feature 3","Feature 4"] },
      { name: "Pro", price: billingCycle === "Cloud Based" ? "$38/mo" : "$380/yr", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], popular: true },
    ],
    "Desktop & Mobile": [
      { name: "Business", price: billingCycle === "Cloud Based" ? "$56/mo" : "$560/yr", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
      { name: "Special", price: billingCycle === "Cloud Based" ? "$72/mo" : "$720/yr", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
    ],
    "Mobile Only": [
      { name: "Pro", price: billingCycle === "Cloud Based" ? "$38/mo" : "$380/yr", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], popular: true },
      { name: "Special", price: billingCycle === "Cloud Based" ? "$72/mo" : "$720/yr", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
    ],
  };

  return (
    <div className="bg-screenBackground dark:bg-black text-blackColor">
      <div className="flex flex-col items-center px-4 py-28">
        <h1 className="text-3xl font-bold text- dark:text-white">Pricing</h1>
        <p className="text-ashDark dark:text-white mt-2 text-center max-w-md">
          Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
        </p>
        
        {/* Toggle Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            className={`px-6 py-2 rounded-md font-medium ${billingCycle === "Cloud Based" ? "bg-primary  text-whiteOnly" : "bg-white border border-[#E80F88] text-blackColor"}`}
            onClick={() => toggleBillingCycle("Cloud Based")}
          >
            Cloud Based
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium ${billingCycle === "Offline" ? "bg-primary text-whiteOnly" : "bg-white border border-[#E80F88] text-blackColor"}`}
            onClick={() => toggleBillingCycle("Offline")}
          >
            Offline
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className="mt-4">
          <select
            className="px-2 py-2 font-medium border border-[#E80F88] rounded-lg bg-white text-blackColor shadow-md"
            value={deviceType}
            onChange={handleDeviceChange}
          >
            <option value="Desktop Only">Desktop Only</option>
            <option value="Desktop & Mobile">Desktop & Mobile</option>
            <option value="Mobile Only">Mobile Only</option>
          </select>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-3/4 px-4">
          {allPlans[deviceType].map((plan, index) => (
            <div
              key={index}
              className={`border rounded-3xl p-8 shadow-sm flex flex-col items-center bg-cardWhite dark:bg-black  w-full max-w-3xl mx-auto ${
                plan.popular ? "border-primary" : "border-ash"
              }`}
            >
              {plan.popular && (
                <span className="px-3 py-1 text-sm font-semibold text-whiteOnly bg-primary dark:bg-gray-900 rounded-full mb-4">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold text-blackColor dark:text-white">{plan.name}</h3>
              <p className="text-3xl font-bold text-blackColor mt-4 dark:text-white">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-lg">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-ashDark dark:text-white">
                    <svg className="w-6 h-6 text-greenDark mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-10.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-2/3 px-4 py-3 bg-white dark:bg-gray-900 text-blackColor dark:text-white border border-[#E80F88] font-medium rounded-lg flex justify-center items-center hover:bg-primary hover:text-whiteOnly transition">
                Select Plan
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
