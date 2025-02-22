import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'

const BarChart = ({
  classAverage,
  topStudentAverage,
  categories,
  totals
}: {
  classAverage: any[]
  topStudentAverage: any[]
  categories: any[]
  totals: any[]
}) => {
  const seriesOptions: any = useMemo(() => {
    return {
      series: [
        {
          name: 'Class Average',
          data: classAverage
        },
        {
          name: 'Top Student Average',
          data: topStudentAverage
        },
        {
          name: 'Total',
          data: totals
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
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 5,
            borderRadiusApplication: 'end'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: categories
        },
        // yaxis: {
        //   title: {
        //     text: '$ (thousands)'
        //   }
        // },
        fill: {
          opacity: 1
        }
        // tooltip: {
        //   y: {
        //     formatter: function (val: any) {
        //       return `$  ${val} thousands`
        //     }
        //   }
        // }
      }
    }
  }, [topStudentAverage, classAverage, categories, totals])

  console.log(classAverage, topStudentAverage)
  return (
    <BarChardiv id="chart" style={{ width: '100%', height: '420px' }}>
      <ReactApexChart
        options={seriesOptions.options}
        series={seriesOptions.series}
        height="100%"
        width="100%"
        type="bar"
      />
    </BarChardiv>
  )
}

export default BarChart

export const BarChardiv = styled.div`
  & text {
    width: 20px !important;
    overflow-wrap: break-word !important; /* This is the modern property for word wrapping */
    word-break: break-word !important; /* Optionally, use word-break to force word breaking */
  }

  & text title {
    width: 20px !important;
    overflow-wrap: break-word !important;
    word-break: break-word !important;
  }

  & text tspan {
    width: 20px !important;
    overflow-wrap: break-word !important;
    word-break: break-word !important;
  }
`
