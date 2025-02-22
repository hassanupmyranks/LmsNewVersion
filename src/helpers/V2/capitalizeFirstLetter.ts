export function capitalizeFirstLetter(str: string) {
  // Split the string into words
  let words = str.split(' ')

  // Capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
  }

  // Join the words back into a string
  return words.join(' ')
}
