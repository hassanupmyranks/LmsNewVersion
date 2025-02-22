import DPSLOGO from '../../assets/dps.png'
import FUTURETECLOGO from '../../assets/LoginLogo.png'

/* eslint-disable no-unused-vars */
export enum HOST {
  DPS = 'DPS',
  FTS = 'FTS',
  ERP = 'ERP'
}

const determineLogo = (type: any) => {
  switch (type) {
    case HOST.DPS:
      return DPSLOGO
    case HOST.FTS:
      return FUTURETECLOGO
    default:
      return FUTURETECLOGO
  }
}

export default determineLogo
