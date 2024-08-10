import React, { useState, useEffect } from 'react';
import './Waveform.css';

const SpeechToText: React.FC<{ onTranscript: (text: string) => void }> = ({ onTranscript }) => {
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
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcriptPart;
                } else {
                    interimTranscript += transcriptPart;
                }
            }
            setTranscript(prev => prev + finalTranscript);
            onTranscript(transcript + finalTranscript + interimTranscript);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening, onTranscript, transcript]);

    return (
        <div>
            <button className='border border-blue-300 text-white bg-blue-800 my-4 rounded px-5 py-4 flex items-center' onClick={() => setIsListening(prev => !prev)}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            {isListening && (
                <div className="waveform">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            )}
            <div>
                <h2>Transcript : </h2>
                <p className='text-blue-800'>{transcript}</p>
            </div>
        </div>
    );
};

export default SpeechToText;
