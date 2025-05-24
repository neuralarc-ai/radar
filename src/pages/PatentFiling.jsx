import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';
import { IoInformationCircleOutline, IoDocumentTextOutline, IoSearchOutline, IoListOutline, IoBulbOutline, IoSparkles } from 'react-icons/io5';
import { searchPriorArt } from '../api/priorArtSearch';
import CustomSelect from '../components/CustomSelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getAIDescription } from '../services/trademarkService';

const steps = [
  'Basic Info',
  'Detailed Description',
  'Prior Art',
  'Claims'
];

const initialForm = {
  // Basic Info
  patentTitle: '',
  inventorNames: '',
  patentType: '',
  briefSummary: '',
  inventors: [],
  applicantName: '',
  applicantAddress: '',
  priorityClaim: false,
  priorityCountry: '',
  priorityAppNumber: '',
  priorityFilingDate: '',

  // Detailed Description
  technicalField: '',
  backgroundArt: '',
  detailedDescription: '',
  advantageousEffects: '',
  drawingFigure1: 'Fig. 1',
  drawingDescription1: '',
  drawingFigure2: 'Fig. 2',
  drawingDescription2: '',

  // Prior Art
  knownPriorArt: '',
  priorArtReferences: [{ reference: '', type: '', relevance: '' }],

  // Claims
  claims: [],

  // Drawing References
  drawings: [
    { figure: 'Fig. 1', description: '', file: null },
    { figure: 'Fig. 2', description: '', file: null },
  ],
};

const patentTypes = [
  'Utility Patent',
  'Design Patent',
  'Provisional Patent',
  'Plant Patent'
];

const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Other'];

// AI Suggestion Box Component
const AISuggestionBox = ({ suggestions }) => (
  <div className="bg-[#CFD2D4] border border-[#322B25]/5 border-[1.5px] rounded-lg p-4 mb-6">
    <div className="flex items-center gap-2 mb-2">
      <IoBulbOutline className="w-5 h-5 text-[#322B25]" />
      <h3 className="text-sm font-medium text-[#322B25]">AI Suggestions</h3>
    </div>
    <ul className="space-y-2">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="text-sm text-[#322B25] flex items-start gap-2">
          <span className="text-[#322B25] mt-1">•</span>
          {suggestion}
        </li>
      ))}
    </ul>
  </div>
);

// Section-specific suggestions
const suggestions = {
  basicInfo: [
    "Use clear, concise language in your title that accurately describes the core invention",
    "Include all inventors who contributed to the conception of the invention",
    "Choose the most appropriate patent type based on your invention's nature",
    "Keep the brief summary focused on the key innovative aspects"
  ],
  detailedDescription: [
    "Start with broad technical field description, then narrow down to specific application",
    "Include multiple embodiments to broaden protection scope",
    "Describe all possible variations and alternatives of your invention",
    "Use clear reference numbers when referring to drawing elements"
  ],
  priorArt: [
    "Focus on the most relevant and recent prior art references",
    "Explain how your invention differs from or improves upon existing solutions",
    "Include both patent and non-patent literature",
    "Consider international patent publications in your search"
  ],
  claims: [
    "Start with the broadest independent claim possible",
    "Use proper antecedent basis for claim elements",
    "Include multiple dependent claims to provide fallback positions",
    "Ensure claims are supported by the detailed description"
  ]
};

