import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";
import style from "./App.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @Rocketseat",
    },
    content: [
      {
        type: "paragraph",
        content: "Mussum Ipsum, cacilds vidis litro abertis 🎙",
      },
      {
        type: "paragraph",
        content:
          "Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Interagi no mé, cursus quis.",
      },
      {
        type: "paragraph",
        content:
          "vehicula ac nisi.In elementis mé pra quem é amistosis quis leo 🥼",
      },
      {
        type: "link",
        content: "cacilds/cumpadi",
        href: "https://www.mussumipsum.com/",
      },
      {
        type: "hashtag",
        content: ["#mussumipsum", "#emmet"],
      },
    ],
    publishedAt: new Date("2023-01-01 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator @Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galera 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare", href: "#" },
      {
        type: "hashtag",
        content: ["#loremipsum", "#mussumipsum", "#emmet"],
      },
    ],
    publishedAt: new Date("2023-01-2 03:00:00"),
  },
  {
    id: 3,
    author: {
      avatarUrl: "https://github.com/jvmdo.png",
      name: "Joao Oliveira",
      role: "Student @Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Lorem, ipsum dolor. 👋" },
      {
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam debitis dolore laboriosam dolor maiores unde illo perferendis quam nihil minus. 🚀",
      },
      {
        type: "link",
        content: "joao.dev/ignite-feed",
        href: "https://github.com/jvmdo",
      },
      {
        type: "hashtag",
        content: ["#loremipsum", "#emmet"],
      },
    ],
    publishedAt: new Date("2023-01-2 16:00:00"),
  },
];

function App() {
  return (
    <>
      <Header />
      <div className={style.container}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                publishedAt={post.publishedAt}
                content={post.content}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
