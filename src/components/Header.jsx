import { useEffect, useState } from "react";
import { Search, X, FlaskConical } from "lucide-react";
import styles from "./Header.module.css";

export default function Header({ searchQuery, setSearchQuery, totalCount }) {
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTick((value) => !value), 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.brandRow}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <FlaskConical size={22} />
          </div>
          <div>
            <div className={styles.title}>
              LATIS<span>PRO</span>
            </div>
            <div className={styles.subtitle}>Guide ECE · Physique-Chimie</div>
          </div>
        </div>

        <div className={styles.statusPill}>
          <span className={styles.statusDot} style={{ opacity: tick ? 1 : 0.45 }} />
          <span>{totalCount} manipulations</span>
        </div>
      </div>

      <div className={styles.searchRow}>
        <div className={styles.searchField}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className={styles.search}
            placeholder="Rechercher une manipulation, un mot-clé, une étape…"
            aria-label="Rechercher une manipulation"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => setSearchQuery("")}
              aria-label="Effacer la recherche"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <div className={styles.searchHint}>Recherche instantanée dans les titres, tags, conseils et étapes.</div>
      </div>
    </header>
  );
}