const PatentFiling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [aiLoading, setAiLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (location.state?.isReturning && location.state?.formData) {
      setForm(location.state.formData);
      setStep(steps.length - 1);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleAddDrawing = () => {
    setForm(f => ({
      ...f,
      drawings: [...(f.drawings || []), { figure: `Fig. ${(f.drawings || []).length + 1}`, description: '', file: null }]
    }));
  };

  const handleDrawingChange = (index, field, value) => {
    setForm(f => ({
      ...f,
      drawings: f.drawings.map((drawing, i) => 
        i === index ? { ...drawing, [field]: value } : drawing
      )
    }));
  };

  const handleDrawingFileChange = (index, file) => {
    setForm(f => ({
      ...f,
      drawings: f.drawings.map((drawing, i) =>
        i === index ? { ...drawing, file } : drawing
      )
    }));
  };

  const handleSearchPriorArt = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    
    setAiLoading('Searching for prior art...');
    
    try {
      const data = await searchPriorArt(searchQuery, {
        patentTitle: form.patentTitle,
        briefSummary: form.briefSummary,
        technicalField: form.technicalField
      });

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid response format from the server');
      }

      const processedResults = data.results.map(result => ({
        reference: result.patentNumber,
        type: result.documentType,
        relevance: result.relevance || `Related to "${searchQuery}" - ${result.summary || 'No summary available'}`
      }));

      setSearchResults(processedResults);
      toast.success(`Found ${processedResults.length} potentially relevant documents`);
    } catch (error) {
      console.error('Error searching for prior art:', error);
      toast.error(error.message || 'Failed to search for prior art. Please try again.');
    } finally {
      setAiLoading(null);
    }
  };

  const validateStep = (currentStep) => {
    const errors = {};
    
    switch(currentStep) {
      case 0: // Basic Info
        if (!form.patentTitle.trim()) errors.patentTitle = 'Patent title is required';
        if (!form.inventorNames.trim()) errors.inventorNames = 'Inventor name(s) are required';
        if (!form.patentType) errors.patentType = 'Patent type is required';
        if (!form.briefSummary.trim()) errors.briefSummary = 'Brief summary is required';
        break;
        
      case 1: // Detailed Description
        if (!form.technicalField.trim()) errors.technicalField = 'Technical field is required';
        if (!form.backgroundArt.trim()) errors.backgroundArt = 'Background art is required';
        if (!form.detailedDescription.trim()) errors.detailedDescription = 'Detailed description is required';
        if (!form.advantageousEffects.trim()) errors.advantageousEffects = 'Advantageous effects are required';
        break;
        
      case 2: // Prior Art
        if (!form.knownPriorArt.trim()) errors.knownPriorArt = 'Known prior art is required';
        break;
        
      case 3: // Claims
        if (!form.claims.length || !form.claims.some(claim => claim.trim())) {
          errors.claims = 'At least one claim is required';
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(s => Math.min(steps.length - 1, s + 1));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // TODO: Implement patent submission logic
      setSubmissionData(form);
      navigate('/dashboard/patent/generate-documents', { 
        state: { 
          submissionData: form,
          isReturning: false
        } 
      });
    } catch (error) {
      setSubmissionError(error.message);
      toast.error('Failed to submit patent application');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add error display helper
  const showError = (fieldName) => {
    if (validationErrors[fieldName]) {
      return (
        <p className="text-red-500 text-sm mt-1">{validationErrors[fieldName]}</p>
      );
    }
    return null;
  };

  // Progress calculation
  const progressPercent = ((step + 1) / steps.length) * 100;

  // Add this function for AI suggestions
  const handleAISuggest = async (field) => {
    try {
      setAiLoading(field);
      let suggestion = '';
      if (field === 'briefSummary') {
        suggestion = (await getAIDescription(form.briefSummary)).description;
      } else if (field === 'technicalField') {
        suggestion = (await getAIDescription(form.technicalField)).description;
      } else if (field === 'backgroundArt') {
        suggestion = (await getAIDescription(form.backgroundArt)).description;
      } else if (field === 'detailedDescription') {
        suggestion = (await getAIDescription(form.detailedDescription)).description;
      } else if (field === 'advantageousEffects') {
        suggestion = (await getAIDescription(form.advantageousEffects)).description;
      } else if (field === 'knownPriorArt') {
        suggestion = (await getAIDescription(form.knownPriorArt)).description;
      } else if (field === 'claims') {
        suggestion = (await getAIDescription(form.claims.join('\n'))).description;
      }
      if (suggestion) {
        setForm(f => ({ ...f, [field]: field === 'claims' ? suggestion.split('\n') : suggestion }));
        toast.success('AI suggestion applied successfully');
      } else {
        toast.error('No suggestion available. Please try again.');
      }
    } catch (err) {
      toast.error('Failed to get AI suggestion');
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="w-[88%] mx-auto p-8 outline outline-1 outline-[#FFFFFF]/5 outline-[2px] rounded-[12px] bg-[#EFECE5] grain-texture">
      {/* Progress Bar Section */}
      <div className="mb-8">
        <div className='flex items-center gap-4 mb-6'> 
          <button 
            type="button"
            className="p-2 text-[#202020] hover:text-[#FFFFFF] transition-colors rounded-[4px] hover:bg-[#302F2F] border border-[#322B25]/5 border-[1.5px]"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-[#322B25]">Patent Application Wizard</h1>
        </div>
        <div className="flex justify-between text-sm text-[#322B25] mb-2">
          <span>Completion Progress</span>
          <span>In Progress</span>
        </div>
        <div className="w-full bg-[#322B25]/40 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#3987BE] to-[#D48EA3] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stepper Tabs */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((label, i) => {
          const isActive = i === step;
          const isCompleted = i < step;
          const icons = [
            <IoInformationCircleOutline className="w-5 h-5" />,
            <IoDocumentTextOutline className="w-5 h-5" />,
            <IoSearchOutline className="w-5 h-5" />,
            <IoListOutline className="w-5 h-5" />
          ];
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={`w-full px-[27px] py-[11px] rounded-[4px] border-2 transition-all duration-200 flex items-center gap-2
                    ${isActive ? 'bg-[#322B25] text-[#FFFFFF] border-[#FFFFFF]/5 border-[1.5px] shadow-lg' : isCompleted ? 'bg-[#322B25]/50 text-[#FFFFFF] border-[#FFFFFF]/5 border-[1.5px]' : 'bg-[#322B25] text-[#FFFFFF] border-[#6C6C6C]/14'}
                  `}
                  onClick={() => i <= step ? setStep(i) : null}
                  disabled={i > step}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {icons[i]}
                  {label}
                </button>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step > i ? 'bg-[#302F2F]' : 'bg-[#6C6C6C]/20'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Form Steps */}
      {step === 0 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Invention Title <span className="text-[#202020]">*</span></label>
            <input
              type="text"
              name="patentTitle"
              value={form.patentTitle}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.patentTitle ? 'border-red-500' : 'border-[#E2E2E2] border-[1px]'
              } bg-[#FFFFFF] focus:outline-none text-[#322B25] text-base h-10`}
              placeholder="Enter patent title"
              required
            />
            {showError('patentTitle')}
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Inventor Name(s) <span className="text-[#202020]">*</span></label>
            <input
              type="text"
              name="inventorNames"
              value={form.inventorNames}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.inventorNames ? 'border-red-500' : 'border-[#E2E2E2] border-[1px]'
              } bg-[#FFFFFF] focus:outline-none text-[#322B25] text-base h-10`}
              placeholder="Enter inventor name(s), separate multiple names with commas"
              required
            />
            {showError('inventorNames')}
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Patent Type <span className="text-[#202020]">*</span></label>
            <CustomSelect
              name="patentType"
              value={form.patentType}
              onChange={handleChange}
              options={patentTypes}
              placeholder="Select patent type"
              error={validationErrors.patentType}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Brief Summary <span className="text-[#202020]">*</span></label>
            <div className="flex gap-2 items-center">
            <textarea
              name="briefSummary"
              value={form.briefSummary}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${validationErrors.briefSummary ? 'border-red-500' : 'border-[#232323]/10 border-[1px]'} bg-[#FFFFFF] focus:outline-none text-[#322B25] text-base resize-none h-10 overflow-hidden`}
              placeholder="Provide a brief summary of your invention"
              required
            />
              <button
                type="button"
                className="px-4 py-3 ml-4 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                onClick={() => handleAISuggest('briefSummary')}
                disabled={aiLoading === 'briefSummary'}
              >
                <IoSparkles className="w-4 h-4" />
                {aiLoading === 'briefSummary' ? '' : ''}
              </button>
            </div>
            {showError('briefSummary')}
          </div>

          {form.priorityClaim && (
            <>
              <div>
                <label className="block font-medium mb-1 text-[#322B25]">Priority Filing Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={form.priorityFilingDate ? dayjs(form.priorityFilingDate) : null}
                    onChange={date => setForm(f => ({ ...f, priorityFilingDate: date ? date.format('YYYY-MM-DD') : '' }))}
                    disableFuture
                    format="DD-MM-YYYY"
                    slotProps={{
                      textField: {
                        placeholder: 'dd-mm-yyyy',
                        fullWidth: true,
                        size: 'medium',
                        sx: {
                          backgroundColor: '#302F2F',
                          borderRadius: '0.75rem',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6C6C6C',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#868686',
                          },
                          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6C6C6C',
                          },
                        },
                        error: Boolean(validationErrors.priorityFilingDate),
                        helperText: validationErrors.priorityFilingDate || '',
                      },
                      popper: {
                        sx: {
                          '& .MuiPaper-root': {
                            borderRadius: 2,
                            boxShadow: '0 4px 24px 0 rgba(108, 108, 108, 0.10)',
                          },
                          '& .MuiPickersDay-root': {
                            borderRadius: '8px',
                            fontWeight: 500,
                            '&.Mui-selected': {
                              backgroundColor: '#302F2F',
                              color: '#fff',
                            },
                            '&:hover': {
                              backgroundColor: '#6C6C6C',
                              color: '#fff',
                            },
                          },
                          '& .MuiPickersCalendarHeader-label': {
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: '1.15rem',
                          },
                          '& .MuiPickersArrowSwitcher-root button': {
                            color: '#FFFFFF',
                          },
                          '& .MuiPickersCalendarHeader-switchViewButton': {
                            color: '#FFFFFF',
                          },
                          '& .MuiPickersDay-today': {
                            border: '1.5px solid #6C6C6C',
                            background: '#302F2F',
                            color: '#FFFFFF',
                          },
                          '& .MuiPickersDay-root.Mui-disabled': {
                            color: '#6C6C6C',
                          },
                          '& .MuiPickersCalendarHeader-root': {
                            background: '#1C1C1C',
                            borderRadius: '12px 12px 0 0',
                          },
                          '& .MuiPickersDay-dayOutsideMonth': {
                            color: '#6C6C6C',
                          },
                          '& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton': {
                            borderRadius: '8px',
                            fontWeight: 600,
                            '&.Mui-selected': {
                              backgroundColor: '#302F2F',
                              color: '#fff',
                            },
                            '&:hover': {
                              backgroundColor: '#6C6C6C',
                              color: '#fff',
                            },
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              {/* File upload for certified copy (if needed) */}
              <div className="mt-4">
                <label className="block font-medium mb-1 text-[#FFFFFF]">Certified Copy of Priority Document</label>
                <div className="relative w-full mb-2">
                  <input
                    name="certifiedCopy"
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                    className="hidden"
                    id="certified-copy-upload"
                  />
                  <label
                    htmlFor="certified-copy-upload"
                    className="w-full px-4 py-3 rounded-[4px]  border border-[#322B25]/5 border-[1.5px] bg-[#302F2F] text-[#FFFFFF] font-medium hover:bg-[#232323] hover:border-[#868686] transition-colors cursor-pointer text-center appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    Browse Files
                  </label>
                </div>
                {form.certifiedCopy && (
                  <p className="text-sm text-[#868686] mt-2">Selected: {form.certifiedCopy.name}</p>
                )}
                {validationErrors.certifiedCopy && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.certifiedCopy}</p>
                )}
                <p className="text-xs text-[#868686] mt-1">Upload certified copy of priority document (PDF). Max 10MB.</p>
              </div>
            </>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Technical Field <span className="text-[#868686]">*</span></label>
            <div className="flex gap-2 items-center">
            <textarea
              name="technicalField"
              value={form.technicalField}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-[4px] bg-[#F6F6F6] focus:outline-none  text-[#322B25] text-base resize-none h-10 overflow-hidden`}
              placeholder="Describe the technical field to which the invention relates"
              required
            />
              <button
                type="button"
                className="px-3 py-3 ml-4 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                onClick={() => handleAISuggest('technicalField')}
                disabled={aiLoading === 'technicalField'}
              >
                <IoSparkles className="w-4 h-4" />
                {aiLoading === 'technicalField' ? 'Suggesting...' : ''}
              </button>
            </div>
            {showError('technicalField')}
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Background Art <span className="text-[#868686]">*</span></label>
            <div className="flex gap-2 items-center">
            <textarea
              name="backgroundArt"
              value={form.backgroundArt}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-[4px] bg-[#ffffff] focus:outline-none text-[#322B25] text-base resize-none h-10 overflow-hidden`}
              placeholder="Describe the existing art, problems, and limitations that your invention addresses"
              required
            />
              <button
                type="button"
                className="px-3 py-3 ml-4 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                onClick={() => handleAISuggest('backgroundArt')}
                disabled={aiLoading === 'backgroundArt'}
              >
                <IoSparkles className="w-4 h-4" />
                {aiLoading === 'backgroundArt' ? 'Suggesting...' : ''}
              </button>
            </div>
            {showError('backgroundArt')}
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25] ">Detailed Description <span className="text-[#868686]">*</span></label>
            <div className="flex gap-2 items-center">
            <textarea
              name="detailedDescription"
              value={form.detailedDescription}
              onChange={handleChange}
                className={`w-full px-4 py-3 rounded-[4px] bg-[#ffffff] focus:outline-none text-[#322B25] text-base resize-none h-10 overflow-hidden`}
                placeholder="Provide a detailed description of your invention, including all components, how they interact, and alternative embodiments"
              required
            />
              <button
                type="button"
                className="px-3 py-3 ml-4 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                onClick={() => handleAISuggest('detailedDescription')}
                disabled={aiLoading === 'detailedDescription'}
              >
                <IoSparkles className="w-4 h-4" />
                {aiLoading === 'detailedDescription' ? 'Suggesting...' : ''}
              </button>
            </div>
            {showError('detailedDescription')}
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Advantageous Effects <span className="text-[#868686]">*</span></label>
            <div className="flex gap-2 items-center">
            <textarea
              name="advantageousEffects"
              value={form.advantageousEffects}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-[4px] bg-[#ffffff] focus:outline-none  text-[#322B25] text-base resize-none h-10 overflow-hidden`}
              placeholder="Describe the advantages and improvements your invention provides over existing solutions"
              required
            />
              <button
                type="button"
                className="px-3 py-3 ml-4 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                onClick={() => handleAISuggest('advantageousEffects')}
                disabled={aiLoading === 'advantageousEffects'}
              >
                <IoSparkles className="w-4 h-4" />
                {aiLoading === 'advantageousEffects' ? 'Suggesting...' : ''}
              </button>
            </div>
            {showError('advantageousEffects')}
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Drawing References</label>
            <p className="text-sm text-[#868686] mb-4">List the drawings you plan to include and briefly describe each</p>
            <div className="space-y-4">
              {form.drawings && form.drawings.map((drawing, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center">
                <input
                  type="text"
                    name={`drawingFigure${index + 1}`}
                    value={drawing.figure}
                    onChange={e => handleDrawingChange(index, 'figure', e.target.value)}
                    className={`flex h-10 w-full rounded-[4px] border border-[#322B25]/5 border-[1.5px] bg-[#FFFFFF] px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#868686] focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-1 text-[#322B25]`}
                    placeholder={`Fig. ${index + 1}`}
                />
                <input
                  type="text"
                    name={`drawingDescription${index + 1}`}
                    value={drawing.description}
                    onChange={e => handleDrawingChange(index, 'description', e.target.value)}
                    className={`flex h-10 w-full rounded-[4px] border border-[#322B25]/5 border-[1.5px] bg-[#FFFFFF] px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#868686] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-2 text-[#322B25]`}
                    placeholder={`Description of Figure ${index + 1}`}
                />
                  <div className="flex items-center gap-2 col-span-1">
                <input
                      type="file"
                      accept="image/*,application/pdf"
                      id={`drawing-file-${index}`}
                      style={{ display: 'none' }}
                      onChange={e => handleDrawingFileChange(index, e.target.files[0])}
                    />
                    <label htmlFor={`drawing-file-${index}`} className="px-2 py-2 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                    >
                      Upload
                    </label>
                    {drawing.file && (
                      <span className="text-xs text-[#868686] ml-2">{drawing.file.name}</span>
                    )}
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Known Prior Art <span className="text-[#868686]">*</span></label>
            <div className="flex gap-2 items-center">
            <textarea
              name="knownPriorArt"
              value={form.knownPriorArt}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${validationErrors.knownPriorArt ? 'border-red-500' : 'border-[#E2E2E2] border-[1px]'} bg-[#FFFFFF] focus:outline-none  text-[#322B25] text-base resize-none h-10 overflow-hidden`}
              placeholder="Describe any known existing solutions or technologies related to your invention"
              required
            />
              <button
                type="button"
                className="px-3 py-3 ml-4 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                onClick={() => handleAISuggest('knownPriorArt')}
                disabled={aiLoading === 'knownPriorArt'}
              >
                <IoSparkles className="w-4 h-4" />
                {aiLoading === 'knownPriorArt' ? 'Suggesting...' : ''}
              </button>
            </div>
            {showError('knownPriorArt')}
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Prior Art References</label>
            <div className="space-y-4">
              {form.priorArtReferences.map((ref, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col flex-1">
                    <label className="text-sm text-[#322B25] mb-1">Reference</label>
                    {ref.fromSearch ? (
                      <div className="flex h-10 items-center px-3 bg-[#FFFFFF] rounded-md text-base text-[#322B25]">{ref.reference}</div>
                    ) : (
                    <input
                      type="text"
                      value={ref.reference}
                      onChange={(e) => {
                        const newRefs = [...form.priorArtReferences];
                        newRefs[index] = { ...ref, reference: e.target.value };
                        setForm(f => ({ ...f, priorArtReferences: newRefs }));
                      }}
                      className={`flex h-10 w-full rounded-md border ${
                        validationErrors.priorArtReferences ? 'border-red-500' : 'border-[#322B25]/5 border-[1.5px]'
                      } bg-[#FFFFFF] px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#868686] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#322B25]`}
                      placeholder="Patent number or article title"
                    />
                    )}
                  </div>
                  <div className="flex flex-col w-[200px]">
                    <label className="text-sm text-[#322B25] mb-1">Type</label>
                    <>
                      {ref.fromSearch ? (
                        <div className="flex h-10 items-center px-3 bg-[#1C1C1C] rounded-md text-base text-[#322B25]">{ref.type}</div>
                      ) : (
                    <input
                      type="text"
                      value={ref.type}
                      onChange={(e) => {
                        const newRefs = [...form.priorArtReferences];
                        newRefs[index] = { ...ref, type: e.target.value };
                        setForm(f => ({ ...f, priorArtReferences: newRefs }));
                      }}
                      className={`flex h-10 w-full rounded-md border ${
                        validationErrors.priorArtReferences ? 'border-red-500' : 'border-[#322B25]/5 border-[1.5px]'
                      } bg-[#FFFFFF] px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#868686] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#322B25]`}
                      placeholder="Patent, Article, etc."
                    />
                      )}
                    </>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="text-sm text-[#322B25] mb-1">Relevance</label>
                    <>
                      {ref.fromSearch ? (
                        <div className="flex h-10 items-center px-3 bg-[#1C1C1C] rounded-md text-base text-[#322B25]">{ref.relevance}</div>
                      ) : (
                    <input
                      type="text"
                      value={ref.relevance}
                      onChange={(e) => {
                        const newRefs = [...form.priorArtReferences];
                        newRefs[index] = { ...ref, relevance: e.target.value };
                        setForm(f => ({ ...f, priorArtReferences: newRefs }));
                      }}
                      className={`flex h-10 w-full rounded-md border ${
                        validationErrors.priorArtReferences ? 'border-red-500' : 'border-[#322B25]/5 border-[1.5px]'
                      } bg-[#FFFFFF] px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#868686] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#322B25]`}
                      placeholder="How it relates to your invention"
                    />
                      )}
                    </>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newRefs = [...form.priorArtReferences];
                        newRefs.splice(index, 1);
                        setForm(f => ({ ...f, priorArtReferences: newRefs }));
                      }}
                      className="self-end h-10 px-3 text-red-500 hover:bg-[#322B25] rounded-md transition-colors"
                      title="Remove reference"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setForm(f => ({
                    ...f,
                    priorArtReferences: [...f.priorArtReferences, { reference: '', type: '', relevance: '' }]
                  }));
                }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#302F2F] text-[#FFFFFF] hover:bg-[#6C6C6C] h-10 px-4 py-2 w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Reference
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Search for Prior Art</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  validationErrors.searchQuery ? 'border-red-500' : 'border-[#322B25]/5 border-[1.5px]'
                } bg-[#ffffff] focus:outline-none  text-[#322B25] text-base h-10`}
                placeholder="Enter keywords related to your invention"
              />
              <button
                type="button"
                onClick={handleSearchPriorArt}
                className="px-[27px] py-[11px] rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                disabled={aiLoading}
              >
                {aiLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6 border border-[#6C6C6C] rounded-lg p-4 bg-[#302F2F]">
                <h3 className="text-lg font-medium mb-2 text-[#FFFFFF]">Search Results for "{searchQuery}"</h3>
                <p className="text-sm text-[#868686] mb-3">Found {searchResults.length} potentially relevant documents</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#6C6C6C]">
                    <thead className="bg-[#1C1C1C]">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#868686] uppercase tracking-wider">Reference</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#868686] uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#868686] uppercase tracking-wider">Relevance</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#868686] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#302F2F] divide-y divide-[#6C6C6C]">
                      {searchResults.map((result, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#FFFFFF]">{result.reference}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#868686]">{result.type}</td>
                          <td className="px-6 py-4 text-sm text-[#868686]">{result.relevance}</td>
                          <td className="pl-[35px] pr-6 py-4 whitespace-nowrap text-sm text-[#868686]">
                            <button
                              type="button"
                              onClick={() => {
                                setForm(f => ({
                                  ...f,
                                  priorArtReferences: [
                                    ...f.priorArtReferences,
                                    { 
                                      reference: result.reference,
                                      type: result.type,
                                      relevance: result.relevance,
                                      fromSearch: true
                                    }
                                  ]
                                }));
                                toast.success('Reference added to your list');
                              }}
                              className="inline-flex items-center justify-center w-8 h-8 text-[#FFFFFF] hover:text-[#FFFFFF] hover:bg-[#6C6C6C] rounded-[25%] border border-[#6C6C6C] transition-colors"
                              title="Add to References"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1 text-[#322B25]">Claims <span className="text-[#868686]">*</span></label>
            <div className="flex gap-2 items-center">
            <textarea
              name="claims"
              value={form.claims.join('\n')}
              onChange={(e) => setForm(f => ({ ...f, claims: e.target.value.split('\n') }))}
              className={`w-full px-4 py-3 rounded-lg border ${validationErrors.claims ? 'border-red-500' : 'border-[#E2E2E2] border-[1px]'} bg-[#FFFFFF] focus:outline-none text-[#322B25] text-base resize-none h-10 overflow-hidden`}
              placeholder="Enter patent claims (one per line)"
              required
            />
              <button
                type="button"
                className="px-3 py-3 ml-4 rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
"
                onClick={() => handleAISuggest('claims')}
                disabled={aiLoading === 'claims'}
              >
                <IoSparkles className="w-4 h-4" />
                {aiLoading === 'claims' ? 'Suggesting...' : ''}
              </button>
            </div>
            {showError('claims')}
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      <div className="mt-8 mb-6">
        <AISuggestionBox 
          suggestions={
            step === 0 ? suggestions.basicInfo :
            step === 1 ? suggestions.detailedDescription :
            step === 2 ? suggestions.priorArt :
            suggestions.claims
          } 
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C6C6C]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-[#6C6C6C] bg-[#302F2F] text-[#FFFFFF] hover:bg-[#E2E2E2] hover:text-[#322B25] h-10 px-[27px] py-[16px]"
          disabled={step === 0}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            if (step === steps.length - 1) {
              handleSubmit();
            } else {
              handleNext();
            }
          }}
          className={`px-[27px] py-[11px] rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : step === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default PatentFiling; 