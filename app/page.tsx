import VideoOutput from "@/components/main/video-output";
import WordInput from "@/components/main/word-input";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="my-10">
      <div className="flex flex-col items-center justify-center">
        <Suspense>
          <WordInput />
          <VideoOutput />
        </Suspense>
      </div>
    </main>
  );
}
