import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Crown, Zap, Star, GraduationCap, Award } from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import { CategoryCard } from '../components/CategoryCard';
import { aiTools } from '../data/tools';
import { categories } from '../data/categories';
import { AITool } from '../types';

interface HomeProps {
  onToolClick: (tool: AITool) => void;
}

export const Home: React.FC<HomeProps> = ({ onToolClick }) => {
  const navigate = useNavigate();
  const featuredTools = aiTools.filter(tool => tool.isFeatured);
  const trendingTools = aiTools.filter(tool => tool.isTrending);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/tools?category=${categoryId}`);
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                AI Tools Hub
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the most powerful AI tools to supercharge your productivity, creativity, and workflow. 
              From writing assistants to image generators, find the perfect AI solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/tools"
                className="flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-lg font-semibold">Explore All Tools</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/categories"
                className="flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300"
              >
                <span className="text-lg font-semibold">Browse Categories</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Tools</h2>
            </div>
            <Link
              to="/featured"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 3).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => onToolClick(tool)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <Link
              to="/tools"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTools.slice(0, 3).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => onToolClick(tool)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find AI tools organized by their primary use case and functionality
            </p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">Learn AI Skills</h2>
            </div>
            <Link
              to="/courses"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
            >
              <span>View all courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-center mb-8">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master AI technologies with expert-led courses, hands-on projects, and industry certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600 text-sm">Learn from industry professionals and AI researchers</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificates</h3>
              <p className="text-gray-600 text-sm">Earn recognized certificates to boost your career</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hands-on Projects</h3>
              <p className="text-gray-600 text-sm">Build real AI applications and portfolio projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{aiTools.length}+</div>
              <div className="text-purple-200">AI Tools Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{categories.length}</div>
              <div className="text-purple-200">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.6</div>
              <div className="text-purple-200 flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 fill-current" />
                <span>Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};