import React from 'react';
import { Stack } from '@mantine/core';
import CourseAccordion from './ CourseAccordion';
import { fallCourses } from '../utils/courses';

const Courses: React.FC = () => {
  return (
    <Stack >
      <CourseAccordion courses={fallCourses} />
    </Stack>
  );
};

export default Courses;