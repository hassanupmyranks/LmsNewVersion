import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart9 = ({ TestSubmitted, Height, Width }: any) => {
  const seriesOptions: any = useMemo(() => {
    return {
      series: [{ data: TestSubmitted, color: '#4EF5FA' }],
      options: {
        chart: {
          type: 'line',
          toolbar: {
            show: false
          }
        },
        colors: ['#4EF5FA'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          show: false,
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          labels: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        },
        labels: {
          show: false
        },
        yaxis: {
          show: false
        },
        grid: {
          show: false
        },
        legend: {
          show: false
        }
      }
    }
  }, [TestSubmitted])

  return (
    <div id="chart">
      <ReactApexChart
        options={seriesOptions.options}
        series={seriesOptions.series}
        height={Height}
        width={Width}
        type="area"
      />
    </div>
  )
}

export default ApexChart9
