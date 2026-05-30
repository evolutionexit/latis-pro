import { useState, useMemo } from "react";
import "./index.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ManipCard from "./components/ManipCard";
import { categories, manipulations } from "./data/manipulations";
import styles from "./App.module.css";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = manipulations;
    if (activeCategory !== "all") {
      list = list.filter(m => m.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q)) ||
        m.steps.some(s => s.text?.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q) ||
        (m.tips && m.tips.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const grouped = useMemo(() => {
    if (activeCategory !== "all") {
      return { [activeCategory]: filtered };
    }
    const g = {};
    categories.forEach(c => {
      const items = filtered.filter(m => m.category === c.id);
      if (items.length > 0) g[c.id] = items;
    });
    return g;
  }, [filtered, activeCategory]);

  const activeCat = categories.find(c => c.id === activeCategory);

  return (
    <div className={styles.app}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.layout}>
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
        />
        <main className={styles.main}>
          <div className={styles.sectionHeader}>
            {activeCategory !== "all" && activeCat ? (
              <div className={styles.catInfo} style={{ "--cat-color": activeCat.color }}>
                <span className={styles.catInfoIcon}>{activeCat.icon}</span>
                <div>
                  <div className={styles.catInfoTitle}>{activeCat.label}</div>
                  <div className={styles.catInfoDesc}>{activeCat.description}</div>
                </div>
              </div>
            ) : (
              <div className={styles.allInfo}>
                <span>Toutes les manipulations</span>
                {searchQuery && (
                  <span className={styles.searchResultCount}>
                    — {filtered.length} résultat{filtered.length !== 1 ? "s" : ""} pour « {searchQuery} »
                  </span>
                )}
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>⌕</div>
              <div className={styles.emptyText}>Aucune manipulation trouvée.</div>
              <div className={styles.emptySub}>Essaie un autre mot-clé ou catégorie.</div>
            </div>
          ) : (
            Object.entries(grouped).map(([catId, items]) => {
              const cat = categories.find(c => c.id === catId);
              return (
                <section key={catId} className={styles.group}>
                  {activeCategory === "all" && (
                    <div className={styles.groupHeader} style={{ "--cat-color": cat?.color }}>
                      <span className={styles.groupIcon}>{cat?.icon}</span>
                      <span className={styles.groupTitle}>{cat?.label}</span>
                      <span className={styles.groupCount}>{items.length}</span>
                      <div className={styles.groupLine} />
                    </div>
                  )}
                  <div className={styles.grid}>
                    {items.map(m => (
                      <ManipCard key={m.id} manip={m} />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
