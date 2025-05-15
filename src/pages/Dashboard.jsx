import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { MinimalFooter } from '../components/Footer';

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
      <svg className="w-12 text-[#FFFFFF] h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M12 15l-3-3m0 0l3-3m-3 3h12m-2-3v6m5-4v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" />
        <circle cx="18" cy="6" r="3" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M18 3v6M15 6h6" />
      </svg>
    ),
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
      <svg className="w-12 text-[#FFFFFF] h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M7 7h10M7 11h10M7 15h6" />
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M16 15h2m-1-1.5v3" />
        <path strokeLinecap="round" strokeWidth="2" 
          d="M19.5 13.5c-.5 0-1 .5-1 1s.5 1 1 1" />
      </svg>
    ),
  },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <div className="min-h-screen bg-[#1C1C1C] relative overflow-hidden">
      {/* Logo */}
      <div className="w-full flex justify-center pt-14">
        {/* <img src={lawbitLogo} alt="Radar Logo" className="h-11 w-auto" /> */}
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 py-12 md:py-16 min-h-[calc(100vh-174px)]">
        {/* Header section */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-3">
            Welcome to Radar
          </h1>
          <p className="text-lg md:text-xl text-[#868686] max-w-2xl mx-auto">
            Your AI-powered assistant for intellectual property filings
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {filingTypes.map((type) => (
            <div
              key={type.key}
              className="group bg-[#302F2F] rounded-2xl p-6 shadow-[#FFFFFF] transition-all duration-300"
            >
              {/* Card header */}
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-[#FFFFFF]">{type.label}</h2>
              </div>

              {/* Description */}
              <p className="text-sm text-[#868686] mb-6">{type.desc}</p>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#6C6C6C]/10 rounded-full">
                  {type.icon}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2 mb-6">
                {type.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-[#868686]">
                    <svg className="w-2 h-2 text-[#6C6C6C] flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action button */}
              <button
                onClick={() => navigate(`/dashboard/${type.key}`)}
                className="w-full py-2 px-4 text-sm rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6C6C6C] focus:ring-offset-2 bg-[#6C6C6C] text-[#FFFFFF] hover:bg-[#868686]"
              >
                Start {type.label} Process
              </button>
            </div>
            ))}
        </div>
      </div>
      <MinimalFooter />
    </div>
  );
};

export default Dashboard; 