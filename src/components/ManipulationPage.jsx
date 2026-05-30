import { ArrowLeft, CalendarRange, Film, Image as ImageIcon, Link2, PlayCircle, BadgeInfo, ChevronRight } from "lucide-react";
import styles from "./ManipulationPage.module.css";

function StepList({ steps }) {
  let index = 0;

  return (
    <ol className={styles.steps}>
      {steps.map((step, i) => {
        if (step.subSteps) {
          return (
            <li key={i} className={styles.subGroup}>
              <div className={styles.subTitle}>Sous-étapes</div>
              <ul className={styles.subList}>
                {step.subSteps.map((subStep, subIndex) => (
                  <li key={subIndex} className={styles.subItem}>
                    <ChevronRight size={14} />
                    <span>{subStep}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        }

        const current = index++;
        return (
          <li key={i} className={styles.step}>
            <div className={styles.stepNumber}>{current + 1}</div>
            <div className={styles.stepText}>{step.text}</div>
          </li>
        );
      })}
    </ol>
  );
}

export default function ManipulationPage({
  manip,
  category,
  onBack,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
}) {
  return (
    <article className={styles.page} style={{ "--cat-color": category?.color }}>
      <button type="button" className={styles.backButton} onClick={onBack}>
        <ArrowLeft size={16} />
        Retour à la liste
      </button>

      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <div className={styles.heroBadge}>
            <span className={styles.heroIcon}>{category?.icon}</span>
            <span>{category?.label}</span>
          </div>
          <div className={styles.heroSub}>Fiche détaillée</div>
        </div>

        <h1>{manip.title}</h1>
        <p className={styles.lead}>
          Cette fiche regroupe le déroulé principal, les astuces utiles et un espace prêt à accueillir tes médias d’explication.
        </p>

        <div className={styles.metaLine}>
          <span className={styles.pill}>{manip.difficulty}</span>
          {manip.tags?.map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
          {manip.annales?.length ? (
            <span className={styles.annales}>
              <CalendarRange size={14} />
              {manip.annales.length} sujet{manip.annales.length > 1 ? "s" : ""} relié{manip.annales.length > 1 ? "s" : ""}
            </span>
          ) : null}
        </div>
      </header>

      <nav className={styles.quickNav}>
        <a href="#etapes"><Link2 size={14} /> Étapes</a>
        <a href="#medias"><ImageIcon size={14} /> Médias</a>
        <a href="#conseils"><BadgeInfo size={14} /> Conseils</a>
      </nav>

      <div className={styles.navigation}>
        <button type="button" className={styles.navButton} onClick={onPrevious} disabled={!onPrevious}>
          {previousLabel ? `Précédent : ${previousLabel}` : "Précédent"}
        </button>
        <button type="button" className={styles.navButton} onClick={onNext} disabled={!onNext}>
          {nextLabel ? `Suivant : ${nextLabel}` : "Suivant"}
        </button>
      </div>

      <section className={styles.section} id="etapes">
        <div className={styles.sectionHeader}>
          <h2>Déroulé de la manipulation</h2>
          <span>{manip.steps?.length ?? 0} blocs d’instructions</span>
        </div>
        <StepList steps={manip.steps ?? []} />
      </section>

      <section className={styles.section} id="medias">
        <div className={styles.sectionHeader}>
          <h2>Espace médias</h2>
          <span>Photos, vidéos, captures d’écran</span>
        </div>

        <div className={styles.mediaGrid}>
          <div className={styles.mediaCard}>
            <div className={styles.mediaIcon}><ImageIcon size={20} /></div>
            <div>
              <h3>Photo du montage</h3>
              <p>Ajoute ici une photo nette de ton dispositif pour illustrer le branchement.</p>
            </div>
          </div>

          <div className={styles.mediaCard}>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoLink}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Vidéo explicative"
                className={styles.videoThumbnail}
              />
              <div className={styles.playButton}>▶</div>
            </a>
          </div>

          <div className={styles.mediaCard}>
            <div className={styles.mediaIcon}><Film size={20} /></div>
            <div>
              <h3>Capture du graphe</h3>
              <p>Prévois un espace pour une courbe importante, un tableau de mesures ou une régression.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="conseils">
        <div className={styles.sectionHeader}>
          <h2>Conseils et remarques</h2>
          <span>Rappels utiles</span>
        </div>

        <div className={styles.notes}>
          {manip.tips ? (
            <div className={styles.noteBox}>
              <div className={styles.noteLabel}>Astuce</div>
              <p>{manip.tips}</p>
            </div>
          ) : null}

          {manip.warning ? (
            <div className={styles.noteBox}>
              <div className={styles.noteLabel}>Attention</div>
              <p>{manip.warning}</p>
            </div>
          ) : null}

          {manip.annales?.length ? (
            <div className={styles.noteBox}>
              <div className={styles.noteLabel}>Annales associées</div>
              <p>
                Sujets :{" "}
                {manip.annales.map((annale, index) => (
                  <span key={annale}>
                    <a
                      href={`https://ecebac.fr/sujet/${annale}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {annale}
                    </a>
                    {index < manip.annales.length - 1 ? ", " : ""}
                  </span>
                ))}
                .
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </article>
  );
}
