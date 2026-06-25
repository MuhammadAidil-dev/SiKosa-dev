// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#35A7FF] text-white py-6 font-jakarta w-full md:px-10">
      <div className="w-full px-8 lg:px-20 flex flex-col md:flex-row justify-between items-start">
        {/* Left Section (MyApp, Address, and Social Media) */}
        <div className="flex flex-col items-start space-y-4 mb-6 md:mb-0 w-full lg:w-9/12">
          <div>
            <h2 className="font-bold text-xl">Sikosa</h2>
          </div>
          <div>
            <p className="text-sm font-semibold">Muhammad Aidil</p>
            <p className="text-sm font-semibold">NIM: 403221010060</p>
            <p className="text-sm font-semibold">Prodi Sistem Informasi</p>
            <p className="text-sm font-semibold">Tembilahan, Kab. Indragiri Hilir, Riau</p>
          </div>
          {/* Social Media and WhatsApp */}
          <div className="flex space-x-6 items-center">
            <Link to="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-500 text-xl" />
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500 text-xl" />
            </Link>
            <Link to="https://wa.me/1234567890" target="_blank" rel="noreferrer">
              <FaWhatsapp className="hover:text-green-500 text-xl" />
            </Link>
          </div>
        </div>

        {/* Right Section (Contact Info) */}
        <div className="text-sm text-start lg:text-start w-full lg:pl-10 lg:w-3/12 lg:mt-0 mt-5">
          <h3 className="font-bold text-xl mb-3">Contact</h3>
          <p className="mb-3">
            Phone:{" "}
            <Link to="tel:+6288211538599" className="hover:underline">
              +6288211538599
            </Link>
          </p>
          <p className="mb-3">
            Email:{" "}
            <Link to="mailto:Sikosa@gmail.com" className="hover:underline">
              Sikosa@gmail.com
            </Link>
          </p>
          <p>
            Support:{" "}
            <Link to="mailto:Sikosa@gmail.com" className="hover:underline">
              Sikosa@gmail.com
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-white pt-4 text-sm font-semibold text-white text-center">
        © Sikosa all rights {new Date().getFullYear()} - Designed by Muhammad Aidil
      </div>
    </footer>
  );
};

export default Footer;
