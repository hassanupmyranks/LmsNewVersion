export const deepCloneData = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}
