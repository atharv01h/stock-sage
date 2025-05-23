import { Message } from '../types';

const API_KEY = "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";
const MODEL = "deepseek/deepseek-r1:free";

export async function sendMessageToAI(message: string, previousMessages: Message[]) {
  try {
    // Check for creator-related questions with more variations
    const creatorQuestions = [
      'who created you',
      'who made you',
      'your creator',
      'who developed you',
      'who built you',
      'who designed you',
      'who programmed you',
      'who are you made by',
      'who owns you',
      'tell me about your creator',
      'who is your developer'
    ];

    if (creatorQuestions.some(q => message.toLowerCase().includes(q))) {
      return "I was created by Atharv Hatwar. I'm a stock market prediction AI assistant designed to help you analyze market trends and make informed investment decisions.";
    }

    // Format previous messages for the OpenRouter API
    const formattedMessages = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Enhanced system message for better formatting and responses
    formattedMessages.unshift({
      role: 'system',
      content: `You are StockSage AI, a stock market prediction assistant created by Atharv Hatwar. 
      Format your responses in clear, natural paragraphs without any markdown symbols or special formatting.
      Use proper punctuation and spacing.
      For numbers and percentages, use standard notation (e.g., "increased by 5.2%" instead of "+5.2%").
      Keep responses concise and focused on stock market analysis.
      When mentioning stock prices:
      - Use ₹ symbol for Indian stocks
      - Use $ symbol for US stocks
      Always maintain a professional yet conversational tone.`
    });

    // Add the current user message
    formattedMessages.push({
      role: 'user',
      content: message
    });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: formattedMessages,
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in sendMessageToAI:', error);
    throw error;
  }
}