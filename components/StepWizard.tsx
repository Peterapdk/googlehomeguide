import React, { useState } from 'react';
import { Step, QuizOption } from '../types';
import { INSTALLATION_STEPS } from '../data/steps';
import { ProgressBar } from './ProgressBar';
import { Icon } from './Icon';

export const StepWizard: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<QuizOption | null>(null);

  const currentStep = INSTALLATION_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === INSTALLATION_STEPS.length - 1;
  const isStepCompleted = completedSteps.includes(currentStep.id);

  const handleNext = () => {
    if (currentStepIndex < INSTALLATION_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setQuizAnswer(null); // Reset quiz for next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setQuizAnswer(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
  };

  const handleQuizOption = (option: QuizOption) => {
    setQuizAnswer(option);
    if (option.isCorrect) {
      markComplete();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-2xl w-full mx-auto border border-gray-100">
      
      {/* Header Area */}
      <div className="mb-8">
        <ProgressBar totalSteps={INSTALLATION_STEPS.length} currentStep={currentStepIndex} />
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Icon name={currentStep.icon} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{currentStep.title}</h2>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6 min-h-[300px]">
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          {currentStep.description}
        </p>
        
        <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {currentStep.detailedInfo}
        </div>

        {/* Interactive Element: Quiz or Checkbox */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          {currentStep.quiz ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Tjek: {currentStep.quiz.question}</h4>
              <div className="flex flex-col gap-3">
                {currentStep.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizOption(option)}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      quizAnswer === option 
                        ? option.isCorrect 
                          ? 'bg-green-50 border-green-500 ring-1 ring-green-500'
                          : 'bg-red-50 border-red-500 ring-1 ring-red-500'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{option.label}</span>
                      {quizAnswer === option && (
                         <Icon name={option.isCorrect ? "check" : "x"} className={`w-5 h-5 ${option.isCorrect ? 'text-green-600' : 'text-red-600'}`} />
                      )}
                    </div>
                    {quizAnswer === option && (
                      <p className={`text-sm mt-2 ${option.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {option.feedback}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <label className="flex items-center space-x-3 cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input 
                type="checkbox" 
                checked={isStepCompleted} 
                onChange={() => isStepCompleted ? setCompletedSteps(completedSteps.filter(id => id !== currentStep.id)) : markComplete()}
                className="w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium select-none">Jeg har gennemført dette trin</span>
            </label>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
        <button
          onClick={handlePrev}
          disabled={isFirstStep}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
            isFirstStep 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Icon name="chevronLeft" className="w-5 h-5" />
          Forrige
        </button>

        {isLastStep ? (
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-200 transition-all transform hover:scale-105"
            onClick={() => alert("Tillykke! Din Google Home er nu klar til brug.")}
          >
            Færdig!
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isStepCompleted}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg transition-all transform ${
              isStepCompleted
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Næste
            <Icon name="chevronRight" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};