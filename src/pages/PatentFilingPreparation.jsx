import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { getPatentFilingPrepAnalysis } from '../services/patentFilingService';

const PatentFilingPreparation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('checklist');
  const [submissionData, setSubmissionData] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [complianceChecks, setComplianceChecks] = useState([]);

  // Calculate dates based on current date
  const currentDate = new Date();
  
  // Format date as MM/DD/YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    try {
      // First try to get data from location state
      if (location.state?.submissionData && location.state?.documents && location.state?.complianceChecks) {
        setSubmissionData(location.state.submissionData);
        setDocuments(location.state.documents);
        setComplianceChecks(location.state.complianceChecks);
      } else {
        // If no location state, try localStorage
        const storedData = JSON.parse(localStorage.getItem('patentSubmissionData'));
        const storedDocuments = JSON.parse(localStorage.getItem('patentGeneratedDocuments'));
        
        if (storedData && storedDocuments) {
          setSubmissionData(storedData);
          setDocuments(storedDocuments);
        } else {
          setError('No patent submission data found. Please complete the patent filing first.');
        }
      }
    } catch (error) {
      console.error('Error loading patent data:', error);
      setError('Failed to load patent data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [location.state]);

  const handleAIAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getPatentFilingPrepAnalysis();
      setAnalysis(result);
    } catch (error) {
      console.error('Error getting filing preparation analysis:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-[#302F2F] rounded-lg border border-[#6C6C6C]">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-[#FFFFFF]">Error Loading Data</h2>
          <p className="text-[#868686] mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard/patent')}
            className="px-6 py-2 bg-[#302F2F] text-[#FFFFFF] rounded-lg hover:bg-[#6C6C6C] transition-colors border border-[#6C6C6C]"
          >
            Back to Patent Filing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              className="p-2 text-[#FFFFFF] hover:text-[#FFFFFF] transition-colors rounded-[25%] hover:bg-[#302F2F] border border-[#6C6C6C]"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <IoArrowBack className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-[#FFFFFF]">Patent Filing Preparation</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex justify-center" aria-label="Tabs">
            <div className="flex justify-between w-full bg-[#1C1C1C] p-1 rounded-lg border border-[#6C6C6C]">
              <button
                onClick={() => setActiveTab('checklist')}
                className={`group flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'checklist'
                    ? 'bg-[#302F2F] text-[#FFFFFF] shadow-sm'
                    : 'text-[#868686] hover:text-[#FFFFFF] hover:bg-[#302F2F]'
                }`}
              >
                <svg 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    activeTab === 'checklist' ? 'text-[#FFFFFF]' : 'text-[#868686] group-hover:text-[#FFFFFF]'
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
                    : 'text-[#868686] hover:text-[#FFFFFF] hover:bg-[#302F2F]'
                }`}
              >
                <svg 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    activeTab === 'analysis' ? 'text-[#FFFFFF]' : 'text-[#868686] group-hover:text-[#FFFFFF]'
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
              <div className="bg-[#302F2F] rounded-xl border border-[#6C6C6C] p-6">
                <h2 className="text-xl font-semibold text-[#FFFFFF] mb-4">Filing Checklist</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#FFFFFF]">Patent Application</h3>
                      <p className="text-sm text-[#868686]">Basic application details and requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#FFFFFF]">Patent Documents</h3>
                      <p className="text-sm text-[#868686]">All required documents generated</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#FFFFFF]">Compliance Check</h3>
                      <p className="text-sm text-[#868686]">Verified against USPTO requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'analysis' && (
            <div className="bg-[#302F2F] rounded-xl border border-[#6C6C6C] p-6">
              <h2 className="text-xl font-semibold text-[#FFFFFF] mb-4">AI Filing Assessment</h2>
              <p className="text-[#868686] mb-6">Get an AI-powered analysis of your application's filing readiness</p>

              {!analysis && (
                <div className="text-center py-8 max-w-xl mx-auto">
                  <div className="flex justify-center mb-5">
                    <HiOutlineDocumentCheck size={80} className="text-[#FFFFFF]" />
                  </div>
                  <p className="text-lg text-[#FFFFFF] mt-5 mb-1">Get an AI-powered analysis of your application's filing readiness</p>
                  <p className="text-[#868686] mb-8">Our AI can analyze your complete application and provide insights on its filing readiness and potential areas for improvement.</p>
                  <button
                    onClick={handleAIAnalysis}
                    disabled={isLoading}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 mx-auto mt-2 border border-[#6C6C6C] ${
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
                  <div className="p-6 bg-[#302F2F] border border-[#6C6C6C] rounded-lg">
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
                            stroke={analysis.overview.approvalPercentage >= 80 ? '#10B981' : 
                                   analysis.overview.approvalPercentage >= 60 ? '#F59E0B' : '#EF4444'}
                            strokeWidth="3"
                            strokeDasharray={`${analysis.overview.approvalPercentage}, 100`}
                            strokeLinecap="round"
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
                  <div className="p-4 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Overview</h3>
                    <p className="text-[#868686] mb-4">{analysis.overview.summary}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-[#FFFFFF]">Next Steps</h4>
                      <ul className="list-disc list-inside text-[#868686]">
                        {analysis.overview.nextSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Application Review Section */}
                  <div className="p-4 bg-[#302F2F] border border-[#6C6C6C] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Application Review</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-green-500 mb-2">Strengths</h4>
                        <ul className="list-disc list-inside text-[#868686] space-y-2">
                          {analysis.applicationReview.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-500 mb-2">Areas for Improvement</h4>
                        <ul className="list-disc list-inside text-[#868686] space-y-2">
                          {analysis.applicationReview.weaknesses.map((weakness, index) => (
                            <li key={index}>{weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Document Analysis Section */}
                  <div className="p-4 bg-[#302F2F] border border-[#6C6C6C] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Document Analysis</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-[#FFFFFF] mb-2">Required Documents</h4>
                        <ul className="list-disc list-inside text-[#868686]">
                          {analysis.documentAnalysis.requiredDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                      {analysis.documentAnalysis.missingDocuments.length > 0 && (
                        <div>
                          <h4 className="font-medium pt-3 text-red-500 mb-2">Missing Documents</h4>
                          <ul className="list-disc list-inside text-[#868686]">
                            {analysis.documentAnalysis.missingDocuments.map((doc, index) => (
                              <li key={index}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Filing Strategy Section */}
                  <div className="p-4 bg-[#302F2F] border border-[#6C6C6C] rounded-lg">
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
                          <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                            <p className="text-sm text-[#868686]">Filing Date</p>
                            <p className="font-medium text-[#FFFFFF]">{analysis.filingStrategy.timeline.filingDate}</p>
                          </div>
                          <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                            <p className="text-sm text-[#868686]">First Office Action</p>
                            <p className="font-medium text-[#FFFFFF]">{analysis.filingStrategy.timeline.firstOfficeAction}</p>
                          </div>
                          <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                            <p className="text-sm text-[#868686]">Estimated Registration</p>
                            <p className="font-medium text-[#FFFFFF]">{analysis.filingStrategy.timeline.estimatedRegistration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations Section */}
                  <div className="p-4 bg-[#302F2F] border border-[#6C6C6C] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Recommendations</h3>
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-[#FFFFFF]">{rec.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rec.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                              rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-green-500/20 text-green-500'
                            }`}>
                              {rec.priority} priority
                            </span>
                          </div>
                          <p className="mt-2 text-[#868686]">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rerun Analysis Button */}
                  <div className="flex justify-center pt-8">
                    <button
                      onClick={handleAIAnalysis}
                      disabled={isLoading}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 border border-[#6C6C6C] ${
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
        <div className="bg-[#302F2F] rounded-xl border border-[#6C6C6C] p-6 mt-8">
          <h2 className="text-xl font-semibold text-[#FFFFFF] mb-2">Filing Calendar</h2>
          <p className="text-[#868686] mb-6">Important dates for your patent application</p>
          <div className="space-y-6">
            <div className="p-4 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
              <h3 className="font-medium text-[#FFFFFF]">Estimated Filing Date</h3>
              <p className="text-sm text-[#868686] mb-2">When your application will be submitted</p>
              <p className="text-[#FFFFFF] font-medium text-lg">{formatDate(currentDate)}</p>
            </div>
            <div className="p-4 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
              <h3 className="font-medium text-[#FFFFFF]">Estimated First Office Action</h3>
              <p className="text-sm text-[#868686] mb-2">Initial review by USPTO</p>
              <p className="text-[#FFFFFF] font-medium text-lg">12-18 months</p>
            </div>
            <div className="p-4 bg-[#1C1C1C] rounded-lg border border-[#6C6C6C]">
              <h3 className="font-medium text-[#FFFFFF]">Estimated Grant Time</h3>
              <p className="text-sm text-[#868686] mb-2">Total time for application approval</p>
              <p className="text-[#FFFFFF] font-medium text-lg">24-30 months</p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#302F2F] text-[#FFFFFF] rounded-lg hover:bg-[#6C6C6C] transition-colors flex items-center gap-2 border border-[#6C6C6C]"
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
};

export default PatentFilingPreparation; 