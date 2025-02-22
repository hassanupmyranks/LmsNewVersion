import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart7 = ({ Count, Color, BackColor, Height, Width }: any) => {
  const chartData: any = useMemo(() => {
    return {
      series: [Count],
      options: {
        chart: {
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: '35%',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: false
              }
            },
            track: {
              background: BackColor,
              strokeWidth: '100%',
              margin: 0,
              dropShadow: {
                enabled: false
              }
            },
            dataLabels: {
              show: false
            }
          }
        },
        fill: {
          type: 'solid',
          colors: [Color]
        },
        stroke: {
          lineCap: 'round'
        }
      }
    }
  }, [Count, BackColor, Color])

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        width={Width}
        height={Height}
      />
    </div>
  )
}

export default ApexChart7
