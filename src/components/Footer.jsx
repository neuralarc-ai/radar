import React from 'react';
import { Link } from 'react-router-dom';
import logoHorizontal from '../assests/Radar_H.png';

const Footer = () => {
  return (
    <footer className="bg-[#202020] text-[#FFFFFF]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src={logoHorizontal} alt="Radar Logo" className="h-8 w-auto mb-4" />
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">IP Protection Made Simple</h3>
            <p className="mb-4">
              Streamline your trademark, patent, and copyright filings with our AI-powered platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-[#868686] hover:text-[#FFFFFF] transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#6C6C6C] text-center">
          <p className="text-sm text-[#868686]">
            © {new Date().getFullYear()} IP Protection Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const MinimalFooter = () => (
  <footer className="bg-[#000000] py-6 text-center text-xs  overflow-x-hidden">
    <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 md:gap-4  text-center">
      <Link to="/terms" className="hover:text-[#6C6C6C] text-[#FFFFFF] transition-colors"><u>Terms of Use</u></Link>
      <span className="text-[#6C6C6C]">•</span>
      <Link to="/privacy" className="hover:text-[#6C6C6C] text-[#FFFFFF] transition-colors"><u>Privacy Policy</u></Link>
      <span className="text-[#6C6C6C]">•</span>
      <Link to="/responsible-ai" className="hover:text-[#6C6C6C] text-[#FFFFFF] transition-colors"><u>Responsible AI</u></Link>
      <span className="text-[#6C6C6C]">•</span>
      <Link to="/disclaimer" className="hover:text-[#6C6C6C] text-[#FFFFFF] transition-colors"><u>Disclaimer</u></Link>
      <span className="text-[#FFFFFF]">•</span>
      <span className="text-[#FFFFFF] text-sm">
        Copyright {new Date().getFullYear()}. All rights reserved.
        <span className="font-semibold text-[#FFFFFF]"> Radar</span>, A thing by <a href='https://www.neuralarc.ai/' target="_blank" rel="noopener noreferrer">
        <span className="font-semibold text-[#FFFFFF]"> NeuralArc</span>
        <img
          src={require('../assests/Vector.png')}
          alt="NeuralArc Logo"
          className="inline-block ml-1 align-middle"
          style={{ height: '18px', width: 'auto', verticalAlign: 'middle' }}
        />
        </a>
      </span>
    </div>
  </footer>
);

export { Footer, MinimalFooter }; 