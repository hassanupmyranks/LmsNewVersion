import { PRODUCT_TYPE } from '../../utils/env'
import { HOST } from './Hosts'

export const getThemeDetails = () => {
  switch (PRODUCT_TYPE) {
    case HOST.DPS:
      return {
        primaryColor: '#458D66',
        linearGradient: 'linear-gradient(195deg, #458d66, #44c781)'
      }
    case HOST.FTS:
      return {
        primaryColor: '#197BBD',
        linearGradient: 'linear-gradient(195deg, #811d88, #533355)'
      }
    default:
      return {
        primaryColor: '#197BBD',
        linearGradient: 'linear-gradient(195deg, #811d88, #533355)'
      }
  }
}
