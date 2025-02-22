import { HOST } from './determinelogo'

const determineTheme = (host: any) => {
  let theme
  switch (host?.toLocaleUpperCase()) {
    case HOST.DPS:
      theme = {
        primaryColor: '#458D66',
        linearGradient: 'linear-gradient(195deg, #458d66, #44c781)'
      }
      break
    case HOST.FTS:
      theme = {
        primaryColor: '#811d88',
        linearGradient: 'linear-gradient(195deg, #811d88, #533355)'
      }
      break
    default:
      return (theme = {
        primaryColor: '#811d88',
        linearGradient: 'linear-gradient(195deg, #811d88, #533355)'
      })
  }
  return theme
}

export default determineTheme
