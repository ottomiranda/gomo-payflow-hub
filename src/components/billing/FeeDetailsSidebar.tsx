import React from 'react';

interface FeeDetailsData {
  name: string;
  description: string;
  value: string;
  explanation: string;
  breakdown?: Array<{
    item: string;
    amount: string;
  }>;
}

interface FeeDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  feeData: FeeDetailsData | null;
}

export const FeeDetailsSidebar: React.FC<FeeDetailsSidebarProps> = ({
  isOpen,
  onClose,
  feeData
}) => {
  if (!isOpen || !feeData) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-br from-gomo-dark via-gomo-purple/90 to-gomo-dark border-t border-gomo-magenta/20 z-50 transform transition-all duration-500 ease-out ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gomo-magenta/20 border border-gomo-magenta/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-gomo-magenta" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{feeData.name}</h3>
                <p className="text-sm text-white/60">{feeData.value}</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-gomo-magenta/20 hover:border hover:border-gomo-magenta/30 flex items-center justify-center transition-all duration-300 ease-out"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Explanation */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gomo-yellow mb-2">Why is this fee charged?</h4>
                <p className="text-sm text-white/70 leading-relaxed">{feeData.explanation}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gomo-yellow mb-2">Description</h4>
                <p className="text-sm text-white/70">{feeData.description}</p>
              </div>
            </div>

            {/* Breakdown */}
            {feeData.breakdown && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gomo-yellow">Breakdown</h4>
                <div className="space-y-2">
                  {feeData.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-gomo-purple/20 hover:border-gomo-magenta/30 transition-colors duration-300">
                      <span className="text-sm text-white/70">{item.item}</span>
                      <span className="text-sm font-medium text-white">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gomo-purple/20">
            <p className="text-xs text-white/50 text-center">
              For more information about fees and charges, please check our terms of service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};