import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

export default function App() {
  return <MantineProvider theme={theme}><HomePage /></MantineProvider>;
}
