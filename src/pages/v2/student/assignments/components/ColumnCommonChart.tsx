import { useMemo, ReactElement } from 'react'
import ReactApexChart from 'react-apexcharts'

const ColumnApexChart01 = ({ data, height }: any): ReactElement => {
  const maxNumber = Math.max(...data.flatMap((item: any) => item.data))
  const seriesOptions: any = useMemo(() => {
    return {
      series: data,
      options: {
        chart: {
          type: 'bar',
          zoom: {
            enabled: true
          },
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
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
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'Rubik',
              colors: '#686868'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'Rubik',
              colors: '#686868'
            },
            formatter: (value: number) => Math.round(value).toString()
          },
          min: 0,
          max: maxNumber ? maxNumber + 1 : 10
        },
        fill: {
          opacity: 1
        },
        legend: {
          show: true,
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: 'Rubik'
        },
        tooltip: {
          y: {
            formatter: function (val: string) {
              return val
            }
          }
        }
      }
    }
  }, [data, maxNumber])

  return (
    <div id="chart" style={{ width: '100%' }}>
      <ReactApexChart
        options={seriesOptions.options}
        series={seriesOptions.series}
        height={height}
        width="100%"
        type="bar"
      />
    </div>
  )
}

export default ColumnApexChart01
