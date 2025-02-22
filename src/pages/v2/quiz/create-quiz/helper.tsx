import { SolutionImageDetails } from '../../../../utils/types'

export const getReplaceImage = (data: string, solutionImage: any) => {
  let replacedData = data
  solutionImage?.map((item: SolutionImageDetails) => {
    replacedData = replacedData.replace(item._id, item.url)
  })

  return replacedData
}

export const deepClone = (obj: [] | Object) => {
  return JSON.parse(JSON.stringify(obj))
}

export const getNumber = (value: number) => {
  return value > 500 ? '500+' : value
}
