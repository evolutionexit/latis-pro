import styles from "./Sidebar.module.css";

export default function Sidebar({
  categories,
  activeCategory,
  setActiveCategory,
  countsByCategory,
  totalVisible,
  totalCount,
  onShowAll,
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.panel}>
        <div className={styles.panelLabel}>Navigation</div>
        <button
          type="button"
          className={`${styles.navButton} ${activeCategory === "all" ? styles.active : ""}`}
          onClick={onShowAll}
        >
          <span className={styles.navName}>Toutes les manipulations</span>
          <span className={styles.navCount}>{totalVisible}/{totalCount}</span>
        </button>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelLabel}>Catégories</div>
        <div className={styles.categoryList}>
          {categories.map((category) => {
            const visible = countsByCategory[category.id] ?? 0;
            const total = category.totalCount ?? visible;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                className={`${styles.categoryButton} ${isActive ? styles.active : ""}`}
                style={{ "--cat-color": category.color }}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryText}>
                  <span className={styles.categoryName}>{category.label}</span>
                  <span className={styles.categoryDescription}>{category.description}</span>
                </span>
                <span className={styles.categoryCount}>{visible}/{total}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelLabel}>Astuce</div>
        <p className={styles.tip}>
          Ouvre une manipulation pour afficher les étapes, puis ajoute plus tard tes photos, captures ou vidéos dans la section média.
        </p>
      </div>
    </aside>
  );
}
