import { SolutionImageDetails } from '../../../../utils/types'

export const getReplaceImage = (data: string, solutionImage: any) => {
  let replacedData = data
  solutionImage?.map(async (item: SolutionImageDetails) => {
    const imgURL = item.url
    const image = await fetch(imgURL)
    const imageBlob = await image.blob()
    const blobUrl = URL.createObjectURL(imageBlob)
    replacedData = replacedData.replace(item._id, blobUrl)
  })

  return replacedData
}
