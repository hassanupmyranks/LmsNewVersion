// import React, { useMemo } from 'react'
// import ReactApexChart from 'react-apexcharts'

// const ApexChart4 = ({ percentages, DataRole }: any) => {
//   console.log(percentages, "[percentage]")

//   const chartData: any = useMemo(() => {
//     return {
//       series: [44, 55, 13, 43, 22],
//       options: {
//         chart: {
//           width: 380,
//           type: 'pie',
//         },
//         labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//         responsive: [{
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200
//             },
//             legend: {
//               position: 'bottom'
//             }
//           }
//         }],
//         dataLabels: {
//           enabled: true,  // Enable percentage display
//           style: {
//             fontSize: '14px',
//             fontWeight: 'bold',
//             colors: ['#fff'] // Set color to white for visibility
//           },
//           formatter: function (val: string) {
//             return `${val}%`; // Format as percentage
//           }
//         },
//         tooltip: {
//           enabled: true,
//           custom: function ({ series, seriesIndex, w }: any) {
//             // Tooltip will show the percentage
//             console.log(w)
//             const percentage = series[seriesIndex];
//             return `<div style="font-size: 14px; font-weight: 500; color: #0c0b0b; background-color: #04f5e9; width: 70px; display: flex; justify-content: center;">${percentage}%</div>`;
//           }
//         },
//         grid: {
//           show: false
//         },
//         toolbar: {
//           show: false
//         },
//         colors:
//           DataRole === 'instituteAdmin'
//             ? ['#88d6f8', '#1377B9']
//             : DataRole === 'branchAdmin'
//               ? ['#88d6f8', '#1377B9']
//               : ['#dee6e6f8', '#88d6f8', '#1377B9']
//       }
//     };
//   }, [ DataRole]);

//   return (
//     <div id="chart">
//       <ReactApexChart
//         options={chartData.options}
//         series={chartData.series}
//         type="pie"
//         width={110}
//         height={110}
//       />
//     </div>
//   )
// }

// export default ApexChart4

import React, { useState, useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'

const ApexChart4 = ({ percentages, DataRole }: any) => {
  // State for series and options
  console.log(percentages, DataRole, ' percentages, DataRole')
  const [series] = useState(percentages)
  const [labels] = useState(['Total scored', 'Remaining scored'])

  // UseMemo to compute options, useful if options are complex or need to be recomputed on state changes
  const options = useMemo(
    () => ({
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
          fontWeight: '100',
          colors: ['#024881']
        },
        formatter: function (val: string) {
          return `${val}%`
        }
      },
      colors: ['#93d9f7', '#03bff8'],
      chart: {
        width: 380,
        type: 'pie' as const
      },
      labels: labels,
      responsive: [
        {
          // breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }),
    [labels]
  ) // Recompute only when `labels` change (optional)

  return (
    <div>
      <ChartDiv id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={240}
        />
      </ChartDiv>
      <div id="html-dist"></div>
    </div>
  )
}

export default ApexChart4

export const ChartDiv = styled.div`
  .apexcharts-legend {
    top: 10px !important;
    padding: 0px !important;
    font-size: 10px !important;
  }
`
