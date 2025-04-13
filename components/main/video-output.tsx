"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/context";
import { toast } from "sonner";
import { SparkleIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoCard from "./video-card";

const VideoOutput = () => {
  const searchParams = useSearchParams();
  const word = searchParams.get("word");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWord, setGeneratedWord] = useState<string | null>(null);

  const { config } = useAppContext();
  const baseUrl = `${config.url}:${config.port}`;

  useEffect(() => {
    if (word !== generatedWord) {
      createVideoMutation.reset();
    }
  }, [word, generatedWord]);

  const createVideo = async ({ gloss }: { gloss: string }) => {
    const toastId = toast.loading(`Generating "${gloss}"...`);

    try {
      const response = await fetch(`${baseUrl}/${config.createPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gloss }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create videos");
      }

      const result = await response.json();
      toast.success(`Videos for "${gloss}" generated successfully!`, {
        id: toastId,
      });
      return result;
    } catch (error) {
      toast.error(
        `Failed to generate videos: ${error instanceof Error ? error.message : "Unknown error"}`,
        { id: toastId },
      );
      throw error;
    }
  };

  const createVideoMutation = useMutation({
    mutationFn: createVideo,
    onSuccess: () => {
      setIsGenerating(false);
      setGeneratedWord(word);
    },
    onError: () => {
      setIsGenerating(false);
    },
  });

  const cganVideoQuery = useQuery({
    queryKey: ["videos", "cgan", word],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/${config.cganPath}`);
        if (!res.ok) throw new Error("CGAN video not available");
        return res.blob();
      } catch (error) {
        toast.error("Error loading CGAN video");
        throw error;
      }
    },
    enabled:
      isGenerating === false &&
      !!word &&
      createVideoMutation.isSuccess &&
      word === generatedWord,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const cvaeVideoQuery = useQuery({
    queryKey: ["videos", "cvae", word],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/${config.cvaePath}`);
        if (!res.ok) throw new Error("CVAE video not available");
        return res.blob();
      } catch (error) {
        toast.error("Error loading CVAE video");
        throw error;
      }
    },
    enabled:
      isGenerating === false &&
      !!word &&
      createVideoMutation.isSuccess &&
      word === generatedWord,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const fuseVideoQuery = useQuery({
    queryKey: ["videos", "fuse", word],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/${config.fusedPath}`);
        if (!res.ok) throw new Error("Fused video not available");
        return res.blob();
      } catch (error) {
        toast.error("Error loading Fused video");
        throw error;
      }
    },
    enabled:
      isGenerating === false &&
      !!word &&
      createVideoMutation.isSuccess &&
      word === generatedWord,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleGenerateVideos = () => {
    if (!word) {
      toast.error("No word specified");
      return;
    }

    setIsGenerating(true);
    createVideoMutation.mutate({ gloss: word });
  };

  const cganVideoUrl = cganVideoQuery.data
    ? URL.createObjectURL(cganVideoQuery.data)
    : null;
  const cvaeVideoUrl = cvaeVideoQuery.data
    ? URL.createObjectURL(cvaeVideoQuery.data)
    : null;
  const fuseVideoUrl = fuseVideoQuery.data
    ? URL.createObjectURL(fuseVideoQuery.data)
    : null;

  useEffect(() => {
    return () => {
      if (cganVideoUrl) URL.revokeObjectURL(cganVideoUrl);
      if (cvaeVideoUrl) URL.revokeObjectURL(cvaeVideoUrl);
      if (fuseVideoUrl) URL.revokeObjectURL(fuseVideoUrl);
    };
  }, [cganVideoUrl, cvaeVideoUrl, fuseVideoUrl]);

  const shouldShowVideos =
    createVideoMutation.isSuccess && word === generatedWord;

  return (
    <div className="container mx-auto mt-8 flex max-w-7xl flex-col p-4">
      <Button
        onClick={handleGenerateVideos}
        disabled={
          word == undefined || isGenerating || createVideoMutation.isPending
        }
        className="mx-auto w-fit"
      >
        {isGenerating || createVideoMutation.isPending ? (
          <Loader2Icon className="mr-2 animate-spin" />
        ) : (
          <SparkleIcon className="mr-2" />
        )}
        {isGenerating || createVideoMutation.isPending
          ? "Generating..."
          : "Generate Videos"}
      </Button>

      {shouldShowVideos && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <VideoCard
            title="cGAN Model Output"
            isLoading={cganVideoQuery.isPending}
            videoUrl={cganVideoUrl}
          />

          <VideoCard
            title="cVAE Model Output"
            isLoading={cvaeVideoQuery.isPending}
            videoUrl={cvaeVideoUrl}
          />

          <VideoCard
            title="Fused Output"
            isLoading={fuseVideoQuery.isPending}
            videoUrl={fuseVideoUrl}
          />
        </div>
      )}
    </div>
  );
};

export default VideoOutput;
