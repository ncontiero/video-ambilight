import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
  tailwindcss: {
    overrides: { "tailwindcss/no-unknown-classes": "off" },
  },
});
