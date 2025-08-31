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
  includeIds?: number[];
  excludeIds?: number[];
}

const CourseAccordion: React.FC<CourseAccordionProps> = ({ 
  courses, 
  includeIds, 
  excludeIds = [0, 3, 4, 5]
}) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const filteredCourses = courses.filter(course => {
    if (includeIds) {
      return includeIds.includes(course.id);
    }
    
    const isInRange = course.id >= 0 && course.id <= 6;
    const isNotExcluded = !excludeIds.includes(course.id);
    
    return isInRange && isNotExcluded;
  });

const isIconUrl = (icon: string): boolean => {
  // Check if it's an imported asset (starts with /) or external URL
  return typeof icon === 'string' && (
    icon.startsWith('/') || 
    icon.startsWith('http') || 
    icon.includes('assets') ||
    icon.startsWith('data:') // For base64 encoded images
  );
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

  const handleCourseDescriptionClick = (course: CourseData, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (course.courseDescription) {
      window.open(course.courseDescription, '_blank', 'noopener,noreferrer');
    }
  };

  // Fixed function signature
  const handleLinkClick = (canvasPage: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (canvasPage) {
      window.open(canvasPage, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box>
      <style>
        {`
          .course-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 800px;
            margin: 0 auto;
            align-items: stretch;
          }

          .course-item {
            display: flex;
            flex-direction: row;
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
            height: 120px;
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
            justify-content: center;
            padding: 12px;
            min-width: 120px;
            gap: 8px;
            text-align: center;
            height: 100%;
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
            max-width: 500px;
            opacity: 1;
          }

          .course-details-inner {
            padding: 10px 12px;
            min-width: 200px;
            max-width: 480px;
          }

          .course-subtitle {
            font-size: 13px;
            color: #64748b;
            margin-bottom: 10px;
            line-height: 1.2;
          }

          .course-buttons {
            display: flex;
            gap: 4px;
            flex-wrap: nowrap;
            align-items: flex-start;
            justify-content: flex-start;
          }

          @media (max-width: 768px) {
            .course-item {
              flex-direction: column;
              height: auto;
            }
            .course-trigger {
              align-items: center;
            }
            .course-details {
              max-height: 0;
              max-width: none;
              width: 100%;
              transform: translateY(-10px);
            }
            .course-item.selected .course-details {
              max-height: fit-content;
              max-width: none;
              transform: translateY(0);
            }
            .course-title {
              font-size: 14px;
              text-align: center;
            }
            .course-buttons {
              gap: 3px;
              justify-content: center;
              flex-wrap: nowrap;
            }
            .course-details-inner {
              padding: 8px;
              max-width: none;
              text-align: center;
            }
            .course-subtitle {
              text-align: center;
            }
          }
        `}
      </style>

      <Center className="current-courses-title" mb="md">
        <Box
          style={{
            // background: 'linear-gradient(135deg, #f8f7f2, #c4b876, #b1a363, #D7CD89, #000000 )',
            padding: '8px 16px',
            // borderRadius: '10px',
            // boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <Title
            order={2}>
            Current Computer Science Courses
          </Title>
        </Box>
      </Center>

      <div className="course-container">
        {filteredCourses.map((course, index) => (
          <div 
            key={course.id}
            className={`course-item ${selectedCourse === index ? 'selected' : ''}`}
            onClick={() => setSelectedCourse(selectedCourse === index ? null : index)}
          >
            <div className="course-trigger">
              {renderIcon(course.icon, course.jACourseTitle)}
              <h3 className={`course-title ${selectedCourse === index ? 'expanded' : ''}`}>
                {course.jACourseTitle}
              </h3>
            </div>

            <div className="course-details">
              <div className="course-details-inner">
                <Text className="course-subtitle">
                  {course.jeffcoCourseTitle}
                </Text>

                <Group className="course-buttons" align="flex-start">
                  {/* Course Description Button */}
                  {course.courseDescription && (
                    <Button
                      leftSection={<IconExternalLink size={16} />}
                      variant="gradient"
                      gradient={{ from: 'orange', to: 'red' }}
                      size="xs"
                      radius="xl"
                      onClick={(e) => handleCourseDescriptionClick(course, e)}
                      style={{ fontSize: '11px', minWidth: 'auto' }}
                    >
                      Course Description
                    </Button>
                  )}
                  <Button
                    leftSection={<IconExternalLink size={16} />}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'purple' }}
                    size="xs"
                    radius="xl"
                    onClick={(e) => handleLinkClick(course.canvasPage, e)}
                    style={{ fontSize: '11px', minWidth: 'auto' }}
                  >
                    Canvas
                  </Button>
                    {/* Commented out buttons for later use */}
                  {/*
                  {course.currentWarmUpURL && (
                    <Button
                      leftSection={<IconExternalLink size={16} />}
                      variant="gradient"
                      gradient={{ from: 'green', to: 'teal' }}
                      size="xs"
                      radius="xl"
                      onClick={(e) => handleLinkClick(course.currentWarmUpURL!, e)}
                      style={{ fontSize: '11px', minWidth: 'auto' }}
                    >
                      Warm-up
                    </Button>
                  )}
                  
                  <Button
                    leftSection={<IconExternalLink size={16} />}
                    variant="gradient"
                    gradient={{ from: 'gray', to: 'dark' }}
                    size="xs"
                    radius="xl"
                    onClick={(e) => handleLinkClick(course.extra, e)}
                    style={{ fontSize: '11px', minWidth: 'auto' }}
                    >
                    Extra Credit
                  </Button>
                  */}
                </Group>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CourseAccordion;