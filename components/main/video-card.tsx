import { Loader2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoCardProps {
  title: string;
  isLoading: boolean;
  videoUrl: string | null;
  className?: string;
}

const VideoCard = ({
  title,
  isLoading,
  videoUrl,
  className,
}: VideoCardProps) => {
  return (
    <Card className={cn("bg-secondary-background mx-auto max-w-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
        {videoUrl && (
          <div className="overflow-clip rounded-lg border-2">
            <video controls autoPlay loop className="w-full">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;

export const VideoCardSkeleton = () => {
  return (
    <Skeleton className="bg-secondary-background mx-auto aspect-square max-w-sm min-w-sm space-y-6 p-6">
      <Skeleton className="bg-foreground/10 h-6 w-2/3 animate-pulse" />
      <Skeleton className="bg-foreground/10 h-full w-full animate-pulse" />
    </Skeleton>
  );
};
