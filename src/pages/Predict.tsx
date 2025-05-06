
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PredictionForm from "@/components/PredictionForm";
import ResultDisplay from "@/components/ResultDisplay";
import { predictImage } from "@/api/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ClassInfo {
  fruit_type: string;
  ripeness: string;
}

interface Metrics {
  precision: number;
  recall: number;
  f1_score: number;
  accuracy: number;
}

interface Visualization {
  class_distribution: string;
  confusion_matrix: string;
  accuracy_graph: string;
}

interface PredictionResult {
  predicted_class: string;
  probability: number;
  class_info: ClassInfo;
  metrics: Metrics;
  visualizations: Visualization;
}

const Predict = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await predictImage(file);
      setResult(response);
    } catch (err: any) {
      console.error("Prediction error:", err);
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Return empty while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-3">Fruit Analysis</h1>
        <p className="text-gray-600 text-center mb-8">
          Upload an image of a fruit to analyze and get detailed insights
        </p>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          
          <div className="prediction-container">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-medium">Analyzing your image...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            ) : result ? (
              <ResultDisplay result={result} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">No Results Yet</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Upload an image to see prediction results and analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
