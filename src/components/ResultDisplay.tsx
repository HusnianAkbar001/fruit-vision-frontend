
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Chart from "./Chart";

interface Metrics {
  precision: number;
  recall: number;
  f1_score: number;
  accuracy: number;
}

interface ClassInfo {
  fruit_type: string;
  ripeness: string;
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

interface ResultDisplayProps {
  result: PredictionResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const {
    predicted_class,
    probability,
    class_info,
    metrics,
    visualizations,
  } = result;

  const formatMetric = (value: number) => {
    return (value * 100).toFixed(2) + "%";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Result Card */}
      <Card className="overflow-hidden border-2 border-primary/20">
        <div className="bg-primary/10 px-6 py-4">
          <CardTitle className="text-xl font-bold text-foreground">
            Prediction Results
          </CardTitle>
          <CardDescription>
            Analysis of your fruit image
          </CardDescription>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Prediction</h3>
                <div className="mt-2 bg-secondary rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Class:</span>
                    <span className="font-bold">{predicted_class}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Confidence:</span>
                    <span className="font-bold">{formatMetric(probability)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Fruit Information</h3>
                <div className="mt-2 bg-secondary rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Type:</span>
                    <span className="font-medium">{class_info.fruit_type}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Ripeness:</span>
                    <span className="font-medium">{class_info.ripeness}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
              <div className="space-y-2">
                <div className="bg-secondary rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm font-medium">Precision:</span>
                  <span className="font-medium">{formatMetric(metrics.precision)}</span>
                </div>
                <div className="bg-secondary rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm font-medium">Recall:</span>
                  <span className="font-medium">{formatMetric(metrics.recall)}</span>
                </div>
                <div className="bg-secondary rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm font-medium">F1 Score:</span>
                  <span className="font-medium">{formatMetric(metrics.f1_score)}</span>
                </div>
                <div className="bg-secondary rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm font-medium">Accuracy:</span>
                  <span className="font-medium">{formatMetric(metrics.accuracy)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualizations */}
      <div>
        <h2 className="text-xl font-bold mb-4">Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Chart
            title="Class Distribution"
            description="Distribution of different classes in the dataset"
            imageData={visualizations.class_distribution}
          />
          <Chart
            title="Confusion Matrix"
            description="Evaluation of classification accuracy"
            imageData={visualizations.confusion_matrix}
          />
          <Chart
            title="Accuracy Graph"
            description="Model accuracy over training epochs"
            imageData={visualizations.accuracy_graph}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
