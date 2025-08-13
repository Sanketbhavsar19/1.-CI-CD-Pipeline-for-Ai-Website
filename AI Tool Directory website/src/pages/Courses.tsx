import React, { useState, useMemo } from 'react';
import { GraduationCap, Filter, ChevronDown } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';
import { Course } from '../types';

interface CoursesProps {
  onCourseClick: (course: Course) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onCourseClick }) => {
  const [sortBy, setSortBy] = useState<string>('popular');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(course => 
        course.category.toLowerCase().includes(filterBy.toLowerCase())
      );
    }

    // Apply level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => 
        course.level.toLowerCase() === levelFilter.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.students - a.students;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [filterBy, levelFilter, sortBy]);

  const categories = Array.from(new Set(courses.map(course => course.category)));
  const featuredCourses = courses.filter(course => course.isFeatured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <GraduationCap className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Courses</h1>
        </div>
        <p className="text-gray-600">
          Master AI technologies with expert-led courses and hands-on projects
        </p>
      </div>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredCourses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onCourseClick(course)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-col lg:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <div className="flex flex-col sm:flex-col md:flex-row gap-2 sm:gap-3 flex-1">
          <div className="relative flex-1">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative flex-1">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 pr-8 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Course Results */}
      {filteredAndSortedCourses.length === 0 ? (
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm sm:text-base text-gray-600">
              Showing {filteredAndSortedCourses.length} of {courses.length} courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredAndSortedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onCourseClick(course)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};