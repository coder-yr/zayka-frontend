/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
// import Applogo from './Applogo';

function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-8 pb-16 pt-16 lg:pr-12">
          {/* Main Info Section */}
          <div className="col-span-2 lg:col-span-2">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center">
          <div className="font-bold text-white text-2xl">
            Zayka<span className="italic underline">pos</span>
          </div>
        </div>
        <p className="text-white max-w-xs mt-6">
          Manage all your inventories and accounts at one place with one-click
          billing, expenses, taxes, Custom UPI QR, etc.
        </p>
      </div>
      <div className="mt-6 grid space-y-3">
        <a className="inline-flex items-center gap-x-4 text-white hover:text-gray-400 transition-all duration-300" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          info@stockandacountbook.com
        </a>
        <a className="inline-flex items-center gap-x-4 text-white hover:text-gray-400 transition-all duration-300" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
            <path d="M22 16.92V19a2 2 0 0 1-2 2 16 16 0 0 1-7-2 16 16 0 0 1-5-5 16 16 0 0 1-2-7 2 2 0 0 1 2-2h2.08a1 1 0 0 1 1 .79 11 11 0 0 0 .57 2.23 1 1 0 0 1-.23 1.05L9.91 10a12.05 12.05 0 0 0 4.1 4.09l1.08-1.08a1 1 0 0 1 1.05-.23 11 11 0 0 0 2.23.57 1 1 0 0 1 .79 1z" />
          </svg>
          +91-8118815292
        </a>
      </div>
    </div>

    {/* Company Links */}
    <div className="col-span-1">
      <h4 className="font-semibold text-gray-100 uppercase">Company</h4>
      <div className="mt-6 grid space-y-3">
        <p>
          <a className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="#">
            Features
          </a>
        </p>
        <p>
          <a className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="#">
            How To Use
          </a>
        </p>
      </div>
    </div>

    <div className="col-span-1">
      <h4 className="font-semibold text-gray-100 uppercase">Company</h4>
      <div className="mt-6 grid space-y-3">
        <p>
          <a className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="#">
            About Us
          </a>
        </p>
        <p>
          <a className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="#">
            Careers
          </a>
        </p>
      </div>
    </div>

    {/* Important Links */}
    <div className="col-span-1">
      <h4 className="font-semibold text-gray-100 uppercase">Important Links</h4>
      <div className="mt-6 grid space-y-3">
        <p>
          <Link className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="/privacy-policy">
            Privacy Policy
          </Link>
        </p>
        <p>
          <Link className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="/terms-and-conditions">
            Terms & Conditions
          </Link>
        </p>
        <p>
          <Link className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="/refund-policy">
            Refund Policy
          </Link>
        </p>
      </div>
    </div>

    <div className="col-span-1">
      <h4 className="font-semibold text-gray-100 uppercase">Support</h4>
      <div className="mt-6 grid space-y-3">
        <p>
          <Link className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="/faq">
            FAQs
          </Link>
        </p>
        <p>
          <Link className="inline-flex gap-x-2 text-base text-white hover:text-gray-400 transition-all duration-300" href="/contact">
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>




      <div className="py-4 bg-black">
        <div className="container">
          <div className="flex items-center relative">
            {/* Centered Text */}
            <div className="flex-1 text-center" style={{paddingLeft:"140px"}}>
              <p className="text-base text-white">
                2024 © All Rights Reserved -{" "}
                <a href="#">stockandaccountbook.com</a>
              </p>
            </div>

            {/* Social Icons Shifted to Right */}
            <div className="flex space-x-4 ml-auto">
              <a
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent text-white hover:bg-primary transition-all duration-300"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent text-white hover:bg-primary transition-all duration-300"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </a>
              <a
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent text-white hover:bg-primary transition-all duration-300"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent text-white hover:bg-primary transition-all duration-300"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent text-white hover:bg-primary transition-all duration-300"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                </svg>
              </a>
              {/* <!-- Add other social icons here --> */}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;