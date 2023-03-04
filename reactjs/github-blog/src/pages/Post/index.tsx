import { useParams } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop'
import { ContentContainer } from '../../styles/global'
import { Body } from './components/Body'
import { Info } from './components/Info'

export function Post() {
  const { number } = useParams()
  console.log({ number })

  const infoProps = {
    title: 'JavaScript data types and data structures',
    user: 'cameronwll',
    createdAt: '2023-02-07T11:21:03Z',
    comments: 5,
    url: 'https://github.com/rocketseat-education/reactjs-github-blog-challenge/issues/1',
  }

  const bodyProps = {
    // markdown: ~# My Issue\r\n\r\n**Programming languages all have built-in data structures, but these often differ from one language to another**. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn.\r\n\r\n\r\n\r\n## [Dynamic typing](https://www.stackoverflow.com)\r\n\r\nJavaScript is a loosely typed and dynamic language. Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:\r\n\r\n~~~javascript\r\nlet foo = 42; // foo is now a number\r\nfoo = "bar"; // foo is now a string\r\nfoo = true; // foo is now a boolean\r\n~~~~,
    markdown: `### Initial checklist\r\n\r\n- [X] I read the [support docs](https://github.com/remarkjs/.github/blob/main/support.md)\r\n- [X] I read the [contributing guide](https://github.com/remarkjs/.github/blob/main/contributing.md)\r\n- [X] I agree to follow the [code of conduct](https://github.com/remarkjs/.github/blob/main/code-of-conduct.md)\r\n- [X] I searched [issues](https://github.com/search?q=user%3Aremarkjs&type=Issues) and couldn’t find anything (or linked relevant results below)\r\n\r\n### Affected packages and versions\r\n\r\nreact-markdown@8.0.3\r\n\r\n### Link to runnable example\r\n\r\nhttps://stackblitz.com/edit/github-uwhlug?file=src%2Findex.tsx\r\n\r\n### Steps to reproduce\r\n\r\nI'm working in a codebase that uses a lot of components explicitly declared as \`const SomeComponent: React.FC<Props>\`. I'd like to pass an existing component to ~react-markdown~ without wrapping it in a function:\r\n\r\n~~~tsx\r\nimport React, { HTMLAttributes, FC } from 'react';\r\nimport { HTMLAttributes, FC } from 'react'\r\nimport { Components } from 'react-markdown'\r\nimport { HeadingProps } from 'react-markdown/lib/ast-to-react'\r\n\r\n// This is a <h1> with the props accepted by HTML's <h1>...\r\ntype H1Props = HTMLAttributes<HTMLHeadingElement>\r\nconst HtmlH1: FC<H1Props> = () => null\r\n\r\nconst components: Components = {\r\n  // It doesn't work:\r\n  h1: HtmlH1,\r\n  // Works, but ugly:\r\n  h2: (props) => <HtmlH1 {...props} />,\r\n}\r\n\r\n// This is a <h1> with the prop types wanted by react-markdown...\r\nconst ReactMarkdownH1: FC<HeadingProps> = () => null\r\n\r\n// It can't be easily used as-is:\r\nconst element = <ReactMarkdownH1>Foo</ReactMarkdownH1>\r\n~~~\r\n\r\n### Expected behavior\r\n\r\nI would expect the "vanilla" ~h1~ component to work with ~react-markdown~.\r\n\r\n### Actual behavior\r\n\r\nI need to wrap the component to make it work.\r\n\r\nEven though ~HeadingProps~ is assignable to ~HTMLAttributes~, ~ComponentType<HTMLAttributes>~ isn't compatible with ~ComponentType<HeadingProps>~ since it would need the props to be assignable both ways.\r\n\r\n### Potential fix\r\n\r\nChanging [~ReactMarkdownProps.children~](https://github.com/remarkjs/react-markdown/blob/main/lib/complex-types.ts#L9) to ~ReactNode~ would seem to make the prop types compatible. However, it may be a breaking change for people who expect to get an array in ~children~ from ~react-markdown~.\r\n\r\n### Runtime\r\n\r\n_No response_\r\n\r\n### Package manager\r\n\r\n_No response_\r\n\r\n### OS\r\n\r\n_No response_\r\n\r\n### Build and bundle tools\r\n\r\n_No response_`,
  }

  return (
    <main>
      <ScrollToTop>
        <ContentContainer>
          <Info {...infoProps} />
          <Body {...bodyProps} />
        </ContentContainer>
      </ScrollToTop>
    </main>
  )
}
