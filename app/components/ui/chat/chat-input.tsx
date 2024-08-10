import { useEffect, useState } from "react";
import { Button } from "../button";
import FileUploader from "../file-uploader";
import { Input } from "../input";
import UploadImagePreview from "../upload-image-preview";
import { ChatHandler } from "./chat.interface";

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleInputChange"
  > & {
    multiModal?: boolean;
  },
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {

    const recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => { 
        let finalTranscript = ''; 
        let interimTranscript = ''; 
        for (let i = event.resultIndex; i < event.results.length; i++) 
            { const transcriptPart = event.results[i][0].transcript; 
                if (event.results[i].isFinal) { finalTranscript += transcriptPart; } 
                else { interimTranscript += transcriptPart; } } 
        
        setTranscript(prev => prev + finalTranscript); };  


    // recognition.onresult = async function(event:any) {
    //     const transcript = event.results[0][0].transcript;
    //     console.log('transcript', transcript);
    //     setTranscript(transcript)
    //   }

    if (isListening) {
        recognition.start();
    } else {
        recognition.stop();
    }

    return () => {
        recognition.stop();
    };
}, [isListening]);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (imageUrl) {
      props.handleSubmit(e, {
        data: { imageUrl: imageUrl },
      });
      setImageUrl(null);
      return;
    }
    props.handleSubmit(e);
  };

  const onRemovePreviewImage = () => setImageUrl(null);

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white  dark:bg-blue-950 dark:text-white p-4 shadow-xl space-y-4"
    >
      {imageUrl && (
        <UploadImagePreview url={imageUrl} onRemove={onRemovePreviewImage} />
      )}
      <div className="flex w-full items-start justify-between gap-4 ">
        <Input
          autoFocus
          name="message"
          placeholder="Type a message"
          className="flex-1"
          value={props.input}
          onChange={props.handleInputChange}
        />
        {/* <FileUploader
          onFileUpload={handleUploadFile}
          onFileError={props.onFileError}
        /> */}

        {/* <button onClick={() => setIsListening(prev => !prev)}>
            {isListening ? 'Stop' : 'Listen'}
        </button> */}

        <Button type="submit" disabled={props.isLoading}>
          Send message
        </Button>
      </div>
    </form>
  );
}
