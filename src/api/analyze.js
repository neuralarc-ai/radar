import { getFilingPrepAnalysis } from '../services/filingService';
import { getPatentFilingPrepAnalysis } from '../services/patentFilingService';
import { checkCompliance } from '../services/complianceService';
import { checkPatentCompliance } from '../services/patentComplianceService';

// Get trademark analysis data
export const getTrademarkAnalysis = async (filingId) => {
  try {
    // Get filing preparation analysis
    const prepAnalysis = await getFilingPrepAnalysis(filingId);
    
    // Get compliance analysis
    const complianceAnalysis = await checkCompliance(filingId);
    
    // Combine the analyses
    return {
      ...prepAnalysis,
      jurisdictions: complianceAnalysis.jurisdictions,
      overallCompliance: complianceAnalysis.overallCompliance
    };
  } catch (error) {
    console.error('Error getting trademark analysis:', error);
    throw error;
  }
};

// Get patent analysis data
export const getPatentAnalysis = async (filingId) => {
  try {
    // Get filing preparation analysis
    const prepAnalysis = await getPatentFilingPrepAnalysis(filingId);
    
    // Get compliance analysis
    const complianceAnalysis = await checkPatentCompliance(filingId);
    
    // Combine the analyses
    return {
      ...prepAnalysis,
      requirements: complianceAnalysis.requirements,
      overallCompliance: complianceAnalysis.overallCompliance
    };
  } catch (error) {
    console.error('Error getting patent analysis:', error);
    throw error;
  }
};

// API route handler for trademark analysis
export const handleTrademarkAnalysis = async (req, res) => {
  try {
    const { filingId } = req.params;
    const analysis = await getTrademarkAnalysis(filingId);
    res.json(analysis);
  } catch (error) {
    console.error('Error in trademark analysis API:', error);
    res.status(500).json({ error: error.message });
  }
};

// API route handler for patent analysis
export const handlePatentAnalysis = async (req, res) => {
  try {
    const { filingId } = req.params;
    const analysis = await getPatentAnalysis(filingId);
    res.json(analysis);
  } catch (error) {
    console.error('Error in patent analysis API:', error);
    res.status(500).json({ error: error.message });
  }
}; 