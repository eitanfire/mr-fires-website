import { useState } from 'react';
import { 
  Group, 
  Text, 
  Button, 
  Image,
  Box
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
          width={selectedCourse !== null ? 80 : 120}
          height={selectedCourse !== null ? 80 : 120}
          fit="contain"
          style={{ 
            flexShrink: 0,
            borderRadius: selectedCourse !== null ? '12px' : '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: selectedCourse !== null ? '8px' : '12px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        />
      );
    }
    return (
      <Text 
        style={{ 
          fontSize: selectedCourse !== null ? '80px' : '120px', 
          lineHeight: 1,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: selectedCourse !== null ? '12px' : '16px',
          width: selectedCourse !== null ? '80px' : '120px',
          height: selectedCourse !== null ? '80px' : '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
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

  return (
    <Box>
      <style>
        {`
          .course-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 1400px;
            margin: 0 auto;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .course-item {
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
            border-radius: 24px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
          }

          .course-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
            border-color: rgba(59, 130, 246, 0.5);
          }

          .course-item.selected {
            border-color: rgb(59, 130, 246);
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
            box-shadow: 0 16px 48px rgba(59, 130, 246, 0.3);
          }

          .course-trigger {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px;
            flex: 1;
            gap: 16px;
            transition: all 0.4s ease;
            text-align: center;
          }

          .course-title {
            font-size: 24px;
            font-weight: 700;
            line-height: 1.1;
            color: #1e293b;
            margin: 0;
            transition: font-size 0.4s ease;
          }

          .course-title.expanded {
            font-size: 32px;
          }

          .course-details {
            flex: 0 0 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.5s ease;
          }

          .course-item.selected .course-details {
            flex: 0 0 400px;
            max-width: 400px;
            opacity: 1;
          }

          .course-details-inner {
            padding: 32px;
            min-width: 300px;
          }

          .course-subtitle {
            font-size: 22px;
            color: #64748b;
            margin-bottom: 24px;
          }

          .course-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            align-items: center;
          }

          @media (max-width: 768px) {
            .course-item {
              flex-direction: column;
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
              font-size: 18px;
            }
          }
        `}
      </style>

      <Text
        style={{
          fontSize: selectedCourse !== null ? '40px' : '56px',
          fontWeight: 700,
          textAlign: 'center',
          color: 'white',
          marginBottom: selectedCourse !== null ? '32px' : '60px',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s ease'
        }}
      >
        Select Your Course
      </Text>

      <div className="course-container">
        {courses.map((course, index) => (
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

                <Group className="course-buttons" align="center">
                  <Button
                    leftSection={<IconExternalLink size={20} />}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'purple' }}
                    size="lg"
                    radius="xl"
                    onClick={(e) => handleLinkClick(course.canvasPage, e)}
                  >
                    Canvas Course
                  </Button>
                  
                  {course.currentWarmUpURL && (
                    <Button
                      leftSection={<IconExternalLink size={20} />}
                      variant="gradient"
                      gradient={{ from: 'green', to: 'teal' }}
                      size="lg"
                      radius="xl"
                      onClick={(e) => handleLinkClick(course.currentWarmUpURL!, e)}
                    >
                      Current Warm-up
                    </Button>
                  )}
                  
                  <Button
                    leftSection={<IconExternalLink size={20} />}
                    variant="gradient"
                    gradient={{ from: 'gray', to: 'dark' }}
                    size="lg"
                    radius="xl"
                    onClick={(e) => handleLinkClick(course.extra, e)}
                  >
                    Resources for Extra Credit
                  </Button>
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
