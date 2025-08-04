import React, { useRef, useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { Box, Title, ActionIcon } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import Autoplay from 'embla-carousel-autoplay';

// Mock data for demonstration
const shoutOuts = [
  { to: "John", from: "Sarah", because: "Great teamwork on the project!" },
  { to: "Alice", from: "Bob", because: "Always willing to help others" },
  { to: "Mike", from: "Lisa", because: "Excellent problem-solving skills" },
  { to: "Emma", from: "David", because: "Outstanding presentation yesterday" },
  { to: "Chris", from: "Amy", because: "Mentoring new team members" },
  { to: "Sophie", from: "Tom", because: "Creative solutions and innovation" },
  { to: "Ryan", from: "Kate", because: "Reliable and dedicated work" }
];

interface ShoutOut {
  to?: string;
  from?: string;
  because?: string;
}

const ShoutOutCard: React.FC<{ to?: string; from?: string; because?: string; id: number }> = ({ to, from, because }) => (
  <Box
    style={{
      background: "linear-gradient(135deg, #D7CD89 0%, #c4b876 100%)", // School yellow gradient
      padding: "20px",
      borderRadius: "12px",
      color: "#000000", // School black for text
      height: "160px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(215, 205, 137, 0.3)", // Yellow shadow
      border: "2px solid #000000" // Black border
    }}
  >
    <div>
      <Title 
        order={4} 
        style={{ 
          marginBottom: "8px", 
          color: "#000000", // School black
          fontWeight: 700
        }}
      >
        To: {to}
      </Title>
      <p style={{ 
        fontSize: "14px", 
        margin: "0 0 12px 0", 
        color: "#000000" // School black
      }}>
        {because}
      </p>
    </div>
    <p style={{ 
      fontSize: "12px", 
      fontStyle: "italic", 
      margin: "0", 
      color: "#595959" // Darker gray from schoolDark palette
    }}>
      — {from}
    </p>
  </Box>
);

const ShoutOutCarousel: React.FC = () => {
  // Create autoplay instance with useRef
  const autoplay = useRef(Autoplay({ 
    delay: 5000,
    stopOnInteraction: false // Continue autoplay after user interaction
  }));

  // State to track if autoplay is playing
  const [isPlaying, setIsPlaying] = useState(true);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(2);

  const toggleAutoplay = () => {
    if (isPlaying) {
      autoplay.current.stop();
      setIsPlaying(false);
    } else {
      autoplay.current.play();
      setIsPlaying(true);
    }
  };

  // Function to calculate opacity based on distance from center
  const getSlideOpacity = (slideIndex: number, centerIndex: number, totalSlides: number) => {
    const distance = Math.abs(slideIndex - centerIndex);
    const maxDistance = Math.floor(totalSlides / 2);
    
    // Calculate opacity: center = 1, gradually decrease to sides
    if (distance === 0) return 1; // Center slide
    if (distance === 1) return 0.7; // Adjacent slides
    if (distance === 2) return 0.4; // Further slides
    return 0.2; // Furthest slides
  };

  const slides = shoutOuts.map((item: ShoutOut, index: number) => {
    const opacity = getSlideOpacity(index, selectedIndex, shoutOuts.length);
    
    return (
      <Carousel.Slide 
        key={index}
        style={{
          opacity: opacity,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <ShoutOutCard 
          to={item.to}
          from={item.from}
          because={item.because}
          id={index}
        />
      </Carousel.Slide>
    );
  });

  function setEmbla(embla: EmblaCarouselType): void {
    setEmblaApi(embla);
  }

  useEffect(() => {
    if (emblaApi) {
      console.log("Embla API is ready", emblaApi);
      
      // Set up event listener for slide selection
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      
      emblaApi.on('select', onSelect);
      onSelect(); // Set initial selected index
      
      // Cleanup
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <Box style={{ position: "relative"}}>
      {/* Logo with school colors */}
      <Title 
        order={3} 
        className="shoutOut-logo" 
        style={{ 
          marginBottom: "16px",
          color: "#000000", // School black
          textShadow: "1px 1px 2px rgba(215, 205, 137, 0.3)" // Subtle yellow shadow
        }}
      >
        Shout Out
      </Title>
      
      {/* Pause/Play Button with school colors */}
      <ActionIcon
        variant="filled"
        size="lg"
        onClick={toggleAutoplay}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          backgroundColor: "#000000", // School black
          color: "#D7CD89", // School yellow icon
          border: "2px solid #D7CD89" // Yellow border
        }}
        aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
      >
        {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
      </ActionIcon>
      
      {/* Carousel */}
      <Carousel
        withIndicators
        withControls
        controlSize={30}
        emblaOptions={{ dragFree: true }}
        slideSize="50%"
        slideGap="lg"
        height={200}
        getEmblaApi={setEmbla}
        initialSlide={2}
        plugins={[autoplay.current]}
        onMouseEnter={() => {
          if (isPlaying) {
            autoplay.current.stop();
          }
        }}
        onMouseLeave={() => {
          if (isPlaying) {
            autoplay.current.play();
          }
        }}
       styles={{
          control: {
            backgroundColor: "#000000", // Black controls
            color: "#D7CD89", // Yellow icons
            border: "2px solid #D7CD89",
            '&:hover': {
              backgroundColor: "#D7CD89", // Yellow on hover
              color: "#000000" // Black icons on hover
            },
            '&[data-previous]': {
              display: 'none' // Hide the previous (left) control
            }
          },
          indicator: {
            backgroundColor: "#D7CD89", // Yellow indicators
            '&[data-active]': {
              backgroundColor: "#000000" // Black for active indicator
            }
          }
        }}
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export default ShoutOutCarousel;