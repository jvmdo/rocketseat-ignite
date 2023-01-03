import style from "./Comment.module.css";
import { Trash, ThumbsUp } from "phosphor-react";
import { Avatar } from "./Avatar";
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export function Comment({ text, onCommentDelete, publishedAt = new Date() }) {
  const publishedDateFormatted = format(publishedAt, "LLLL',' d 'at' p", {
    locale: enUS,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enUS,
    addSuffix: true,
  });

  const [clap, setClap] = useState(0);

  function handleClapIncrement() {
    setClap((state) => ++state);
  }

  return (
    <div className={style.comment}>
      <Avatar src="https://github.com/Lipsum.png" hasBorder={false} />
      <section className={style.commentContent}>
        <header className={style.commentInfo}>
          <div>
            <strong>Lipsum Casher</strong>
            <span title={publishedDateFormatted}>
              <time dateTime={publishedAt.toISOString()}>
                {publishedDateRelativeToNow}
              </time>
            </span>
          </div>
          <button type="button" onClick={() => onCommentDelete(text)}>
            <Trash size={24} />
          </button>
        </header>
        <div className={style.commentBody}>
          <p>{text}</p>
        </div>
      </section>
      <div className={style.commentInteraction}>
        <button type="button" onClick={handleClapIncrement}>
          <ThumbsUp size={20} /> Clap
        </button>
        <span>{clap}</span>
      </div>
    </div>
  );
}
