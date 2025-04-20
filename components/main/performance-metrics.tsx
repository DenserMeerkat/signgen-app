"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PerformanceMetricsProps {
  data: {
    CVAE_SSIM: number;
    CGAN_Diversity: number;
    FUSED_SSIM: number;
    FUSED_Diversity: number;
  };
}

const MetricItem = ({ label, value }: { label: string; value: number }) => {
  const percentage = Math.round(value * 100);

  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">
          {value.toFixed(3)} ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ data }) => {
  return (
    <Card className="bg-secondary-background">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Model Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium">Structure Similarity (SSIM)</h3>
            <MetricItem label="CVAE Model" value={data.CVAE_SSIM} />
            <MetricItem label="Fused Model" value={data.FUSED_SSIM} />
          </div>

          <div>
            <h3 className="mb-2 font-medium">Diversity</h3>
            <MetricItem label="CGAN Model" value={data.CGAN_Diversity} />
            <MetricItem label="Fused Model" value={data.FUSED_Diversity} />
          </div>
        </div>

        <div className="text-muted-foreground mt-4 text-xs">
          <p>
            SSIM: Higher values indicate better structural similarity to ground
            truth
          </p>
          <p>
            Diversity: Higher values indicate more diverse and natural movements
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
