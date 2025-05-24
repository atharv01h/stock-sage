import { Message } from '../types';

const API_KEY = "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";
const MODEL = "deepseek/deepseek-r1:free";

export async function sendMessageToAI(message: string, previousMessages: Message[]) {
  try {
    // Check for creator-related questions
    const creatorQuestions = [
      'who created you',
      'who made you',
      'your creator',
      'who developed you',
      'who built you'
    ];

    if (creatorQuestions.some(q => message.toLowerCase().includes(q))) {
      return "I was created by Atharv Hatwar. I'm here to help you with stock market predictions and analysis.";
    }

    // Format previous messages for the OpenRouter API
    const formattedMessages = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // System message with proper formatting instructions
    formattedMessages.unshift({
      role: 'system',
      content: `You are StockSage AI, a friendly stock market prediction assistant.
      Keep your responses simple and easy to understand.
      Use everyday language and avoid technical jargon.
      For Indian stocks, use ₹ symbol (e.g., ₹500).
      For US stocks, use $ symbol (e.g., $50).
      Be concise and focus on practical advice.
      
      For text formatting:
      - Use **text** for bold text (it will be properly rendered)
      - Use numbers with 2 decimal places for prices and percentages
      - Format large numbers with appropriate commas
      - Highlight important information in bold
      
      Example response format:
      The stock price of **TCS** is ₹3,542.60, showing a change of **+1.23%** today.`
    });

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
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Convert markdown-style bold to HTML bold tags
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return content;
  } catch (error) {
    console.error('Error in sendMessageToAI:', error);
    throw error;
  }
}
