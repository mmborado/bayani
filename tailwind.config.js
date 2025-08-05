import { gridAreas } from "tailwindcss-grid-areas";

module.exports = {
  content: ["./src/**/*.{njk,html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    gridAreas({
      header: {
        base: ["logo menu", "cta cta"],
        md: ["logo cta", "logo nav"],
      },
    }),
  ],
};
