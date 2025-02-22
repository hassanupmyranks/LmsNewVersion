import styled from 'styled-components'

export const CalenderContainer = styled.div`
  .react-calendar {
    background-color: #fff;
    border: 1px transparent;
    border-radius: 20px;
    box-shadow: 0px 7px 21px 0px #0000001a;
    padding: 12px;
    font-family: 'Rubik', sans-serif;
  }
  .react-calendar__navigation button {
    font-family: 'Rubik', sans-serif;
  }
  .react-calendar__month-view__weekdays__weekday {
    cursor: default;
    border: none;
    text-transform: capitalize;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    cursor: default;
    text-decoration: none;
    color: #8f9bb3;
    display: grid;
    place-content: center;
  }
  .react-calendar abbr {
    padding-top: 4px;
    display: grid;
    place-content: center;
  }
  .react-calendar button {
    display: grid;
    place-content: center;
    background-color: #fff;
    border: none;
    color: #222b45;
    padding: 2px 2px 0px;
    font-weight: 500;
    height: 42px;
  }
  .react-calendar__tile--active {
    background-color: #fff !important;
    display: grid;
    place-content: center;
  }
  .react-calendar__tile--active abbr {
    padding: 6px;
    background-color: #00ccff !important;
    color: #fff !important;
    border-radius: 12px !important;
    font-weight: 700;
    width: 28px;
    aspect-ratio: 1/1;
  }
  .react-calendar__month-view__days__day {
    position: relative;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #8f9bb3 !important ;
  }
`

export const ActiveDot = styled.div<{
  color: string
}>`
  height: 5px;
  width: 5px;
  border: 1.2px solid ${({ color }) => color};
  border-radius: 24px;
`

export const NavigationBtn = styled.div`
  width: 27px;
  aspect-ratio: 1/1;
  border: 1px solid #ced3de;
  display: grid;
  place-content: center;
  border-radius: 10px;
`
