// courseinfo/src/components/Course.jsx
import React from 'react';
import Header from './Header';
import Content from './Content';

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    const style = {
        fontWeight: 'bold',
        color: '#0026ff'
      };
    return <p style={style}>Total exercises: {total}</p>;
  };
  


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
