import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const AnalyticChart = ({ Names, Count }: any) => {
  const chartData: any = useMemo(() => {
    return {
      series: Count,
      options: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: Names,
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'bottom',
          formatter: function (seriesName: any, opts: any) {
            // const capitalizedSeriesName =
            //   seriesName.charAt(0).toUpperCase() +
            //   seriesName.slice(1).toLowerCase()
            return `<span style ="color: #A3AED0; font-weight: 600; font-size:12px; margin-left: 6px;">${seriesName}</span>  :  <span style ="color: 
              #2B3674; font-weight: 600; font-size:12px;">${
                opts.w.globals.series[opts.seriesIndex]
              }</span>`
          }
        },
        tooltip: {
          enabled: true,
          custom: function ({ series, seriesIndex, w }: any) {
            const total = w.globals.series.reduce(
              (acc: number, val: number) => acc + val,
              0
            )
            const percentage = ((series[seriesIndex] / total) * 100).toFixed(2)
            return `<div style="font-size: 14px; font-weight: 500; color: #0c0b0b; background-color: #3caffc; width: 70px; display: flex; justify-content: center;">${percentage}%</div>`
          }
        },
        grid: {
          show: false
        },
        toolbar: {
          show: false
        },
        colors: ['#848beb', '#afe7f8', '#dae0e7']
      }
    }
  }, [Names, Count])

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={260}
        height={250}
      />
    </div>
  )
}

export default AnalyticChart
