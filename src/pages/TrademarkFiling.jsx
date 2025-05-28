import React, { useState, useEffect } from 'react';
import { submitTrademarkForm, getAIDescription, getAIClassRecommendation, getAITrademarkName, getAIMarkDescription } from '../services/trademarkService';
import { validateTrademarkForm } from '../services/validationService';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import AddressInput from '../components/AddressInput';
import CustomSelect from '../components/CustomSelect';
import { IoArrowBack } from 'react-icons/io5';
import { IoInformationCircleOutline, IoBagHandleOutline, IoDocumentTextOutline, IoSparkles, IoBulbOutline } from 'react-icons/io5';
import { DatePickerShadcn } from "../components/ui/DatePickerShadcn";
import AIAnalyzeIcon from '../assests/AI_Analyze.png';

const steps = [
  'Basic Info',
  'Goods & Services',
  'Usage Evidence',
];

const initialForm = {
  trademarkName: '',
  markType: '',
  logo: null,
  logoDescription: '',
  ownerName: '',
  ownerType: '',
  ownerAddress: '',
  filingBasis: '',
  businessDescription: '',
  trademarkClass: [],
  goodsServices: '',
  firstUseAnywhere: '',
  firstUseCommerce: '',
  typeOfCommerce: '',
  markUsage: '',
  specimen: null,
  priorityClaim: false,
  priorityCountry: '',
  priorityAppNumber: '',
  priorityFilingDate: '',
  additionalNotes: '',
  declaration: false,
  signature: '',
  certifiedCopy: null,
  hasAttorney: false,
  attorneyName: '',
  attorneyAddress: '',
  attorneyEmail: '',
};

const markTypes = [
  'Standard Character Mark (text only)',
  'Design Mark (logo or stylized text)',
  'Sound Mark'
];
const ownerTypes = ['Individual', 'Corporation', 'LLC', 'Partnership', 'Trust', 'Other'];
const filingBases = [
  'Use in Commerce (Section 1(a))',
  'Intent to Use (Section 1(b))',
  'Foreign Registration (Section 44(e))',
  'Foreign Application (Section 44(d))',
  'Madrid Protocol (Section 66(a))',
];
const commerceTypes = [
  'Interstate commerce (U.S.)',
  'International commerce',
  'Commerce within a state or U.S. territory',
  'Commerce between U.S. and foreign country',
];
const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Other'];

const suggestions = {
  basicInfo: [
    "Use a unique, distinctive name for your trademark.",
    "Select the correct mark type for your application.",
    "Provide the full legal name and address of the owner.",
    "If you have an attorney, include their details."
  ],
  detailedDescription: [
    "Describe your business, products, or services clearly.",
    "Select the correct filing basis and provide accurate dates.",
    "List all relevant trademark classes.",
    "Describe your goods/services in detail."
  ],
  priorArt: [
    "Provide evidence of use if filing under 'Use in Commerce'.",
    "Upload a clear specimen showing the mark in use.",
    "Include any priority claims and supporting documents.",
    "Agree to the declaration and sign digitally."
  ],
  claims: [
    "Review all information before submitting.",
    "Ensure all required fields are completed.",
    "Double-check uploaded files for clarity and accuracy.",
    "Consult an attorney if unsure about any section."
  ]
};

