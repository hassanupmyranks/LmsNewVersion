import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts' // Import ApexOptions for type safety

interface PerformanceChartProps {
  performancePercentage: { classAvg?: any }
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  performancePercentage
}) => {
  const Height = 300 // Example height for the chart
  const Width = 300 // Example width for the chart

  // Extract classAverage safely, default to 0 if undefined
  const classAverage = performancePercentage.classAvg ?? 0

  const chartOptions: { options: ApexOptions; series: number[] } =
    useMemo(() => {
      return {
        series: [classAverage],
        options: {
          chart: {
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              startAngle: 0,
              endAngle: 360,
              hollow: {
                size: '30%'
              },
              track: {
                background: '#E0E0E0'
              },
              dataLabels: {
                name: {
                  show: true,
                  fontSize: '12px',
                  fontWeight: 600,
                  offsetY: 10,
                  color: '#333',
                  formatter: () => 'Class Average'
                },
                value: {
                  show: true,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#000',
                  formatter: (val) => `${val}%`
                }
              }
            }
          },
          fill: {
            type: 'solid',
            colors: ['#4EF5FA']
          },
          stroke: {
            lineCap: 'round'
          },
          tooltip: {
            enabled: true,
            // y: {
            //   formatter: (val) => `Class Average: ${val}%`
            // }
            custom: ({ series, seriesIndex }) =>
              `<div style="padding: 5px; font-size: 14px;">Class Average: ${series[seriesIndex]}%</div>`
          }
        } as ApexOptions
      }
    }, [classAverage])

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        height={Height}
        width={Width}
        type="radialBar"
      />
    </div>
  )
}

export default PerformanceChart

// import { useMemo } from 'react'
// import ReactApexChart from 'react-apexcharts'

// const PerformanceChart = () => {
//   const Height = 200 // Example height for the chart
//   const Width = 200 // Example width for the chart

//   // Move TestSubmitted into its own useMemo to avoid triggering re-renders
//   const TestSubmitted = useMemo(() => [30, 70], [])

//   const seriesOptions: any = useMemo(() => {
//     return {
//       series: TestSubmitted,
//       options: {
//         chart: {
//           type: 'donut'
//         },
//         labels: ['Completed', 'Remaining'],
//         colors: ['#4EF5FA', '#A88CED'],
//         dataLabels: {
//           enabled: false
//         },
//         plotOptions: {
//           pie: {
//             expandOnClick: false,
//             donut: {
//               size: '40%',
//               labels: {
//                 show: true,
//                 name: {
//                   show: true,
//                   fontSize: '18px',
//                   fontWeight: 'bold',
//                   color: '#333',
//                   offsetY: -10,
//                   formatter: () => 'Class Avg'
//                 },
//                 value: {
//                   show: true,
//                   fontSize: '20px',
//                   fontWeight: 'bold',
//                   color: '#333',
//                   offsetY: 10,
//                   formatter: () => `${TestSubmitted[0]}%`
//                 }
//               }
//             }
//           }
//         },
//         tooltip: {
//           enabled: false
//         },
//         legend: {
//           show: false
//         }
//       }
//     }
//   }, [TestSubmitted])

//   return (
//     <div id="chart">
//       <ReactApexChart
//         options={seriesOptions.options}
//         series={seriesOptions.series}
//         height={Height}
//         width={Width}
//         type="donut"
//       />
//     </div>
//   )
// }

// export default PerformanceChart
