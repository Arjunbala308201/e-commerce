import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 text-[10px] md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
          {/* About Section */}
          <div>
            <h5 className="text-white font-semibold mb-4">ABOUT</h5>
            <ul className="space-y-1 text-[10px]">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
              <li>Press</li>
              <li>Corporate Information</li>
            </ul>
          </div>

          {/* Group Companies */}
          <div>
            <h5 className="text-white font-semibold mb-4">GROUP COMPANIES</h5>
            <ul className="space-y-1 text-[10px]">
              <li>Myntra</li>
              <li>Cleartrip</li>
              <li>Shopsy</li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h5 className="text-white font-semibold mb-4">HELP</h5>
            <ul className="space-y-1 text-[10px]">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Consumer Policy */}
          <div>
            <h5 className="text-white font-semibold mb-4">CONSUMER POLICY</h5>
            <ul className="space-y-1 text-[10px]">
              <li>Cancellation & Returns</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
              <li>EPR Compliance</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="text-white font-semibold mb-4">Mail Us:</h5>
            <p className="text-[10px]">
              Flipkart Internet Private Limited, <br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br />
              Outer Ring Road, Devarabeesanahalli Village, <br />
              Bengaluru, 560103, Karnataka, India
            </p>

            <h5 className="text-white font-semibold mt-6 mb-4">
              Registered Office Address:
            </h5>
            <p className="text-[10px]">
              Flipkart Internet Private Limited, <br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br />
              Outer Ring Road, Devarabeesanahalli Village, <br />
              Bengaluru, 560103, Karnataka, India <br />
              CIN: U51109KA2012PTC066107 <br />
              Telephone: 044-45614700 / 044-67452800
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 text-sm">
          {/* Links */}
          <div className="flex space-x-6">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">👜</span>
              <span>Become div Seller</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">⭐</span>
              <span>Advertise</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">🎁</span>
              <span>Gift Cards</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">❓</span>
              <span>Help Center</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 md:mt-0">
            © 2007-2025 Flipkart.com
          </div>

          {/* Payment Options */}
          <div className="flex items-center space-x-1 text-[10px] mt-4 md:mt-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/div/a4/Visa_Logo.png"
              alt="Visa"
              className="w-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1 text-[10px]/2a/Mastercard-logo.png"
              alt="MasterCard"
              className="w-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/57/Rupay-Logo.png"
              alt="RuPay"
              className="w-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Discover_Card_logo.png"
              alt="Discover"
              className="w-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
