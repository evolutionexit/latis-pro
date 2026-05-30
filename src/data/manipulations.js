// Données extraites de l'analyse des 92 sujets ECE 2026 PC (ecebac.fr)
// Fréquences observées dans les annales :
// ExAO Circuit RC : ~8 sujets | Suivi spectro : ~10 sujets | Tableur : ~20 sujets
// Pointage vidéo : ~6 sujets | Titrage pH : ~8 sujets | Python : ~20 sujets
// Titrage conductimétrique : ~5 sujets | Calorimétrie : ~4 sujets
// Diffraction : ~6 sujets | Chromatographie CCM : ~8 sujets

export const categories = [
  {
    id: "exao",
    label: "ExAO & Acquisition",
    color: "#00d4ff",
    icon: "⚡",
    videoID: "dQw4w9WgXcQ",
    description: "Interface ExAO, capteurs, acquisition temporelle"
  },
  {
    id: "circuit_rc",
    label: "Circuit RC",
    color: "#b388ff",
    icon: "〇",
    description: "Charge/décharge condensateur — ~8 sujets 2026"
  },
  {
    id: "spectro",
    label: "Suivi spectro / colorimétrie",
    color: "#ff6b35",
    icon: "🔬",
    description: "Absorbance, Beer-Lambert, cinétique — ~10 sujets 2026"
  },
  {
    id: "titrage",
    label: "Titrages (pH / conductimétrie)",
    color: "#ffd740",
    icon: "⚗",
    description: "Dosages acido-basiques et conductimétriques — ~13 sujets 2026"
  },
  {
    id: "video",
    label: "Pointage vidéo",
    color: "#7fff6b",
    icon: "🎬",
    description: "Mécanique, trajectoires, chute — ~6 sujets 2026"
  },
  {
    id: "tableur",
    label: "Tableur & Python",
    color: "#ff5370",
    icon: "🐍",
    description: "Calculs, graphiques, incertitudes — ~30 sujets 2026"
  },
  {
    id: "modelisation",
    label: "Modélisation & Régression",
    color: "#00e5ff",
    icon: "📐",
    description: "Ajustements, courbes modèles, paramètres"
  },
  {
    id: "autres",
    label: "Autres manips fréquentes",
    color: "#69f0ae",
    icon: "🧪",
    description: "Calorimétrie, diffraction, conductimétrie suivi…"
  }
];

