import { useState } from 'react';
import { 
  Group, 
  Text, 
  Button, 
  Image,
  Box,
  Title,
  Center
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { CourseData } from '../types/course';

interface CourseAccordionProps {
  courses: CourseData[];
}

const CourseAccordion: React.FC<CourseAccordionProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const isIconUrl = (icon: string): boolean => {
    return icon.startsWith('src/') || icon.startsWith('http');
  };

  const renderIcon = (icon: string, alt: string) => {
    if (isIconUrl(icon)) {
      return (
        <Image
          src={icon}
          alt={alt}
          width={selectedCourse !== null ? 50 : 70}
          height={selectedCourse !== null ? 50 : 70}
          fit="contain"
          style={{ 
            flexShrink: 0,
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: selectedCourse !== null ? '5px' : '7px',
            transition: 'all 0.3s ease'
          }}
        />
      );
    }
    return (
      <Text 
        style={{ 
          fontSize: selectedCourse !== null ? '50px' : '70px', 
          lineHeight: 1,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          width: selectedCourse !== null ? '50px' : '70px',
          height: selectedCourse !== null ? '50px' : '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        {icon}
      </Text>
    );
  };

  const handleLinkClick = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const firstColumn = courses.slice(0, 3);
  const secondColumn = courses.slice(3, 6);

  return (
    <Box>
      <style>
        {`
          .course-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 1fr;
            gap: 10px;
            max-width: 1000px;
            margin: 0 auto;
            align-items: stretch;
          }

          @media (max-width: 900px) {
            .course-container {
              grid-template-columns: 1fr;
              grid-auto-rows: auto;
            }
          }

          .course-item {
            display: flex;
            flex-direction: row; /* keep reveal on right */
            align-items: center;
            justify-content: center;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(20px);
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            height: 120px; /* smaller height */
          }

          .course-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            border-color: rgba(59, 130, 246, 0.5);
          }

          .course-item.selected {
            border-color: rgb(59, 130, 246);
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
            box-shadow: 0 10px 24px rgba(59, 130, 246, 0.3);
          }

          .course-trigger {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; /* center vertically */
            padding: 12px;
            min-width: 120px;
            gap: 8px;
            text-align: center;
            height: 100%; /* center vertically in panel */
          }

          .course-title {
            font-size: 14px;
            font-weight: 700;
            line-height: 1.1;
            color: #1e293b;
            margin: 0;
            transition: font-size 0.3s ease;
          }

          .course-title.expanded {
            font-size: 16px;
          }

          .course-details {
            flex: 0 0 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.4s ease;
          }

          .course-item.selected .course-details {
            flex: 1 0 auto;
            max-width: 300px;
            opacity: 1;
          }

          .course-details-inner {
            padding: 12px;
            min-width: 200px;
          }

          .course-subtitle {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 12px;
          }

          .course-buttons {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            align-items: center;
          }

          @media (max-width: 768px) {
            .course-item {
              flex-direction: column;
              height: auto;
            }
            .course-details {
              max-height: 0;
              max-width: none;
              width: 100%;
              transform: translateY(-10px);
            }
            .course-item.selected .course-details {
              max-height: fit-content;
              transform: translateY(0);
            }
            .course-title {
              font-size: 14px;
            }
          }
        `}
      </style>

      <Center mb="md">
        <Box
          style={{
            background: 'linear-gradient(135deg, #f8f7f2, #c4b876, #b1a363, #D7CD89, #000000 )',
            padding: '8px 16px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <Title
            order={2}
            style={{
              color: 'white',
              fontWeight: 700,
              fontSize: 20,
              textAlign: 'center',
              textShadow: '0 2px 8px rgba(0,0,0,0.25)',
              WebkitTextStroke: '1px orange',
              WebkitTextFillColor: 'white',
            }}
          >
            Current Computer Science Courses
          </Title>
        </Box>
      </Center>

      <div className="course-container">
        {[firstColumn, secondColumn].map((column, colIndex) => (
          <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
            {column.map((course, index) => {
              const courseIndex = colIndex * 3 + index;
              return (
                <div 
                  key={course.id}
                  className={`course-item ${selectedCourse === courseIndex ? 'selected' : ''}`}
                  onClick={() => setSelectedCourse(selectedCourse === courseIndex ? null : courseIndex)}
                >
                  <div className="course-trigger">
                    {renderIcon(course.icon, course.jACourseTitle)}
                    <h3 className={`course-title ${selectedCourse === courseIndex ? 'expanded' : ''}`}>
                      {course.jACourseTitle}
                    </h3>
                  </div>

                  <div className="course-details">
                    <div className="course-details-inner">
                      <Text className="course-subtitle">
                        {course.jeffcoCourseTitle}
                      </Text>

                      <Group className="course-buttons" align="center">
                        <Button
                          leftSection={<IconExternalLink size={18} />}
                          variant="gradient"
                          gradient={{ from: 'blue', to: 'purple' }}
                          size="xs"
                          radius="xl"
                          onClick={(e) => handleLinkClick(course.canvasPage, e)}
                        >
                          Canvas Course
                        </Button>
                        
                        {course.currentWarmUpURL && (
                          <Button
                            leftSection={<IconExternalLink size={18} />}
                            variant="gradient"
                            gradient={{ from: 'green', to: 'teal' }}
                            size="xs"
                            radius="xl"
                            onClick={(e) => handleLinkClick(course.currentWarmUpURL!, e)}
                          >
                            Current Warm-up
                          </Button>
                        )}
                        
                        <Button
                          leftSection={<IconExternalLink size={18} />}
                          variant="gradient"
                          gradient={{ from: 'gray', to: 'dark' }}
                          size="xs"
                          radius="xl"
                          onClick={(e) => handleLinkClick(course.extra, e)}
                        >
                          Resources for Extra Credit
                        </Button>
                      </Group>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CourseAccordion;
