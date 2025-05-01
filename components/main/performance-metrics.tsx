"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

interface PerformanceMetricsProps {
  data: {
    CVAE_SSIM: number;
    CGAN_Diversity: number;
    FUSED_SSIM: number;
    FUSED_Diversity: number;
  };
  word?: string;
}

const MetricItem = ({
  label,
  value,
  wordNotFound,
}: {
  label: string;
  value: number;
  wordNotFound: boolean;
}) => {
  if (wordNotFound) {
    return (
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-sm">
          <span>{label}</span>
          <span className="font-medium">N/A</span>
        </div>
        <Progress value={0} className="h-2 bg-gray-200" />
      </div>
    );
  }

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

const isWordNotFound = (metrics: {
  FUSED_SSIM: number;
  FUSED_Diversity: number;
}) => {
  const { FUSED_SSIM, FUSED_Diversity } = metrics;
  return FUSED_SSIM < 0.01 && FUSED_Diversity < 0.01;
};

const getPerformanceStatus = (metrics: {
  FUSED_SSIM: number;
  FUSED_Diversity: number;
}) => {
  const { FUSED_SSIM, FUSED_Diversity } = metrics;

  if (isWordNotFound(metrics)) {
    return {
      status: "Word Not Found",
      message: "No performance metrics could be calculated.",
      icon: <XCircle />,
      color: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    };
  }

  const avgScore = (FUSED_SSIM + FUSED_Diversity) / 2;

  if (avgScore >= 0.6) {
    return {
      status: "Excellent",
      message: "Both structural similarity and movement diversity are high.",
      icon: <CheckCircle />,
      color: "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300",
    };
  } else if (avgScore >= 0.5) {
    return {
      status: "Good",
      message:
        "The sign sequence shows strong fidelity to the expected patterns.",
      icon: <CheckCircle />,
      color: "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300",
    };
  } else if (avgScore >= 0.3) {
    return {
      status: "Acceptable",
      message: "The sign sequence is recognizable but has some imperfections.",
      icon: <Info />,
      color: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    };
  } else {
    return {
      status: "Poor",
      message: "The generated sign sequence has low fidelity.",
      icon: <AlertCircle />,
      color:
        "bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    };
  }
};

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  data,
  word,
}) => {
  const wordNotFound = isWordNotFound(data);
  const performanceStatus = getPerformanceStatus(data);

  return (
    <Card className="bg-secondary-background">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Model Performance {word ? `for "${word}"` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className={`${performanceStatus.color} mx-auto max-w-lg`}>
          {performanceStatus.icon}
          <AlertTitle>{performanceStatus.status}</AlertTitle>
          <AlertDescription className="text-sm font-medium">
            {performanceStatus.message}
          </AlertDescription>
        </Alert>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium">Structure Similarity (SSIM)</h3>
            <MetricItem
              label="CVAE Model"
              value={data.CVAE_SSIM}
              wordNotFound={wordNotFound}
            />
            <MetricItem
              label="Fused Model"
              value={data.FUSED_SSIM}
              wordNotFound={wordNotFound}
            />
          </div>

          <div>
            <h3 className="mb-2 font-medium">Diversity</h3>
            <MetricItem
              label="CGAN Model"
              value={data.CGAN_Diversity}
              wordNotFound={wordNotFound}
            />
            <MetricItem
              label="Fused Model"
              value={data.FUSED_Diversity}
              wordNotFound={wordNotFound}
            />
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
