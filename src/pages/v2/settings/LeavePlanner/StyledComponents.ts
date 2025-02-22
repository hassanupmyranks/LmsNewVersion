import styled from 'styled-components'
import { Blue, White } from '../../../../const/V2/stylingVariables'

export const MenuBar = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`
export const PageTitle = styled.h6`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.68px;
  margin-bottom: 0px;
  margin-right: 6px;

  @media (max-width: 992px) {
    font-size: 20px;
  }
`

export const Flex = styled.div`
  display: flex;
  width: 100%;

  /* @media (max-width: 1450px) {
    display: block;
  } */
`

// export const PageTitle = styled.h6`
//   color: ${Blue};
//   font-family: DM Sans;
//   font-size: 34px;
//   font-weight: 700;
//   letter-spacing: -0.68px;
//   margin-bottom: 0px;
//   margin-right: 6px;

//   @media (max-width: 992px) {
//     font-size: 20px;
//   }
// `

export const Box = styled.div`
  height: 90%;
  /* width: 25%; */
  border: 2px solid #e0e5f2;
  border-radius: 10px;
  padding: 20px;
  min-width: 345px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Blue};
  font-family: 'DM Sans';
`
export const ButtonAllign = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`
export const CustomCalendar = styled.div`
  .react-calendar {
    border: none; /* Remove default border */
    height: 100%;
    width: 100%;
    /* background-color: #f5f5f5; Custom background for the entire calendar */
    /* border-radius: 8px; */
    /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
    /* padding: 10px; */
  }

  /* Month navigation styling */
  .react-calendar__navigation {
    background-color: #197bbd; /* Change background color of month navigation */
    border-radius: 10px;
    /* padding: 8px; */
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    height: 63px;
  }

  .react-calendar__navigation button {
    /* height: 100%; */
    color: white; /* Change text color for navigation buttons */
    font-weight: bold;
    font-size: 22px;
    background-color: #197bbd; /* Hover effect for navigation buttons */
    border-style: none;
    border-radius: 10px;
    width: 63px;
  }

  .react-calendar__navigation button:hover {
    background-color: white; /* Hover effect for navigation buttons */
    color: #197bbd;
    border: 2px solid #197bbd;
  }

  /* Styling the month and year text */
  /* .react-calendar__navigation__label {
    font-size: 10px;
    font-weight: bold;
    color:rgb(221, 21, 21); 
    Text color for month/year label
  } */

  /* Weekday names styling (e.g., Mon, Tue) */
  .react-calendar__month-view__weekdays {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    color: rgb(18, 109, 170); /* background-color:rgb(142, 248, 248); */
  }

  .react-calendar__month-view__weekdays__weekday {
    height: 63px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    border-color: #e6eaeb;
    background-color: rgb(142, 206, 248);
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none; /* Removes the dotted underline */
    cursor: default; /* Optional: change cursor to default */
  }

  /* Dates styling */
  .react-calendar__tile {
    height: 63px;
    font-size: 14px;
    color: #0078d7; /* Default date font color */
    font-weight: bold;
    background-color: transparent;
    border-radius: 6px;
    padding: 10px;
    /* transition: background-color 0.2s, color 0.2s; */
    border-color: #e6eaeb;
  }

  .react-calendar__tile:enabled:hover {
    background-color: rgb(191, 238, 250); /* Hover background color for dates */
    color: #004d99;
    /* Hover font color for dates */
  }

  .react-calendar__tile--active {
    background-color: rgb(21, 217, 231);
    /* Active date background color */
    color: #fff;
    /* Active date font color */
  }

  /* .react-calendar__tile--active:hover {
    background-color:rgb(201, 235, 9); 
    Hover effect for active date
  } */

  /* Disabled dates */
  /* .react-calendar__tile--disabled {
    background-color: #f5f5f5;
    color: #197bbd;
    cursor: not-allowed;
  } */
`
export const AddHolidayWrapper = styled.div`
  /* display: flex;
flex-direction: column;
justify-content: center;
align-content: space-evenly; */
  height: 470px;
  width: 50%;
  background-color: ${White};
  border-radius: 1rem;
  padding: 25px;

  @media (max-width: 1280px) {
    /* width: 48%; */
    padding: 14px;
  }

  @media (max-width: 768px) {
    /* width: 100%; */
    padding: 10px;
  }
`
