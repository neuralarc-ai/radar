import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';
import generatebg from '../assests/bg/generatedoc.png'; // Import background image

const PatentGenerateDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submissionData, setSubmissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Add logging for route changes
  useEffect(() => {
    console.log('PatentGenerateDocuments mounted');
    console.log('Current path:', window.location.pathname);
    console.log('Location state:', location.state);
  }, [location]);

  useEffect(() => {
    // Check if we have submission data
    if (location.state?.submissionData) {
      console.log('Found submission data:', location.state.submissionData);
      setSubmissionData(location.state.submissionData);
      setIsLoading(false);
      setError(null);
    } else {
      console.log('No submission data found');
      setError('No submission data found');
      toast.error('No submission data found. Please complete the patent filing first.');
      // Navigate back to patent filing
      navigate('/dashboard/patent');
    }
  }, [location, navigate]);

  const handleGenerate = async () => {
    if (!submissionData) {
      console.error('No submission data available');
      toast.error('No submission data available');
      return;
    }

    try {
      setIsGenerating(true);
      console.log('Starting document generation for submission:', submissionData);
      
      // Generate documents with actual content based on submission data
      const generatedDocuments = {
        patentApplication: `
          Patent Title: ${submissionData.patentTitle}
          Patent Type: ${submissionData.patentType}
          Inventors: ${submissionData.inventors.join(', ')}
          Applicant Name: ${submissionData.applicantName}
          Applicant Type: ${submissionData.applicantType}
          Applicant Address: ${submissionData.applicantAddress}
        `,
        specification: `
          Technical Field: ${submissionData.technicalField}
          Background Art: ${submissionData.backgroundArt}
          Detailed Description: ${submissionData.detailedDescription}
          Advantageous Effects: ${submissionData.advantageousEffects}
          Drawing References: ${submissionData.drawingReferences}
        `,
        claims: submissionData.claims || 'No claims provided',
        abstract: submissionData.abstract || 'No abstract provided',
        drawings: submissionData.drawings || 'No drawings provided',
        declaration: `
          I hereby declare that I am the original inventor of the subject matter described in this patent application.
          I have reviewed and understand the contents of this application.
          I believe the invention to be patentable and not previously disclosed.
        `
      };

      console.log('Documents generated successfully');
      
      // Save data to localStorage
      localStorage.setItem('patentSubmissionData', JSON.stringify(submissionData));
      localStorage.setItem('patentGeneratedDocuments', JSON.stringify(generatedDocuments));
      
      // Navigate to documents page with both submission data and generated documents
      navigate('/dashboard/patent/documents', { 
        state: { 
          submissionData,
          generatedDocuments,
          filingId: submissionData.id
        } 
      });
    } catch (error) {
      console.error('Error generating documents:', error);
      toast.error('Failed to generate documents');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    console.log('Navigating back to patent filing with data:', submissionData);
    navigate('/dashboard/patent', { 
      state: { 
        formData: submissionData,
        isReturning: true 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFFFFF] mx-auto"></div>
          <p className="mt-4 text-[#FFFFFF]">Loading submission data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-[#302F2F] rounded-lg border border-[#6C6C6C]">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-[#FFFFFF]">Error Loading Submission</h2>
          <p className="text-[#868686] mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-[#302F2F] text-[#FFFFFF] rounded-lg hover:bg-[#6C6C6C] transition-colors border border-[#6C6C6C]"
          >
            Back to Patent Filing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-0 py-0">
      {/* Outer container for the wide border effect */}
      <div className="rounded-[16px] p-6 mb-8 relative z-10" style={{ backgroundImage: `url(${generatebg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* Inner container for the white content area */}
        <div className="bg-[#FFFFFF] rounded-[12px]  p-6 mb-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <button
                type="button"
                className="p-2 text-[#202020] hover:text-[#FFFFFF] transition-colors rounded-[4px] hover:bg-[#302F2F] border border-[#322B25]/5 border-[1.5px]]"
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <IoArrowBack className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-[#322B25]">Generate Your Patent Documents</h1>
            </div>
            <p className="text-[#322B25] mt-2">
            Generate and manage filing-ready documents for your patent application</p>
          </div>

          <div className="bg-[#FFFFFF] rounded-[4px]  p-6 mb-8">
          <div className="mb-10">
              <h2 className="text-2xl font-semibold text-[#322B25] mb-3">Generate Your Documents</h2>
              <p className="text-[#322B25] mb-4">Our AI will analyze your application data and generate all required documents</p>
            </div>
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-40 h-40 rounded-full mb-4">
                <svg className="w-24 h-24 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#322B25] mb-2">Ready to generate your patent filing documents</h3>
            </div>
            
            <div className="bg-[#E8E8E8] rounded-lg p-8 mb-10">
              <div className="max-w-3xl mx-auto space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-[#000000]" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <p className="text-[#322B25] text-sm">Documents will be tailored based on your patent application details</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-[#000000]" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <p className="text-[#322B25] text-sm">All required patent office forms will be prepared</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-[#000000]" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <p className="text-[#322B25] text-sm">You can download, review, and modify as needed</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-[#000000]" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <p className="text-[#322B25] text-sm">AI-powered validation ensures compliance with patent filing requirements</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                  className={`px-8 py-3 bg-[#2B2521] text-[#ffffff] rounded-[4px] rounded-[4px] border border-[#322B25]  font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90 transition-colors flex items-center space-x-2 ${
                  isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#FFFFFF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating Documents...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Generate Patent Documents</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentGenerateDocuments; 