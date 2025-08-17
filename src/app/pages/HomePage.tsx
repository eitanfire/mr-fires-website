import { useEffect } from "react";
import { Container, Grid, Title, Text } from "@mantine/core";
import Relationships from "../components/Relationships";
import Calendar from "../components/Calendar";
import BlockDay from "../components/BlockDay";
import ShoutOutCarousel from "../components/ShoutOutCarousel";
import Courses from '../components/Courses';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Mr. Fire's Website";
  }, []);
  
  return (
    <>              
        <div>
          <Title className="header-title" order={1} size="2.3rem" >
            Jefferson Academy Computer Science
          </Title>
        </div>
      <Container size="xxl" >
        <Grid className="accordion">
          <Grid.Col span={12} >
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
                    >
            <Calendar />
          </Grid.Col>
          <Grid.Col 
            // span={{ base: 12, lg: 9 }}
            className="accordion"
          >
            <Courses />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;