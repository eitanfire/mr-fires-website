import { useEffect } from "react";
import { Container, Grid, Title, Text } from "@mantine/core";
import Relationships from "../components/Relationships";
import Calendar from "../components/Calendar";
import BlockDay from "../components/BlockDay";
import ShoutOutCarousel from "../components/ShoutOutCarousel";
import Courses from '../components/Courses';
import { MountainParallax } from '../components/MountainParallax'; // Import the parallax component
import mountainBackground from '../img/mountain-background.png';
import mountainMiddle from '../img/mountain-middle.png';
// import mountainForeground from '../img/mountain-foreground.png';
import mountainForeground from '../img/jungle-bg.jpg'; // Use a jungle foreground for variety

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Mr. Fire's Website";
  }, []);
  
  return (
    <>
      {/* Mountain Parallax Hero Section */}
      <MountainParallax
               backgroundImageUrl={mountainBackground}
        middleImageUrl={mountainMiddle}
        foregroundImageUrl={mountainForeground}
        containerHeight="70vh"
        className="hero-parallax"
      >
        <div>
          <Title order={1} size="3rem" mb="md">
            Jefferson Academy Computer Science
          </Title>
          <Text size="xl">
            Welcome to Mr. Fire's Website
           </Text>
        </div>
      </MountainParallax>

      <Container size="xl">
        <Grid className="accordion">
          <Grid.Col span={12}>
            <ShoutOutCarousel />
          </Grid.Col>
          
          <Grid.Col 
            span={{ base: 0, lg: 3 }}
            className="eitan-info-box-container"
            visibleFrom="lg"
          >
            <Title order={2}>
              <BlockDay />
            </Title>
            <Relationships />
          </Grid.Col>
          
          <Grid.Col 
            span={{ base: 12, lg: 9 }}
            className="accordion"
          >
            <Courses />
          </Grid.Col>
          
          <Grid.Col span={12} mt="md">
            <Calendar />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;