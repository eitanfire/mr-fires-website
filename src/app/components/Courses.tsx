import React from 'react';
import { Stack, Title } from '@mantine/core';
import CourseAccordion from './ CourseAccordion';
import { fallCourses } from '../utils/courses';

const Courses: React.FC = () => {
  return (
    <Stack gap="md">
      <Title order={2} size="h2" ta="center" mb="md">
        Current Computer Science Courses
      </Title>
      <CourseAccordion courses={fallCourses} />
    </Stack>
  );
};

export default Courses;