import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart3 = ({ Count, Months, width }: any) => {
  const chartData: any = useMemo(() => {
    return {
      series: [{ name: 'Students', data: Count }],
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
            borderRadius: 5,
            horizontal: false,
            columnWidth: '30px' // or a specific pixel value like '30px'
          }
        },
        tooltip: {
          enabled: true
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: Months,
          labels: {
            show: true,
            style: {
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'DM Sans',
              colors: '#B0BBD5'
            }
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
            show: true,
            style: {
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'DM Sans',
              colors: '#B0BBD5'
            }
          }
        },
        // grid: {
        //   show: false
        // },
        toolbar: {
          show: false
        },
        fill: {
          colors: ['#5ebcfc'],
          type: 'gradient',
          gradient: {
            type: 'vertical',
            gradientToColors: ['#1376B9'],
            opacityTo: 1
          }
        }
      }
    }
  }, [Count, Months])

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={250}
        width={width >= 1200 ? 550 : '100%'}
      />
    </div>
  )
}

export default ApexChart3
