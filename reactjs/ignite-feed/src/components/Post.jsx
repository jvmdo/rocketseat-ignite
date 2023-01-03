import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import style from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";

export function Post({ author, publishedAt, content }) {
  const publishedDateFormatted = format(publishedAt, "LLLL',' d 'at' p", {
    locale: enUS,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enUS,
    addSuffix: true,
  });

  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  function handleCommentSubmit(event) {
    event.preventDefault();

    const textarea = event.target.comment;
    const inputText = textarea.value.trim();

    if (!inputText) {
      // I think this code here is never executed
      textarea.setCustomValidity("Empty text is not a valid comment");
      textarea.reportValidity();
      textarea.setCustomValidity("");
      return;
    }

    setNewCommentText(inputText);
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleTextInput(event) {
    const inputText = event.target.value;
    if (!inputText.trim()) {
      setNewCommentText("");
      return;
    }
    setNewCommentText(inputText);
  }

  function handleCommentDelete(commentToDelete) {
    const commentsAfterDelete = comments.filter(
      (comment) => comment != commentToDelete
    );
    setComments(commentsAfterDelete);
  }

  return (
    <div className={style.post}>
      <header>
        <Avatar src={author.avatarUrl} />
        <div>
          <strong>{author.name}</strong>
          <span>{author.role}</span>
        </div>
        <p title={publishedDateFormatted}>
          Published{" "}
          <time dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
          </time>
        </p>
      </header>
      <section className={style.body}>
        {content.map((text) => {
          if (text.type === "paragraph") {
            return <p key={text.content}>{text.content}</p>;
          } else if (text.type === "link") {
            return (
              <p key={text.content}>
                <a href={text.href}>{text.content}</a>
              </p>
            );
          } else {
            return (
              <div key={text.content} className={style.hashtags}>
                {text.content.map((hashtag) => (
                  <a key={hashtag} href="#">
                    {hashtag}
                  </a>
                ))}
              </div>
            );
          }
        })}
      </section>
      <form onSubmit={handleCommentSubmit} className={style.commentForm}>
        <label htmlFor="comment">Leave your feedback</label>
        <textarea
          id="comment"
          name="comment"
          onChange={handleTextInput}
          value={newCommentText}
          required
        ></textarea>
        <div className={style.hideButton}>
          <button>Publish</button>
        </div>
      </form>
      <ul className={style.commentList}>
        {comments.map((text) => (
          <Comment
            key={text}
            text={text}
            onCommentDelete={handleCommentDelete}
          />
        ))}
      </ul>
    </div>
  );
}
