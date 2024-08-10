import { StreamingTextResponse } from 'ai';
import { ChatMessage, MessageContent, OpenAI, TogetherLLM, MessageType } from 'llamaindex';
import { NextRequest, NextResponse } from 'next/server';
import { createChatEngine } from './engine';
import { LlamaIndexStream } from './llamaindex-stream';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const convertMessageContent = (
  textMessage: string,
  imageUrl: string | undefined
): MessageContent => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: 'text',
      text: textMessage,
    },
    {
      type: 'image_url',
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

const maskPII = async (text: string): Promise<string> => {
  try {
    const response = await fetch('https://barristerbotmasking.vercel.app/mask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.masked_text;
    } else {
      console.error('Error masking text:', data.error);
      return text;
    }
  } catch (error) {
    console.error('Error making request to mask PII:', error);
    return text;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, data }: { messages: ChatMessage[]; data: any } = body;
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== 'user') {
      return NextResponse.json(
        {
          error:
            'messages are required in the request body and the last message must be from the user',
        },
        { status: 400 }
      );
    }

    const llm = new TogetherLLM({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      maxTokens: 512,
      apiKey: process.env.TOGETHER_API_KEY,
    });

    const chatEngine = await createChatEngine(llm);

    // Define system prompt with correct type
    const systemPrompt: ChatMessage = {
      role: 'system' as MessageType,
      content: `As an AI based legal Assistant named "Barrister Bot" you provide answers based on the given context and should be grounded in ONLY Pakistani laws, ensuring accuracy and briefness.  
      You always follow these guidelines: 
      -If the answer isn't available within the context, state that fact
      -Otherwise, answer to your best capability, refering to source of documents provided
      -Only use examples if explicitly requested
      -Do not introduce examples outside of the context
      -Do not answer if context is absent
      -Limit responses to three or four sentences for clarity and conciseness
      -You should avoid legal jargon.
      -If you are asked about who created you. Then Answer the developer name as Ayesha Jadoon.
      -You should give reference at the end`
    };

    // Insert system prompt at the beginning of the messages array
    messages.unshift(systemPrompt);

    // Mask PII in the user's message
    const maskedUserMessageContent = await maskPII(userMessage.content);

    // Convert message content from Vercel/AI format to LlamaIndex/OpenAI format
    const userMessageContent = convertMessageContent(
      maskedUserMessageContent,
      data?.imageUrl
    );

    // Calling LlamaIndex's ChatEngine to get a streamed response
    const response = await chatEngine.chat({
      message: userMessageContent,
      chatHistory: messages,
      stream: true,
    });

    // Transform LlamaIndex stream to Vercel/AI format
    const { stream, data: streamData } = LlamaIndexStream(response, {
      parserOptions: {
        image_url: data?.imageUrl,
      },
    });

    // Return a StreamingTextResponse, which can be consumed by the Vercel/AI client
    return new StreamingTextResponse(stream, {}, streamData);
  } catch (error) {
    console.error('[LlamaIndex]', error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
