
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartProps {
  title: string;
  description: string;
  imageData: string;
}

const Chart: React.FC<ChartProps> = ({ title, description, imageData }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2 flex-grow flex items-center justify-center">
        <div className="graph-container h-full w-full flex items-center justify-center">
          <img 
            src={`data:image/png;base64,${imageData}`} 
            alt={title} 
            className="max-h-64"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
