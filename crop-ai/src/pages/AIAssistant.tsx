import React, { useState } from 'react';
import { Bot, Send, User, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: language === 'hi' 
        ? 'नमस्ते! मैं आपका एआई कृषि सहायक हूं। मैं आपकी खेती, फसल, उर्वरक, और कीट नियंत्रण के बारे में मदद कर सकता हूं। कोई भी सवाल पूछें!'
        : 'Hello! I\'m your AI farming assistant. I can help you with crops, fertilizers, pest control, and general farming guidance. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = language === 'hi' ? [
    'धान के लिए कौन सा उर्वरक बेहतर है?',
    'गेहूं में कीट नियंत्रण कैसे करें?',
    'बारिश के मौसम में क्या सावधानी बरतें?',
    'मिट्टी की जांच कैसे करें?'
  ] : [
    'Which fertilizer is best for wheat?',
    'How to control pests in rice crops?',
    'What precautions during monsoon season?',
    'How to test soil quality?'
  ];

  const getAIResponse = (question: string): string => {
    const responses = {
      fertilizer: language === 'hi' 
        ? 'गेहूं के लिए NPK (12:32:16) उर्वरक सबसे अच्छा है। बुआई के समय 100 किलो प्रति एकड़ डालें। यूरिया 50 किलो पहली सिंचाई के बाद डालें।'
        : 'For wheat, NPK (12:32:16) fertilizer works best. Apply 100kg per acre at sowing. Add 50kg Urea after first irrigation.',
      pest: language === 'hi'
        ? 'धान में ब्राउन प्लांट हॉपर के लिए इमिडाक्लोप्रिड का छिड़काव करें। शाम के समय स्प्रे करें और साफ पानी का इस्तेमाल करें।'
        : 'For Brown Plant Hopper in rice, spray Imidacloprid. Apply in evening hours and use clean water for mixing.',
      monsoon: language === 'hi'
        ? 'बारिश में अच्छे ड्रेनेज का ध्यान रखें। पानी भराव से बचें। फंगल रोगों के लिए कॉपर सल्फेट का छिड़काव करें।'
        : 'Ensure proper drainage during monsoon. Avoid waterlogging. Spray Copper Sulfate to prevent fungal diseases.',
      soil: language === 'hi'
        ? 'मिट्टी की pH 6.5-7.5 के बीच होनी चाहिए। नमी 50-60% रखें। कृषि विभाग से मिट्टी की जांच कराएं।'
        : 'Soil pH should be between 6.5-7.5. Maintain moisture at 50-60%. Get soil tested at agriculture department.'
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('fertilizer') || lowerQuestion.includes('उर्वरक')) {
      return responses.fertilizer;
    } else if (lowerQuestion.includes('pest') || lowerQuestion.includes('कीट')) {
      return responses.pest;
    } else if (lowerQuestion.includes('monsoon') || lowerQuestion.includes('बारिश')) {
      return responses.monsoon;
    } else if (lowerQuestion.includes('soil') || lowerQuestion.includes('मिट्टी')) {
      return responses.soil;
    } else {
      return language === 'hi'
        ? 'यह एक अच्छा सवाल है! मैं आपकी खेती से जुड़ी समस्याओं का समाधान देने की कोशिश करता हूं। कृपया अधिक विस्तार से बताएं।'
        : 'That\'s a great question! I try to help with farming-related problems. Could you please provide more details?';
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          {language === 'hi' ? 'एआई कृषि सहायक' : 'AI Farming Assistant'} 🤖
        </h1>
        <p className="text-gray-600">
          {language === 'hi' 
            ? '24/7 खेती की सलाह और मार्गदर्शन प्राप्त करें'
            : 'Get 24/7 farming advice and guidance from our AI assistant'
          }
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-96 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-start gap-2">
                    {message.type === 'assistant' && (
                      <Bot className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-5 h-5 text-green-100 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={language === 'hi' ? 'अपना सवाल यहां लिखें...' : 'Type your question here...'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          {language === 'hi' ? 'सुझावित प्रश्न' : 'Suggested Questions'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <p className="text-sm text-gray-700">{question}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;