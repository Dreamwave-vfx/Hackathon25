import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ShoppingBag,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ReWear Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold">ReWear</span>
          </div>
          <p className="text-sm text-gray-300">
            Join the sustainable fashion revolution. Exchange, swap, and give
            new life to pre-loved clothing while reducing textile waste.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/browse" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/how-it-works" className="hover:text-white">
                Exchange
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white">
                Add item
              </a>
            </li>
            <li>
              <a href="/add-item" className="hover:text-white">
                My account
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-400" />
              Team@DreamWave.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-400" />
              +91 000000000
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-400" />
              Vadnaagar, Gujarat
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ReWear. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Support
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-500">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-500">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
