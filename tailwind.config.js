const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
],
  theme: {
    colors: {
      'cream': '#F1F5F9',
    },
    extend: {
      fontSize: {
        'custom-size': '4rem',
      },
      fontFamily: {
        Arizonia: ["Arizonia", "cursive"],
      },
    },
  },
  plugins: [require('flowbite/plugin'),],
});