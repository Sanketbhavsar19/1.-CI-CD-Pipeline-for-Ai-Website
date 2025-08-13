import React from 'react';
import { Clock, Users, Star, Award, Calendar, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden w-full"
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex space-x-1 sm:space-x-2">
          {course.isFeatured && (
            <span className="bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              Featured
            </span>
          )}
          {course.isPopular && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Popular
            </span>
          )}
        </div>
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
            {course.description}
          </p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-4 overflow-x-auto">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span className="whitespace-nowrap">{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {course.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({course.students.toLocaleString()})
            </span>
          </div>
          {course.certificate && (
            <div className="flex items-center space-x-1 text-xs text-purple-600">
              <Award className="w-3 h-3" />
              <span>Certificate</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              {formatPrice(course.price)}
            </span>
            {course.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500 self-end sm:self-auto">
            <Calendar className="w-3 h-3" />
            <span className="whitespace-nowrap">Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>
  );
};