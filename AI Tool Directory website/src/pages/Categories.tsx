import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/categories';

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/tools?category=${categoryId}`);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Categories</h1>
        <p className="text-gray-600">
          Explore AI tools organized by their primary use case and functionality
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};