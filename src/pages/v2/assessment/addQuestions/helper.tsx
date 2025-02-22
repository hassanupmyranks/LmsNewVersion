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

export const getReplaceInput = (data: string) => {
  let replacedData = data
  let count = 0 // Counter for input IDs

  // Regular expression to find all occurrences of <answer> in the string
  const regex = /<answer>/g

  // Replace all occurrences of <answer> with input fields
  replacedData = replacedData.replace(regex, () => {
    const inputField = `<input id="myInput${count}" class="replaceInput"/>`
    count++ // Increment count for the next input ID
    return inputField
  })

  return replacedData
}

// export const getReplaceInput = (data: string) => {
//   let replacedData = data

//   let inputField = `<input id="myInput" class="replaceInput"/>`

//   replacedData = replacedData.replace('<answer>', inputField)

//   return replacedData
// }
