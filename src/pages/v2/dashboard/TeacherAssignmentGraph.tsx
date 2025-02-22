import { useEffect, useMemo, useRef } from 'react'
import ReactApexChart from 'react-apexcharts'

interface DataItem {
  year: number
  month: number
  avgData: {
    classAverage: number
    topStudentAvg: number
    topStudent?: {
      name: string
      batch: string
    }
  }
}

const TeacherAssignmentGraph = ({ inputData }: { inputData: DataItem[] }) => {
  const monthNames = useMemo(
    () => [
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
    []
  )

  const categories = useMemo(() => {
    return inputData.map((item) => monthNames[item?.month - 1] || '')
  }, [inputData, monthNames])

  const classAverages = useMemo(() => {
    return inputData.map((item) => item?.avgData?.classAverage)
  }, [inputData])

  const topStudentAverages = useMemo(() => {
    return inputData.map((item) => item?.avgData?.topStudentAvg)
  }, [inputData])

  const tooltipsRef = useRef<any[]>([])

  useEffect(() => {
    tooltipsRef.current = inputData.map((item) => {
      const topStudent = item.avgData?.topStudent
      return {
        topStudent: topStudent
          ? `Name: ${topStudent.name || 'None'}<br>Batch: ${
              topStudent.batch || 'None'
            }`
          : 'None',
        classAverage: topStudent?.batch || 'None'
      }
    })
  }, [inputData])

  const seriesOptions: any = useMemo(() => {
    return {
      series: [
        {
          name: 'Class Average',
          data: classAverages,
          color: '#66C4E2'
        },
        {
          name: 'Top Student Avg',
          data: topStudentAverages,
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
          categories,
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
          custom: function ({ seriesIndex, dataPointIndex }: any) {
            const tooltip = tooltipsRef.current[dataPointIndex]

            if (!tooltip) {
              return '<div style="padding: 5px; font-size: 12px; color: #999;">No Data Available</div>'
            }

            if (seriesIndex === 0 && tooltip.classAverage) {
              return `<div style="padding: 5px; font-size: 12px; color: #333;">
                <strong>Class Average Batch:</strong> ${tooltip.classAverage}
              </div>`
            }

            if (seriesIndex === 1 && tooltip.topStudent) {
              return `<div style="padding: 5px; font-size: 12px; color: #333;">
                <strong>Top Student:</strong> ${tooltip.topStudent}
              </div>`
            }

            return '<div style="padding: 5px; font-size: 12px; color: #999;">No Data Available</div>'
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
  }, [categories, classAverages, topStudentAverages])

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

export default TeacherAssignmentGraph
