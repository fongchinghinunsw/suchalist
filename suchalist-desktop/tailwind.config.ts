import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.drag-region': {
          '-webkit-app-region': 'drag'
        }
      });
    })
  ]
};

export default config;
