import { useEffect } from "react";
import { Container, Grid, Title } from "@mantine/core";
import Relationships from "../components/Relationships";
import Calendar from "../components/Calendar";
// import ShoutOuts from "../components/ShoutOuts";
import BlockDay from "../components/BlockDay";
// import aDayBDay from "../utils/aDayBDay";
// import Tabs from "../components/TabComponent/Tabs";
// import Fall2023ClassesAccordion from "../components/TabComponent/V2/Fall2023ClassesAccordion";
import ShoutOutCarousel from "../components/ShoutOutCarousel";
import Courses from '../components/Courses';
// import ClassAccordionInterface from "../features/ClassAccordionInterface";
// import AnimatedAccordion from "../features/AnimatedAccordion";

const HomePage: React.FC = () => {
    useEffect(() => {
    document.title = "Mr. Fire's Website";
  }, []);
  
  return (
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
            {/* {aDayBDay && ( */}
              <BlockDay />
            {/* )} */}
          </Title>
          <Relationships />
        </Grid.Col>
        
        <Grid.Col 
          span={{ base: 12, lg: 9 }}
          className="accordion"
        >
          {/* <Tabs /> */}
          <Courses 
          // className="Fall2023ClassesAccordion" 
          />
        </Grid.Col>
        
        <Grid.Col span={12} mt="md">
          <Calendar />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default HomePage;
