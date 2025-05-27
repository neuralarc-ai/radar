import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, CreditCard, Check, Cpu, PhoneCall, Lock, Clock } from 'react-feather';
import platformImage from '../assests/preview01.png';
import footerImage from '../assests/preview01.png';
import neuralarcLogo from '../assests/neuralarc-logo.svg';
import footerLogo from '../assests/footer-logo.png';
import radarLogoPng from '../assests/radar_top_logo.png';
import { ReactComponent as RadarLogo } from '../assests/Radar.svg';
import LandingPageImage from '../assests/LandingPage_image.png';
import icon1 from '../assests/icons/icon1.png';
import icon2 from '../assests/icons/icon2.png';
import icon3 from '../assests/icons/icon3.png';
import featureBg1 from '../assests/feature-bg/card1.png';
import featureBg2 from '../assests/feature-bg/card2.png';
import featureBg3 from '../assests/feature-bg/card3.png';
import investmentBg1 from '../assests/investment-bg/card1.png';
import investmentBg2 from '../assests/investment-bg/card2.png';
import investmentBg3 from '../assests/investment-bg/card3.png';
import benefitIcon1 from '../assests/icons/benefit-icon1.svg';
import benefitIcon2 from '../assests/icons/benefit-icon2.svg';
import benefitIcon3 from '../assests/icons/benefit-icon3.svg';

