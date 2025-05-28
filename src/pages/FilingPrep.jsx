import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilingPrepAnalysis } from '../services/filingService';
import { IoArrowBack } from 'react-icons/io5';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import box01 from '../assests/box01.png';
import box02 from '../assests/box02.png';
import box03 from '../assests/box03.png';
import box04 from '../assests/box04.png';
import box05 from '../assests/box05.png';

function FilingPrep() {
  const { filingId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('checklist');

  // Calculate dates based on current date
  const currentDate = new Date();
  
  // Use current date if no specific date is provided
  const filingDate = currentDate;
  
  // Format date as MM/DD/YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleAIAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getFilingPrepAnalysis(filingId);
      setAnalysis(result);
    } catch (error) {
      console.error('Error getting filing preparation analysis:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] px-4 py-10 rounded-[12px]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              className="p-2 text-[#202020] transition-colors rounded-[4px] "
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <IoArrowBack className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-[#322B25]">Filing Preparation</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex justify-center" aria-label="Tabs">
            <div className="flex justify-between w-full bg-[#D4D4D4] p-1 rounded-[8px]">
              <button
                onClick={() => setActiveTab('checklist')}
                className={`group flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'checklist'
                    ? 'bg-[#302F2F] text-[#FFFFFF] shadow-sm'
                    : 'text-[#868686] hover:text-[#202020]'
                }`}
              >
                <svg 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    activeTab === 'checklist' ? 'text-[#FFFFFF]' : 'text-[#868686] group-hover:text-[#202020]'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>Filing Checklist</span>
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`group flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'analysis'
                    ? 'bg-[#302F2F] text-[#FFFFFF] shadow-sm'
                    : 'text-[#868686] hover:text-[#202020]'
                }`}
              >
                <svg 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    activeTab === 'analysis' ? 'text-[#FFFFFF]' : 'text-[#868686] group-hover:text-[#202020]'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>AI Analysis</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'checklist' && (
            <>
              {/* Filing Checklist */}
              <div className="rounded-[8px] border: 1px solid #FFFFFF0A p-6">
                <h2 className="text-xl font-semibold text-[#322B25] mb-4">Filing Checklist</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-[#EEE8E2] rounded-[8px]">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#322B25]">Patent Application</h3>
                      <p className="text-sm text-[#4f4f4f]">Basic application details and requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-[#EEE8E2] rounded-[8px]">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#322B25]">Patent Documents</h3>
                      <p className="text-sm text-[#4f4f4f]">All required documents generated</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-[#EEE8E2] rounded-[8px]">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#322B25]">Compliance Check</h3>
                      <p className="text-sm text-[#4f4f4f]">Verified against USPTO requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filing Calendar - only visible in checklist tab */}
              <div className="rounded-[8px] border: 1px solid #FFFFFF0A p-6">
                <h2 className="text-xl font-semibold text-[#322B25] mb-2">Filing Calendar</h2>
                <p className="text-[#4f4f4f] mb-6">Important dates for your patent application</p>
                <div className="space-y-6">
                  <div className="p-4 bg-[#EEE8E2] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
                    <h3 className="font-medium text-[#322B25]">Estimated Filing Date</h3>
                    <p className="text-sm text-[#4f4f4f] mb-2">When your application will be submitted</p>
                    <p className="text-[#322B25] font-medium text-lg">{formatDate(filingDate)}</p>
                  </div>
                  <div className="p-4 bg-[#EEE8E2] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
                    <h3 className="font-medium text-[#322B25]">Estimated First Office Action</h3>
                    <p className="text-sm text-[#4f4f4f] mb-2">Initial review by the patent office</p>
                    <p className="text-[#322B25] font-medium text-lg">3-4 months</p>
                  </div>
                  <div className="p-4 bg-[#EEE8E2] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
                    <h3 className="font-medium text-[#322B25]">Estimated Registration Time</h3>
                    <p className="text-sm text-[#4f4f4f] mb-2">Total time for application approval</p>
                    <p className="text-[#322B25] font-medium text-lg">9-12 months</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-8">
              {/* Approval Status (Donut Chart) */}
              {analysis && (
                <div className="bg-[#2B2521] rounded-[16px] p-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-white mb-8">Overall Compliance Score</h2>
                  <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    {/* Donut */}
                    <div className="relative w-56 h-56 flex-shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#3A3532" strokeWidth="3" />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#D6A3B2"
                          strokeWidth="3"
                          strokeDasharray={`${analysis.overview.approvalPercentage}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {analysis.overview.approvalPercentage}%
                        </span>
                      </div>
                    </div>
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start text-left">
                      <h3 className="text-3xl font-medium mb-4 text-[#D6A3B2]">
                        {analysis.overview.approvalPercentage >= 80 ? 'Good' : analysis.overview.approvalPercentage >= 60 ? 'Moderate' : 'Needs Improvement'}
                      </h3>
                      <p className="text-lg text-white leading-snug">
                        {analysis.overview.approvalPercentage >= 80 ? 'Your application shows strong potential for approval.' : analysis.overview.approvalPercentage >= 60 ? 'Your application has moderate chances of approval with some improvements needed.' : 'Your application needs significant improvements for approval.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Overview Section */}
              {analysis && (
                <div className="rounded-[12px] p-6 mb-2" style={{background: `url(${box01}) center/cover no-repeat`}}>
                 <div className='bg-[#E3E2DF80] rounded-[8px] p-4 mb-2'>
                 <h3 className="text-lg font-semibold text-[#322B25] mb-2">Overview</h3>
                 <p className="text-[#322B25] mb-4">{analysis.overview.summary}</p>
                 </div>
                  <div className="space-y-2">
                   <div className='bg-[#E3E2DF80] rounded-[8px] p-4'>
                   <h4 className="font-medium text-[#322B25]">Next Steps</h4>
                    <ul className="list-disc list-inside text-[#322B25]">
                      {analysis.overview.nextSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                   </div>
                  </div>
                </div>
              )}

              {/* Application Review Section */}
              {analysis && (
                <div className="rounded-[12px] p-6 mb-2" style={{background: `url(${box02}) center/cover no-repeat`}}>
                  <h3 className="text-lg font-semibold text-[#322B25] mb-4">Application Review</h3>
                  <div className="space-y-6">
                    <div className='bg-[#E3E2DF80] rounded-[8px] p-4'>
                      <h4 className="font-medium text-[#322B25] mb-2">Strengths</h4>
                      <ul className="list-disc list-inside text-[#322B25] space-y-2">
                        {analysis.applicationReview.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='bg-[#E3E2DF80] rounded-[8px] p-4'>
                      <h4 className="font-medium text-[#322B25] mb-2">Areas for Improvement</h4>
                      <ul className="list-disc list-inside text-[#322B25] space-y-2">
                        {analysis.applicationReview.weaknesses.map((weakness, index) => (
                          <li key={index}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Document Analysis Section */}
              {analysis && (
                <div className="rounded-[12px] p-6 mb-2" style={{background: `url(${box03}) center/cover no-repeat`}}>
                  <h3 className="text-lg font-semibold text-[#322B25] mb-4">Documents Required</h3>
                  <div className="space-y-4">
                    <div className='bg-[#E3E2DF80] rounded-[8px] p-4'>
                      <h4 className="font-medium text-[#322B25] mb-2">Required Documents</h4>
                      <ul className="list-disc list-inside text-[#322B25]">
                        {analysis.documentAnalysis.requiredDocuments.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                    {analysis.documentAnalysis.missingDocuments.length > 0 && (
                      <div className='bg-[#E3E2DF80] rounded-[8px] p-4'>
                        <h4 className="font-medium pt-3 text-[#C6AEA3] mb-2">Missing Documents</h4>
                        <ul className="list-disc list-inside text-[#322B25]">
                          {analysis.documentAnalysis.missingDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Filing Strategy Section */}
              {analysis && (
                <div className="rounded-[12px] p-6 mb-2" style={{background: `url(${box04}) center/cover no-repeat`}}>
                  <h3 className="text-lg font-semibold text-[#322B25] mb-4">Filing Strategy</h3>
                  <div className="space-y-4">
                    <div className='bg-[#E3E2DF80] rounded-[8px] p-4'>
                      <h4 className="font-medium text-[#322B25] mb-2">Recommended Jurisdiction Order</h4>
                      <ul className="list-decimal list-inside text-[#322B25]">
                        {analysis.filingStrategy.jurisdictionOrder.map((jurisdiction, index) => (
                          <li key={index}>{jurisdiction}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='bg-[#E3E2DF80] rounded-[8px] p-4'>
                      <h4 className="font-medium text-[#322B25] mb-2">Timeline</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 rounded-[8px] bg-[#F3F3E6]">
                          <p className="text-sm text-[#322B25]">Filing Date</p>
                          <p className="font-medium text-[#322B25]">{analysis.filingStrategy.timeline.filingDate}</p>
                        </div>
                        <div className="p-3 rounded-[8px] bg-[#F3F3E6]">
                          <p className="text-sm text-[#322B25]">First Office Action</p>
                          <p className="font-medium text-[#322B25]">{analysis.filingStrategy.timeline.firstOfficeAction}</p>
                        </div>
                        <div className="p-3 rounded-[8px] bg-[#F3F3E6]">
                          <p className="text-sm text-[#322B25]">Estimated Registration</p>
                          <p className="font-medium text-[#322B25]">{analysis.filingStrategy.timeline.estimatedRegistration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations Section */}
              {analysis && (
                <div className="rounded-[12px] p-6 mb-2" style={{background: `url(${box05}) center/cover no-repeat`}}>
                  <h3 className="text-lg font-semibold text-[#322B25] mb-4">Recommendations</h3>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 rounded-[8px] bg-[#FFFFFF] flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-[#322B25]">{rec.title}</h4>
                          <p className="mt-2 text-[#322B25]">{rec.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                          rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-green-500/20 text-green-500'
                        }`}>
                          {rec.priority} priority
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rerun Analysis Button */}
              {analysis && (
                <div className="flex justify-center pt-8">
                  <button
                    onClick={handleAIAnalysis}
                    disabled={isLoading}
                    className={`flex items-center space-x-2 px-8 py-4 rounded-[6px] transition-colors duration-200 font-semibold text-base ${
                      isLoading
                        ? 'bg-[#1C1C1C] text-[#868686] cursor-not-allowed'
                        : 'bg-[#322B25] text-[#FFFFFF]'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Re-running Analysis...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Re-run Analysis</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back to Home Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-[27px] py-[16px] bg-[#302D2A] text-[#FFFFFF] rounded-[4px] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilingPrep; 