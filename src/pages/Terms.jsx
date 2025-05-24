import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import logoHorizontal from '../assests/logo-horizontal.png';
import footerLogo from '../assests/footer-logo.png';
import footerImage from '../assests/preview01.png';
import neuralarcLogo from '../assests/neuralarc-logo.png';
import radarLogoPng from '../assests/Radar_beta.png';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white grain-texture">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-6 px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img src={radarLogoPng} alt="Radar Logo" className="w-[105px] h-[54px] object-contain" />
        </div>
        <div className="flex gap-4">
          <Link to="/signin">
            <div className="gradient-border-wrapper rounded-[4px] group">
              <button className="bg-transparent text-[#4f4f4f] hover:bg-[#322B25]/50 hover:text-[#322B25]/90 rounded-[4px] px-[27px] py-[16px] font-medium focus:outline-none transition-transform duration-200 hover:scale-105">
                Sign In
              </button>
            </div>
          </Link>
        </div>
      </nav>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>
        <div className="mb-8">
          <p className="text-gray-600 mb-1">Effective Date: May 2, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            Please read these Terms of Use ("Terms") carefully before using the NeuralArc Radar website 
            and services operated by NeuralArc ("us", "we", or "our").
          </p>
          
          <p>
            Your access to and use of the service is conditioned on your acceptance of and compliance with 
            these Terms. These Terms apply to all visitors, users, and others who access or use the service.
          </p>
          
          <p>
            By accessing or using the service, you agree to be bound by these Terms. If you disagree 
            with any part of the terms, you may not access the service.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Use of the Service</h2>
          <p>
            NeuralArc Radar provides an AI-powered platform for intellectual property management, 
            including trademark, patent, and copyright filings. By using our service, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and complete information when registering and using the service</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use the service in compliance with all applicable laws and regulations</li>
            <li>Not attempt to interfere with or disrupt the service or servers</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">2. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the 
            exclusive property of NeuralArc and its licensors. The service is protected by copyright, 
            trademark, and other laws of both the United States and foreign countries.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">3. User Content</h2>
          <p>
            You retain all rights to any content you submit, post, or display on or through the service. 
            By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
            reproduce, modify, and display such content on our service, subject to our Privacy Policy.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall NeuralArc, its directors, employees, partners, agents, suppliers, or affiliates 
            be liable for any indirect, incidental, special, consequential, or punitive damages, including 
            without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            We will provide notice of any changes by posting the new Terms on this page. You are advised 
            to review these Terms periodically for any changes.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul className="list-none mb-4">
            <li><strong>Email:</strong> legal@neuralarc.ai</li>
            <li><strong>Address:</strong> 123 Innovation Way, Tech City, CA 94101</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#232323] py-12 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div className="flex items-center mb-6 md:mb-0">
              <img src={require('../assests/Radar.svg').default} alt="Radar Logo" className="h-8 w-auto" />
              <span className="text-[#AFAFAF] text-sm ml-4">IP Protection Made Simple</span>
            </div>
          </div>
          <div className="pb-4">

            <div className="flex flex-col md:flex-row justify-start items-start gap-2 md:gap-6 mb-4">
              {/* Footer navigation links - ensure your router has these routes */}
              <Link to="/terms" className="text-sm text-[#FFFFFF] hover:text-white"><u>Terms of Use</u></Link>
              <span className="hidden md:inline text-[#FFFFFF]">•</span>
              <Link to="/privacy" className="text-sm text-[#FFFFFF] hover:text-white"><u>Privacy Policy</u></Link>
              <span className="hidden md:inline text-[#FFFFFF]">•</span>
              <Link to="/responsible-ai" className="text-sm text-[#FFFFFF] hover:text-white"><u>Responsible AI</u></Link>
              <span className="hidden md:inline text-[#FFFFFF]">•</span>
              <Link to="/disclaimer" className="text-sm text-[#FFFFFF] hover:text-white"><u>Disclaimer</u></Link>
            </div>
            <div className="flex justify-start mb-4">
              <div className="w-[600px] h-0.5 bg-gradient-to-r from-gray-500/30 to-gray-700/0 rounded-full"></div>
            </div>
            <div>
              <p className="text-[#AFAFAF] mt-4 text-sm">
                Copyright 2025. All rights reserved. Radar, A thing by
                <a
                  href="https://www.neuralarc.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-1"
                >
                  <img
                    src={neuralarcLogo} // <-- Replace with actual path
                    alt="NeuralArc Logo"
                    width="81"
                    height="25"
                    className="inline-block ml-1 align-baseline relative top-[3px]"
                  />
                </a>
              </p>

            </div>
          </div>
        </div>
        <div className="hidden md:block absolute right-0 top-0 h-full">
          <img
            src={footerImage}
            alt="Radar Application Interface"
            className="h-full object-cover rounded-tl-3xl shadow-lg"
          />
        </div>
      </footer>
    </div>
  );
};

export default Terms; 