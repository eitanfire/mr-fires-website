import React, { useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  Grid, 
  Image, 
  Box,
  Group,
  Stack,
  Badge
} from '@mantine/core';
import { IconSchool, IconHeart, IconCalendar } from '@tabler/icons-react';
// Add this import
import profilePicture from '../img/Fires-portfolio-page-picture.png';

// Types
interface FiressIntroProps {
  profileImage?: string;
  pageTitle?: string;
}

// Utility function for current year
const getCurrentYear = (): number => new Date().getFullYear();

// Utility function to calculate years of experience
const calculateYearsSince = (startYear: number): number => {
  return getCurrentYear() - startYear;
};

const FiresIntro: React.FC<FiressIntroProps> = ({
  profileImage = profilePicture, // Use the imported image as default
  pageTitle = 'About Mr. Fire - Read More'
}) => {
  const teachingYears = calculateYearsSince(2010);
  const daughterAge = calculateYearsSince(2016);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Container size="lg" py="xl" id="info-card">
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <Stack gap="xl">
          {/* Header Section */}
          <Box ta="center">
            <Title 
              order={1} 
              size="3rem"
              mb="sm"
              style={{
                background: 'linear-gradient(135deg, #f8f7f2, #c4b876, #b1a363, #D7CD89, #000000 )',
                padding: '16px 32px',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              Hi I'm Eitan Fire
            </Title>
            <Text size="xl" c="dimmed" fw={500}>
              Let me tell you a little bit about myself.
            </Text>
          </Box>

          {/* Main Content */}
          <Grid gutter="xl" align="flex-start">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap="md">
                <Group gap="lg" align="flex-start" wrap="nowrap">
                  <Image
                    src={profileImage}
                    alt="Fire's profile picture"
                    w={120}
                    h={300}
                    radius="md"
                    fit="cover"
                    fallbackSrc={profilePicture} // Use imported image as fallback too
                    style={{
                      objectPosition: '50% 0%'
                    }}
                  />
                  <Box flex={1}>
                    <Title order={3} mb="sm">
                      My Background
                    </Title>
                    <Text size="xl" lh={1.6}>
                      I grew up in Boulder, Colorado. I attended Foothill Elementary,
                      Centennial Middle School and graduated from Boulder High School.
                      I went to St. John's College in Santa Fe, NM for my
                      undergraduate studies.
                    </Text>
                  </Box>
                </Group>

                {/* Rest of your component remains the same */}
                <Paper p="md" radius="md" bg="blue.0" withBorder>
                  <Group gap="sm" mb="sm">
                    <IconSchool size="1.2rem" color="var(--mantine-color-blue-6)" />
                    <Text fw={600} c="blue.7">
                      Gap Year Adventure
                    </Text>
                  </Group>
                  <Text size="sm" lh={1.6}>
                    I took a year off between my sophomore and junior year of
                    college and worked on a kibbutz in Israel. There I had the
                    chance to stock shelves in a store, dig ditches, tend gardens,
                    and I even took care of animals in a petting zoo!
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap="md">
                <Paper p="md" radius="md" bg="pink.0" withBorder>
                  <Group gap="sm" mb="sm">
                    <IconHeart size="1.2rem" color="var(--mantine-color-pink-6)" />
                    <Text fw={600} c="pink.7">
                      Love Story
                    </Text>
                  </Group>
                  <Text size="sm" lh={1.6} mb="sm">
                    At the end of college I met the love of my life and the
                    woman who would become my wife. She liked me at first but she
                    did not fall madly in love with me until I won a{" "}
                    <span
                      style={{
                        fontSize: '1.5rem',
                        display: 'inline-block',
                        animation: 'bounce 2s infinite',
                        transformOrigin: 'center bottom',
                        verticalAlign: 'middle'
                      }}
                    >
                      🥧
                    </span>{" "}
                    pie eating contest!
                  </Text>
                  <Text size="sm" lh={1.6} mt="sm">
                    I continued to pursue my interest in becoming a
                    teacher by working at the Santa Fe Children's Museum and at the
                    Boys & Girls Club. My wife and I moved to Oregon together and
                    lived there for several years while she finished college. I went
                    to graduate school to learn how to become a better teacher at
                    Lewis & Clark College.
                  </Text>
                </Paper>

                <Paper p="md" radius="md" bg="green.0" withBorder>
                  <Group gap="sm" mb="sm">
                    <IconCalendar size="1.2rem" color="var(--mantine-color-green-6)" />
                    <Text fw={600} c="green.7">
                      Current Life
                    </Text>
                  </Group>
                  <Text size="sm" lh={1.6} mb="sm">
                    We moved back to Colorado in 2010. I have been a classroom
                    teacher for the last{" "}
                    <Badge variant="filled" color="green" size="sm">{teachingYears} years</Badge>.
                    Our daughter is {daughterAge} years old.
                  </Text>
                  <Text size="sm" lh={1.6}>
                    During the week you will find me teaching computer science at Jefferson Academy. Thank you for welcoming me. I
                    look forward to learning more about you.
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
    </Container>
  );
};

export default FiresIntro;