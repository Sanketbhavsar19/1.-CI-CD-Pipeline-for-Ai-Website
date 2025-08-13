import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer p-4 sm:p-6 min-h-[140px] sm:min-h-[160px] flex flex-col justify-center"
    >
      <div className="flex flex-col items-center space-y-3 mb-3 text-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          {IconComponent && <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">
            {category.name}
          </h3>
          <span className="text-xs sm:text-sm text-gray-500 mt-1 block">
            {category.count} tools
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed">
        {category.description}
      </p>
    </div>
  );
};