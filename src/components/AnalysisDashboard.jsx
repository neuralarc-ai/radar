import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Status helper function
const getStatusText = (status) => {
  switch (status) {
    case 'met':
      return '✓ Fulfilled';
    case 'missing':
      return '✗ Unfulfilled';
    case 'partial':
      return '~ Incomplete';
    default:
      return status;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'met':
      return 'text-green-600';
    case 'missing':
      return 'text-red-600';
    case 'partial':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
};

const AnalysisDashboard = ({ filingId }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        // Fetch both trademark and patent analysis data
        const [trademarkAnalysis, patentAnalysis] = await Promise.all([
          fetch(`/api/analyze/trademark/${filingId}`).then(res => res.json()),
          fetch(`/api/analyze/patent/${filingId}`).then(res => res.json())
        ]);
        
        setAnalysisData({ trademark: trademarkAnalysis, patent: patentAnalysis });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (filingId) {
      fetchAnalysisData();
    }
  }, [filingId]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading analysis data...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!analysisData) return <div className="text-gray-500 p-4">No analysis data available</div>;

  // Prepare data for approval percentage chart
  const approvalData = {
    labels: ['Trademark', 'Patent'],
    datasets: [{
      data: [
        analysisData.trademark?.overview?.approvalPercentage || 0,
        analysisData.patent?.overview?.approvalPercentage || 0
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Prepare data for compliance chart
  const complianceData = {
    labels: ['USPTO', 'EUIPO', 'India IPO'],
    datasets: [{
      label: 'Compliance Score',
      data: [
        analysisData.trademark?.jurisdictions?.USPTO?.compliance || 0,
        analysisData.trademark?.jurisdictions?.EUIPO?.compliance || 0,
        analysisData.trademark?.jurisdictions?.IndiaIPO?.compliance || 0
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  // Prepare data for document status chart
  const documentStatusData = {
    labels: ['Complete', 'Partial', 'Missing'],
    datasets: [{
      data: [
        analysisData.trademark?.documentAnalysis?.documentStatus?.complete || 0,
        analysisData.trademark?.documentAnalysis?.documentStatus?.partial || 0,
        analysisData.trademark?.documentAnalysis?.documentStatus?.missing || 0
      ],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(255, 99, 132, 0.8)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Filing Analysis Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Approval Percentage Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Approval Likelihood</h3>
          <div className="h-64">
            <Doughnut
              data={approvalData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  },
                  title: {
                    display: true,
                    text: 'Approval Percentage by Filing Type'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Compliance Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Jurisdiction Compliance</h3>
          <div className="h-64">
            <Bar
              data={complianceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'Compliance Score by Jurisdiction'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Updated Document Status Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Document Status</h3>
          <div className="h-64">
            <Doughnut
              data={documentStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      generateLabels: function(chart) {
                        const datasets = chart.data.datasets;
                        return chart.data.labels.map((label, i) => ({
                          text: `${label} (${datasets[0].data[i]})`,
                          fillStyle: datasets[0].backgroundColor[i],
                          strokeStyle: datasets[0].borderColor[i],
                          lineWidth: 1,
                          hidden: isNaN(datasets[0].data[i]) || datasets[0].data[i] === 0,
                          index: i
                        }));
                      }
                    }
                  },
                  title: {
                    display: true,
                    text: 'Document Completion Status'
                  }
                }
              }}
            />
          </div>
          {/* Document Status Details */}
          <div className="mt-4 space-y-2">
            {analysisData.trademark?.documentAnalysis?.documentStatus && 
              Object.entries(analysisData.trademark.documentAnalysis.documentStatus)
                .filter(([key]) => key !== 'complete' && key !== 'partial' && key !== 'missing')
                .map(([key, status]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`font-medium ${getStatusColor(status)}`}>
                      {getStatusText(status)}
                    </span>
                  </div>
                ))
            }
          </div>
        </div>
      </div>

      {/* Additional Analysis Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths and Weaknesses */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Application Review</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-green-600">Strengths</h4>
              <ul className="list-disc list-inside">
                {analysisData.trademark?.applicationReview?.strengths?.map((strength, index) => (
                  <li key={index} className="text-gray-700">{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600">Areas for Improvement</h4>
              <ul className="list-disc list-inside">
                {analysisData.trademark?.applicationReview?.weaknesses?.map((weakness, index) => (
                  <li key={index} className="text-gray-700">{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline and Next Steps */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Timeline & Next Steps</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-600">Filing Timeline</h4>
              <ul className="list-disc list-inside">
                {analysisData.trademark?.filingStrategy?.timeline && Object.entries(analysisData.trademark.filingStrategy.timeline).map(([key, value]) => (
                  <li key={key} className="text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-600">Next Steps</h4>
              <ul className="list-disc list-inside">
                {analysisData.trademark?.overview?.nextSteps?.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard; 