import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'
import { CustomCalendar } from './StyledComponents'

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 60%;
  margin-bottom: 20px;
`

export const LeaveType = styled.div`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #055d86;
  background-color: #1eddf7;
  padding: 2px 5px;
  border-radius: 4px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative; /* For positioning the tooltip */

  &:hover::after {
    content: attr(data-tooltip);
    position: fixed; /* Make it relative to the LeaveType element */
    top: 25%;
    left: 60%;
    background-color: #0a89dd; /* Tooltip background color */
    color: white; /* Tooltip text color */
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 10px;
    white-space: nowrap; /* Prevent wrapping */
    z-index: 1000; /* Ensure the tooltip appears above other elements */
    opacity: 1;
    visibility: visible;
    margin-top: 4px; /* Add some spacing below the holiday type */
  }

  /* &:hover::after {
    content: attr(data-tooltip); 
    Use the leaveType as tooltip text
    position: fixed;
    bottom: 90%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #0a89dd;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 10px;
    white-space: nowrap;
    z-index: 1000;
    opacity: 1;
    visibility: visible;
  } */

  &:hover {
    cursor: pointer;
  }

  &::after {
    content: '';
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out;
  }
`

const LeaveCalendar = ({ leaveData }: any) => {
  // Function to render content inside each tile
  const renderTileContent = ({ date, view }: any) => {
    if (view === 'month') {
      const leave = leaveData.find(
        (leave: any) =>
          new Date(leave.date).toDateString() === date.toDateString()
      )
      if (leave) {
        return (
          <LeaveType data-tooltip={leave.leaveType}>
            {leave.leaveType}
          </LeaveType>
        )
      }
    }
    return null
  }

  return (
    <CalendarContainer>
      <CustomCalendar>
        <Calendar tileContent={renderTileContent} />
      </CustomCalendar>
    </CalendarContainer>
  )
}

export default LeaveCalendar
