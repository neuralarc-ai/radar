import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { MinimalFooter } from '../components/Footer';
import { ArrowRight } from 'react-feather';
import patentBg from '../assests/dashboard-bg/patent.png';
import trademarkBg from '../assests/dashboard-bg/trademark.png';

const filingTypes = [
  {
    key: 'patent',
    label: 'Patent Filing',
    desc: 'Protect your inventions, processes, or unique technological solutions',
    features: [
      'Utility Patents',
      'Design Patents',
      'Provisional Applications',
      'International PCT Filings'
    ],
    icon: (



      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_564_1296)">
          <path d="M7.58301 1.625V3.79167C7.58301 3.93533 7.64008 4.0731 7.74166 4.17468C7.84324 4.27626 7.98102 4.33333 8.12467 4.33333H10.2913" stroke="white" stroke-width="0.722222" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9.20801 11.375H3.79134C3.50402 11.375 3.22847 11.2609 3.02531 11.0577C2.82214 10.8545 2.70801 10.579 2.70801 10.2917V2.70833C2.70801 2.42102 2.82214 2.14547 3.02531 1.9423C3.22847 1.73914 3.50402 1.625 3.79134 1.625H7.58301L10.2913 4.33333V10.2917C10.2913 10.579 10.1772 10.8545 9.97404 11.0577C9.77088 11.2609 9.49533 11.375 9.20801 11.375Z" stroke="white" stroke-width="0.722222" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.875 9.20837H8.125" stroke="white" stroke-width="0.722222" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.875 7.04163H8.125" stroke="white" stroke-width="0.722222" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_564_1296">
            <rect width="13" height="13" fill="white" />
          </clipPath>
        </defs>
      </svg>

    ),
    backgroundImage: patentBg,
    outerCircleBg: 'rgba(243, 243, 240, 0.5)',
    innerCircleBg: '#8D785E',
  },
  {
    key: 'trademark',
    label: 'Trademark Filing',
    desc: 'Protect your brand names, logos, slogans, and other business identifiers',
    features: [
      'Word Marks',
      'Logo Marks',
      'Service Marks',
      'International Madrid Protocol'
    ],
    icon: (

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_564_1291)">
          <path d="M4.5 9H9.5M7 9V15" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13 15V9L16 13L19 9V15" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_564_1291">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>



    ),
    backgroundImage: trademarkBg,
    outerCircleBg: 'rgba(236, 226, 244, 0.69)',
    innerCircleBg: '#8C789E',
  },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7F3] relative overflow-hidden grain-texture ">
      {/* Logo */}
      <div className="w-full flex justify-center pt-14">
        {/* <img src={lawbitLogo} alt="Radar Logo" className="h-11 w-auto" /> */}
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 py-12 md:py-16 min-h-[calc(100vh-174px)]">
        {/* Header section */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
            Welcome to Radar
          </h1>
          <p className="text-lg md:text-xl text-[#000000] max-w-2xl mx-auto">
            Your AI-powered assistant for intellectual property filings
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {filingTypes.map((type) => (
            <div
              key={type.key}
              className="group bg-[#E0D6CA] rounded-[8px] p-6 shadow-[#FFFFFF] transition-all duration-300 flex flex-col"
              style={{ backgroundImage: `url(${type.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
            >
              {/* Icon and Title container (positioned above white box) */}
              <div className="flex items-center gap-4 px-2">
                {/* Icon container (Outer circle) */}
                <div className="w-10 h-10 rounded-full p-2 flex items-center justify-center" style={{ backgroundColor: type.outerCircleBg }}>
                  {/* Inner circle */}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: type.innerCircleBg }}>
                    {/* Icon itself - color is set via text-white on the parent div */}
                    {type.icon}
                  </div>
                </div>
                {/* Title */}
                <h2 className="text-xl font-semibold text-[#000000]">{type.label}</h2>
              </div>

              {/* White inner div */}
              <div className="bg-white rounded-[4px] p-6 flex flex-col h-full mt-5">
                <p className="text-sm text-[#000000] mb-4 flex-grow">{type.desc}</p>

                <ul className="space-y-2 mb-6 text-[#000000]">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <svg className="w-1 h-1 text-[#000000] flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="4" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate(`/dashboard/${type.key}`)}
                  className="w-full py-[12px] px-[20px] text-sm rounded-[4px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#000000]/10 focus:ring-offset-2 bg-[#2B2521] text-[#FFFFFF] hover:bg-[#232323]/80 flex items-center justify-center gap-2"
                >
                  <span>Start {type.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MinimalFooter />
    </div>
  );
};

export default Dashboard; 