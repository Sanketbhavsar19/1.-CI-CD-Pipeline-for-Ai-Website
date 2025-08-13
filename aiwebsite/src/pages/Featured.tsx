import React from 'react';
import { Crown } from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import { aiTools } from '../data/tools';
import { AITool } from '../types';

interface FeaturedProps {
  onToolClick: (tool: AITool) => void;
}

export const Featured: React.FC<FeaturedProps> = ({ onToolClick }) => {
  const featuredTools = aiTools.filter(tool => tool.isFeatured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Crown className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Featured Tools</h1>
        </div>
        <p className="text-gray-600">
          Hand-picked AI tools that stand out for their innovation and impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => onToolClick(tool)}
          />
        ))}
      </div>
    </div>
  );
};