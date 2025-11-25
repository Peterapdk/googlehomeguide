import React, { useState } from 'react';
import { StepWizard } from './components/StepWizard';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-gray-900">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             {/* Google-ish colored dots for branding feel */}
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Google Home Guide</h1>
          </div>
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors md:hidden"
          >
            Hjælp?
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start p-4 sm:p-8 md:p-12 relative">
        
        {/* Hero Section / Product Image */}
        <div className="mb-8 w-full max-w-md mx-auto text-center">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 rounded-full blur-2xl opacity-70 -z-10 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src="https://lh3.googleusercontent.com/vbhJTUEukklYZIHizWZTdxTfcn6X65TnOveHQ_CMvUZ5JIBBFTWT3E9axgFGqclV74A=w500" 
              alt="Google Home Mini Enheder" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Lad os få dig i gang</h2>
          <p className="mt-2 text-gray-500">Følg denne enkle guide for at opsætte din nye smart højttaler.</p>
        </div>

        {/* Wizard Card */}
        <StepWizard />

        {/* Info Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2024 Uofficiel Guide. Billeder tilhører Google.</p>
        </div>

      </main>

      {/* Chatbot Widget */}
      <ChatWidget isOpen={isChatOpen} toggleOpen={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default App;