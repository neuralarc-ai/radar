import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilingPrepAnalysis } from '../services/filingService';
import { IoArrowBack } from 'react-icons/io5';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';

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
    <div className="min-h-screen bg-[#EFECE5] rounded-[12px] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              className="p-2 text-[#202020] hover:text-[#202020] transition-colors rounded-[4px]  hover:text-[#FFFFFF] hover:bg-[#302F2F] border border-[#6C6C6C]"
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
            <div className="flex justify-between w-full bg-[#d4d4d4] p-1 rounded-[8px] gap-2">
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
                    activeTab === 'checklist' ? 'text-[#FFFFFF]' : 'text-[#1C1C1C] group-hover:text-[#FFFFFF]'
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
                    : 'text-[#1C1C1C] hover:text-[#FFFFFF] hover:bg-[#302F2F]'
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
              <div className="bg-[#E3E2DF] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
                <h2 className="text-xl font-semibold text-[#322B25] mb-4">Filing Checklist</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-[#CFD2D4] rounded-[8px]">
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
                  <div className="flex items-start space-x-3 p-3 bg-[#CFD2D4] rounded-[8px]">
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
                  <div className="flex items-start space-x-3 p-3 bg-[#CFD2D4] rounded-[8px]">
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
            </>
          )}


{activeTab === 'analysis' && (
            <div className="bg-[#FFF] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
              <h2 className="text-xl font-semibold text-[#322B25] mb-4">AI Filing Assessment</h2>
              <p className="text-[#4f4f4f] mb-6">Get an AI-powered analysis of your application's filing readiness</p>

              {!analysis && (
                <div className="text-center py-8 max-w-xl mx-auto">
                  <div className="flex justify-center mb-5">
                    <HiOutlineDocumentCheck size={80} className="text-[#FFFFFF]" />
                  </div>
                  <p className="text-lg text-[#202020] mt-5 mb-1">Get an AI-powered analysis of your application's filing readiness</p>
                  <p className="text-[#868686] mb-8">Our AI can analyze your complete application and provide insights on its filing readiness and potential areas for improvement.</p>
                  <button
                    onClick={handleAIAnalysis}
                    disabled={isLoading}
                    className={`flex items-center space-x-2 px-[27px] py-[16px] rounded-[4px] hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90 transition-colors duration-200 mx-auto mt-2 border border-[#322B25]/5 border-[1.5px] ${
                      isLoading
                        ? 'bg-[#1C1C1C] text-[#868686] cursor-not-allowed'
                        : 'bg-[#302F2F] text-[#FFFFFF] hover:bg-[#6C6C6C]'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span>Run AI Analysis</span>
                      </>
                    )}
                  </button>
                </div>
              )}

{error && (
                <div className="mt-4 p-4 bg-[#1C1C1C] text-red-500 rounded-lg text-center border border-[#6C6C6C]">
                  {error}
                </div>
              )}

              {analysis && (
                <div className="space-y-8">
                  {/* Approval Status */}
                  <div className="p-6 bg-[#1E342F] border border-[#6C6C6C] rounded-lg">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-32 h-32 mb-4">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <defs>
                            <linearGradient id="approvalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3987BE" />
                              <stop offset="100%" stopColor="#D48EA3" />
                            </linearGradient>
                          </defs>
                          {/* Background circle (gradient for remaining) */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#approvalGradient)"
                            strokeWidth="3"
                          />
                          {/* Progress arc (red for completed) */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                            strokeDashoffset={100 - analysis.overview.approvalPercentage}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.5s' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-[#FFFFFF]">
                            {analysis.overview.approvalPercentage}%
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">
                        {analysis.overview.approvalPercentage >= 80 ? 'Good' : 
                         analysis.overview.approvalPercentage >= 60 ? 'Moderate' : 'Needs Improvement'}
                      </h3>
                      <p className="text-[#868686] max-w-md">
                        {analysis.overview.approvalPercentage >= 80 ? 
                          'Your application shows strong potential for approval.' :
                         analysis.overview.approvalPercentage >= 60 ?
                          'Your application has moderate chances of approval with some improvements needed.' :
                          'Your application needs significant improvements for approval.'}
                      </p>
                    </div>
                  </div>

                  {/* Overview Section */}
                  <div className="p-4 bg-[#CFD4C9] rounded-[8px]">
                    <h3 className="text-lg font-semibold text-[#202020] mb-2">Overview</h3>
                    <p className="text-[#202020AD] mb-4">{analysis.overview.summary}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-[#202020]">Next Steps</h4>
                      <ul className="list-disc list-inside text-[#202020AD]">
                        {analysis.overview.nextSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Application Review Section */}
                  <div className="p-4 bg-[#CFD4C9]  rounded-[8px]">
                    <h3 className="text-lg font-semibold text-[#202020] mb-4">Application Review</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-[#202020] mb-2">Strengths</h4>
                        <ul className="list-disc list-inside text-[#202020AD] space-y-2">
                          {analysis.applicationReview.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#C6AEA3]/100i am mb-2">Areas for Improvement</h4>
                        <ul className="list-disc list-inside text-[#202020AD] space-y-2">
                          {analysis.applicationReview.weaknesses.map((weakness, index) => (
                            <li key={index}>{weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Document Analysis Section */}
                  <div className="p-4 bg-[#1E342F] border border-[#6C6C6C] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Document Analysis</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-[#FFFFFF] mb-2">Required Documents</h4>
                        <ul className="list-disc list-inside text-[#F8F8F8AD]">
                          {analysis.documentAnalysis.requiredDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                      {analysis.documentAnalysis.missingDocuments.length > 0 && (
                        <div>
                          <h4 className="font-medium pt-3 text-[#C6AEA3] mb-2">Missing Documents</h4>
                          <ul className="list-disc list-inside text-[#F8F8F8AD]">
                            {analysis.documentAnalysis.missingDocuments.map((doc, index) => (
                              <li key={index}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Filing Strategy Section */}
                  <div className="p-4 bg-[#1E342F] border border-[#6C6C6C] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Filing Strategy</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-[#FFFFFF] mb-2">Recommended Jurisdiction Order</h4>
                        <ul className="list-decimal list-inside text-[#868686]">
                          {analysis.filingStrategy.jurisdictionOrder.map((jurisdiction, index) => (
                            <li key={index}>{jurisdiction}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#FFFFFF] mb-2">Timeline</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3 bg-[#CFD4C9] rounded-[8px]">
                            <p className="text-sm text-[#202020]">Filing Date</p>
                            <p className="font-medium text-[#322B25]">{analysis.filingStrategy.timeline.filingDate}</p>
                          </div>
                          <div className="p-3 bg-[#CFD4C9] rounded-[8px]">
                            <p className="text-sm text-[#202020]">First Office Action</p>
                            <p className="font-medium text-[#322B25]">{analysis.filingStrategy.timeline.firstOfficeAction}</p>
                          </div>
                          <div className="p-3 bg-[#CFD4C9] rounded-[8px]">
                            <p className="text-sm text-[#202020]">Estimated Registration</p>
                            <p className="font-medium text-[#322B25]">{analysis.filingStrategy.timeline.estimatedRegistration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations Section */}
                  <div className="p-4 bg-[#1E342F] border border-[#6C6C6C] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Recommendations</h3>
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-[#CFD4C9] rounded-[8px] ">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-[#202020]">{rec.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rec.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                              rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-green-500/20 text-green-500'
                            }`}>
                              {rec.priority} priority
                            </span>
                          </div>
                          <p className="mt-2 text-[#202020]">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>


                   {/* Rerun Analysis Button */}
                   <div className="flex justify-center pt-8">
                    <button
                      onClick={handleAIAnalysis}
                      disabled={isLoading}
                      className={`flex items-center space-x-2 px-[27px] py-[16px] rounded-[4px] transition-colors duration-200 hover:border-[#302F2F] hover:text-[#322B25]/90 border border-[#322B25]/5 border-[1.5px] ${
                        isLoading
                          ? 'bg-[#1C1C1C] text-[#868686] cursor-not-allowed'
                          : 'bg-[#302F2F] text-[#FFFFFF] hover:bg-[#6C6C6C]'
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
                          <span>Re-run AI Analysis</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Filing Calendar - always visible */}
        <div className="bg-[#E3E2DF] rounded-[8px] border: 1px solid #FFFFFF0A p-6 mt-8">
          <h2 className="text-xl font-semibold text-[#322B25] mb-2">Filing Calendar</h2>
          <p className="text-[#4f4f4f] mb-6">Important dates for your patent application</p>
          <div className="space-y-6">
            <div className="p-4 bg-[#CFD2D4] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
              <h3 className="font-medium text-[#322B25]">Estimated Filing Date</h3>
              <p className="text-sm text-[#4f4f4f] mb-2">When your application will be submitted</p>
              <p className="text-[#322B25] font-medium text-lg">{formatDate(filingDate)}</p>
            </div>
            <div className="p-4 bg-[#CFD2D4] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
              <h3 className="font-medium text-[#322B25]">Estimated First Office Action</h3>
              <p className="text-sm text-[#4f4f4f] mb-2">Initial review by the patent office</p>
              <p className="text-[#322B25] font-medium text-lg">3-4 months</p>
            </div>
            <div className="p-4 bg-[#CFD2D4] rounded-[8px] border: 1px solid #FFFFFF0A p-6">
              <h3 className="font-medium text-[#322B25]">Estimated Registration Time</h3>
              <p className="text-sm text-[#4f4f4f] mb-2">Total time for application approval</p>
              <p className="text-[#322B25] font-medium text-lg">9-12 months</p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-[27px] py-[16px] bg-[#302F2F] text-[#FFFFFF] rounded-[4px] hover:bg-[#6C6C6C] transition-colors flex items-center gap-2"
          >
            
            <span>Back to Dashboard</span>
          </button>

          <a
            href="https://neuroclaim.vercel.app/"
            className="px-[27px] py-[16px] bg-[#302F2F] text-[#FFFFFF] rounded-[4px] hover:bg-[#6C6C6C] transition-colors flex items-center gap-2"
          >
            <span>Back to LawBit</span>
            
          </a>
        </div>
      </div>
    </div>
  );
}

export default FilingPrep; 