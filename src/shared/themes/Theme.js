const darkTheme = {};

const defaultTheme = {
  bg: '#F8F3EB', //figma Bg

  black: '#1E1D1D', //figma Black
  white: '#FFFEFC', //figma White

  main1: '#FF7A00', //figma Point color
  main2: '#FF9B25', //figma Main
  main3: '#FFAF51',
  main4: '#FFC076',

  sub1: '#74706A', //figma Dark Grey
  sub2: '#95918C', //figma Mid Grey
  sub3: '#B9B5B1', //figma Grey
  sub4: '#EBE5DD', //figma Light Grey
  sub5: '#E8E1D8', //figma Warm Grey

  warning: '#EA4713',
  inactive: '#F5AE6C',

  device: {
    PC: `screen and (min-width: 768px)`,
  },

  style: {
    width: '45rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

const Theme = {
  defaultTheme,
  darkTheme,
};

export default Theme;