export const manipulations = [

  // ══════════════════════════════════════════════════
  // CATÉGORIE : ExAO & ACQUISITION
  // ══════════════════════════════════════════════════
  {
    id: "exao-1",
    category: "exao",
    title: "Ouvrir LatisPro et configurer l'interface ExAO",
    difficulty: "facile",
    tags: ["démarrage", "ExAO", "capteur", "voie"],
    annales: [],
    steps: [
      { text: "Lancer LatisPro. Brancher l'interface ExAO (Orphy, Sysam SP5, Arduino…) en USB avant d'ouvrir le logiciel." },
      { text: "Aller dans Expérience → Paramétrer → Capteurs (ou cliquer sur l'icône de prise ExAO)." },
      { text: "Sur chaque voie utilisée (EA0, EA1…), sélectionner la grandeur physique (Tension U en V, Courant I en mA, Temperature…) et l'unité." },
      { text: "Régler la plage de mesure : choisir la plus petite plage qui englobe le signal attendu (meilleure résolution)." },
      { text: "Si le capteur est intelligent (sonde pH, conductimètre…), LatisPro peut le détecter et configurer la voie automatiquement." },
      { text: "Valider et fermer la fenêtre de configuration." }
    ],
    tips: "Pour un circuit RC, brancher le condensateur sur EA0 (tension Uc) et la résistance sur EA1 (tension UR si besoin de i = UR/R).",
    warning: "Ne jamais dépasser ±10 V sur les entrées ExAO. Pour les montages avec pile/alim, vérifier la tension avant de brancher."
  },
  {
    id: "exao-2",
    category: "exao",
    title: "Paramétrer l'acquisition temporelle (durée, fréquence, déclenchement)",
    difficulty: "facile",
    tags: ["durée", "fréquence", "déclenchement", "temporel"],
    annales: ["06", "27", "30", "41", "54", "62A", "62B", "63"],
    steps: [
      { text: "Aller dans Expérience → Paramétrer → Acquisition." },
      { text: "Mode : choisir Temporel (acquisition vs temps)." },
      { text: "Renseigner la Durée totale : pour un RC avec τ = quelques ms, prendre 5τ à 10τ (ex. τ = 10 ms → durée 100 ms). Pour une cinétique chimique lente, plusieurs minutes." },
      { text: "Renseigner la Fréquence ou le Nombre de points :" },
      { subSteps: [
          "Signal rapide (RC ≤ 10 ms) : 10 000 Hz minimum.",
          "Signal moyen (RC ~ 1 s) : 100–500 Hz.",
          "Cinétique chimique (minutes) : 1–10 Hz suffit."
        ]
      },
      { text: "Déclenchement : choisir 'Sur seuil' pour démarrer l'acquisition quand Uc dépasse une valeur (ex. 0.1 V). Évite de déclencher trop tôt sur le bruit." },
      { text: "Valider." }
    ],
    tips: "Règle de Shannon : fréquence d'échantillonnage ≥ 2 × fmax du signal. En pratique, prendre ×10 pour avoir une belle courbe.",
    warning: null
  },
  {
    id: "exao-3",
    category: "exao",
    title: "Lancer, observer et arrêter une acquisition",
    difficulty: "facile",
    tags: ["lancement", "temps réel", "arrêt"],
    annales: [],
    steps: [
      { text: "Cliquer sur ▶ (Lancer l'acquisition) ou appuyer sur F5." },
      { text: "La courbe se trace en temps réel dans la fenêtre graphique." },
      { text: "L'acquisition s'arrête automatiquement à la fin de la durée configurée, ou manuellement avec ■." },
      { text: "Une fois arrêtée, les données sont dans le tableau et la courbe est figée — on peut l'analyser." }
    ],
    tips: "Si la courbe est plate à 0 ou saturée à ±10 V, vérifier la plage de mesure et les branchements avant de recommencer.",
    warning: null
  },
  {
    id: "exao-4",
    category: "exao",
    title: "Acquisition point par point (mode manuel — titrage, calorimétrie)",
    difficulty: "moyen",
    tags: ["manuel", "titrage", "pH", "point par point"],
    annales: ["13", "61", "68", "70", "74", "90"],
    steps: [
      { text: "Dans Paramétrer → Acquisition, choisir le mode Manuel ou Point par point." },
      { text: "Définir la variable X (ex. Volume versé en mL — saisi manuellement) et la variable Y (ex. pH ou conductivité — lue par le capteur)." },
      { text: "Préparer le montage : burette remplie, électrode branchée, agitateur en marche." },
      { text: "Cliquer sur ▶ pour démarrer le mode manuel." },
      { text: "À chaque ajout : verser le volume, attendre la stabilisation de la mesure, puis cliquer sur le bouton Mémoriser un point (ou appuyer sur Espace)." },
      { text: "Saisir la valeur de X dans la boîte de dialogue (volume ajouté depuis le début ou volume de la division)." },
      { text: "Répéter jusqu'à la fin du titrage, puis cliquer sur ■." }
    ],
    tips: "Resserrer les points autour de l'équivalence (toutes les 0.5 mL au lieu de 2 mL) pour bien repérer le saut.",
    warning: "Ne pas oublier de valider chaque point après la saisie de X, sinon le point est perdu."
  },

  // ══════════════════════════════════════════════════
  // CATÉGORIE : CIRCUIT RC (très fréquent — ~8 sujets)
  // ══════════════════════════════════════════════════
  {
    id: "rc-1",
    category: "circuit_rc",
    title: "Tracer Uc(t) lors de la charge d'un condensateur",
    difficulty: "moyen",
    tags: ["RC", "charge", "condensateur", "constante de temps", "exponentielle"],
    annales: ["06", "27", "30", "41", "54", "62A", "62B", "63"],
    steps: [
      { text: "Monter le circuit : générateur E, résistance R, condensateur C en série. Brancher la voie EA0 en parallèle sur C (mesure Uc)." },
      { text: "Paramétrer l'acquisition : durée ≈ 5τ (avec τ = RC estimé), fréquence suffisante (10 000 Hz si τ < 10 ms)." },
      { text: "Mettre l'alimentation en marche et déclencher l'acquisition simultanément (ou utiliser le déclenchement sur seuil)." },
      { text: "La courbe Uc(t) doit ressembler à une exponentielle croissante allant de 0 à E." },
      { text: "Vérifier que la courbe atteint bien E (≈ 99 % à t = 5τ). Si elle sature avant, la durée est trop longue ou E trop grand." }
    ],
    tips: "Pour la décharge : déconnecter le générateur et connecter un interrupteur. Uc(t) descend exponentiellement vers 0.",
    warning: "S'assurer que le condensateur est complètement déchargé (Uc = 0) avant de démarrer une nouvelle acquisition de charge."
  },
  {
    id: "rc-2",
    category: "circuit_rc",
    title: "Déterminer la constante de temps τ graphiquement",
    difficulty: "moyen",
    tags: ["constante de temps", "τ", "tangente", "méthode graphique"],
    annales: ["06", "27", "30", "41", "54"],
    steps: [
      { text: "Sur la courbe Uc(t), activer le curseur (icône ⊕ ou Ctrl+L)." },
      { text: "Méthode 1 — lecture directe : τ est le temps pour atteindre Uc = E × (1 − e⁻¹) ≈ 0.632 × E. Placer le curseur à cette valeur sur l'axe Y et lire le temps correspondant." },
      { text: "Méthode 2 — tangente à l'origine : tracer la tangente à la courbe en t = 0. Elle coupe la droite asymptote Uc = E en t = τ. Mesurer ce temps avec le curseur." },
      { text: "Pour la méthode de la tangente dans LatisPro : clic droit sur la courbe → Traitement → Tangente en un point → choisir t = 0." },
      { text: "Comparer la valeur τ trouvée avec τ_théorique = R × C (calculé avec les valeurs des composants)." }
    ],
    tips: "Les deux méthodes doivent donner le même résultat. Si l'écart dépasse 10 %, vérifier les valeurs réelles de R et C avec un multimètre/RLC-mètre.",
    warning: null
  },
  {
    id: "rc-3",
    category: "circuit_rc",
    title: "Ajustement exponentiel pour mesurer τ précisément",
    difficulty: "moyen",
    tags: ["modélisation", "exponentielle", "ajustement", "τ", "RC"],
    annales: ["06", "30", "41", "62A", "62B", "63"],
    steps: [
      { text: "Afficher la courbe Uc(t) dans le graphique." },
      { text: "Clic droit sur la courbe → Modéliser (ou menu Traitement → Modélisation)." },
      { text: "Choisir le modèle Exponentielle : A × (1 − exp(−t / τ)) + B pour une charge, ou A × exp(−t / τ) + B pour une décharge." },
      { text: "Paramètres initiaux : A ≈ valeur maximale de Uc (= E), τ ≈ valeur graphique estimée à l'étape précédente, B ≈ 0." },
      { text: "Cliquer sur Ajuster. LatisPro affiche τ avec son incertitude." },
      { text: "Vérifier : r² doit être > 0.999. Sinon, affiner les paramètres initiaux ou vérifier l'intervalle d'ajustement." },
      { text: "Relever τ ± u(τ) et comparer à τ_théorique = RC." }
    ],
    tips: "Si l'ajustement ne converge pas, essayer des valeurs initiales différentes — l'algorithme est sensible au point de départ.",
    warning: "Bien sélectionner l'intervalle d'ajustement (exclure la zone avant le déclenchement) pour obtenir un bon résultat."
  },

  // ══════════════════════════════════════════════════
  // CATÉGORIE : SUIVI SPECTRO / COLORIMÉTRIE
  // ══════════════════════════════════════════════════
  {
    id: "spectro-1",
    category: "spectro",
    title: "Configurer un suivi spectrophotométrique (absorbance vs temps)",
    difficulty: "moyen",
    tags: ["spectrophotomètre", "absorbance", "cinétique", "ExAO", "Beer-Lambert"],
    annales: ["12", "29", "43", "44", "49", "72", "76", "77"],
    steps: [
      { text: "Brancher le spectrophotomètre ou colorimètre sur l'interface ExAO (voie EA0 généralement)." },
      { text: "Configurer la voie EA0 : grandeur = Absorbance A (sans unité) ou Transmittance (%). Régler la plage 0–2 ou 0–3." },
      { text: "Régler la longueur d'onde λ sur l'appareil (couleur complémentaire de la teinte de la solution). Ex. solution bleue → λ = 480 nm (jaune-orangé)." },
      { text: "Faire le zéro (blanc) : mettre la cuve avec le solvant pur dans l'appareil, cliquer sur Zéro dans LatisPro ou sur l'appareil." },
      { text: "Paramétrer l'acquisition : mode Temporel, durée = durée prévue de la réaction (5–60 min), fréquence = 1–10 Hz (une mesure toutes les 100 ms à 1 s suffit pour une cinétique lente)." },
      { text: "Lancer l'acquisition, introduire le réactif déclenchant dans la cuve (ou lancer la réaction) et observer A(t) en temps réel." }
    ],
    tips: "Si A reste à 0 : vérifier le zéro et que la cuve est bien dans le faisceau. Si A dépasse 2 : diluer la solution (Beer-Lambert linéaire jusqu'à A ≈ 1).",
    warning: "Le zéro doit être refait à chaque fois qu'on change de longueur d'onde ou de colorimètre."
  },
  {
    id: "spectro-2",
    category: "spectro",
    title: "Tracer une courbe d'étalonnage A = f(C) et déterminer une concentration",
    difficulty: "moyen",
    tags: ["étalonnage", "Beer-Lambert", "concentration", "régression linéaire"],
    annales: ["29", "43", "44", "84"],
    steps: [
      { text: "Préparer les solutions étalons (ex. 5 solutions de concentrations connues C₀, C₁… Cₙ)." },
      { text: "Mesurer l'absorbance A de chaque étalon avec le spectrophotomètre à la longueur d'onde choisie." },
      { text: "Dans LatisPro : créer un tableau avec deux colonnes C (mol/L) et A." },
      { text: "Tracer le graphique A = f(C) (A en ordonnée, C en abscisse)." },
      { text: "Appliquer une régression linéaire passant par l'origine (modèle y = ax) : clic droit sur les points → Modéliser → Droite passant par l'origine." },
      { text: "Relever le coefficient directeur ε × ℓ (= ε en L·mol⁻¹·cm⁻¹ si ℓ = 1 cm)." },
      { text: "Pour la solution inconnue : mesurer A_inconnue, puis lire C = A / (ε × ℓ) ou utiliser la droite d'étalonnage graphiquement." }
    ],
    tips: "Toujours vérifier que les points sont alignés (r² > 0.999) et que la droite passe par l'origine. Si non, refaire le zéro.",
    warning: "La loi de Beer-Lambert n'est valide que pour A < 1.5 environ. Au-delà, diluer."
  },
  {
    id: "spectro-3",
    category: "spectro",
    title: "Suivre une cinétique et en extraire la loi de vitesse (ordre 0, 1, 2)",
    difficulty: "avancé",
    tags: ["cinétique", "ordre", "loi de vitesse", "suivi spectro", "ExAO"],
    annales: ["12", "49", "72", "76", "77"],
    steps: [
      { text: "Acquérir A(t) sur toute la durée de la réaction (voir 'Configurer un suivi spectrophotométrique')." },
      { text: "Convertir A(t) → C(t) grâce à Beer-Lambert : créer une colonne calculée C = A / (epsilon * l)." },
      { text: "Pour tester l'ordre 0 : tracer C = f(t). Si linéaire → ordre 0 (v = k, pente = −k)." },
      { text: "Pour tester l'ordre 1 : créer une colonne ln(C) et tracer ln(C) = f(t). Si linéaire → ordre 1 (pente = −k)." },
      { text: "Pour tester l'ordre 2 : créer une colonne 1/C et tracer 1/C = f(t). Si linéaire → ordre 2 (pente = k)." },
      { text: "Appliquer une régression linéaire sur le graphique qui donne la meilleure droite (r² le plus proche de 1)." },
      { text: "Relever la valeur de k avec son unité (s⁻¹ pour ordre 1, L·mol⁻¹·s⁻¹ pour ordre 2)." }
    ],
    tips: "En pratique, les ECE 2026 demandent surtout l'ordre 1. Si le sujet parle d'autocatalyse ou de dégradation, penser ordre 1.",
    warning: "La dérivée de C(t) donne directement la vitesse v = −dC/dt, mais elle est bruitée. Préférer la méthode des graphes ln(C) ou 1/C."
  },

  // ══════════════════════════════════════════════════
  // CATÉGORIE : TITRAGES
  // ══════════════════════════════════════════════════
  {
    id: "titrage-1",
    category: "titrage",
    title: "Réaliser un dosage pH-métrique et trouver l'équivalence",
    difficulty: "moyen",
    tags: ["pH", "électrode", "équivalence", "saut de pH", "titrage"],
    annales: ["01", "17", "68", "70", "90"],
    steps: [
      { text: "Brancher l'électrode pH-métrique sur la voie ExAO configurée en pH (plage 0–14)." },
      { text: "Étalonner le pH-mètre avec les solutions tampon 4 et 7 (ou 7 et 10) avant de commencer." },
      { text: "Mode acquisition : Manuel / Point par point. Variable X = Volume versé (mL), Variable Y = pH." },
      { text: "Verser la solution titrante par la burette : d'abord par volumes de 2 mL loin de l'équivalence, puis 0.2–0.5 mL autour du saut de pH." },
      { text: "Mémoriser chaque point après stabilisation du pH (attendre quelques secondes)." },
      { text: "Déterminer le volume équivalent Veq :" },
      { subSteps: [
          "Méthode graphique : repérer le point d'inflexion du saut de pH à mi-hauteur.",
          "Méthode de la dérivée : clic droit → Traitement → Dériver. Le maximum de dpH/dV donne Veq.",
          "Méthode des tangentes : tracer deux tangentes au saut + la médiatrice → intersection = Veq."
        ]
      }
    ],
    tips: "Si le saut de pH est peu marqué (acide faible / base faible), la méthode de la dérivée est plus fiable que la lecture graphique.",
    warning: "Ne pas laisser l'électrode de verre à sec — la remettre dans la solution de conservation entre les titrages."
  },
  {
    id: "titrage-2",
    category: "titrage",
    title: "Réaliser un dosage conductimétrique et trouver l'équivalence",
    difficulty: "moyen",
    tags: ["conductimétrie", "conductivité", "équivalence", "rupture de pente"],
    annales: ["13", "61", "74"],
    steps: [
      { text: "Brancher la cellule conductimétrique sur la voie ExAO (configurée en Conductivité σ en mS/cm ou S/m)." },
      { text: "Vérifier la constante de cellule K (indiquée sur la cellule). Entrer K dans LatisPro si nécessaire." },
      { text: "Mode acquisition : Manuel. X = Volume versé (mL), Y = Conductivité σ." },
      { text: "Verser la solution titrante mL par mL (régulier), mémoriser chaque point." },
      { text: "Tracer σ = f(V) : la courbe présente deux portions linéaires de pentes différentes. L'intersection = Veq." },
      { text: "Pour trouver Veq précisément : faire deux régressions linéaires (une sur chaque branche), noter les équations de droite et calculer l'abscisse à l'intersection." }
    ],
    tips: "La conductivité doit être corrigée par la dilution si le volume versé est significatif devant le volume initial : σ_corrigée = σ × (V0 + V)/V0.",
    warning: "Rincer la cellule conductimétrique avec la solution à mesurer avant de commencer (pas avec de l'eau distillée seule qui change la concentration)."
  },
  {
    id: "titrage-3",
    category: "titrage",
    title: "Tracer et analyser la courbe dérivée dpH/dV",
    difficulty: "moyen",
    tags: ["dérivée", "dpH/dV", "équivalence", "maximum"],
    annales: ["01", "17", "68", "70"],
    steps: [
      { text: "Après acquisition du titrage pH-métrique, afficher la courbe pH = f(V)." },
      { text: "Clic droit sur la courbe → Traitement → Dériver (ou menu Traitement → Dériver)." },
      { text: "LatisPro trace automatiquement dpH/dV = f(V) en pointillés ou dans une nouvelle fenêtre." },
      { text: "Le maximum de la dérivée correspond au point d'inflexion = Veq." },
      { text: "Utiliser le curseur pour lire précisément la valeur de V au maximum." }
    ],
    tips: "Avoir des points resserrés autour de l'équivalence améliore la précision de la dérivée. Avec seulement 3–4 points dans le saut, le maximum peut être mal défini.",
    warning: "La dérivée amplifie le bruit. Si la courbe est très hachée, lisser d'abord le pH = f(V) avant de dériver."
  },

  // ══════════════════════════════════════════════════
  // CATÉGORIE : POINTAGE VIDÉO
  // ══════════════════════════════════════════════════
  {
    id: "video-1",
    category: "video",
    title: "Importer une vidéo dans LatisPro et paramétrer le pointage",
    difficulty: "moyen",
    tags: ["pointage vidéo", "mécanique", "trajectoire", "cinématique"],
    annales: ["09", "34", "35", "39", "47", "83"],
    steps: [
      { text: "Dans LatisPro, aller dans Expérience → Nouveau → Analyse vidéo (ou ouvrir l'onglet Vidéo)." },
      { text: "Importer la vidéo : Fichier → Importer vidéo. Formats acceptés : .mp4, .avi, .mov (vérifier la compatibilité)." },
      { text: "Définir l'étalon de longueur : cliquer sur deux points de référence de longueur connue dans l'image (ex. une règle graduée, un objet de taille connue). Entrer la longueur réelle." },
      { text: "Définir l'origine du repère : cliquer sur le point voulu comme origine (O). Orienter les axes X (horizontal) et Y (vertical, vers le haut)." },
      { text: "Choisir la fréquence de pointage : si la vidéo est à 25 fps, pointer toutes les images = 25 Hz, ou une image sur deux = 12.5 Hz." }
    ],
    tips: "Filmer avec une règle visible dans le champ (en arrière-plan, au niveau du mouvement) pour avoir un étalon fiable.",
    warning: "L'axe Y doit être vers le haut pour que la composante de g soit négative (convention habituelle)."
  },
  {
    id: "video-2",
    category: "video",
    title: "Pointer image par image et obtenir x(t), y(t)",
    difficulty: "moyen",
    tags: ["pointage", "image par image", "trajectoire", "x(t)", "y(t)"],
    annales: ["09", "34", "35", "39", "47"],
    steps: [
      { text: "Avancer à la première image utile (début du mouvement)." },
      { text: "Cliquer précisément sur le centre de masse de l'objet (ou le point suivi). LatisPro enregistre les coordonnées (x, y) et passe à l'image suivante." },
      { text: "Répéter pour chaque image jusqu'à la fin du mouvement." },
      { text: "LatisPro génère automatiquement le tableau avec les colonnes : t, x(t), y(t)." },
      { text: "Tracer x(t) et y(t) dans la fenêtre graphique pour vérifier la cohérence du pointage." }
    ],
    tips: "Zoomer sur l'objet pour pointer plus précisément. Utiliser les touches ← → du clavier pour avancer/reculer image par image.",
    warning: "Si le centre de masse est flou (mouvement rapide = flou de bougé), pointer toujours le même bord de l'objet pour la cohérence."
  },
  {
    id: "video-3",
    category: "video",
    title: "Calculer vx, vy, v et vérifier les lois de la mécanique",
    difficulty: "avancé",
    tags: ["vitesse", "dérivée", "énergie mécanique", "chute libre", "mouvement"],
    annales: ["09", "34", "35", "39", "47", "83"],
    steps: [
      { text: "Après le pointage, créer les colonnes de vitesse par calcul numérique (méthode des taux d'accroissement centrés) :" },
      { subSteps: [
          "vx = (x[i+1] − x[i−1]) / (2 × Δt)",
          "vy = (y[i+1] − y[i−1]) / (2 × Δt)",
          "v = sqrt(vx² + vy²)"
        ]
      },
      { text: "Alternative : clic droit sur la courbe x(t) → Dériver → LatisPro calcule vx(t) automatiquement." },
      { text: "Pour vérifier la chute libre : tracer vy(t). La pente = g ≈ −9.81 m/s² (régression linéaire sur vy = f(t))." },
      { text: "Pour l'énergie mécanique : calculer Ec = ½mv², Ep = mgy, Em = Ec + Ep. Tracer Em(t) — doit être constant (conservation si pas de frottements)." }
    ],
    tips: "La vitesse calculée par dérivée numérique est bruitée. Lisser x(t) et y(t) avant de dériver si les points semblent irréguliers.",
    warning: "La masse m est souvent donnée dans le sujet ou à mesurer. Sans m, on ne peut calculer Ec et Ep qu'en facteur de m."
  },

  // ══════════════════════════════════════════════════
  // CATÉGORIE : TABLEUR & PYTHON
  // ══════════════════════════════════════════════════
  {
    id: "tab-1",
    category: "tableur",
    title: "Créer une colonne calculée dans le tableur LatisPro",
    difficulty: "facile",
    tags: ["colonne calculée", "formule", "tableau"],
    annales: ["10", "13", "14", "17", "32", "34", "38", "43", "44", "49", "60", "73", "74", "76", "77", "79", "82", "84", "86", "87", "88"],
    steps: [
      { text: "Dans le tableau de données, faire un clic droit sur l'en-tête d'une colonne vide → Insérer une colonne calculée (ou Nouvelle grandeur calculée)." },
      { text: "Donner un nom à la grandeur (ex. 'ln_C', 'Em', 'C_corr') et choisir l'unité." },
      { text: "Écrire la formule en utilisant les noms exacts des colonnes (sensibles à la casse) :" },
      { subSteps: [
          "Arithmétique : U_R - U_C, (m * v^2) / 2",
          "Fonctions : ln(C), log(A), exp(-t/tau), sqrt(vx^2 + vy^2)",
          "Constantes : 9.81 pour g, pi pour π"
        ]
      },
      { text: "Valider. La colonne se remplit automatiquement pour toutes les lignes." }
    ],
    tips: "Si la colonne affiche des erreurs (#DIV/0!, NaN), vérifier qu'aucune valeur source n'est nulle ou négative (ex. ln(0) = indéfini).",
    warning: null
  },
  {
    id: "tab-2",
    category: "tableur",
    title: "Utiliser le tableur intégré pour calculer moyenne, écart-type, incertitude",
    difficulty: "moyen",
    tags: ["statistiques", "moyenne", "écart-type", "incertitude", "type A"],
    annales: ["10", "13", "14", "38", "51", "58", "65", "67", "73", "86", "87", "88"],
    steps: [
      { text: "Entrer les n mesures répétées dans une colonne du tableau (ex. colonne 'mesures')." },
      { text: "Créer des cellules de résultats en bas du tableau (ou dans de nouvelles colonnes) :" },
      { subSteps: [
          "Moyenne : moy(mesures) ou moyenne(mesures)",
          "Écart-type : ecartype(mesures) ou std(mesures)",
          "Incertitude-type : ecartype(mesures) / racine(n)"
        ]
      },
      { text: "Pour l'incertitude élargie U (k = 2, niveau de confiance 95 %) : U = 2 × u(x)." },
      { text: "Résultat final à exprimer : x̄ ± U avec la bonne unité et le bon arrondi." }
    ],
    tips: "L'incertitude-type u(x) = s/√n. Avec n = 5 mesures et s = 0.3, on obtient u = 0.13 (arrondir à 0.1).",
    warning: "Ne pas confondre ECARTYPE (population) et ECARTYPEP (échantillon) — utiliser ECARTYPE (divisé par n−1) pour des mesures expérimentales."
  },
  {
    id: "tab-3",
    category: "tableur",
    title: "Créer un graphique avec le tableur et mettre en forme les axes",
    difficulty: "facile",
    tags: ["graphique", "axes", "titre", "unité", "tableur"],
    annales: ["10", "14", "38", "43", "44", "49", "60", "65", "73", "82", "84", "88"],
    steps: [
      { text: "Sélectionner les colonnes de données (X et Y) dans le tableau." },
      { text: "Menu Affichage → Nouveau graphique, ou faire glisser les colonnes vers la fenêtre graphique." },
      { text: "Double-cliquer sur l'axe X : renseigner le titre (nom de la grandeur), l'unité entre parenthèses." },
      { text: "Faire de même pour l'axe Y." },
      { text: "Choisir le type de représentation : points (données expérimentales), ou ligne (si courbe modèle)." },
      { text: "Ajouter un titre au graphique : clic droit → Propriétés du graphique → Titre." }
    ],
    tips: "Convention : titre d'axe = 'Grandeur (Unité)'. Ex. : 'Absorbance A (sans unité)' ou 'Temps t (s)'.",
    warning: null
  },
  {
    id: "tab-4",
    category: "tableur",
    title: "Exécuter et modifier un script Python fourni dans le sujet",
    difficulty: "moyen",
    tags: ["Python", "script", "incertitudes", "exécution", "Thonny", "Mu"],
    annales: ["01", "03", "09", "19", "20", "22", "34", "35", "38", "41", "47", "50", "52", "59", "64", "65", "78", "80", "89A", "89B"],
    steps: [
      { text: "Télécharger le fichier .py fourni avec le sujet (ou le recopier depuis l'annexe papier)." },
      { text: "Ouvrir le fichier dans l'éditeur Python installé sur le poste (Thonny, Mu, ou IDE Python)." },
      { text: "Lire le script : identifier les variables à renseigner (souvent commentées avec # À COMPLÉTER ou # Entrer la valeur)." },
      { text: "Remplacer les valeurs placeholder (ex. l = ... ou C = 0) par les valeurs mesurées." },
      { text: "Exécuter avec F5 (Thonny) ou le bouton ▶. Lire les résultats dans la console." },
      { text: "Si une erreur apparaît : lire le message (ligne incriminée), corriger (virgule oubliée, mauvaise indentation, variable non définie…)." }
    ],
    tips: "Les scripts ECE calculent souvent des incertitudes (propagation) ou tracent un graphique. Les valeurs à entrer sont toujours clairement indiquées.",
    warning: "En Python, les décimales s'écrivent avec un point (.) et non une virgule (,). Ex : 1.25 et non 1,25."
  },
  {
    id: "tab-5",
    category: "tableur",
    title: "Calculer et propager les incertitudes (méthode ECE)",
    difficulty: "avancé",
    tags: ["incertitudes", "propagation", "type B", "type A", "composition"],
    annales: ["01", "06", "13", "22", "30", "34", "51", "59", "62A", "62B", "74", "77"],
    steps: [
      { text: "Identifier la formule de la grandeur résultat (ex. C = n/V, R = U/I, τ = RC)." },
      { text: "Calcul d'incertitude de type A (répétabilité) : u_A(x) = s / √n (écart-type / racine du nombre de mesures)." },
      { text: "Calcul d'incertitude de type B (instrument) : u_B(x) = résolution / (2√3) pour une distribution uniforme (ex. règle, balance, burette)." },
      { text: "Combiner les composantes : u(x) = √(u_A(x)² + u_B(x)²)." },
      { text: "Propager sur la grandeur résultat :" },
      { subSteps: [
          "Produit/quotient : [u(R)/R]² = [u(U)/U]² + [u(I)/I]²",
          "Somme/différence : u(R)² = u(U)² + u(I)²",
          "Fonction f(x) : u(f) = |df/dx| × u(x)"
        ]
      },
      { text: "Exprimer le résultat : G ± u(G) avec l'unité, arrondir u à 1 (ou 2 si premier chiffre est 1) chiffre(s) significatif(s)." }
    ],
    tips: "Pour une burette de 25 mL graduée à 0.1 mL : u_B(V) = 0.1 / (2√3) ≈ 0.029 mL ≈ 0.03 mL.",
    warning: "L'incertitude élargie U = 2u(x) (k=2) correspond à 95% de confiance. Le sujet précise souvent lequel utiliser."
  },

  // ══════════════════════════════════════════════════
  // CATÉGORIE : MODÉLISATION & RÉGRESSION
  // ══════════════════════════════════════════════════
  {
    id: "mod-1",
    category: "modelisation",
    title: "Régression linéaire (droite y = ax + b ou y = ax)",
    difficulty: "facile",
    tags: ["régression linéaire", "droite", "coefficient directeur", "r²"],
    annales: ["02", "04", "10", "13", "14", "17", "29", "32", "34", "43", "44", "49", "58", "60", "65", "74", "76", "77", "82", "84", "86", "87", "88"],
    steps: [
      { text: "Afficher les points expérimentaux dans le graphique." },
      { text: "Clic droit sur les points → Modéliser, ou menu Traitement → Modélisation." },
      { text: "Choisir Droite (ax + b) ou Droite passant par l'origine (ax) si la physique l'impose (proportionnalité)." },
      { text: "Sélectionner l'intervalle de régression en cliquant les deux bornes sur l'axe X." },
      { text: "LatisPro affiche la droite ajustée, les valeurs de a et b, et le coefficient de corrélation r²." },
      { text: "Vérifier r² > 0.99 (acceptable) ou > 0.999 (excellent). En dessous de 0.99, le modèle linéaire est discutable." },
      { text: "Relever a ± u(a) et b ± u(b) pour l'exploitation physique." }
    ],
    tips: "Pour une loi de Beer-Lambert A = ε·ℓ·C : utiliser la droite passant par l'origine. La pente = ε·ℓ.",
    warning: "La régression linéaire ne signifie pas que la loi est vraiment linéaire : toujours vérifier avec l'analyse physique."
  },
  {
    id: "mod-2",
    category: "modelisation",
    title: "Ajustement exponentiel et extraction des paramètres",
    difficulty: "moyen",
    tags: ["exponentielle", "modèle", "ajustement", "τ", "constante de temps"],
    annales: ["06", "30", "41", "47", "62A", "62B", "63", "64", "65"],
    steps: [
      { text: "Afficher la courbe à ajuster." },
      { text: "Clic droit → Modéliser → choisir dans la bibliothèque 'Exponentielle décroissante' : A×exp(−x/τ) + B, ou 'Exponentielle croissante' : A×(1−exp(−x/τ)) + B." },
      { text: "Entrer les valeurs initiales des paramètres (A ≈ amplitude, τ ≈ valeur graphique, B ≈ asymptote)." },
      { text: "Cliquer Ajuster. Vérifier la convergence : r² > 0.999." },
      { text: "Relever τ ± u(τ)." }
    ],
    tips: "Si A, τ, B initiaux sont très éloignés des vraies valeurs, l'algorithme peut converger vers un minimum local. Essayer plusieurs valeurs de départ.",
    warning: null
  },
  {
    id: "mod-3",
    category: "modelisation",
    title: "Ajustement sinusoïdal (signaux électriques, oscillations)",
    difficulty: "moyen",
    tags: ["sinusoïde", "signal", "fréquence", "amplitude", "phase"],
    annales: ["11"],
    steps: [
      { text: "Acquérir le signal sinusoïdal (ex. tension aux bornes d'un condensateur, son, signal Doppler)." },
      { text: "Clic droit sur la courbe → Modéliser → Sinusoïde : A × sin(2π × f × t + φ) + B." },
      { text: "Valeurs initiales : A ≈ amplitude visuelle (moitié de la hauteur pic à pic), f ≈ 1/T (T période lue sur le graphique), φ ≈ 0, B ≈ 0 si signal centré." },
      { text: "Ajuster. LatisPro renvoie A, f, φ, B avec leurs incertitudes." },
      { text: "Calculer T = 1/f et comparer à la valeur du GBF (ou la valeur attendue)." }
    ],
    tips: "Prendre l'intervalle d'ajustement sur plusieurs périodes complètes pour améliorer la précision sur f.",
    warning: null
  },
  {
    id: "mod-4",
    category: "modelisation",
    title: "Ajustement en loi de puissance (y = a·xⁿ)",
    difficulty: "avancé",
    tags: ["loi de puissance", "log-log", "ajustement", "puissance"],
    annales: ["47", "80"],
    steps: [
      { text: "Tracer d'abord le graphique brut. Si la courbe ressemble à une puissance, on peut le vérifier en passant en log-log." },
      { text: "Méthode directe : Modéliser → Puissance : a × x^n. Entrer n ≈ valeur estimée (2 pour parabole, 0.5 pour racine…)." },
      { text: "Méthode log-log : créer des colonnes ln(x) et ln(y), tracer ln(y) = f(ln(x)). Si la loi est en puissance, le graphique est linéaire de pente n." },
      { text: "La régression linéaire sur le graphique log-log donne n (pente) et ln(a) (ordonnée à l'origine)." }
    ],
    tips: "La loi de Stokes (force de frottement visqueux) et certaines lois de chute suivent une puissance.",
    warning: null
  },

  // ══════════════════════════════════════════════════
  // CATÉGORIE : AUTRES MANIPS FRÉQUENTES
  // ══════════════════════════════════════════════════
  {
    id: "autres-1",
    category: "autres",
    title: "Mesure calorimétrique avec ExAO (suivi de température)",
    difficulty: "moyen",
    tags: ["calorimétrie", "température", "thermosonde", "ExAO"],
    annales: ["22", "64", "65"],
    steps: [
      { text: "Brancher la thermosonde sur la voie ExAO (EA0), configurer en Température (°C), plage 0–100°C." },
      { text: "Paramétrer l'acquisition : mode temporel, durée 3–10 min, fréquence 1–2 Hz." },
      { text: "Lancer l'acquisition, puis verser le liquide chaud (ou froid) dans le calorimètre." },
      { text: "Observer la courbe T(t) : montée rapide puis plateau (équilibre thermique)." },
      { text: "Lire la température d'équilibre T_eq avec le curseur (au niveau du plateau)." },
      { text: "Calculer la chaleur échangée : Q = m × c × ΔT où ΔT = T_eq − T_initial." }
    ],
    tips: "Agiter doucement pendant l'expérience pour accélérer l'équilibre. Si la température dérive lentement après le plateau, extrapoler à t = 0 du mélange.",
    warning: "Attendre la fin de la montée thermique avant de lire T_eq. Un plateau non atteint = valeur erronée."
  },
  {
    id: "autres-2",
    category: "autres",
    title: "Mesure de diffraction (fente / fil / réseau) et exploitation",
    difficulty: "moyen",
    tags: ["diffraction", "fente", "réseau", "longueur d'onde", "laser"],
    annales: ["18", "21", "52", "59", "78", "89A", "89B"],
    steps: [
      { text: "Monter le montage : laser → fente (ou fil, ou réseau) → écran à distance D mesurée avec une règle." },
      { text: "Mesurer la largeur de la tache centrale 2L (distance du 1er minimum à gauche au 1er minimum à droite)." },
      { text: "Pour une fente de largeur a : λ = a × L / D (avec L = demi-largeur tache centrale)." },
      { text: "Pour un réseau de pas p : sin(θ) = n × λ / p → λ = p × sin(θ) / n. Mesurer la position des taches d'ordre 1 (n=1)." },
      { text: "Dans LatisPro (si sujet Python/tableur) : entrer les mesures de L, D, a dans le tableau et calculer λ par formule." },
      { text: "Comparer λ mesuré à la valeur constructeur du laser (ex. λ = 632 nm pour rouge He-Ne)." }
    ],
    tips: "Mesurer D (distance fente-écran) avec précision : une erreur sur D se répercute directement sur λ.",
    warning: "Ne jamais regarder directement le faisceau laser (même de faible puissance). Toujours vérifier que le faisceau est dirigé vers l'écran."
  },
  {
    id: "autres-3",
    category: "autres",
    title: "Suivi conductimétrique d'une réaction (sans titrage)",
    difficulty: "moyen",
    tags: ["conductimétrie", "cinétique", "suivi", "ExAO"],
    annales: ["79"],
    steps: [
      { text: "Brancher la cellule conductimétrique sur la voie ExAO (configurée en conductivité σ, mS/cm)." },
      { text: "Paramétrer l'acquisition temporelle (ex. 30 min, 1 mesure/s)." },
      { text: "Lancer l'acquisition, mélanger les réactifs et observer σ(t) évoluer au cours de la réaction." },
      { text: "Les ions consommés/produits modifient la conductivité : une réaction produisant des ions H⁺ augmente σ (très mobiles)." },
      { text: "À l'état final : σ_final donne la composition du milieu réactionnel." }
    ],
    tips: "La conductivité dépend de la nature des ions (mobilité) et de leur concentration. Consulter les conductivités molaires ioniques λ si besoin.",
    warning: null
  },
  {
    id: "autres-4",
    category: "autres",
    title: "Utiliser Arduino / micro:bit avec LatisPro",
    difficulty: "avancé",
    tags: ["Arduino", "micro:bit", "capteur", "numérique", "programme"],
    annales: ["06", "11", "21", "62A", "62B"],
    steps: [
      { text: "Téléverser le programme fourni dans le sujet sur la carte (Arduino IDE ou éditeur micro:bit)." },
      { text: "Brancher la carte en USB. Dans LatisPro, sélectionner le port série correspondant (ex. COM3)." },
      { text: "Configurer la voie ExAO ou la voie Arduino selon le type de sortie du programme (tension analogique ou valeurs numériques en série)." },
      { text: "Lancer l'acquisition dans LatisPro. Les données envoyées par la carte apparaissent dans le tableau." },
      { text: "Si le sujet demande de modifier le programme : identifier les lignes à changer (délai, seuil, fréquence) et recompiler." }
    ],
    tips: "Les sujets avec Arduino fournissent toujours le code source. Lire le programme pour comprendre ce qu'il mesure et à quelle fréquence.",
    warning: "Vérifier que le port COM sélectionné dans LatisPro correspond bien à la carte (gestionnaire de périphériques Windows)."
  },
  {
    id: "autres-5",
    category: "autres",
    title: "Exporter graphique et données pour le compte-rendu",
    difficulty: "facile",
    tags: ["export", "PNG", "CSV", "sauvegarde", "rapport", ".ltp"],
    annales: [],
    steps: [
      { text: "Sauvegarder l'expérience LatisPro : Fichier → Enregistrer (Ctrl+S) → format .ltp ou .exp. Faire cela régulièrement." },
      { text: "Exporter un graphique en image : clic droit dans la fenêtre graphique → Exporter → Image (PNG recommandé, 300 dpi pour impression)." },
      { text: "Exporter les données en CSV : Fichier → Exporter → Données. Choisir séparateur (point-virgule pour Excel FR)." },
      { text: "Copier-coller un graphique dans Word : Ctrl+C dans LatisPro → Ctrl+V dans Word. Préférer Collage spécial → Métafichier (EMF) pour ne pas pixelliser." }
    ],
    tips: "Sauvegarder sur clé USB en fin de séance — les ordis du labo peuvent être réinitialisés.",
    warning: "Ne supprimer aucune courbe originale avant d'avoir sauvegardé. Les données brutes sont irremplaçables."
  }
];