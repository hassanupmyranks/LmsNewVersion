// import React from 'react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// const HtmlToPdf = ({ elementRef }: any) => {
//   const [loading, setLoading] = React.useState(false)

//   const generatePdf = async (canvases: HTMLCanvasElement[]) => {
//     try {
//       const pdf = new jsPDF()
//       canvases.forEach((canvas, index) => {
//         if (index !== 0) {
//           pdf.addPage()
//         }
//         const imgData = canvas.toDataURL('image/png')
//         pdf.addImage(
//           imgData,
//           'PNG',
//           0,
//           0,
//           pdf.internal.pageSize.getWidth(),
//           pdf.internal.pageSize.getHeight(),
//           undefined,
//           'SLOW'
//         )
//       })
//       return pdf
//     } catch (error) {
//       console.error('Error generating PDF:', error)
//       throw error
//     }
//   }

//   const captureElement = async () => {
//     if (elementRef.current) {
//       setLoading(true)
//       const element = elementRef.current

//       // Calculate total height of the content
//       const totalHeight = element.scrollHeight

//       const canvases: HTMLCanvasElement[] = []
//       let currentPosition = 0
//       const pageSize = 800 // A4 height in pixels

//       // Capture the content in sections until all content is captured
//       while (currentPosition < totalHeight) {
//         const canvasHeight = Math.min(pageSize, totalHeight - currentPosition)
//         const canvas = await html2canvas(element, {
//           useCORS: true,
//           allowTaint: false,
//           imageTimeout: 150000,
//           logging: true,
//           windowHeight: canvasHeight,
//           width: element.clientWidth,
//           height: canvasHeight,
//           y: currentPosition,
//           scale: 3 // Adjust the scale value to increase DPI
//         })
//         canvases.push(canvas)
//         currentPosition += pageSize
//       }

//       try {
//         const pdf = await generatePdf(canvases)
//         pdf.save('question.pdf')
//       } catch (error) {
//         console.error('Error generating PDF:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   return (
//     <div>
//       <button onClick={captureElement} disabled={loading}>
//         {loading ? 'Generating PDF...' : 'Download PDF'}
//       </button>
//     </div>
//   )
// }

// export default HtmlToPdf
// import React from 'react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// const HtmlToPdf = ({ elementRef }: any) => {
//   const [loading, setLoading] = React.useState(false)

//   const generatePdf = async (canvases: HTMLCanvasElement[]) => {
//     try {
//       const pdf = new jsPDF()
//       canvases.forEach((canvas, index) => {
//         if (index !== 0) {
//           pdf.addPage()
//         }
//         const imgData = canvas.toDataURL('image/png')
//         if (index === canvases.length - 1) {
//           pdf.addImage(imgData, 'PNG', 10, 0, 210, 100, undefined, 'SLOW')
//         } else {
//           pdf.addImage(
//             imgData,
//             'PNG',
//             10,
//             0,
//             pdf.internal.pageSize.getWidth(),
//             pdf.internal.pageSize.getHeight(),
//             undefined,
//             'SLOW'
//           )
//         }
//       })
//       return pdf
//     } catch (error) {
//       console.error('Error generating PDF:', error)
//       throw error
//     }
//   }

//   const captureElement = async () => {
//     if (elementRef.current) {
//       setLoading(true)
//       const element = elementRef.current

//       // Calculate total height of the content
//       const totalHeight = element.scrollHeight

//       const canvases: HTMLCanvasElement[] = []
//       let currentPosition = 0
//       const pageSize = 800 // A4 height in pixels

//       // Capture the content in sections until all content is captured
//       while (currentPosition < totalHeight) {
//         let canvasHeight = Math.min(pageSize, totalHeight - currentPosition)

//         // Decrease the canvas height for the last page to avoid elongated images
//         if (currentPosition + pageSize >= totalHeight) {
//           canvasHeight = totalHeight - currentPosition
//         }

//         const canvas = await html2canvas(element, {
//           useCORS: true,
//           allowTaint: false,
//           imageTimeout: 150000,
//           logging: true,
//           windowHeight: canvasHeight,
//           width: element.clientWidth,
//           height: canvasHeight,
//           y: currentPosition,
//           scale: 3 // Adjust the scale value to increase DPI
//         })

//         canvases.push(canvas)

//         currentPosition += pageSize
//       }

//       try {
//         const pdf = await generatePdf(canvases)
//         pdf.save('question.pdf')
//       } catch (error) {
//         console.error('Error generating PDF:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   return (
//     <div>
//       <button onClick={captureElement} disabled={loading}>
//         {loading ? 'Generating PDF...' : 'Download PDF'}
//       </button>
//     </div>
//   )
// }

// export default HtmlToPdf
import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const HtmlToPdf = ({ elementRef }: any) => {
  const [loading, setLoading] = React.useState(false)

  const generatePdf = async (canvases: HTMLCanvasElement[], margin: number) => {
    try {
      const pdf = new jsPDF()
      canvases.forEach((canvas, index) => {
        if (index !== 0) {
          pdf.addPage()
        }
        const imgData = canvas.toDataURL('image/png')
        // Adjusting the position and size to include margin
        const marginLeft = margin
        const marginTop = margin
        // const width = pdf.internal.pageSize.getWidth() - 2 * margin
        // const height = pdf.internal.pageSize.getHeight() - 2 * margin
        const width = 230 - 2 * margin
        const height = 270 - 2 * margin
        pdf.addImage(
          imgData,
          'PNG',
          marginLeft,
          marginTop,
          width,
          height,
          undefined,
          'SLOW'
        )
      })
      return pdf
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    }
  }

  const captureElement = async () => {
    if (elementRef.current) {
      setLoading(true)
      const element = elementRef.current

      // Calculate total height of the content
      const totalHeight = element.scrollHeight

      const canvases: HTMLCanvasElement[] = []
      let currentPosition = 0
      const pageSize = 800 // A4 height in pixels
      const margin = 10 // Margin size in pixels

      // Capture the content in sections until all content is captured
      while (currentPosition < totalHeight) {
        let canvasHeight = Math.min(pageSize, totalHeight - currentPosition)

        // Decrease the canvas height for the last page to avoid elongated images
        if (currentPosition + pageSize >= totalHeight) {
          canvasHeight = totalHeight - currentPosition
        }

        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: false,
          imageTimeout: 150000,
          logging: true,
          windowHeight: canvasHeight,
          width: element.clientWidth,
          height: canvasHeight,
          y: currentPosition,
          scale: 3 // Adjust the scale value to increase DPI
        })

        canvases.push(canvas)

        currentPosition += pageSize
      }

      try {
        const pdf = await generatePdf(canvases, margin)
        pdf.save('Quiz question.pdf')
      } catch (error) {
        console.error('Error generating PDF:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <button onClick={captureElement} disabled={loading}>
        {loading ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  )
}

export default HtmlToPdf
