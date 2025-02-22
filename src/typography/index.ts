import styled from 'styled-components'

import { colors } from '../const/V2/theme'
import fonts, { weight } from '../const/V2/fonts'

interface TypographyProps {
  color?: string
  font?: string
  fontWeight?: string | null
  padding?: string
  isHelpText?: boolean
  hasPadding?: boolean
  hasBorder?: boolean
  textAlignCenter?: boolean
}

export const H1 = styled.h1<TypographyProps>`
  font-size: ${fonts.xLarge}px;
  font-weight: ${weight.bold};
  color: ${({ color }) => (color ? color : colors.black)};
`

export const H2 = styled.h2<TypographyProps>`
  color: ${({ color }) => (color ? color : colors.white)};
  font-size: ${({ font }) => (font ? font : `${fonts.xLarge}px`)};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : weight.medium)};
  text-align: ${({ textAlignCenter }) => (textAlignCenter ? 'center' : null)};
  opacity: ${({ isHelpText }) => (isHelpText ? '0.5' : '1')};
  margin: auto 0;
  text-transform: capitalize;
  padding: ${({ padding }) => (padding ? padding : '0 8px')};
`

export const H3 = styled.h3<TypographyProps>`
  color: ${({ color }) => (color ? color : colors.heavyGray)};
  font-size: ${({ font }) => (font ? font : `${fonts.small}px`)};
  * > img {
    height: auto !important;
  }
`

export const H4 = styled.h4<TypographyProps>`
  color: ${({ color }) => (color ? color : colors.heavyGray)};
  font-size: ${fonts.small}px;
  text-align: center;
  padding: ${({ hasPadding }) => (hasPadding ? '8px' : '0')};
  ${({ hasBorder, theme }) =>
    hasBorder && `border-bottom: 1px solid ${theme.border}`}
`

export const H5 = styled.h4<TypographyProps>`
  color: ${({ color }) => (color ? color : colors.heavyGray)};
  font-weight: 700;
  font-size: ${fonts.xLarge} px;
`

export const Small = styled.small<TypographyProps>`
  font-size: ${({ font }) => (font ? font : `${fonts.small}px`)};
  opacity: ${({ isHelpText }) => (isHelpText ? '0.5' : '1')};
  padding: 2px ${({ hasPadding }) => (hasPadding ? '8px' : '0')};
  font-weight: ${({ isHelpText }) => (isHelpText ? 600 : 400)};
  color: ${({ color }) => (color ? color : colors.black)};
`

export const Large = styled.small<TypographyProps>`
  font-size: ${fonts.xxLarge} px;
  padding: 0 8px;
  font-weight: ${weight.xBold};
  color: ${({ color }) => (color ? color : colors.gray)};
`

export const Body = styled.p<TypographyProps>`
  font-size: ${({ font }) => (font ? font : `${fonts.small}px`)};
  font-weight: ${weight.xBold};
  color: ${({ color }) => (color ? color : colors.gray)};
  margin: auto 0;
  padding: ${({ hasPadding }) => (hasPadding ? '0 8px' : '0')};
`

export const Span = styled.span<TypographyProps>`
  color: ${({ color }) => (color ? color : colors.gray)};
`

export const Label = styled.label<TypographyProps>`
  color: ${({ color }) => (color ? color : colors.black)};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.15rem;
  font-family: 'DM Sans';
`
