export const colors = {
  black: '#111111',
  lightGrey: '#d8dbde',
  gray: '#666666',
  white: '#fff',
  active: '#fdfdfd',
  jordyBlue: '#9caaff',
  indigo: '#1d2596',
  green: '#198754',
  whitesmoke: '#F5F5F5',
  lavenderBlush: '#f2f0f1',
  purple: '#49384a',
  lightGreen: '#b7ceaf',
  amber: '#ffc107',
  red: '#e90a32',
  cyanBlue: '#9caaff',
  limeGreen: '#36a817',
  navyBlue: '#3732d0',
  stateBlue: '#7B5DC6',
  safetyYellow: '#EAD10A',
  darkWine: '#351038',
  anchor: '#06001ec4',
  heavyGray: '#2d2d2e'
}

const sideMenu = {
  container: colors.white,
  border: '#e9edf4',
  anchor: {
    hover: '#6c5ffc'
  },
  menu: {
    background: colors.active
  },
  icon: {
    selected: colors.purple,
    normal: colors.gray
  }
}

const theme = {
  appBackground: '#dadcde',
  border: '  #e9edf4;',
  disabled: '#dddcde',
  hamburgerMenu: '#949292',
  login: {
    background: colors.white
  },
  tab: {
    border: '#989399'
  },
  switch: {
    selected: colors.purple,
    border: '#605860'
  },
  input: {
    border: '#ced4da',
    background: colors.white,
    color: '#6c757d',
    active: '#46a9d8',
    focus: colors.purple
  },
  register: {
    plan: {
      basic: '#0072ff',
      standard: '#0cf30c',
      premium: '#7a34d6'
    },
    subscription: {
      background: '#46a9d84d',
      color: '#0000FF'
    }
  },
  card: {
    background: '#655366',
    color: colors.white,
    border: colors.lightGrey,
    hover: '#55085C',
    title: {
      color: colors.gray
    }
  },
  button: {
    primary: colors.purple,
    light: '#f8f8f8',
    secondary: '#aca4ad',
    navigation: '#1d2596'
  },
  icon: {
    normal: '#6c757d'
  },
  sideMenu: sideMenu,
  dropDown: {
    background: colors.active,
    color: colors.black,
    error: `#dc3545`,
    success: colors.purple
  },
  table: {
    background: '#351038',
    secondary: '#605860',
    color: colors.white,
    border: '#e9edf4'
  },
  footer: {
    background: '#f0f3f5',
    text: '#dc143c'
  },
  back: {
    background: colors.white,
    hover: colors.active
  },
  list: {
    background: colors.white,
    hover: colors.active,
    border: colors.lightGrey
  },
  performanceCard: {
    circleBackground: '#f2f7f8',
    circle: '#655366',
    circleShadow: '#f2f7f8',
    yourScore: '#ffc107',
    classScore: '#6610f2',
    topperScore: '#e83e8c',
    scheduledTest: {
      background: '#351038',
      gradient: '#8480c7'
    },
    attemptedTest: {
      background: '#342020',
      gradient: '#605860'
    }
  },
  leaderBoard: {
    circleBackground: '#dcdbff',
    circle: colors.navyBlue,
    circleShadow: '#88ce76'
  },
  answer: {
    selected: '#c8f5b8',
    inCorrect: '#ed8ea0'
  },
  dasboard: {
    coachingCenter: colors.darkWine,
    branches: colors.anchor
  }
}

export default theme
