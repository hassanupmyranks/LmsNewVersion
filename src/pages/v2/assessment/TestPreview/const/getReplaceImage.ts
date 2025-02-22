import { SolutionImageDetails } from './../../../../../utils/types'

export const getReplaceImage = (data: any, solutionImage: any) => {
  let replacedData = data
  solutionImage?.map((item: SolutionImageDetails) => {
    replacedData = replacedData.replace(item._id, item.url)
  })

  return replacedData
}
