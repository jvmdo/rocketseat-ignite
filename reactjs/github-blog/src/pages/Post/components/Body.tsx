/* eslint-disable react/no-children-prop */
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'

const SBody = styled.section`
  padding: 2.5rem 2rem;

  h1,
  h2,
  h3 {
    border-bottom: 1px solid ${(p) => p.theme.post};
  }

  h1 {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }

  h2 {
    margin-block: 0.75rem;
    padding-bottom: 0.35rem;
    font-size: 1.3em;
  }

  h3 {
    margin-block: 0.5rem;
    padding-bottom: 0.15rem;
    font-size: 1.1em;
  }

  a {
    color: ${(p) => p.theme.blue};
    text-decoration: underline;
  }

  p {
    margin-bottom: 0.5rem;
  }
`

interface BodyProps {
  markdown: string
}

export function Body({ markdown }: BodyProps) {
  return (
    <SBody style={{ padding: '2.5rem 2rem' }}>
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        children={markdown}
        components={{
          code({ node, inline, className, children, style, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={coldarkDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      />
    </SBody>
  )
}
