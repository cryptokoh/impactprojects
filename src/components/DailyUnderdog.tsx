import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, TrendingUp, Users } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

interface DailyUnderdogProps {
  onAddToCart?: (project: Project) => void;
}

export const DailyUnderdog: React.FC<DailyUnderdogProps> = ({ onAddToCart }) => {
  const [todaysProject, setTodaysProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Get the last 30 projects (considered "underdogs" - newer/less established)
  const underdogProjects = projects.slice(-30);

  const getTodaysProject = () => {
    // Use current date as seed for consistent daily selection
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const seed = dateString.split('-').reduce((acc, part) => acc + parseInt(part), 0);
    const index = seed % underdogProjects.length;
    return underdogProjects[index];
  };

  const formatProjectTLDR = (project: Project) => {
    // Extract key themes from description for TLDR
    const description = project.description.toLowerCase();
    let category = '🌐 Web3';
    let impact = 'Community';
    
    if (description.includes('environment') || description.includes('green') || description.includes('climate')) {
      category = '🌱 Environmental';
    } else if (description.includes('education') || description.includes('learning') || description.includes('academy')) {
      category = '📚 Education';
    } else if (description.includes('art') || description.includes('creative') || description.includes('music')) {
      category = '🎨 Creative';
    } else if (description.includes('health') || description.includes('medical') || description.includes('care')) {
      category = '💊 Healthcare';
    } else if (description.includes('development') || description.includes('tool') || description.includes('platform')) {
      category = '🛠️ Tech/Tools';
    } else if (description.includes('dao') || description.includes('governance') || description.includes('community')) {
      category = '🏛️ Governance';
    }

    // Estimate impact scope
    if (description.includes('global') || description.includes('worldwide')) {
      impact = 'Global';
    } else if (description.includes('network') || description.includes('ecosystem')) {
      impact = 'Ecosystem';
    } else if (description.includes('local') || description.includes('community')) {
      impact = 'Local';
    }

    return { category, impact };
  };

  useEffect(() => {
    const project = getTodaysProject();
    setTodaysProject(project);
    
    // Animate in after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!todaysProject) return null;

  const { category, impact } = formatProjectTLDR(todaysProject);
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className={`fixed top-4 right-4 w-80 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-sm border border-purple-400/20 rounded-xl shadow-2xl z-40 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Daily Underdog</h3>
            <div className="flex items-center gap-1 text-xs text-purple-300">
              <Calendar className="w-3 h-3" />
              <span>{today}</span>
            </div>
          </div>
        </div>

        {/* Project Card */}
        <div className="bg-black/20 rounded-lg p-3 mb-3">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-white font-semibold text-sm leading-tight">
              {todaysProject.name}
            </h4>
            <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
              {category}
            </span>
          </div>
          
          <p className="text-gray-300 text-xs mb-3 leading-relaxed">
            {todaysProject.description}
          </p>

          {/* TLDR Stats */}
          <div className="flex items-center gap-3 mb-3 text-xs">
            <div className="flex items-center gap-1 text-green-400">
              <Users className="w-3 h-3" />
              <span>{impact} Impact</span>
            </div>
            <div className="text-purple-300">
              Project #{todaysProject.id}/117
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <a
              href={todaysProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              View Project
            </a>
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(todaysProject)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-all duration-200 font-medium"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-purple-300">
            💎 Supporting the next wave of Web3 innovation
          </p>
        </div>
      </div>
    </div>
  );
}; 