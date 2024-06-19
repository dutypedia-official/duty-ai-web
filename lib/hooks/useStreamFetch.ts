import { useEffect, useState } from "react";

interface FetchStreamResult {
  data: string;
  loading: boolean;
  isStreaming: boolean;
  isDone: boolean;
  isError: boolean;
  stopStream: () => void;
}

interface RequestInitStream extends RequestInit {
  streaming?: boolean;
}

function useStreamFetch(
  url: string,
  options?: RequestInitStream
): FetchStreamResult {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [streamController, setStreamController] = useState<any>(null);

  const stopStream = () => {
    if (streamController) {
      streamController.abort();
      setStreamController(null);
      setIsStreaming(false);
      setIsDone(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        setStreamController(controller);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.body) {
          throw new Error("Readable stream is not supported.");
        }

        setIsStreaming(true);

        const reader = response.body.getReader();
        let text = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setIsDone(true);
            break;
          }

          text += new TextDecoder("utf-8").decode(value);
          setData(text);
        }

        setIsStreaming(false);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.name === "AbortError") return;
        setIsError(true);
      }
    };

    fetchData();

    return () => {
      stopStream();
    };
  }, [url]);

  return { data, loading, isStreaming, isDone, isError, stopStream };
}

export default useStreamFetch;
