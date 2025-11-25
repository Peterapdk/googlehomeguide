import React, { useState } from 'react';
import { StepWizard } from './components/StepWizard';
import { ChatWidget } from './components/ChatWidget';
import { Icon } from './components/Icon';
import { INSTALLATION_STEPS } from './data/steps';
import { TIPS_STEPS } from './data/tipsSteps';

type ViewState = 'home' | 'installation' | 'tips';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleGuideComplete = () => {
    alert("Tillykke! Du har gennemført guiden. Du bliver nu sendt tilbage til hovedmenuen.");
    setCurrentView('home');
  };

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className="w-full max-w-4xl mx-auto space-y-12 animate-fade-in">
           {/* Hero Section */}
           <div className="text-center">
            <div className="relative inline-block group mb-4">
              {/* Soft glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-50 to-white rounded-full blur-3xl opacity-60 -z-10 group-hover:opacity-80 transition-opacity duration-700"></div>
              
              {/* Image Container */}
              <div className="bg-white p-8 rounded-full shadow-xl inline-flex items-center justify-center w-64 h-64 border-4 border-white ring-1 ring-gray-100">
                <img 
                  src="https://lh3.googleusercontent.com/vbhJTUEukklYZIHizWZTdxTfcn6X65TnOveHQ_CMvUZ5JIBBFTWT3E9axgFGqclV74A=w500" 
                  alt="Google Home Smart Speaker" 
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Personal Thank You Note */}
            <div className="mb-8 transform -rotate-1 mt-6">
              <p className="font-handwriting text-3xl md:text-4xl text-gray-700">
                Tak for købet af Google Home..
              </p>
              <p className="font-handwriting text-xl md:text-2xl text-gray-500 mt-1">
                / Charlotte og Peter
              </p>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">Velkommen til din nye assistent</h2>
            <p className="mt-2 text-gray-500 text-lg">Hvad vil du gerne gøre i dag?</p>
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 px-4">
            
            <button 
              onClick={() => setCurrentView('installation')}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all text-left group flex flex-col h-full"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Icon name="plug" className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Installationsguide</h3>
              <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                Første gang med Google Home? Følg denne trin-for-trin guide for at pakke ud, tilslutte og opsætte din enhed korrekt.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Start guiden <Icon name="chevronRight" className="w-5 h-5 ml-1" />
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('tips')}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all text-left group flex flex-col h-full"
            >
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Icon name="bulb" className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">Tips & Tricks</h3>
              <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                Allerede sat op? Lær hvordan du bruger stemmekommandoer, spiller musik, styrer lyset og bruger sjove funktioner.
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                Se tricks <Icon name="chevronRight" className="w-5 h-5 ml-1" />
              </div>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full animate-fade-in">
        <div className="mb-6 flex items-center justify-center relative max-w-2xl mx-auto">
          <button 
            onClick={() => setCurrentView('home')}
            className="absolute left-0 text-gray-500 hover:text-blue-600 flex items-center gap-1 font-medium text-sm transition-colors"
          >
            <Icon name="home" className="w-4 h-4" />
            Hovedmenu
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            {currentView === 'installation' ? 'Installation' : 'Tips & Tricks'}
          </h2>
        </div>
        
        <StepWizard 
          key={currentView} // Force re-mount when view changes to reset step index
          steps={currentView === 'installation' ? INSTALLATION_STEPS : TIPS_STEPS} 
          onComplete={handleGuideComplete}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-gray-900">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
             {/* Google-ish colored dots */}
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
        {renderContent()}

        {/* Info Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2024 Uofficiel Guide.</p>
        </div>
      </main>

      {/* Chatbot Widget */}
      <ChatWidget isOpen={isChatOpen} toggleOpen={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default App;