import { HOST } from './determinelogo'

const determineHead = (host: any) => {
  switch (host?.toLocaleUpperCase()) {
    case HOST.DPS:
      return { title: 'DPS Bangalore', favicon: './dps.ico' }
    case HOST.FTS:
      return {
        title: 'Future Tech School',
        favicon: './future-tech-school.ico'
      }
    case HOST.ERP:
      return {
        title: 'Future Tech School',
        favicon: './future-tech-school.ico'
      }
    default:
      return {
        title: 'Future Tech School',
        favicon: './future-tech-school.ico'
      }
  }
}

export default determineHead
