import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import { PercentageLable } from '../StudentPerformance/StyledComponent'

const MissedSessionRadialbar = ({
  TotalCount,
  MissedCound,
  Percentage,
  Grade
}: any) => {
  const chartData: any = useMemo(() => {
    return {
      series: [Percentage],
      options: {
        chart: {
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: '35%',
              position: 'front',
              dropShadow: {
                enabled: false
              }
            },
            track: {
              background: '#E0E0E0',
              strokeWidth: '100%',
              margin: 0,
              dropShadow: {
                enabled: false
              }
            },
            dataLabels: {
              show: false
            }
          }
        },
        fill: {
          type: 'solid',
          colors: ['#FF4560']
        },
        stroke: {
          lineCap: 'round'
        },
        tooltip: {
          enabled: true,
          shared: false,
          custom: ({ series }: any) => `${Grade}: ${series[0]}`
        }
      }
    }
  }, [Percentage, Grade])

  return (
    <Container>
      <div style={{ position: 'relative', width: '250px', height: '250px' }}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="radialBar"
          width="100%"
          height="100%"
        />
        <CenteredGrade>{Grade}</CenteredGrade>
      </div>
      <PercentageLable>Missed Sessions: {MissedCound}</PercentageLable>
      <PercentageLable>OverAllSession: {TotalCount}</PercentageLable>
    </Container>
  )
}

export default MissedSessionRadialbar
const CenteredGrade = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #333;
  pointer-events: none;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: auto;
`
