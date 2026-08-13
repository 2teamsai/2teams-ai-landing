import { forwardRef } from "react";
import { fullName, isPending, type TeamMember } from "@/lib/team";
import { GlobeIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./BusinessCard";
import styles from "./BusinessCardPrint.module.css";

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const BusinessCardPrint = forwardRef<HTMLDivElement, { member: TeamMember }>(function BusinessCardPrint(
  { member },
  ref,
) {
  const name = fullName(member);

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.logoCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-mark.png" alt="" className={styles.logoMark} />
        <div className={styles.wordmarkGroup}>
          <div className={styles.wordmark}>
            <span className={styles.wordmarkBlue}>2T</span>
            <span className={styles.wordmarkViolet}>eams</span>
            <span className={styles.wordmarkOrange}>.AI</span>
          </div>
          <p className={styles.slogan}>Soluciones Inteligentes</p>
        </div>
      </div>

      <div className={styles.infoCol}>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{member.cargo}</p>
        </div>

        <div className={styles.contacts}>
          {!isPending(member.email) && (
            <p className={`${styles.contactLine} ${styles.link}`}>
              <MailIcon /> {member.email}
            </p>
          )}
          {!isPending(member.telefono) && (
            <p className={`${styles.contactLine} ${styles.muted}`}>
              <PhoneIcon /> {member.telefono}
            </p>
          )}
          {!isPending(member.website) && (
            <p className={`${styles.contactLine} ${styles.link}`}>
              <GlobeIcon /> {stripProtocol(member.website)}
            </p>
          )}
          {!isPending(member.linkedin) && (
            <p className={`${styles.contactLine} ${styles.link}`}>
              <LinkedInIcon /> {stripProtocol(member.linkedin)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default BusinessCardPrint;
