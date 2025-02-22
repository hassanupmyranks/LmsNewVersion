import styled from 'styled-components'

export const Percentage = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
`
export const Description = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
`
export const Main = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  height: 92px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  margin: 10px;
`
export const TopSkillButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  width: 100px;
  border-radius: 17px;
  background-image: linear-gradient(to right, #e7a4f5, #db5ab4);
  box-shadow: 0 0 8px #e7a4f5;
`
export const ButtonText = styled.div`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 14px;
  color: white;
`
export const ButtonCircle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 2px solid #bda0b4;
  font-weight: 500;
  font-size: 10px;
  color: white;
  margin-left: 6px;
  background-image: linear-gradient(to right, #db5ab4, #e7a4f5);
`
