import { createTheme, MantineColorsTuple } from "@mantine/core";

// Define your school colors as tuples
const school: MantineColorsTuple = [
  "#f8f7f2", // 0 - Lightest yellow/cream
  "#f1eedf", // 1
  "#eae5cc", // 2
  "#e3dcb9", // 3
  "#dcd3a6", // 4
  "#D7CD89", // 5 - secondary color (main yellow)
  "#c4b876", // 6
  "#b1a363", // 7
  "#9e8e50", // 8
  "#8b793d", // 9 - Darkest yellow
];

const schoolDark: MantineColorsTuple = [
  "#f8f8f8", // 0 - Light grays
  "#e9e9e9", // 1
  "#d1d1d1", // 2
  "#b9b9b9", // 3
  "#a1a1a1", // 4
  "#898989", // 5
  "#717171", // 6
  "#595959", // 7
  "#404040", // 8
  "#000000", // 9 - primary black
];

export const theme = createTheme({
  colors: {
    school,
    schoolDark,
  },
  primaryColor: "schoolDark", // Black as primary
  fontFamily: "Inter, Helvetica, Arial, sans-serif",
});
