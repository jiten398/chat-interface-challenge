import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to integrate the browser's Speech Recognition API.
 * @param onResult Callback function invoked when speech recognition returns a result.
 */

const useSpeechRecognition = (onResult: (result: string) => void) => {
   // State to track whether recording is in progress
  const [isRecording, setIsRecording] = useState(false);
  // Reference to hold the SpeechRecognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check for browser support using the global SpeechRecognition or webkitSpeechRecognition
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    // Create a new SpeechRecognition instance from the browser API
    const recognition = new SpeechRecognitionConstructor() as SpeechRecognition;
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Handle result event to pass the transcript back via the onResult callback
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    // When recognition ends, update state
    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  // Start the recording process using the browser API
  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  // Stop the recording process using the browser API
  const stopRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };

  return { isRecording, startRecording, stopRecording };
};

export default useSpeechRecognition;
