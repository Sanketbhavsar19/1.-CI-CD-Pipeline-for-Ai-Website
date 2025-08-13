import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ToolModal } from './components/ToolModal';
import { CourseModal } from './components/CourseModal';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { Categories } from './pages/Categories';
import { Featured } from './pages/Featured';
import { Courses } from './pages/Courses';
import { AITool, Course } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const handleToolClick = (tool: AITool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  const handleCloseCourseModal = () => {
    setIsCourseModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home onToolClick={handleToolClick} />} />
            <Route 
              path="/tools" 
              element={
                <Tools 
                  searchQuery={searchQuery}
                  onToolClick={handleToolClick} 
                />
              } 
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/featured" element={<Featured onToolClick={handleToolClick} />} />
            <Route path="/courses" element={<Courses onCourseClick={handleCourseClick} />} />
          </Routes>
        </main>

        <ToolModal
          tool={selectedTool}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        <CourseModal
          course={selectedCourse}
          isOpen={isCourseModalOpen}
          onClose={handleCloseCourseModal}
        />
      </div>
    </Router>
  );
}

export default App;