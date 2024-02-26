const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'cream': '#F1F5F9',
    },
    extend: {
      fontSize: {
        'custom-size': '4rem',
      },
    },
  },
  plugins: [],
});
