import React from 'react';
import { useLocation } from 'react-router-dom';

const getSteps = (path) => {
  if (path.includes('/patent')) {
    return [
      {
        id: 'patent',
        title: 'Patent Filing',
        description: 'Complete the patent application form',
        path: '/dashboard/patent',
        progress: 20
      },
      {
        id: 'generate-documents',
        title: 'Generate Documents',
        description: 'Review and generate filing documents',
        path: '/dashboard/patent/generate-documents',
        progress: 40
      },
      {
        id: 'documents',
        title: 'Documents',
        description: 'Manage your AI-powered documents',
        path: '/dashboard/patent/documents',
        progress: 60
      },
      {
        id: 'compliance',
        title: 'Compliance Check',
        description: 'Verify compliance with patent office',
        path: '/dashboard/patent/compliance',
        progress: 80
      },
      {
        id: 'filing-prep',
        title: 'Filing Preparation',
        description: 'Final review before submission',
        path: '/dashboard/patent/filing',
        progress: 100
      }
    ];
  } else {
    return [
      {
        id: 'trademark',
        title: 'Trademark Filing',
        description: 'Complete the trademark application form',
        path: '/dashboard/trademark',
        progress: 20
      },
      {
        id: 'generate-documents',
        title: 'Generate Documents',
        description: 'Review and generate filing documents',
        path: '/dashboard/generate-documents',
        progress: 40
      },
      {
        id: 'documents',
        title: 'Documents',
        description: 'Manage your AI-powered documents',
        path: '/dashboard/documents',
        progress: 60
      },
      {
        id: 'compliance',
        title: 'Compliance Check',
        description: 'Verify compliance with IP offices',
        path: '/dashboard/compliance',
        progress: 80
      },
      {
        id: 'filing-prep',
        title: 'Filing Preparation',
        description: 'Final review before submission',
        path: '/dashboard/filing-prep',
        progress: 100
      }
    ];
  }
};

const ProgressSidebar = ({ progress: externalProgress }) => {
  const location = useLocation();
  const steps = getSteps(location.pathname);

  const getStepFromPath = (path) => {
    // Find all matching steps and get the one with the longest matching path
    const matchingSteps = steps.map((step, index) => ({
      ...step,
      index,
      isMatch: path === step.path || path.startsWith(step.path + '/')
    })).filter(step => step.isMatch);

    // Get the step with the longest matching path
    const bestMatch = matchingSteps.reduce((best, current) => 
      (best?.path.length > current.path.length) ? best : current,
      null
    );
    
    console.log('Best matching step found:', bestMatch);
    return bestMatch ? bestMatch.index : 0;
  };

  const currentStepIndex = getStepFromPath(location.pathname);
  const currentProgress = steps[currentStepIndex]?.progress || 0;

  // Use external progress if provided, otherwise use calculated progress
  const safeProgress = externalProgress !== undefined 
    ? Math.min(Math.max(Number(externalProgress) || 0, 0), 100) 
    : currentProgress;

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 max-w-64 bg-[#EFECE5] border-r border-[#FFFFFF]/5 border-[1.5px] overflow-y-auto">

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#000000]">
            {location.pathname.includes('/patent') ? 'Patent Filing Progress' : 'Trademark Filing Progress'}
          </h2>
          <p className="text-sm text-[#000000]">
            {location.pathname.includes('/patent') 
              ? 'Track your patent application progress' 
              : 'Track your trademark application progress'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-[#000000] mb-2">
            <span>Progress</span>
            <span>{safeProgress}%</span>
          </div>
          <div className="w-full bg-[#000000]/40 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#3987BE] to-[#D48EA3] h-2 rounded-full transition-all duration-500"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isCompleted = status === 'completed';
            const isActive = status === 'active';
            const isPending = status === 'pending';

            return (
              <div key={step.id} className="relative">
              

                <div className="flex items-start gap-3">
                  {/* Step indicator: outer and inner circle */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-[#D9D9D9]' : 'bg-[#D9D9D9]'
                    }`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-[#302F2F]' : 'bg-[#BDBDBD]'
                      }`} />
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="flex-1">
                    <h3 className={`text-base font-semibold ${
                      isActive ? 'text-[#202020]' : 'text-[#BDBDBD]'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${isActive ? 'text-[#202020]' : 'text-[#BDBDBD]'}`}>{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar; 