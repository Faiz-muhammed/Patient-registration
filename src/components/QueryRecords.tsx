import { useState } from 'react';
import { Database, Play, AlertCircle, CheckCircle } from 'lucide-react';
import { executeQuery } from '../models/patientModel';

const SQLInterface = ({isInitialized}:any) => {
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM patients ORDER BY created_at DESC LIMIT 10;');
  const [sqlResult, setSqlResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState<any>(false);

  const executeCustomQuery = async () => {
    if (!sqlQuery.trim() || !isInitialized) return;
    
    setIsExecuting(true);
    
    try {
      const result = await executeQuery(sqlQuery);
      setSqlResult(result);
    } catch (error: any) {
      setSqlResult({
        success: false,
        data: [],
        error: error.message || 'An error occurred while executing the query',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const sampleQueries = [
    {
      name: 'All Patients',
      query: 'SELECT * FROM patients ORDER BY created_at DESC;'
    },
    {
      name: 'Patient Count',
      query: 'SELECT COUNT(*) as total_patients FROM patients;'
    },
    {
      name: 'Gender Distribution',
      query: 'SELECT gender, COUNT(*) as count FROM patients WHERE gender IS NOT NULL GROUP BY gender;'
    },
    {
      name: 'Recent Registrations',
      query: 'SELECT firstName, lastName, email, created_at FROM patients WHERE created_at >= CURRENT_DATE - INTERVAL \'7 days\' ORDER BY created_at DESC;'
    },
    {
      name: 'Search by Name',
      query: 'SELECT * FROM patients WHERE firstName ILIKE \'%john%\' OR lastName ILIKE \'%john%\';'
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Database className="w-5 h-5 mr-2" />
        SQL Query Interface
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SQL Query
          </label>
          <textarea
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="Enter your SQL query here..."
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={executeCustomQuery}
            disabled={isExecuting || !sqlQuery.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            {isExecuting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Executing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Execute Query
              </>
            )}
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlertCircle className="w-4 h-4" />
            <span>Use raw SQL to query the patients table</span>
          </div>
        </div>

        {sqlResult && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              {sqlResult.error ? (
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              )}
              <h3 className="font-medium text-gray-900">Query Result:</h3>
            </div>
            
            {sqlResult.error ? (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <div className="text-red-800 font-medium">Error:</div>
                <div className="text-red-600 text-sm mt-1">{sqlResult.error}</div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <pre className="text-sm bg-white p-4 rounded border max-h-96 overflow-y-auto">
                    {JSON.stringify(sqlResult.data, null, 2)}
                  </pre>
                </div>
                <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                  <strong>Result:</strong> {sqlResult.data?.length || 0} rows returned
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-3">Sample Queries:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sampleQueries.map((sample, index) => (
              <button
                key={index}
                onClick={() => setSqlQuery(sample.query)}
                className="text-left p-3 bg-white rounded border hover:border-blue-300 transition-colors"
              >
                <div className="font-medium text-blue-800 text-sm mb-1">
                  {sample.name}
                </div>
                <div className="font-mono text-xs text-gray-600 truncate">
                  {sample.query}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLInterface;