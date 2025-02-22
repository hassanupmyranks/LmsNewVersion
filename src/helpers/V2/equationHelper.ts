export function wrapEquationsWithSpan(htmlContent: any) {
  // Define a regular expression to match the {tex}...{/tex} patterns
  const equationRegExp = /\{tex\}.*?\{\/tex\}/g

  // Use the regular expression to find matches and replace them with the span tag

  // return htmlContent.replace(equationRegExp, (_: any, p1: any) => {
  //   // p1 is the content inside the {tex}...{/tex} tags
  //   return `<span class="math inline">{tex}${p1}{/tex}</span>`
  // })

  return htmlContent?.replace(equationRegExp, (match: any) => {
    // Extract the equation part without the {tex} and {/tex} delimiters
    const equationPart = match.replace(/\{tex\}/, '').replace(/\{\/tex\}/, '')

    // Return the equation wrapped with the span tag and $ signs for inline math
    return `<span class="math inline">$${equationPart}$</span>`
  })
}
