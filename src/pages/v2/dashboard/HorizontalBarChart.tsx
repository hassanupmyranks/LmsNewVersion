import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart2 = ({ Names, Count, Height, Width }: any) => {
  const chartData: any = useMemo(() => {
    return {
      series: [
        {
          data: Count
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 7,
            horizontal: true,
            barHeight: 15
          }
        },
        tooltip: {
          enabled: false
        },
        fill: {
          colors: ['#4CC9FF'],
          type: 'gradient',
          gradient: {
            gradientToColors: ['#62CDFB']
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: Names,
          labels: {
            show: false
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: ['#A3AED0'],
              fontSize: '18px',
              fontWeight: 500,
              fontFamily: 'DM Sans'
            }
          }
        },
        grid: {
          show: false
        },
        toolbar: {
          show: false
        }
      }
    }
  }, [Names, Count])

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={Height}
        width={Width}
      />
    </div>
  )
}

export default ApexChart2