const Landing = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-[#232323]" />,
      title: "AI-Powered Compliance Check",
      description: "Our advanced AI system ensures your filings meet all legal requirements, reducing rejection rates.",
      backgroundImage: featureBg1
    },
    {
      icon: <FileText className="h-6 w-6 text-[#232323]" />,
      title: "Easy Document Management",
      description: "Upload and analyze documents with our intuitive drag-and-drop interface. Get instant feedback on your submissions.",
      backgroundImage: featureBg2
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#232323]" />,
      title: "Smart Class Selection Assistant",
      description: "Let our AI recommend the right trademark classes for your application based on your product or service description, no legal jargon needed.",
      backgroundImage: featureBg3
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
      <nav className="flex items-center justify-between py-6 px-4 max-w-[1440px] mx-auto">
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
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-[1440px] mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#202020] leading-tight">
          Simplify Your Legal Workflow
          <br />
          with AI Precision
        </h1>

        <p style={{fontFamily: "Fustat", fontWeight: 400, fontSize: "24px", lineHeight: "37px", letterSpacing: "-2%", textAlign: "center", verticalAlign: "middle"}} className="text-[#202020] mb-6 max-w-5xl">
          Streamline your trademark, patent, and copyright filings with our intelligent platform.
          Get higher accuracy and faster approvals with AI assistance.
        </p>
        <img src={LandingPageImage} alt="Landing Page Image" className="w-full h-full object-cover" />
        <Link to="/signin">
          <button className="bg-[#302D2A] text-[#FFFFFF] border border-[#232323] border-[1px] rounded-[4px] px-[27px] py-[16px] text-lg flex items-center gap-2 focus:outline-none">
            Try Now <span><ArrowRight className="h-5 w-5" /></span>
          </button>
        </Link>

        {/* Trust Indicators Box */}
        <div className="mt-12 w-full flex justify-center px-4">
          <div className="max-w-[1280px] mx-auto bg-white rounded-[24px] p-8 md:p-12 shadow-sm flex flex-col items-center gap-8">
            {/* Title Section */}
            <div className="flex flex-col items-center justify-center text-center">
              <h2 style={{fontFamily: "Fustat", fontWeight: 700, fontSize: "48px", lineHeight: "69px", letterSpacing: "-2%", textAlign: "center", verticalAlign: "middle"}}>
                Transform your investment decisions<br />with cutting-edge AI technology
              </h2>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
              {/* Card 1 */}
              <div className="w-[399px] h-[276px] bg-[#CFC1B1] rounded-[8px] border border-[#FFFFFF]/4 flex flex-col items-start justify-between px-6 py-4"
                   style={{ backgroundImage: `url(${investmentBg1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="bg-[#FFFFFF] rounded-[8px] p-6 w-full h-full flex flex-col justify-between">
                  <div className="w-[319px] h-[96px] flex flex-col gap-6">
                    <div className="w-[72px] h-[72px] rounded-[52px] bg-[#F3F3F0] p-[14px] flex items-center justify-center">
                      <span className="w-[44px] h-[44px] rounded-full bg-[#8C7862] flex items-center justify-center">
                        <img src={icon1} alt="AI Icon" className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-[#232323] leading-tight" style={{textAlign: "left"}}>AI-Powered Accuracy</div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-[399px] h-[276px] bg-[#CFC1B1] rounded-[8px] border border-[#FFFFFF]/4 flex flex-col items-start justify-between px-6 py-4"
                   style={{ backgroundImage: `url(${investmentBg2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="bg-[#FFFFFF] rounded-[8px] p-6 w-full h-full flex flex-col justify-between">
                  <div className="w-[319px] h-[96px] flex flex-col gap-6">
                    <div className="w-[72px] h-[72px] rounded-[52px] bg-[#F3F3F0] p-[14px] flex items-center justify-center">
                      <span className="w-[44px] h-[44px] rounded-full bg-[#8C7862] flex items-center justify-center">
                        <img src={icon2} alt="Secure Icon" className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-[#232323] leading-tight" style={{textAlign: "left"}}>Secure & Compliant</div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-[399px] h-[276px] bg-[#CFC1B1] rounded-[8px] border border-[#FFFFFF]/4 flex flex-col items-start justify-between px-6 py-4"
                   style={{ backgroundImage: `url(${investmentBg3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="bg-[#FFFFFF] rounded-[8px] p-6 w-full h-full flex flex-col justify-between">
                  <div className="w-[319px] h-[96px] flex flex-col gap-6">
                    <div className="w-[72px] h-[72px] rounded-[52px] bg-[#F3F3F0] p-[14px] flex items-center justify-center">
                      <span className="w-[44px] h-[44px] rounded-full bg-[#8C7862] flex items-center justify-center">
                        <img src={icon3} alt="Support Icon" className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-[#232323] leading-tight" style={{textAlign: "left"}}>24/7 <br />Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-2 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-4xl font-bold text-[#1E1E1E] text-center mb-6"
            style={{
              fontFamily: "Fustat",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "69px",
              letterSpacing: "-2%",
              textAlign: "center",
              verticalAlign: "middle"
            }}
          >
            Powerful Features for Your IP Protection
          </h2>
          <p className="text-[#202020] text-center mb-16 max-w-5xl mx-auto text-lg"
            style={{
              fontFamily: "Fustat",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "37px",
              letterSpacing: "-2%",
              textAlign: "center",
              verticalAlign: "middle"
            }}
          >
            Streamline your intellectual property filings with our comprehensive
            suite of tools and AI assistance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-[12px] overflow-hidden shadow-sm relative grain-texture transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg"
                   style={{ backgroundImage: `url(${feature.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="px-8 py-4 relative z-10">
                  <div className="mb-4 w-[64px] h-[64px] rounded-[48px] p-[12px] flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <span className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: bgColors[index % 3] }}>
                      {React.cloneElement(feature.icon, { stroke: '#232323', width: 20, height: 20 })}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium mb-4 text-[#000000]">{feature.title}</h3>

                  <div className="mt-2 p-4 rounded-[8px]" style={{ backgroundColor: bgColors[index % 3] }}>
                    <p className="text-[#FFFFFF] text-sm">{feature.description}</p>
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
              <h2 className="text-3xl md::text-4xl font-bold text-[#000000] mb-6" style={{ fontFamily: "Fustat", fontWeight: 700, fontSize: "40px", lineHeight: "52px", letterSpacing: "-2%", textAlign: "left" }}>
                Simplifying IP Protection
                <br />for Everyone
              </h2>
              <p className="text-[#000000] mb-8" style={{ fontFamily: "Fustat", fontWeight: 300, fontSize: "24px", lineHeight: "32px", letterSpacing: "-2%", textAlign: "left" }}>
                Our platform revolutionizes the way you protect your intellectual property.
                With AI-powered assistance, we make trademark, patent, and copyright filings
                accessible, affordable, and efficient for businesses of all sizes.
              </p>
            </div>

            {/* Right column for benefit cards */}
            <div>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-[#B0B8A7] rounded-[8px] p-6 mb-6 last:mb-0">
                  {/* Icon container matching image style (concentric circles, white icon) */}
                  <div className="w-[72px] h-[72px] rounded-[52px] bg-[#CFD4C9]/50 p-[14px] flex items-center justify-center mr-4">
                    {/* Inner circle background color adjusted for better match */}
                    <div className="w-[44px] h-[44px] rounded-full bg-[#828E75] flex items-center justify-center">
                      {/* Use imported icon variables */}
                      {index === 0 && <img src={benefitIcon3} alt="Benefit Icon 1" className="h-6 w-6" />} {/* Use imported variable */}
                      {index === 1 && <img src={benefitIcon1} alt="Benefit Icon 2" className="h-6 w-6" />} {/* Use imported variable */}
                      {index === 2 && <img src={benefitIcon2} alt="Benefit Icon 3" className="h-6 w-6" />} {/* Use imported variable */}
                    </div>
                  </div>
                  {/* Benefit text with black color and adjusted font size */}
                  <p className="text-[#000000] text-lg" style={{ fontFamily: "Fustat", fontWeight: 300, fontSize: "17px", lineHeight: "28px", letterSpacing: "-2%" }}>{benefit}</p>
                </div>
              ))}
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