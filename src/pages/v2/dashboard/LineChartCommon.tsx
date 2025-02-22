import { useMemo, ReactElement } from 'react'
import ReactApexChart from 'react-apexcharts'

interface ApexChart10Props {
  completed: number[]
  skipped: number[]
}

const ApexChart10 = ({
  completed,
  skipped
}: ApexChart10Props): ReactElement => {
  const seriesOptions: any = useMemo(() => {
    return {
      series: [
        {
          name: 'Attempted Test',
          data: completed
        },
        {
          name: 'UnAttempted Test',
          data: skipped
        }
      ],
      options: {
        chart: {
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          zoom: {
            enabled: true
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],

        stroke: {
          curve: 'smooth'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        markers: {
          size: 1
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
            }
          },
          min: 10,
          max: 50
        },
        legend: {
          show: true,
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: 'Rubik'
        }
      }
    }
  }, [completed, skipped])

  return (
    <div id="chart" style={{ width: '100%' }}>
      <ReactApexChart
        options={seriesOptions.options}
        series={seriesOptions.series}
        height={380}
        width="100%"
        type="line"
      />
    </div>
  )
}

export default ApexChart10
