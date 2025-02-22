import styled from 'styled-components'
import { Button, Form } from 'react-bootstrap'

import {
  Blue,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { getThemeDetails } from '../../../helpers/V2/getThemeDetails'
import fonts, { weight } from '../../../const/V2/fonts'

export interface LoginProps {
  height?: boolean
}

export const FormContainer = styled(Form)`
  margin-left: 20%;
  margin-top: 20%;
  width: 60%;
  display: flex;
  flex-direction: column;

  #form-input {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

    ::placeholder {
      font-size: ${fonts.medium}px;
    }
  }
  .form-control:focus {
    box-shadow: none;
    border-color: lightgray;
    background-color: white !important;
  }

  @media (max-width: 1000px) {
    margin-left: 0%;
    margin-top: 0%;
    width: 100%;
    padding: 30px;
  }
`
export const LogoWrapper = styled.div`
  width: 140px;
  height: 40%;
  display: flex;
`
export const Logo = styled.img`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  object-fit: cover;
`
export const Title = styled.h1`
  font-family: 'DM Sans';
  color: #2b3674;
  margin-top: 10px;
  font-size: ${fonts.xxLarge}px;
  font-weight: ${weight.xxBold};
  line-height: 1;
`
export const Content = styled.p`
  font-family: 'DM Sans';
  color: #aeaeb4;
  margin-top: 1px;
  font-size: 10px;
  font-weight: 5px;
  line-height: 0.5;
`
export const Check = styled.div`
  width: 100%;
  height: 5%;
  position: relative;
  height: 50px;
`
export const Forgot1 = styled.span`
  margin-left: 1%;
  color: #2b3674;
  cursor: pointer;
  font-size: ${fonts.tiny}px;

  font-family: 'DM Sans';
  position: absolute;
  left: 2;
  top: 20%;
  transform: translateY(-50%);
`
export const Forgot = styled.span`
  color: #197bbd;
  cursor: pointer;
  font-size: ${fonts.tiny}px;
  font-weight: ${weight.medium};
  font-family: 'DM Sans';
  position: absolute;
  right: 0;
  top: 20%;
  transform: translateY(-50%);
`
export const LoginButton = styled(Button)`
  margin: auto;
  border: none;
  width: 100%;
`
export const Image = styled.img`
  width: 100%;
  height: 100vh;

  object-fit: cover;

  @media (max-width: 1000px) {
    height: auto;
  }
`

export const Footer = styled.div`
  width: auto;
  height: auto;

  margin-bottom: 0%;

  color: #a2a2b9;
  font-size: ${fonts.medium}px;
  font-weight: ${weight.normal};
  transform: translate(30%, 800%);
  @media (min-width: 2500px) {
    transform: translate(30%, 1900%);
  }
  @media (max-width: 1600px) and (max-height: 1000px) {
    transform: translate(30%, 500%);
  }
  @media (max-width: 1000px) {
    transform: none !important;
    text-align: center;
  }
`
export const FooterList = styled.div`
  width: auto;
  height: auto;
  z-index: 1;
  text-align: center;
  color: #f8f8fa;
  margin-top: -5%;
  font-size: ${fonts.medium}px;
  font-weight: ${weight.normal};

  @media (max-width: 1000px) {
    margin-top: -14%;
  }
`
export const List = styled.ul`
  display: flex;
  justify-content: center;

  @media (max-width: 1000px) {
    padding-left: 0px;
  }
`
export const Tag = styled.li`
  text-decoration: none;
  padding-left: 20px;
  list-style-type: none;
  cursor: pointer;
  font-family: 'DM Sans';

  @media (max-width: 1000px) {
    padding-left: 5px;
  }
`

export const ViewIcon = styled.span`
  right: 0;
  transform: translateY(-150%) translateX(94%);

  cursor: pointer;
  @media (max-width: 1440px) {
    transform: translateY(-150%) translateX(90%);
  }
`
export const Link = styled(Button)`
  all: unset;
  background-color: ${getThemeDetails().primaryColor};
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 16px;
  width: 100%;
  color: ${White};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
  text-align: center;

  &:hover {
    color: ${White};
    background-color: #2d9de9;
  }
`

export const Loginpage = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  overflow: hidden;

  .imageDiv {
    @media (max-width: 768px) {
      display: none;
    }
  }
`

export const PageComponent = styled.div`
  // flex: 1;
  align-items: center;
  width: 50%;
  margin: 0px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const PasswordInputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
  @media (min-width: 2500px) {
    width: 100%;
  }
`

export const PasswordInputLabel = styled.label`
  display: block;

  color: ${Blue};
  margin-bottom: 5px;
  user-select: none;
  font-family: 'DM Sans';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const PasswordInputField = styled.input`
  border: none;

  width: 100%;
  box-sizing: border-box;
  font-family: 'DM Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  padding: 12px 20px;
  border: 1px solid ${SecondaryGray};
  border-radius: 1rem;

  background: ${White};
  color: ${Blue};

  &:focus {
    outline: none;
    border-color: none;
  }
  &::placeholder {
    color: ${SecondaryGray600};
  }
`

export const Icon = styled.span`
  position: absolute;
  right: 10px;
  top: 68%;
  transform: translateY(-50%);
  cursor: pointer;
`
