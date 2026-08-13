import Image from "next/image";
import Wordmark from "./Wordmark";
import styles from "./Brand.module.css";

type BrandProps = {
  size?: "nav" | "footer";
  slogan?: string;
};

const ICON_PX = { nav: 26, footer: 22 };

export default function Brand({ size = "nav", slogan }: BrandProps) {
  const px = ICON_PX[size];
  return (
    <span className={styles.brand}>
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={px}
        height={px}
        priority
        className={styles.mark}
      />
      <Wordmark size={size} />
      {slogan && <span className={styles.slogan}>{slogan}</span>}
    </span>
  );
}
