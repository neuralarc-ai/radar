import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { checkCompliance } from "../services/complianceService";
import { IoArrowBack } from 'react-icons/io5';

function ComplianceChecker() {
  const { filingId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complianceResults, setComplianceResults] = useState(null);
  const [activeTab, setActiveTab] = useState('USPTO');

  const handleRunComplianceCheck = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await checkCompliance(filingId);
      setComplianceResults(result);
    } catch (error) {
      console.error('Error checking compliance:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'met':
        return 'bg-[#C5CFB8] text-[#000000]';
      case 'missing':
        return 'bg-[#D3B8AC] text-[#000000]';
      case 'partial':
        return 'bg-[#B4BFCA] text-[#000000]';
      default:
        return 'text-[#868686]';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'met':
        return 'Fulfilled';
      case 'missing':
        return 'Unfulfilled';
      case 'partial':
        return 'Incomplete';
      default:
        return status;
    }
  };

  const getRatingText = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const getRatingColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-[#FFFFFF]';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-[#EFECE5] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              className="p-2 text-[#202020] hover:text-[#FFFFFF] transition-colors rounded-[4px] hover:bg-[#302F2F] border border-[#322B25]/5 border-[1.5px]"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <IoArrowBack className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-[#322B25]">Compliance Checker</h1>
          </div>
          <p className="text-[#4F4F4F] mt-2">Verify your trademark application against official filing requirements</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[8px] p-6 mb-8">
          {!complianceResults ? (
            <>
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-[#322B25] mb-3">Check Filing Compliance</h2>
                <p className="text-[#4F4F4F] max-w-2xl text-lg">Our AI will analyze your application against requirements for USPTO, EUIPO, and Indian IP offices</p>
              </div>
              
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-28 h-32 rounded-full mb-4 bg-[#F5F5F5]">
                  <svg className="w-14 h-16 text-[#322B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#322B25]">Ready to check compliance of your trademark application</h3>
              </div>
              
              <div className="bg-[#F5F5F5] rounded-lg p-8 mb-10">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#322B25]" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                    <p className="text-[#322B25] text-sm">Validates required fields and documents</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#322B25]" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                    <p className="text-[#322B25] text-sm">Checks against requirements for multiple jurisdictions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#322B25]" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                    <p className="text-[#322B25] text-sm">Identifies potential issues before filing</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#322B25]" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                    <p className="text-[#322B25] text-sm">Provides guidance on missing information</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleRunComplianceCheck}
                  disabled={isLoading}
                  className={`px-[27px] py-[16px] rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90 transition-colors flex items-center space-x-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#FFFFFF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Running Compliance Check...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Run Compliance Check</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                <div className="bg-[#2B2521] rounded-[12px] border: 1px solid #FFFFFF0A p-6">
                <h2 className="text-xl font-semibold text-[#FFFFFF] mb-4">Overall Compliance Score</h2>
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-32 h-32 mb-4">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          {/* Background circle */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1C1C1C"
                            strokeWidth="3"
                          />
                          {/* Progress circle */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="3"
                            strokeDasharray="3.5, 100"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-[#FFFFFF]">3.5%</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">Needs Improvement</h3>
                      <p className="text-[#868686] max-w-md">
                        Your application needs significant improvements for approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <nav className="flex justify-center" aria-label="Tabs">
                  <div className="flex justify-between w-full bg-[#F5F5F5] p-1 rounded-lg gap-2">
                    {Object.keys(complianceResults.jurisdictions).map((jurisdiction) => (
                      <button
                        key={jurisdiction}
                        onClick={() => setActiveTab(jurisdiction)}
                        className={`group flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium text-sm transition-all duration-200 ${
                          activeTab === jurisdiction
                            ? 'bg-[#322B25] text-[#FFFFFF] shadow-sm'
                            : 'text-[#868686] hover:text-[#322B25] hover:bg-[#E8E8E8]'
                        }`}
                      >
                        <svg 
                          className={`w-5 h-5 transition-colors duration-200 ${
                            activeTab === jurisdiction ? 'text-[#FFFFFF]' : 'text-[#868686] group-hover:text-[#322B25]'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <span>{jurisdiction}</span>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>

              {Object.entries(complianceResults.jurisdictions).map(([jurisdiction, data]) => (
                <div 
                  key={jurisdiction}
                  className={`${activeTab === jurisdiction ? 'block' : 'hidden'}`}
                >
                  <div className="bg-[#2B2521] border border-[#E8E8E8] rounded-[8px] p-6 shadow-sm">
                    <div className="space-y-4">
                      {data.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-[#FFFFFF]/5 rounded-lg hover:bg-[#6C6C6C] transition-colors duration-200">
                          <div className={`flex-shrink-0 mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(req.status)}`}>
                            {getStatusText(req.status)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#FFFFFF] mb-1">{req.requirement}</h4>
                            <p className="text-[#868686] text-sm">{req.details}</p>
                            {req.status === 'missing' && (
                              <div className="mt-2 text-sm text-[#D3B8AC]">
                                <span className="font-medium">Action Required:</span> Please provide this information to complete your application.
                              </div>
                            )}
                            {req.status === 'partial' && (
                              <div className="mt-2 text-sm text-[#B4BFCA]">
                                <span className="font-medium">Recommendation:</span> Consider providing more detailed information.
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-8 space-x-4">
                <button
                  onClick={handleRunComplianceCheck}
                  disabled={isLoading}
                  className={`px-[27px] py-[16px] rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90 transition-colors flex items-center space-x-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Rechecking...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Recheck Compliance</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate(`/dashboard/filing-prep/${filingId}`)}
                  className="px-[27px] py-[16px] rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90 transition-colors flex items-center gap-2"
                >
                  <span>Continue to Filing Prep</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 text-red-500 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComplianceChecker;
