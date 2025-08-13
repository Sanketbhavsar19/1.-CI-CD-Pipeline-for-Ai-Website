import React from 'react';
import { Star, ExternalLink, Zap, Crown } from 'lucide-react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
  onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free':
        return 'bg-green-100 text-green-800';
      case 'Freemium':
        return 'bg-blue-100 text-blue-800';
      case 'Paid':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                {tool.name}
              </h3>
              {tool.isFeatured && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
              {tool.isTrending && (
                <Zap className="w-4 h-4 text-orange-500" />
              )}
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPricingColor(tool.pricing)}`}>
              {tool.pricing}
            </span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">
              {tool.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({tool.reviews.toLocaleString()})
            </span>
          </div>
          <span className="text-xs text-gray-500 capitalize">
            {tool.category}
          </span>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>
  );
};