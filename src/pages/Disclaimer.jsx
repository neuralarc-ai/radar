import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import logoHorizontal from '../assests/logo-horizontal.png';
import footerLogo from '../assests/footer-logo.png';
import footerImage from '../assests/footer-image.png';
import neuralarcLogo from '../assests/neuralarc-logo.png';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-6 px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <img src={logoHorizontal} alt="Radar Logo" className="h-14 w-auto" />
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/signin">
            <button className="border border-[#C67B49] text-[#C67B49] hover:bg-[#C67B49]/5 px-4 py-2 rounded-lg font-medium transition-colors">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#C67B49] hover:bg-[#C67B49]/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Disclaimer Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Radar Platform Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            The Radar platform ("Radar") by NeuralArc is an AI-enabled legal workflow solution designed to assist with legal document generation, research, and process automation. By accessing or using Radar, you agree to the terms of this Disclaimer:
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">No Legal Advice</h2>
          <p className="text-gray-600 mb-6">
            Radar is intended to support—not replace—professional legal judgment. The materials, insights, documents, or any other outputs generated through the platform ("AI Outputs") are informational in nature and do not constitute legal advice, opinion, or counsel. No attorney-client relationship is created through the use of this platform.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">User Responsibility and Due Diligence</h2>
          <p className="text-gray-600 mb-6">
            Users are solely responsible for reviewing and validating all AI Outputs prior to use or reliance. You must ensure that any use of the platform and its outputs is compliant with applicable laws, regulatory standards, and professional obligations. NeuralArc strongly recommends consulting qualified legal professionals before making legal decisions based on AI-generated content.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 mb-6">
            To the fullest extent permitted by law, NeuralArc, its affiliates, officers, employees, and agents shall not be held liable for any loss, claim, liability, or damage, whether direct or indirect, arising from your access to or use of Radar or reliance on any AI Outputs, including but not limited to errors, omissions, or inaccuracies.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">No Warranties</h2>
          <p className="text-gray-600 mb-6">
            Radar is provided "as is" and "as available" without warranties of any kind, express or implied. NeuralArc makes no representations or guarantees regarding the accuracy, completeness, currency, or suitability of the AI Outputs for any particular purpose.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Compliance and Ethical Use</h2>
          <p className="text-gray-600 mb-6">
            Users are expected to use the platform responsibly and in compliance with all applicable legal, ethical, and professional standards. Radar is not a substitute for legal education, experience, or professional judgment.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Modifications</h2>
          <p className="text-gray-600 mb-6">
            NeuralArc reserves the right to update or amend this Disclaimer at any time. Continued use of Radar following any changes constitutes your acceptance of the revised terms.
          </p>
        </div>
      </div>

      <footer className="bg-[#3a2e28] rounded-t-3xl py-12 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div className="flex items-center mb-6 md:mb-0">
              <img src={footerLogo} alt="Radar Logo" className="h-14 w-auto" />
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

export default Disclaimer; 