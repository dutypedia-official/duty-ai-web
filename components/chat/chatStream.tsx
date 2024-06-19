"use client";
import { getCookie } from "cookies-next";
import useStreamFetch from "@/lib/hooks/useStreamFetch";
import { Button } from "../ui/button";

const ChatStream = () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authrization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      query: "List some cases related to murder.",
    }),
  };

  const url = `${process.env.NEXT_PUBLIC_LLM_API_URL}/chat/test`;

  const { data, isStreaming, isDone, isError, stopStream } = useStreamFetch(
    url,
    options
  );

  const handleClickStop = () => {
    stopStream();
  };

  return (
    <div>
      <>
        <Button onClick={handleClickStop} disabled={!isStreaming}>
          Stop Streaming
        </Button>
        {isError ? (
          <p>Error occurred while fetching data.</p>
        ) : (
          <>
            <pre>{data}</pre>
            {isStreaming && <p>Streaming in progress...</p>}
            {isDone && <p>Streaming complete.</p>}
          </>
        )}
      </>
    </div>
  );
};

export default ChatStream;
