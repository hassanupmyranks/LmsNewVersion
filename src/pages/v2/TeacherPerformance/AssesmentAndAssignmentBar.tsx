import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const AssesmentAndAssignmentBarGraph = ({ data, height = 400 }: any) => {
  const seriesOptions: any = useMemo(() => {
    return {
      series: [
        {
          name: 'Percentage',
          data: data.map((item: any) => item.value)
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 3,
            horizontal: false,
            columnWidth: '50%'
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: data.map((item: any) => item.name),
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'Rubik',
              colors: '#C1C4CB'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Rubik',
              colors: '#C1C4CB'
            }
          },
          max: 100
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return `${val}%`
            }
          }
        },
        legend: {
          show: false
        }
      }
    }
  }, [data, height])

  return (
    <div id="chart" style={{ width: '100%' }}>
      <ReactApexChart
        options={seriesOptions.options}
        series={seriesOptions.series}
        height={height}
        type="bar"
      />
    </div>
  )
}

export default AssesmentAndAssignmentBarGraph
