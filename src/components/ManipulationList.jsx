import { ChevronRight, ListChecks, Sparkles } from "lucide-react";
import styles from "./ManipulationList.module.css";

function normalizeText(value) {
  return (value ?? "").toString().toLowerCase();
}

function matchesQuery(manip, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    normalizeText(manip.title).includes(q) ||
    normalizeText(manip.category).includes(q) ||
    manip.tags?.some((tag) => normalizeText(tag).includes(q)) ||
    manip.tips?.toLowerCase().includes(q) ||
    manip.warning?.toLowerCase().includes(q) ||
    manip.steps?.some((step) =>
      normalizeText(step.text).includes(q) ||
      step.subSteps?.some((sub) => normalizeText(sub).includes(q))
    )
  );
}

export default function ManipulationList({
  categories,
  manipulations,
  searchQuery,
  activeCategory,
  onOpenManipulation,
}) {
  const visible = manipulations.filter((manip) => {
    if (activeCategory !== "all" && manip.category !== activeCategory) return false;
    return matchesQuery(manip, searchQuery);
  });

  const activeGroup = categories.find((category) => category.id === activeCategory);

  const groups =
    activeCategory === "all"
      ? categories
          .map((category) => ({
            ...category,
            items: visible.filter((manip) => manip.category === category.id),
          }))
          .filter((group) => group.items.length > 0)
      : activeGroup
        ? [{ ...activeGroup, items: visible }]
        : [];

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>Préparation ECE</span>
          </div>
          <h1>Tout le guide réuni dans une interface claire et partageable.</h1>
          <p>
            Parcours les manipulations par catégorie, cherche un mot-clé et ouvre chaque fiche comme une vraie page de révision.
          </p>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{manipulations.length}</span>
            <span className={styles.statLabel}>manipulations</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{groups.length}</span>
            <span className={styles.statLabel}>sections visibles</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{visible.length}</span>
            <span className={styles.statLabel}>résultats filtrés</span>
          </div>
        </div>
      </section>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <ListChecks size={28} />
          <h2>Aucune manipulation ne correspond à la recherche.</h2>
          <p>Essaie un autre mot-clé ou reviens sur une catégorie plus large.</p>
        </div>
      ) : (
        <div className={styles.sections}>
          {groups.map((group) => (
            <section key={group.id} className={styles.section} style={{ "--cat-color": group.color }}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleWrap}>
                  <span className={styles.sectionIcon}>{group.icon}</span>
                  <div>
                    <h2>{group.label}</h2>
                    <p>{group.description}</p>
                  </div>
                </div>
                <span className={styles.sectionCount}>{group.items.length}</span>
              </div>

              <div className={styles.list}>
                {group.items.map((manip) => (
                  <button
                    key={manip.id}
                    type="button"
                    className={styles.row}
                    onClick={() => onOpenManipulation(manip.id)}
                  >
                    <div className={styles.rowHead}>
                      <div>
                        <div className={styles.rowTitle}>{manip.title}</div>
                        <div className={styles.rowMeta}>
                          <span className={styles.difficulty}>{manip.difficulty}</span>
                          {manip.annales?.length ? (
                            <span className={styles.annales}>{manip.annales.length} sujet{manip.annales.length > 1 ? "s" : ""} liés</span>
                          ) : null}
                        </div>
                      </div>
                      <ChevronRight size={18} className={styles.chevron} />
                    </div>

                    <p className={styles.excerpt}>
                      {manip.steps?.[0]?.text ?? "Ouvre la fiche pour consulter les étapes, conseils et ressources."}
                    </p>

                    <div className={styles.tags}>
                      {manip.tags?.slice(0, 4).map((tag) => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
