import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { uploadSupportingFile, deleteSupportingFile, initializeStorage, getFiling } from '../services';
import ProgressSidebar from '../components/ProgressSidebar';
import CustomSelect from '../components/CustomSelect';
import { IoArrowBack } from 'react-icons/io5';

function UploadDocuments() {
  const { filingId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filingExists, setFilingExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const documentCategories = [
    { id: 'logo', name: 'Logo/Mark Image', required: true },
    { id: 'specimen', name: 'Specimens of Use', required: true },
    { id: 'declaration', name: 'Signed Declaration', required: true },
    { id: 'consent', name: 'Consent Documents', required: false },
    { id: 'foreign', name: 'Foreign Registration', required: false }
  ];

  useEffect(() => {
    const verifyFiling = async () => {
      if (!filingId) {
        toast.error('No filing ID provided');
        navigate('/dashboard');
        return;
      }

      try {
        const result = await getFiling(filingId);
        if (!result.success) {
          toast.error('Filing not found. Please create a filing first.');
          setFilingExists(false);
          return;
        }
        setFilingExists(true);
      } catch (error) {
        console.error('Error verifying filing:', error);
        toast.error('Error verifying filing. Please try again.');
        setFilingExists(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyFiling();
  }, [filingId, navigate]);

  useEffect(() => {
    const initStorage = async () => {
      try {
        console.log('Initializing storage...');
        const ready = await initializeStorage();
        setIsStorageReady(ready);
        if (!ready) {
          toast.error('Failed to initialize storage. Please try again later.');
        }
      } catch (error) {
        console.error('Storage initialization error:', error);
        toast.error('Failed to initialize storage. Please try again later.');
      }
    };

    initStorage();
  }, []);

  const handleFiles = async (newFiles) => {
    if (!selectedCategory) {
      toast.error('Please select a document category first');
      return;
    }

    // File type and size validation
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/tiff'
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = [];
    for (const file of newFiles) {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Unsupported file type: ${file.name}. Allowed: PDF, DOCX, JPEG, PNG, TIFF.`);
        continue;
      }
      if (file.size > maxSize) {
        toast.error(`File too large: ${file.name} (max 10MB)`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      try {
        setIsUploading(true);
        for (const file of validFiles) {
          const result = await uploadSupportingFile(filingId, file, selectedCategory);
          if (result.success) {
            setUploadedFiles(prev => [...prev, {
              id: result.data.id,
              name: file.name,
              category: selectedCategory,
              size: file.size,
              type: file.type
            }]);
            toast.success(`Successfully uploaded ${file.name}`);
          } else {
            throw new Error(result.error || 'Failed to upload file');
          }
        }
        // Clear the selected category after successful upload
        setSelectedCategory('');
      } catch (error) {
        console.error('Error in handleFiles:', error);
        toast.error(`Error uploading file: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleRemoveFile = async (fileId) => {
    try {
      await deleteSupportingFile(fileId);
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
      toast.success('File removed successfully');
    } catch (error) {
      console.error('Error removing file:', error);
      toast.error('Error removing file');
    }
  };

  return (
    <div className="">
      {/* Outer container for the wide border effect */}
      <div className="rounded-[24px]" >
        <div className="">
          {/* Inner container for the white content area */}
          <div className="bg-[#FFFFFF] h-full rounded-[12px] p-8">
            <div className="mb-8">
              <div className='flex items-center gap-2 mb-6'>
                <button 
                  type="button"
                  className="p-2 text-[#202020] transition-colors rounded-[4px] "
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                >
                  <IoArrowBack className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-[#322B25]">Upload Manager</h1>
              </div>
              <p className="text-[#4F4F4F] mt-2">Upload and manage supporting documents for your application</p>
            </div>

            <div className="rounded-[8px] border border-[#000000]/5 border-[1.5px] p-6">
              <h2 className="text-xl font-semibold text-[#322B25] mb-2">Upload Documents</h2>
              <p className="text-[#4F4F4F] mb-6">Select a category and upload supporting files</p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#4F4F4F] mb-2">
                  Select document category
                </label>
                <select
                  name="documentCategory"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-[14px] py-[16px] rounded-[4px] bg-[#f6f6f6] focus:outline-none focus:ring-2 focus:ring-[#6C6C6C] text-[#1c1c1c] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231c1c1c%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_12px] bg-[right_4px_center] bg-no-repeat pr-8"
                >
                  <option value="">Select a category</option>
                  {documentCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} {category.required ? '(Required)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-[#F5F5F5] relative rounded-lg p-8 text-center cursor-pointer hover:border-[#868686] transition-colors">
                <input
                  id="file-input"
                  type="file"
                  multiple
                  className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                  onChange={handleFileSelect}
                  style={{zIndex:2}}
                  tabIndex={-1}
                  aria-label="File upload"
                />
                <div
                  onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('file-input').click()}
                  className="relative z-1"
                >
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-[#868686]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-[#322B25]">Drag and drop files here, or click to select files</p>
                  <p className="text-sm text-[#2D2623]">Supported formats: PDF, DOCX, JPEG, PNG, TIFF (Max 10MB)</p>
                  </div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-[#322B25] mb-4">Uploaded Files</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg border border-[#6C6C6C]">
                        <div className="flex items-center space-x-3">
                          <svg className="h-5 w-5 text-[#868686]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-[#322B25]">{file.name}</p>
                            <p className="text-xs text-[#868686]">{file.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  className="px-[27px] py-[16px] rounded-[4px] border border-[#322B25] bg-[#322B25] text-[#FFFFFF] font-medium hover:bg-[#322B25]/50 hover:border-[#302F2F] hover:text-[#322B25]/90"
                  onClick={() => navigate(-1)}
                >
                  <span>Back</span>
                </button>
                <button
                  className="px-[27px] py-[16px] bg-[#302F2F] text-[#FFFFFF] rounded-[4px] transition-colors flex items-center gap-2 border border-[#322B25]"
                  onClick={() => navigate(`/dashboard/compliance/${filingId}`)}
                >
                  <span>Check Compliance</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDocuments; 