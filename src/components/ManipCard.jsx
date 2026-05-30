import { useState } from "react";
import { categories } from "../data/manipulations";
import styles from "./ManipCard.module.css";

export default function ManipCard({ manip }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState({});
  const cat = categories.find(c => c.id === manip.category);

  const diffClass = {
    facile: styles.facile,
    moyen: styles.moyen,
    avancé: styles.avance,
  }[manip.difficulty] || styles.facile;

  // Only count non-subStep steps
  const mainSteps = manip.steps.filter(s => !s.subSteps);
  const totalSteps = mainSteps.length;
  const doneCount = Object.values(done).filter(Boolean).length;
  const progress = totalSteps > 0 ? (doneCount / totalSteps) * 100 : 0;

  // Build a map: mainStep index -> step
  let mainIdx = 0;
  const toggleStep = (i) => setDone(d => ({ ...d, [i]: !d[i] }));

  return (
    <article
      className={`${styles.card} ${open ? styles.expanded : ""}`}
      style={{ "--cat-color": cat?.color }}>
      <button className={styles.header} onClick={() => setOpen(o => !o)}>
        <div className={styles.headerLeft}>
          <span className={styles.catDot} title={cat?.label}>{cat?.icon}</span>
          <div>
            <div className={styles.title}>{manip.title}</div>
            <div className={styles.meta}>
              <span className={`${styles.badge} ${diffClass}`}>{manip.difficulty}</span>
              {manip.annales && manip.annales.length > 0 && (
                <span className={styles.annalesBadge} title={`Sujets 2026 : ${manip.annales.join(', ')}`}>
                  📋 {manip.annales.length} sujet{manip.annales.length > 1 ? 's' : ''} 2026
                </span>
              )}
              {manip.tags.slice(0, 3).map(t => (
                <span key={t} className={styles.tag}>#{t}</span>
              ))}
            </div>
          </div>
        </div>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>›</span>
      </button>

      {open && (
        <div className={styles.body}>
          {/* Annales reference */}
          {manip.annales && manip.annales.length > 0 && (
            <div className={styles.annalesBar}>
              <span className={styles.annalesLabel}>Sujets ECE 2026 :</span>
              {manip.annales.map(n => (
                <a
                  key={n}
                  href={`https://ecebac.fr/sujet/${4091 + parseInt(n) > 4091 ? 4091 + parseInt(n.replace(/[^0-9]/g,'')) : '#'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.annaleChip}
                  title={`Sujet ${n}`}
                >
                  {n}
                </a>
              ))}
            </div>
          )}

          {/* Progress bar */}
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressLabel}>{doneCount}/{totalSteps} étapes</span>
          </div>

          {/* Steps */}
          <ol className={styles.steps}>
            {(() => {
              let idx = 0;
              return manip.steps.map((step, i) => {
                if (step.subSteps) {
                  return (
                    <li key={i} className={styles.subStepGroup}>
                      <ul className={styles.subList}>
                        {step.subSteps.map((sub, j) => (
                          <li key={j} className={styles.subItem}>
                            <span className={styles.subBullet}>▸</span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                const stepIdx = idx++;
                return (
                  <li
                    key={i}
                    className={`${styles.step} ${done[stepIdx] ? styles.stepDone : ""}`}
                    onClick={() => toggleStep(stepIdx)}
                  >
                    <span className={styles.stepNum}>
                      {done[stepIdx] ? "✓" : stepIdx + 1}
                    </span>
                    <span className={styles.stepText}>{step.text}</span>
                  </li>
                );
              });
            })()}
          </ol>

          {/* Tips */}
          {manip.tips && (
            <div className={styles.tip}>
              <span className={styles.tipIcon}>💡</span>
              <span>{manip.tips}</span>
            </div>
          )}

          {/* Warning */}
          {manip.warning && (
            <div className={styles.warning}>
              <span className={styles.warnIcon}>⚠</span>
              <span>{manip.warning}</span>
            </div>
          )}
        </div>
      )}
    </article>
  );
}