import React from 'react';
import { Printer } from 'lucide-react';

export const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      data-testid="print-agenda-btn"
      className="print-button flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 smooth-transition shadow-sm hover:shadow-md font-sans font-medium text-sm"
    >
      <Printer size={18} />
      <span className="hidden sm:inline">Stampa</span>
    </button>
  );
};

export default PrintButton;