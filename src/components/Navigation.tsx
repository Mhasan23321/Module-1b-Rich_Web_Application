import React from 'react';
import { LayoutDashboard, MapPin, Gauge, Shield, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types/common';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  floodCount: number;
  stationCount: number;
  policeCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  floodCount,
  stationCount,
  policeCount,
}) => {
  const tabs = [
    { id: 'dashboard' as ActiveTab, label: 'Overview Dashboard', icon: LayoutDashboard, badge: floodCount },
    { id: 'map' as ActiveTab, label: 'Interactive Live Map', icon: MapPin },
    { id: 'stations' as ActiveTab, label: 'Hydrometric Stations', icon: Gauge, badge: stationCount },
    { id: 'police' as ActiveTab, label: 'Police Force Explorer', icon: Shield, badge: policeCount },
    { id: 'apidocs' as ActiveTab, label: 'API Specifications', icon: BookOpen },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
