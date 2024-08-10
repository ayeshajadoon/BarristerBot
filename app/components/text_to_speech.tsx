"use client";
import { useState, useEffect } from 'react';

interface TextToSpeechProps {
    initialText?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ initialText = '' }) => {
    const [text, setText] = useState<string>(initialText);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        setText(initialText);
    }, [initialText]);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            if (utterance) {
                window.speechSynthesis.cancel(); // Cancel any ongoing speech
            }
            const newUtterance = new SpeechSynthesisUtterance(text);
            setUtterance(newUtterance);
            window.speechSynthesis.speak(newUtterance);
        } else {
            console.error('Sorry, your browser does not support speech synthesis.');
        }
    };

    const handleStop = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    };

    return (
        <div>
            {/* <h1>Text to Speech Example</h1> */}
            {/* <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                cols={50}
                placeholder="Enter text here..."
            /> */}
            <br />
            <button onClick={handleSpeak}>Speak</button>
            <br />
            <br />
            <button onClick={handleStop}>Stop</button>
        </div>
    );
};

export default TextToSpeech;
