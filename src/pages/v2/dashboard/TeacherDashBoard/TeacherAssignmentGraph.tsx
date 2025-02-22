import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart5 = ({
  classAvg = [],
  topStudentAverage = [],
  categories = []
}: // Height,
// Width
any) => {
  const seriesOptions: any = useMemo(() => {
    return {
      series: [
        {
          name: 'Class Average',
          data: classAvg,
          color: '#66C4E2'
        },
        {
          name: ' Top Student Average',
          data: topStudentAverage,
          color: '#7C88FF'
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
            borderRadius: 3,
            horizontal: false,
            columnWidth: '50%'
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
          categories: categories,
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
  }, [classAvg, topStudentAverage, categories])

  return (
    <div id="chart" style={{ width: '100%', height: '100%' }}>
      <ReactApexChart
        options={seriesOptions.options}
        series={seriesOptions.series}
        height="100%"
        width="100%"
        type="bar"
      />
    </div>
  )
}

export default ApexChart5
