import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, MapPin, FileText } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { path: '/agenda', icon: Calendar, label: 'Agenda', testId: 'nav-agenda' },
    { path: '/distances', icon: MapPin, label: 'Distanze', testId: 'nav-distances' },
    { path: '/documents', icon: FileText, label: 'Documenti', testId: 'nav-documents' },
  ];

  return (
    <nav 
      className="no-print fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 z-50"
      style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    >
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-4">
        {navItems.map(({ path, icon: Icon, label, testId }) => (
          <NavLink
            key={path}
            to={path}
            data-testid={testId}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg smooth-transition ${isActive
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-mono tracking-wider uppercase" style={{ letterSpacing: '0.2em' }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;