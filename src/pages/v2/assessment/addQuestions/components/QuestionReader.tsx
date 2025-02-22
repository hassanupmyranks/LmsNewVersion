import rehypeRaw from 'rehype-raw'
import RemarkMathPlugin from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const MarkdownV2 = (props: any) => (
  <ReactMarkText
    remarkPlugins={[RemarkMathPlugin]}
    rehypePlugins={[rehypeRaw, rehypeKatex]}
    {...props}
  />
)

export default MarkdownV2

export interface ReactMarkDownProps {
  width?: any
  font?: any
  maxWidth?: any
  maxHeight?: any
}

export const ReactMarkText = styled(ReactMarkdown)<ReactMarkDownProps>`
  img {
    width: ${({ width }) => (width ? width : null)};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : null)};
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : null)};
  }
`
