import style from "./Avatar.module.css";

export function Avatar({ src, isFloat = false, hasBorder = true }) {
  return (
    <img
      src={src}
      alt=""
      className={
        isFloat
          ? style.avatarWithFloat
          : hasBorder
          ? style.avatarWithBorder
          : style.avatar
      }
    />
  );
}
