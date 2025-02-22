import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart6 = ({ TestCreated, TestSubmitted }: any) => {
  const seriesOptions: any = useMemo(() => {
    return {
      series: [
        { name: 'My Custom Test', data: TestCreated, color: '#66C4E2' },
        { name: 'Test by Teacher', data: TestSubmitted, color: '#7C88FF' }
      ],
      options: {
        chart: {
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 3,
            horizontal: false
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
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar'
          ],
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'Rubik',
              colors: '#686868',
              marginRight: '3px'
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
            }
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val
            }
          }
        },
        legend: {
          show: true,
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: 'Rubik',
          labels: {
            colors: ['#7a86a1', '#7a86a1'],
            useSeriesColors: false
          }
        }
      }
    }
  }, [TestCreated, TestSubmitted])

  return (
    <div id="chart">
      <ReactApexChart
        options={seriesOptions.options}
        series={seriesOptions.series}
        height={380}
        width="100%"
        type="bar"
      />
    </div>
  )
}

export default ApexChart6
