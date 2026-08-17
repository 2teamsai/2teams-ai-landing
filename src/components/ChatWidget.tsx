"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./ChatWidget.module.css";

type Message = { role: "user" | "model"; text: string };

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default function ChatWidget() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleOpen() {
    setOpen(true);
    setMessages((prev) => (prev.length === 0 ? [{ role: "model", text: t.chat.greeting }] : prev));
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: nextMessages, lang }),
      });
      if (!res.ok) throw new Error("request failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: t.chat.error }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {!open && (
        <>
          <button type="button" className={styles.hint} onClick={handleOpen} aria-hidden="true" tabIndex={-1}>
            <span className={styles.hintText}>Hello World!</span>
          </button>
          <button
            type="button"
            className={styles.node}
            onClick={handleOpen}
            aria-label={t.chat.openLabel}
          >
            <span className={styles.nodeOrbit} aria-hidden="true" />
            <span className={styles.nodeCore}>
              <Image src="/brand/teambot-icon.png" alt="" width={62} height={62} className={styles.nodeIcon} priority />
            </span>
          </button>
        </>
      )}

      {open && (
        <div className={styles.panel} role="dialog" aria-label={t.chat.title}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>
              <span className={styles.headerDot} aria-hidden="true" />
              {t.chat.title}
            </span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label={t.chat.closeLabel}
            >
              <CloseIcon />
            </button>
          </div>

          <div className={styles.messages} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.bubble} ${m.role === "user" ? styles.bubbleUser : styles.bubbleBot}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.thinking}`}>
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chat.placeholder}
              disabled={loading}
              aria-label={t.chat.placeholder}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label={t.chat.send}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
