import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
  tailwindcss: {
    cssGlobalPath: "./styles/input.css",
    overrides: { "tailwindcss/no-unknown-classes": "off" },
  },
});
