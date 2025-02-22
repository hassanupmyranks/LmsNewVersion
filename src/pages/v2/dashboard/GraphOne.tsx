import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const ApexChart1 = ({ TestCreated, TestSubmitted, Height, Width }: any) => {
  const seriesOptions: any = useMemo(() => {
    return {
      series: [
        { name: 'Test Created', data: TestCreated },
        { name: 'Test Submitted', data: TestSubmitted }
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: false
          }
        },
        colors: ['#1377B9', '#6AD2FF'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'category',
          categories: [
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC',
            'JAN',
            'FEB',
            'MAR'
          ],
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'DM Sans',
              colors: '#A3AED0'
            }
          }
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
  }, [TestCreated, TestSubmitted])

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

export default ApexChart1
