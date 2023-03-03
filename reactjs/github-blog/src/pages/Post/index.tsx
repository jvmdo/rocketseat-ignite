import { ContentContainer } from '../../styles/global'
import { Body } from './components/Body'
import { Info } from './components/Info'

export function Post() {
  const infoProps = {
    title: 'JavaScript data types and data structures',
    user: 'cameronwll',
    createdAt: '2023-02-07T11:21:03Z',
    comments: 5,
    url: 'https://github.com/rocketseat-education/reactjs-github-blog-challenge/issues/1',
  }

  const bodyProps = {
    markdown: `# My Issue\r\n\r\n**Programming languages all have built-in data structures, but these often differ from one language to another**. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn.\r\n\r\n\r\n\r\n## [Dynamic typing](https://www.stackoverflow.com)\r\n\r\nJavaScript is a loosely typed and dynamic language. Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:\r\n\r\n~~~javascript\r\nlet foo = 42; // foo is now a number\r\nfoo = "bar"; // foo is now a string\r\nfoo = true; // foo is now a boolean\r\n~~~`,
    // markdown: `Just a link: https://reactjs.com.`,
  }

  return (
    <main>
      <ContentContainer>
        <Info {...infoProps} />
        <Body {...bodyProps} />
      </ContentContainer>
    </main>
  )
}
