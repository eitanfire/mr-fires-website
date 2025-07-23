import Header from "./app/components/Header";
import Footer from "./app/components/Footer";
import HomePage from "./app/pages/HomePage";
import FiresIntro from "./app/pages/FiresIntro";
import ContactForm from "./app/pages/ContactForm";
import MakeAShoutOutForm from "./app/pages/MakeAShoutOutForm";
import { Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

export default function App() {
  return <MantineProvider theme={theme}>    
  <Header />
  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="read-more" element={<FiresIntro />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="shout-out" element={<MakeAShoutOutForm />} />
      </Routes>            <Footer />
</MantineProvider>;
}
