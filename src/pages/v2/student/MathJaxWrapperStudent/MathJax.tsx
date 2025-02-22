import { MathJaxContext, MathJax } from 'better-react-mathjax'

// Set up a default configuration for MathJax
const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]']
    ]
  },
  chtml: { displayAlign: 'center', scale: 1 } // Customize output settings
}

const MathJaxWrapperStudent = ({ children, dynamic = true }: any) => (
  <MathJaxContext version={3} config={mathJaxConfig}>
    <MathJax dynamic={dynamic}>{children}</MathJax>
  </MathJaxContext>
)

export default MathJaxWrapperStudent