const AISuggestionBox = ({ suggestions }) => (
  <div className="-z-50 p-4 mb-6">
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

const fadeStyle = `
@keyframes fadeInOut {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}
.fade {
  animation: fadeInOut 1.5s ease-in-out infinite;
}
`;

const TrademarkFiling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [aiLoading, setAiLoading] = useState(null);
  const [aiClassRecommendation, setAiClassRecommendation] = useState(null);

  useEffect(() => {
    if (location.state?.isReturning && location.state?.formData) {
      setForm(location.state.formData);
      setStep(steps.length - 1);
    }
  }, [location.state]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = fadeStyle;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

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

  const handleAISuggest = async (field) => {
    try {
      setAiLoading(field);
      let suggestion = '';
      if (field === 'trademarkName') {
        suggestion = await getAITrademarkName(form.trademarkName || '');
      } else if (field === 'businessDescription') {
        const currentDescription = form.businessDescription || '';
        if (typeof currentDescription !== 'string' || !currentDescription.trim()) {
          toast.error('Please provide at least a brief description of your business');
          return;
        }
        const response = await getAIDescription(currentDescription);
        suggestion = response.description;
      } else if (field === 'goodsServices') {
        const recommendation = await getAIClassRecommendation(form.goodsServices || '');
        setAiClassRecommendation(recommendation);
        if (recommendation && recommendation.classes) {
          const suggestedClasses = recommendation.classes.map(c => c.number);
          setForm(f => ({ ...f, trademarkClass: suggestedClasses }));
        }
        return;
      } else if (field === 'logoDescription') {
        if (!form.markType) {
          toast.error('Please select a mark type first');
          return;
        }
        if (form.markType === 'Standard Character Mark (text only)') {
          suggestion = await getAIMarkDescription(form.logoDescription || '', null, form.markType);
        } else {
          if (!form.logo) {
            toast.error(`Please upload a ${form.markType.toLowerCase()} first`);
            return;
          }
          suggestion = await getAIMarkDescription(form.logoDescription || '', form.logo, form.markType);
        }
      }
      if (suggestion) {
        setForm((f) => ({ ...f, [field]: typeof suggestion === 'string' ? suggestion : '' }));
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

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 0) {
      if (typeof form.trademarkName !== 'string' || !form.trademarkName.trim()) errors.trademarkName = 'Trademark name is required';
      if (!form.markType) errors.markType = 'Mark type is required';
      if (typeof form.ownerName !== 'string' || !form.ownerName.trim()) errors.ownerName = 'Owner name is required';
      if (!form.ownerType) errors.ownerType = 'Owner type is required';
      if (typeof form.ownerAddress !== 'string' || !form.ownerAddress.trim()) errors.ownerAddress = 'Owner address is required';
    } else if (currentStep === 1) {
      if (!form.filingBasis) errors.filingBasis = 'Filing basis is required';
      if (typeof form.businessDescription !== 'string' || !form.businessDescription.trim()) errors.businessDescription = 'Business description is required';
      if (!form.trademarkClass?.length) errors.trademarkClass = 'At least one trademark class is required';
      if (typeof form.goodsServices !== 'string' || !form.goodsServices.trim()) errors.goodsServices = 'Goods/services description is required';
    } else if (currentStep === 2) {
      if (form.priorityClaim) {
        if (!form.priorityCountry) errors.priorityCountry = 'Priority country is required';
        if (typeof form.priorityAppNumber !== 'string' || !form.priorityAppNumber.trim()) errors.priorityAppNumber = 'Priority application number is required';
        if (!form.priorityFilingDate) errors.priorityFilingDate = 'Priority filing date is required';
      }
      if (!form.declaration) errors.declaration = 'You must agree to the declaration';
      if (typeof form.signature !== 'string' || !form.signature.trim()) errors.signature = 'Digital signature is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const result = await submitTrademarkForm(form);
      if (result.success) {
        setSubmissionData(result.data);
        toast.success('Trademark application submitted successfully!');
        navigate('/dashboard/generate-documents', {
          state: { submissionData: result.data }
        });
      } else {
        setSubmissionError(result.error || 'Failed to submit application');
        toast.error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      setSubmissionError(error.message);
      toast.error('Failed to submit trademark application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showError = (fieldName) => {
    if (validationErrors[fieldName]) {
      return (
        <p className="text-red-500 text-sm mt-1">{validationErrors[fieldName]}</p>
      );
    }
    return null;
  };

  const progressPercent = ((step + 1) / steps.length) * 100;

  return (
    <div className=" mx-auto p-8 outline outline-1 outline-[#000000]/5 rounded-[12px] bg-[#ffffff]">
      {/* Progress Bar Section */}
      <div className="mb-8  ">
        <div className='flex items-center gap-4 mb-4'>
          <button
            type="button"
            className="p-2 text-[#202020] transition-colors rounded-[4px] "
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-[#322B25]">Trademark Application Wizard</h1>
        </div>
        <div className="flex justify-between text-sm text-[#000000] mb-2">
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
            <IoBagHandleOutline className="w-5 h-5" />,
            <IoDocumentTextOutline className="w-5 h-5" />
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
              {/* Render connector line except after the last step */}
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step > i ? 'bg-[#000000]' : 'bg-[#6C6C6C]/20'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 0 && (
          <>
            <div className="mb-6">
              <label className="block mb-1 font-medium text-[#322B25] mb-1">
                Trademark Name *
              </label>
              <input
                type="text"
                name="trademarkName"
                value={form.trademarkName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-[4px] bg-[#f6f6f6] focus:outline-none text-base h-10 text-[#000000]"
                placeholder="Enter your trademark name"
                required
              />
              {showError('trademarkName')}
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#322B25]">Mark Type <span className="text-[#302F2F]">*</span></label>
              <div className="space-y-2">
                {markTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="markType"
                      value={type}
                      checked={form.markType === type}
                      onChange={handleChange}
                      className="text-[#4f4f4f] focus:ring-[#302F2F]"
                    />
                    <span className="text-[#4f4f4f]">{type}</span>
                  </label>
                ))}
              </div>
              {showError('markType')}
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#322B25]">Owner Name <span className="text-[#302F2F]">*</span></label>
              <input name="ownerName" value={form.ownerName} onChange={handleChange} className="w-full px-4 py-3 rounded-[4px] bg-[#f6f6f6] focus:outline-none text-[#000000]" placeholder="Full legal name" required />
              {showError('ownerName')}
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#322B25]">Owner Type <span className="text-[#302F2F]">*</span></label>
              <CustomSelect
                name="ownerType"
                value={form.ownerType}
                onChange={handleChange}
                options={ownerTypes}
                placeholder="Select owner type"
                error={validationErrors.ownerType}
                required
              />
              {showError('ownerType')}
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#322B25]">Owner Address <span className="text-[#302F2F]">*</span></label>
              <AddressInput
                name="ownerAddress"
                value={form.ownerAddress}
                onChange={handleChange} className="w-full px-4 py-3 rounded-[4px] bg-[#f6f6f6] focus:outline-none text-[#000000]"
                error={validationErrors.ownerAddress}
                placeholder="Full mailing address"
              />
              {showError('ownerAddress')}
            </div>
          </>
        )}
        {/* Step 2: Goods & Services */}
        {step === 1 && (
          <>
            <div>
              <label className="block font-medium mb-1 text-[#322B25]">Filing Basis <span className="text-[#302F2F]">*</span></label>
              <CustomSelect
                name="filingBasis"
                value={form.filingBasis}
                onChange={handleChange}
                options={filingBases}
                placeholder="Select filing basis"
                error={validationErrors.filingBasis}
                required
              />
              {showError('filingBasis')}
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#322B25]">Business Description <span className="text-[#302F2F]">*</span></label>
              <div className="flex gap-2 items-center">
                <textarea
                  name="businessDescription"
                  value={form.businessDescription}
                  onChange={handleChange}
                  className="w-[80%] px-4 py-3 rounded-[4px] bg-[#f6f6f6] focus:outline-none text-[#000000]"
                  placeholder="Describe your business, products, or services"
                  required
                />
                <button
                  type="button"
                  className={`px-3 py-3 ml-4 rounded-[4px] bg-[#322B25] text-[#FFFFFF] transition-all ${aiLoading === 'businessDescription' ? 'opacity-50' : ''}`}
                  onClick={() => handleAISuggest('businessDescription')}
                  disabled={aiLoading === 'businessDescription'}
                >
                  <img 
                    src={AIAnalyzeIcon} 
                    alt="AI Analyze" 
                    style={{ height: 24, width: 24, display: 'inline-block', verticalAlign: 'middle', marginTop: '-4px' }} 
                    className={aiLoading === 'businessDescription' ? 'fade' : ''} 
                  />
                </button>
              </div>
              {showError('businessDescription')}
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#322B25]">Trademark Class <span className="text-[#302F2F]">*</span></label>
              <textarea
                name="goodsServices"
                value={form.goodsServices}
                onChange={handleChange}
                className="w-[80%] px-4 py-3 rounded-[4px] bg-[#f6f6f6] focus:outline-none text-[#000000]"
                placeholder="Describe your goods/services in detail"
              />
              <button
                type="button"
                className={`px-3 py-3 ml-4 rounded-[4px] bg-[#322B25] text-[#FFFFFF] font-medium transition-all flex items-center gap-1 ${aiLoading === 'goodsServices' ? 'opacity-50' : ''}`}
                onClick={() => handleAISuggest('goodsServices')}
                disabled={aiLoading === 'goodsServices'}
              >
                <img 
                  src={AIAnalyzeIcon} 
                  alt="AI Analyze" 
                  style={{ height: 24, width: 24, display: 'inline-block', verticalAlign: 'middle', marginTop: '-4px' }} 
                  className={aiLoading === 'goodsServices' ? 'fade' : ''} 
                />
              </button>
              {showError('goodsServices')}
            </div>
          </>
        )}
        {/* Step 3: Usage Evidence */}
        {step === 2 && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <input
                name="priorityClaim"
                type="checkbox"
                checked={form.priorityClaim}
                onChange={handleChange}
              />
              <label className="font-medium text-[#000000]">Priority Claim (if previously filed abroad)</label>
            </div>
            {form.priorityClaim && (
              <div className="space-y-3 pl-6 border-l-2 border-[#FFFFFF]/20">
                <div>
                  <label className="block font-medium mb-1 text-[#000000]">Priority Filing Country</label>
                  <CustomSelect
                    name="priorityCountry"
                    value={form.priorityCountry}
                    onChange={handleChange}
                    options={countries}
                    placeholder="Select country"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-[#000000]">Priority Application Number</label>
                  <input name="priorityAppNumber" value={form.priorityAppNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-[4px]  focus:outline-none text-[#000000]" placeholder="Application number" />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-[#000000]">Priority Filing Date</label>
                  <DatePickerShadcn
                    value={form.priorityFilingDate}
                    onChange={date => setForm(f => ({ ...f, priorityFilingDate: date }))}
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block font-medium mb-1 text-[#000000]">Additional Notes</label>
              <textarea name="additionalNotes" value={form.additionalNotes} onChange={handleChange} className="w-full px-4 py-3 rounded-[4px] bg-[#f6f6f6] focus:outline-none text-[#000000]" placeholder="Any special instructions, background info, etc." />
            </div>
            <div className="mb-4 p-4 bg-[#302F2F]/10 rounded">
              <p className="text-[#000000]/70 text-sm">
                <strong>Declaration:</strong> "I declare that all statements made of my own knowledge are true and that all statements made on information and belief are believed to be true. I understand that willful false statements may result in penalties and jeopardize the validity of the application or any resulting registration."
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input name="declaration" type="checkbox" checked={form.declaration} onChange={handleChange} required />
              <label className="font-medium text-[#000000]">I agree to the above declaration</label>
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#000000]">Digital Signature <span className="text-[#302F2F]">*</span></label>
              <input name="signature" value={form.signature} onChange={handleChange} className="w-full px-4 py-3 rounded-[4px] bg-[#f6f6f6] focus:outline-none text-[#000000]" placeholder="Type your full name as signature" required />
              {showError('signature')}
            </div>
          </>
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
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0 || isSubmitting}
            className="px-6 py-2 rounded-lg font-semibold bg-[#322B25]  text-[#000000]  transition-all disabled:opacity-50"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
                className="px-[27px] py-[11px] rounded-[4px]  bg-[#322B25] text-[#FFFFFF] font-medium  transition-all"
              >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-[27px] py-[11px] rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90 transition-all"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Filing'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TrademarkFiling; 