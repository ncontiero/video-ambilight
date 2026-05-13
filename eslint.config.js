import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
  ignores: ["nextjs"],
  tailwindcss: {
    cssGlobalPath: "./styles/input.css",
    overrides: {
      "tailwindcss/no-unknown-classes": ["warn", { ignore: ["github-button"] }],
    },
  },
});
