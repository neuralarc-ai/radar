import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, CreditCard, Check, Cpu, PhoneCall } from 'react-feather';
import platformImage from '../assests/preview01.png';
import footerImage from '../assests/preview01.png';
import neuralarcLogo from '../assests/neuralarc-logo.svg';
import footerLogo from '../assests/footer-logo.png';
import radarLogoPng from '../assests/Radar_beta.png';
import { ReactComponent as RadarLogo } from '../assests/Radar.svg';
import LandingPageImage from '../assests/LandingPage_image.png';

const Landing = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-[#FFFFFF]" />,
      title: "AI-Powered Compliance Check",
      description: "Our advanced AI system ensures your filings meet all legal requirements, reducing rejection rates."
    },
    {
      icon: <FileText className="h-6 w-6 text-[#FFFFFF]" />,
      title: "Easy Document Management",
      description: "Upload and analyze documents with our intuitive drag-and-drop interface. Get instant feedback on your submissions."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#FFFFFF]" />,
      title: "Smart Class Selection Assistant",
      description: "Let our AI recommend the right trademark classes for your application based on your product or service description, no legal jargon needed."
    }
  ];

  const benefits = [
    "Reduce filing errors with AI assistance",
    "Save time with automated document analysis",
    "Track your filings in real-time"
  ];

  const bgColors = ['#C0C6B8', '#C6AEA3', '#A9A9A9'];

  return (
    <div className="min-h-screen bg-[#FBFAF8] grain-texture ">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-6 px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <img src={radarLogoPng} alt="Radar Logo" className="w-[105px] h-[54px] object-contain" />
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/signin">
            <button className="bg-transparent text-[#232323] border border-[#232323] border-[1px] rounded-[4px] px-[27px] py-[16px] text-lg flex items-center gap-2 focus:outline-none">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-[#202020] leading-tight">
          Simplify Your Legal Workflow
          <br />
          with AI Precision
        </h1>

        <p className="text-[#4f4f4f]/60 text-lg md:text-xl mb-4 max-w-3xl">
          Streamline your trademark, patent, and copyright filings with our intelligent platform.
        </p>
        <p className="text-[#4f4f4f]/60 text-lg md:text-xl mb-16 max-w-3xl">
          Get higher accuracy and faster approvals with AI assistance.
        </p>
        <img src={LandingPageImage} alt="Landing Page Image" className="w-full h-full object-cover" />
        <Link to="/signin">
          <button className="bg-transparent text-[#232323] border border-[#232323] border-[1px] rounded-[4px] px-[27px] py-[16px] text-lg flex items-center gap-2 focus:outline-none">
            Try Now <span><ArrowRight className="h-5 w-5" /></span>
          </button>
        </Link>

        {/* Trust Indicators Box */}
        <div className="mt-12 w-full flex justify-center">
          <div className="bg-white rounded-[24px] shadow-sm px-6 py-8 w-full max-w-5xl flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#232323] text-center mb-8">
              Transform your investment decisions<br />with cutting-edge AI technology
            </h2>
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
              {/* Card 1 */}
              <div className="flex-1 min-w-[220px] bg-[#CFC1B1] rounded-[10px] p-8 flex flex-col items-start justify-between">
                <div className="flex items-center mb-6">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F3F3F0]">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#CFD4C9]">
                      <Cpu className="w-6 h-6 text-[#232323]" />
                    </span>
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#232323] leading-tight">AI-Powered Accuracy</div>
              </div>
              {/* Card 2 */}
              <div className="flex-1 min-w-[220px] bg-[#CFC1B1] rounded-[10px] p-8 flex flex-col items-start justify-between">
                <div className="flex items-center mb-6">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F3F3F0]">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#CFD4C9]">
                      <Shield className="w-6 h-6 text-[#232323]" />
                    </span>
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#232323] leading-tight">Secure & Compliant</div>
              </div>
              {/* Card 3 */}
              <div className="flex-1 min-w-[220px] bg-[#CFC1B1] rounded-[10px] p-8 flex flex-col items-start justify-between">
                <div className="flex items-center mb-6">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F3F3F0]">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#CFD4C9]">
                      <PhoneCall className="w-6 h-6 text-[#232323]" />
                    </span>
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#232323] leading-tight">24/7 Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#F8F7F3] py-24 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] text-center mb-6">
            Powerful Features for Your IP Protection
          </h2>
          <p className="text-[#1E1E1E]/60 text-center mb-16 max-w-3xl mx-auto text-lg">
            Streamline your intellectual property filings with our comprehensive
            suite of tools and AI assistance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-[12px] bg-[#FFFFFF] border border-[#FFFFFF]/4 overflow-hidden shadow-sm relative grain-texture transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg">
                <div className="p-8 relative z-10">
                  {/* Icon container with border */}
                  <div className="mb-6 w-14 h-14 rounded-[6px] border border-[#FFFFFF]/4 flex items-center justify-center" style={{ backgroundColor: bgColors[index % 3] }}>
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-medium mb-6 text-[#000000]">{feature.title}</h3>

                  {/* Description in a slightly darker background */}
                  <div className="mt-4 p-5 rounded-[8px]" style={{ backgroundColor: bgColors[index % 3] }}>
                    <p className="text-[#000000]">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simplifying IP Section */}
      <div className="py-24 px-4 rounded-[8px] max-w-6xl mx-auto animate-fade-in">
        <div className="border border-[#FFFFFF]/4 rounded-[8px] p-8 md:p-12 shadow-sm bg-[#CFD4C9]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6">
                Simplifying IP Protection for Everyone
              </h2>
              <p className="text-[#000000] mb-8">
                Our platform revolutionizes the way you protect your intellectual property.
                With AI-powered assistance, we make trademark, patent, and copyright filings
                accessible, affordable, and efficient for businesses of all sizes.
              </p>

            </div>

            <div className="relative -mr-12">
                
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#232323] py-12 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div className="flex items-center mb-6 md:mb-0">
              <RadarLogo className="h-8 w-auto" />
              <span className="text-[#868686] text-sm ml-4">IP Protection Made Simple</span>
            </div>
          </div>
          <div className="pb-4">
            <div className="flex flex-col md:flex-row justify-start items-start gap-2 md:gap-6 mb-4">
              {/* Footer navigation links - ensure your router has these routes */}
              <Link to="/terms" className="text-sm text-[#FFFFFF] hover:text-[#868686]"><u>Terms of Use</u></Link>
              <span className="hidden md:inline text-[#FFFFFF]">•</span>
              <Link to="/privacy" className="text-sm text-[#FFFFFF] hover:text-[#868686]"><u>Privacy Policy</u></Link>
              <span className="hidden md:inline text-[#FFFFFF]">•</span>
              <Link to="/responsible-ai" className="text-sm text-[#FFFFFF] hover:text-[#868686]"><u>Responsible AI</u></Link>
              <span className="hidden md:inline text-[#FFFFFF]">•</span>
              <Link to="/disclaimer" className="text-sm text-[#FFFFFF] hover:text-[#868686]"><u>Disclaimer</u></Link>
            </div>
            <div className="flex justify-start mb-4">
              <div className="w-[600px] h-0.5 bg-gradient-to-r from-[#6C6C6C]/30 to-[#6C6C6C]/0 rounded-full"></div>
            </div>
            <div>
              <p className="text-[#868686] mt-4 text-sm">
                Copyright 2025. All rights reserved. Radar, A thing by
                <a
                  href="https://www.neuralarc.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-1"
                >
                  <img
                    src={neuralarcLogo}
                    alt="NeuralArc Logo"
                    className="h-auto w-6"
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

export default Landing; 