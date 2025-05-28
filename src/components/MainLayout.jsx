import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProgressSidebar from './ProgressSidebar';
import { MinimalFooter } from './Footer';
import filingBg from '../assests/bg/filling.png';
import radarLogoPng from '../assests/radar_top_logo.png';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  console.log('Progress:', progress);

  const getCurrentProgress = () => {
    console.log('Calculating progress for path:', location.pathname);
    
    // Get the appropriate steps based on the path
    const steps = location.pathname.includes('/patent') ? [
      { path: '/dashboard/patent', title: 'Patent Filing', progress: 20 },
      { path: '/dashboard/patent/generate-documents', title: 'Generate Documents', progress: 40 },
      { path: '/dashboard/patent/documents', title: 'Documents', progress: 60 },
      { path: '/dashboard/patent/compliance', title: 'Compliance Check', progress: 80 },
      { path: '/dashboard/patent/filing', title: 'Filing Preparation', progress: 100 }
    ] : [
      { path: '/dashboard/trademark', title: 'Trademark Filing', progress: 20 },
      { path: '/dashboard/generate-documents', title: 'Generate Documents', progress: 40 },
      { path: '/dashboard/documents', title: 'Documents', progress: 60 },
      { path: '/dashboard/compliance', title: 'Compliance Check', progress: 80 },
      { path: '/dashboard/filing-prep', title: 'Filing Preparation', progress: 100 }
    ];

    // Find the current step by checking for exact match or matching path
    const currentStep = steps.find(step => {
      const isExactMatch = location.pathname === step.path;
      // Check if the step path matches the current path
      const isPathMatch = step.path === location.pathname || 
                         location.pathname.startsWith(step.path + '/');
      console.log(`Checking step ${step.path} against current path ${location.pathname}: exact=${isExactMatch}, match=${isPathMatch}`);
      return isPathMatch;
    });

    // Find the step with the longest matching path
    const matchingSteps = steps.filter(step => 
      location.pathname === step.path || location.pathname.startsWith(step.path + '/')
    );
    const bestMatch = matchingSteps.reduce((best, current) => 
      (best?.path.length > current.path.length) ? best : current, 
      null
    );

    console.log('Best matching step found:', bestMatch);
    
    if (bestMatch) {
      console.log('Setting progress to:', bestMatch.progress);
      return bestMatch.progress;
    }

    // If no step matches, return 0
    console.log('No matching step found, returning 0');
    return 0;
  };

  useEffect(() => {
    const newProgress = getCurrentProgress();
    console.log('Progress updated to:', newProgress);
    setProgress(newProgress);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen items-center p-0 m-0 w-full">
      {/* Top section for logo and menu button */}
      <div className="flex justify-between items-center w-full max-w-[1200px] mb-8 mt-8 px-8">
        {/* Radar Logo */}
        <div className="">
          <img src={radarLogoPng} alt="Radar Logo" className="h-11 w-auto" />
        </div>

        {/* Top-right button */}
        <div className="w-10 h-10 bg-[#302F2F] rounded-full flex items-center justify-center">
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white mt-1"></div>
        </div>
      </div>

      {/* Main layout container with image background and border effect */}
      <div className="relative w-full p-6 max-w-[1200px] mx-auto rounded-[24px] p-3 mb-12 shadow-xl bg-cover bg-center flex-grow" style={{ backgroundImage: `url(${filingBg})` }}>
        {/* Inner white content area */}
        <div className="flex rounded-[22px] gap-6 overflow-hidden">
          {/* Left panel (ProgressSidebar) */}
          <div className="w-fit bg-white rounded-[22px]">
            <ProgressSidebar progress={progress} />
          </div>
          {/* Right panel (Main Content) */}
          <main className="flex-1 overflow-y-auto rounded-[22px]">
            {children}
          </main>
        </div>
      </div>

      {/* Sticky footer at the bottom, always full width */}
      <div className="w-full flex-shrink-0">
        <MinimalFooter />
      </div>
    </div>
  );
};

export default MainLayout; 