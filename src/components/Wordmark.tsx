import styles from "./Wordmark.module.css";

type WordmarkProps = {
  as?: "h1" | "span" | "div";
  size?: "hero" | "heroCompact" | "nav" | "footer";
  className?: string;
};

export default function Wordmark({
  as: Tag = "span",
  size = "nav",
  className,
}: WordmarkProps) {
  return (
    <Tag className={[styles.wordmark, styles[size], className].filter(Boolean).join(" ")}>
      <span className={styles.blue}>2T</span>
      <span className={styles.violet}>eams</span>
      <span className={styles.orange}>.AI</span>
    </Tag>
  );
}
