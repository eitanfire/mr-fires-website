import { useState } from 'react';
import { 
  Accordion, 
  Group, 
  Text, 
  Button, 
  Stack,
  Image,
  Badge,
  ActionIcon,
  Tooltip,
  Box
} from '@mantine/core';
import { IconExternalLink, IconRocket, IconPlanet } from '@tabler/icons-react';
import { CourseData } from '../types/course';

interface CourseAccordionProps {
  courses: CourseData[];
}

const CourseAccordion: React.FC<CourseAccordionProps> = ({ courses }) => {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const isIconUrl = (icon: string): boolean => {
    return icon.startsWith('src/') || icon.startsWith('http');
  };

  const renderIcon = (icon: string, alt: string) => {
    if (isIconUrl(icon)) {
      return (
        <Box
          style={{
            width: 100,
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            backgroundColor: 'var(--mantine-color-gray-0)',
            borderRadius: '12px',
            padding: '8px',
          }}
        >
          <Image
            src={icon}
            alt={alt}
            width={80}
            height={80}
            fit="contain"
            style={{ flexShrink: 0 }}
          />
        </Box>
      );
    }
    return (
      <Box
        style={{
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          backgroundColor: 'var(--mantine-color-gray-0)',
          borderRadius: '12px',
        }}
      >
        <Text 
          size="xl" 
          style={{ 
            fontSize: '80px', 
            lineHeight: 1,
          }}
        >
          {icon}
        </Text>
      </Box>
    );
  };

  const handleLinkClick = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isItemActive = (value: string): boolean => {
    return activeItems.includes(value);
  };

  return (
    <Box style={{ width: '100%', margin: 0, padding: '0 24px' }}>
      <Accordion
        multiple
        value={activeItems}
        onChange={setActiveItems}
        variant="separated"
        radius="lg"
        chevronPosition="right"
        styles={{
          item: {
            backgroundColor: 'var(--mantine-color-white)',
            border: '1px solid var(--mantine-color-gray-2)',
            marginBottom: '16px',
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            minHeight: '140px',
            '&:hover': {
              borderColor: 'var(--mantine-color-blue-3)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              background: 'linear-gradient(90deg, #f8faff, #ffffff)',
            },
            '&[data-active]': {
              borderColor: 'var(--mantine-color-blue-5)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
              background: 'linear-gradient(90deg, #f0f6ff, #ffffff)',
            }
          },
          control: {
            padding: '40px 48px',
            minHeight: '160px',
          },
          chevron: {
            fontSize: '24px',
            transition: 'transform 0.2s ease',
            color: 'var(--mantine-color-blue-6)',
          }
        }}
      >
        {courses.map((course, index) => {
          const itemValue = course.id.toString();
          const isActive = isItemActive(itemValue);
          
          return (
            <Accordion.Item key={course.id} value={itemValue}>
              <Accordion.Control>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="lg" wrap="nowrap" align="center">
                    {renderIcon(course.icon, course.jACourseTitle)}
                    <Stack gap={4}>
                      <Text fw={700} style={{ fontSize: '1.75rem', lineHeight: 1.2 }}>
                        {course.jACourseTitle}
                      </Text>
                      <Text size="lg" c="dimmed" style={{ lineHeight: 1.2 }}>
                        {course.jeffcoCourseTitle}
                      </Text>
                    </Stack>
                  </Group>
                  
                  <Group gap="xs" visibleFrom="sm">
                    {course.currentWarmUpURL && index !== 0 && ( // Removed from first course
                      <Badge 
                        variant="light" 
                        color="green" 
                        size="md"
                        radius="xl"
                      >
                        Active
                      </Badge>
                    )}
                    
                    <Tooltip label={isActive ? "Collapse" : "Expand"}>
                      <ActionIcon
                        variant="subtle"
                        size="lg"
                        color={isActive ? "orange" : "blue"}
                        radius="xl"
                      >
                        {isActive ? <IconPlanet size={20} /> : <IconRocket size={20} />}
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Group>
              </Accordion.Control>
              
              <Accordion.Panel>
                <Stack gap="lg">
                  <Group gap="md" wrap="wrap">
                    <Button
                      leftSection={<IconExternalLink size={16} />}
                      variant="filled"
                      size="md"
                      radius="md"
                      onClick={(e) => handleLinkClick(course.canvasPage, e)}
                      style={{
                        background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-blue-7))',
                      }}
                    >
                      Canvas Course
                    </Button>
                    
                    {course.currentWarmUpURL && (
                      <Button
                        leftSection={<IconExternalLink size={16} />}
                        variant="light"
                        color="green"
                        size="md"
                        radius="md"
                        onClick={(e) => handleLinkClick(course.currentWarmUpURL!, e)}
                      >
                        Current Warm-up
                      </Button>
                    )}
                    
                    <Button
                      leftSection={<IconExternalLink size={16} />}
                      variant="subtle"
                      color="gray"
                      size="md"
                      radius="md"
                      onClick={(e) => handleLinkClick(course.extra, e)}
                    >
                      Resources
                    </Button>
                  </Group>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default CourseAccordion;
