import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart8 = ({
  Count,
  Height,
  Width,
  Size,
  Color,
  FontSize,
  StartAngle,
  EndAngle
}: any) => {
  const chartData: any = useMemo(() => {
    return {
      series: [Count],
      options: {
        chart: {
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: StartAngle,
            endAngle: EndAngle,
            hollow: {
              margin: 0,
              size: `${Size}%`,
              background: 'none',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: false
              }
            },
            track: {
              background: '#F1F2EF',
              strokeWidth: '100%',
              margin: 0,
              dropShadow: {
                enabled: false
              }
            },

            dataLabels: {
              show: true,
              name: {
                show: false
              },
              value: {
                show: true,
                offsetY: 4,
                formatter: function (val: any) {
                  return `${parseInt(val, 10)}%`
                },
                color: '#0A0A0A',
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: `${FontSize}px`
              }
            }
          }
        },
        fill: {
          type: 'solid',
          colors: [`${Color}`]
        },
        stroke: {
          lineCap: 'round'
        }
      }
    }
  }, [Count, Color, Size, FontSize, StartAngle, EndAngle])

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

export default ApexChart8
