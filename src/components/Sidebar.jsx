import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header({ searchQuery, setSearchQuery }) {
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTick(v => !v), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚗</span>
          <div>
            <div className={styles.logoTitle}>
              LATIS<span className={styles.logoAccent}>PRO</span>
            </div>
            <div className={styles.logoSub}>Guide ECE 2026 · Physique-Chimie · 92 sujets analysés</div>
          </div>
        </div>

        <div className={styles.terminal}>
          <span className={styles.termPrompt}>$</span>
          <span className={styles.termText}> ece_2026 --annales 92 --mat PC</span>
          <span className={styles.cursor} style={{ opacity: tick ? 1 : 0 }}>▌</span>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          type="text"
          placeholder="Rechercher : RC, spectro, titrage pH, pointage vidéo, Python…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={styles.search}
        />
        {searchQuery && (
          <button className={styles.clear} onClick={() => setSearchQuery("")}>×</button>
        )}
      </div>
    </header>
  );
}