import { randomiseList } from "./helpers";

 const ACCENT_COLORS = [
  "#ced4da",
  "#ff8787",
  "#f783ac",
  "#da77f2",
  "#9775fa",
  "#748ffc",
  "#4dabf7",
  "#3bc9db",
  "#38d9a9",
  "#69db7c",
  "#a9e34b",
  "#ffd43b",
  "#ffa94d",
];

export const randomColorGenerator = () => randomiseList(ACCENT_COLORS);

 