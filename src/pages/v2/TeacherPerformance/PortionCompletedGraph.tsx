import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const PorstionCompletedGraph = ({ seriesData, labels, colors }: any) => {
  const chartData: any = useMemo(() => {
    return {
      series: seriesData,
      options: {
        chart: {
          type: 'pie'
        },
        labels: labels,
        colors: colors,
        dataLabels: {
          enabled: true,
          formatter: (val: number) => `${val}%`
        },
        tooltip: {
          y: {
            formatter: (val: number) => `${val}%`
          }
        },
        legend: {
          position: 'right'
        },
        plotOptions: {
          pie: {
            expandOnClick: false
          }
        }
      }
    }
  }, [seriesData, labels, colors])

  return (
    <div id="chart" style={{ height: '100%', width: '85%' }}>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height="400px"
      />
    </div>
  )
}

export default PorstionCompletedGraph
