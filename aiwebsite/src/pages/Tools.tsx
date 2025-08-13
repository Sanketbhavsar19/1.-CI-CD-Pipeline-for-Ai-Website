import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolCard } from '../components/ToolCard';
import { Filters } from '../components/Filters';
import { aiTools } from '../data/tools';
import { categories } from '../data/categories';
import { AITool, SortOption, FilterOption } from '../types';

interface ToolsProps {
  searchQuery: string;
  onToolClick: (tool: AITool) => void;
}

export const Tools: React.FC<ToolsProps> = ({ searchQuery, onToolClick }) => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const filteredAndSortedTools = useMemo(() => {
    let filtered = aiTools;

    // Apply category filter from URL parameter
    if (categoryParam) {
      const category = categories.find(cat => cat.id === categoryParam);
      if (category) {
        filtered = filtered.filter(tool =>
          tool.category.toLowerCase() === category.name.toLowerCase()
        );
      }
    }
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply pricing filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(tool => 
        tool.pricing.toLowerCase() === filterBy.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filterBy, sortBy, categoryParam]);

  const getPageTitle = () => {
    if (categoryParam) {
      const category = categories.find(cat => cat.id === categoryParam);
      return category ? `${category.name} Tools` : 'AI Tools';
    }
    return 'All AI Tools';
  };

  const getPageDescription = () => {
    if (categoryParam) {
      const category = categories.find(cat => cat.id === categoryParam);
      return category ? category.description : 'Discover powerful AI tools';
    }
    return `Discover ${aiTools.length} powerful AI tools to enhance your productivity`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
        <p className="text-gray-600">
          {getPageDescription()}
        </p>
      </div>

      <Filters
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />

      {filteredAndSortedTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredAndSortedTools.length} of {aiTools.length} tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => onToolClick(tool)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};