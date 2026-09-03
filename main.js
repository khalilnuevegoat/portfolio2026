/* =============================================
   CYBER PORTFOLIO — SCRIPTS
   ============================================= */

// ─── NAVBAR SCROLL ───
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(0,255,144,0.15)'
    : 'var(--border)';
});

// ─── SMOOTH SCROLL pour les ancres ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── RÉVÉLATION AU SCROLL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, .info-card, .comp-item, .tech-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Ajout de la classe CSS pour l'animation
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
});

// ─── TERMINAL TYPEWRITER (Hero) ───
const terminalLines = document.querySelectorAll('.terminal-body p');
if (terminalLines.length) {
  terminalLines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s';
      line.style.opacity = '1';
    }, i * 250);
  });
}

// ─── FORMULAIRE DE CONTACT ───
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = 'Envoi en cours...';
    btn.style.pointerEvents = 'none';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.innerHTML = 'Message envoyé ✓';
        btn.style.background = '#00ff90';
        form.reset();
      } else {
        btn.innerHTML = 'Erreur — réessayer';
        btn.style.background = 'var(--danger)';
      }
    } catch (err) {
      btn.innerHTML = 'Erreur réseau';
      btn.style.background = 'var(--danger)';
    }

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.pointerEvents = '';
    }, 3000);
  });
}

// ─── EMAIL OBFUSCATION ───
(function() {
  const u = 'khalil.bendref';
  const d = 'etu.univ-grenoble-alpes';
  const t = 'fr';
  const fullEmail = u + '@' + d + '.' + t;

  const link = document.getElementById('emailLink');
  const display = document.getElementById('emailDisplay');

  if (link && display) {
    // Affichage obfusqué au chargement
    display.textContent = u + ' [at] ' + d + ' [dot] ' + t;

    let revealed = false;
    link.addEventListener('click', function(e) {
      if (!revealed) {
        e.preventDefault();
        link.href = 'mailto:' + fullEmail;
        display.textContent = fullEmail;
        revealed = true;
      }
      // Au 2ème clic, le mailto: s'ouvre normalement
    });
  }
})();


// ─── DONNÉES DES PROJETS ───
const PROJECTS = {
 1: {
  filePath: '~/projets/chatbot.md',
  type: 'DÉVELOPPEMENT — JAVA',
  title: 'Chatbot de culture générale',
  meta: { team: '2 pers.', duration: '1 semaine', year: '2024-2025' },
  description: `Création d'un chatbot capable de répondre à des questions de culture générale en s'appuyant sur un index pré-construit et un thésaurus. L'enjeu était de combiner rapidité de recherche et fiabilité des réponses, en exploitant des algorithmes optimisés comme la recherche dichotomique, tout en gérant la continuité d'une conversation.`,
  objectives: [
    'Concevoir un chatbot fiable et rapide',
    'Optimiser le temps de recherche grâce à un index et à la dichotomie',
    'Améliorer la pertinence des réponses via un thésaurus',
    `Gérer le contexte d'une conversation pour permettre des questions de suivi`
  ],
  tech: ['Java', 'Index', 'Dichotomie', 'Thésaurus', 'POO'],
  group: `Projet réalisé en binôme. Nous avons principalement travaillé ensemble pendant les heures dédiées, ce qui a permis une conception partagée de l'architecture et des choix algorithmiques. Les décisions techniques étaient prises à deux, avec des revues croisées du code au fur et à mesure.`,
  role: `Je me suis occupé en particulier de la gestion du contexte conversationnel : la fonction qui permet au chatbot de comprendre des questions enchaînées comme "Qui a peint la Joconde ?" suivi de "Quand ?" — le chatbot devait alors retrouver de qui on parlait pour donner la bonne réponse. La sauvegarde de ce contexte entre deux questions a été la principale difficulté à résoudre, et c'est sur cette partie que j'ai concentré l'essentiel de mon travail individuel.`,
  skills_acquired: [
    `Concevoir et exploiter un index pour accélérer la recherche`,
    'Implémenter de la recherche dichotomique en Java',
    `Utiliser un thésaurus pour enrichir les correspondances de mots-clés`,
    `Gérer un état conversationnel (mémorisation du contexte entre questions)`,
    'Programmation orientée objet : classes, héritage, encapsulation',
    `Travailler efficacement en binôme sous contrainte de temps (projet ambitieux livré complet dans le délai imparti)`
  ],
  competences: [
    { code: 'C1', title: `Réaliser un développement d'application` },
    { code: 'C2', title: 'Optimiser des applications informatiques' }
  ]
},

 2: {
  filePath: '~/projets/hardis.md',
  type: 'DÉVELOPPEMENT WEB — HTML / CSS / JS',
  title: 'Site web institutionnel — Hardis Groupe',
  meta: { team: 'TEAM:05', duration: '1 mois', year: '2024-2025', code: 'SAE_S1.05/06' },
  description: `Création d'un site web complémentaire pour l'ESN Hardis Groupe, à destination des élèves de 3ème en recherche de stage. L'enjeu était de rendre accessible le monde de l'entreprise à un public jeune et non-initié, avec un effort de vulgarisation du contenu et de sobriété visuelle.`,
  objectives: [
    `Rendre accessible le monde de l'entreprise à des collégiens`,
    'Vulgariser le vocabulaire technique et économique',
    'Concevoir un site sobre visuellement et écologiquement',
    'Respecter les standards web et les bonnes pratiques'
  ],
  tech: ['HTML', 'CSS', 'JavaScript', 'Maquette', 'Recueil de besoins'],
  group: `Équipe de 5 personnes avec un chef de projet. Le travail s'est déroulé en plusieurs phases : recherche d'informations sur l'entreprise, conception de la maquette, puis développement du site. La répartition des tâches s'est faite par compétences, avec des points de validation collectifs à chaque étape clé.`,
  role: `Je me suis principalement occupé du CSS et de la disposition des éléments sur le site : structure des pages, mise en page responsive, hiérarchie visuelle. Au-delà du code, j'ai également joué un rôle important dans la validation des étapes du projet — relecture critique des livrables, vérification de la cohérence entre la maquette et l'implémentation, et discussions sur les choix techniques avant chaque rendu.`,
 skills_acquired: [
  'Mettre en page un site web en CSS de façon responsive',
  `Hiérarchiser visuellement l'information pour un public non-initié`,
  `Assurer la cohérence entre une maquette et son implémentation`,
  `Collaborer dans une équipe de 5 avec validation par étapes`,
  `Concevoir un site sobre visuellement et écologiquement`
],
  competences: [
    { code: 'C1', title: `Réaliser un développement d'application` },
    { code: 'C5', title: 'Conduire un projet' },
    { code: 'C6', title: 'Travailler dans une équipe informatique' }
  ]
},
 3: {
  filePath: '~/projets/tourmentin.md',
  type: 'BASE DE DONNÉES — POSTGRESQL',
  title: 'Base de données — Le Tourmentin',
meta: { team: '2 pers.', duration: '3 semaines', year: '2024-2025', code: 'SAE_S1.04' },  description: `Conception et implémentation complète d'une base PostgreSQL pour une association d'activités maritimes. À partir de règles de gestion fournies, le projet couvrait la modélisation conceptuelle, l'écriture des scripts SQL de création et de tests, des requêtes avancées et des modifications dynamiques du schéma.`,
  objectives: [
    `Modéliser une base de données à partir de règles de gestion (MCD / MLD)`,
    `Implémenter le schéma en SQL avec contraintes d'intégrité`,
    'Écrire des requêtes SQL avancées (jointures, agrégations, sous-requêtes)',
    'Mettre à jour et modifier le schéma en production'
  ],
  tech: ['PostgreSQL', 'SQL', 'MCD / MLD', `Contraintes d'intégrité`, 'DBeaver'],
  group: `Le projet était officiellement à réaliser en binôme. Dans les faits, j'ai porté la totalité du travail technique : modélisation, scripts, requêtes et rendus. Cette autonomie m'a permis de m'approprier l'ensemble du cycle de conception d'une base de données relationnelle.`,
  role: `J'ai assumé seul l'intégralité des étapes : analyse des règles de gestion, conception du MCD puis dérivation du MLD, écriture des scripts create.sql / drop.sql / test.sql, rédaction de toutes les requêtes SQL avancées, et application des modifications de schéma. J'ai également produit la documentation et les bilans associés à chaque rendu.`,
  skills_acquired: [
    'Modéliser une base relationnelle à partir de règles de gestion',
    `Dériver un MLD depuis un MCD selon les règles de traduction`,
    `Écrire des contraintes d'intégrité référentielles et de domaine`,
    'Maîtriser le SQL avancé (jointures multiples, GROUP BY, sous-requêtes)',
    'Modifier dynamiquement un schéma en production (ALTER TABLE)',
    `Gérer en autonomie un projet de bout en bout sous contrainte de délai`
  ],
  competences: [
    { code: 'C4', title: `Gérer des données de l'information` }
  ]
},
 4: {
  filePath: '~/projets/poste-dev.md',
  type: 'SYSADMIN — DEBIAN',
  title: `Installation d'un poste de développement`,
  meta: { team: 'SOLO', duration: '1 semaine', year: '2024-2025' },
  description: `Mise en place d'une machine virtuelle sous Debian 13 avec l'environnement de bureau KDE Plasma, installation d'un environnement de développement complet (JDK, Git, IntelliJ IDEA) et comparaison de trois méthodes d'installation différentes pour IntelliJ : Snap, Flatpak et archive téléchargée. Le projet s'est conclu par la production d'une carte mentale documentant la procédure complète.`,
  objectives: [
    'Installer et configurer une VM Debian 13 fonctionnelle',
    'Déployer un environnement de développement complet (JDK, Git, IntelliJ)',
    `Comparer trois méthodes d'installation (Snap, Flatpak, archive)`,
    'Documenter la procédure sous forme de carte mentale claire et reproductible'
  ],
  tech: ['Debian 13', 'VM', 'KDE Plasma', 'Snap', 'Flatpak', 'JDK', 'Git', 'Xmind'],
  group: null,
  role: `J'ai réalisé l'intégralité du projet en autonomie. Après l'installation de la VM et de Debian 13, j'ai déployé KDE Plasma puis testé les trois méthodes d'installation d'IntelliJ. Mon retour d'expérience m'a fait privilégier la méthode par archive pour le contrôle qu'elle offre sur la version exacte du logiciel et la simplicité des mises à jour manuelles. La principale difficulté a été la gestion des temps d'installation particulièrement longs, notamment pour les paquets Flatpak — un point à anticiper sur des machines moins puissantes ou avec une connexion limitée. La carte mentale a été réalisée avec Xmind pour offrir une vue d'ensemble synthétique et navigable de la procédure.`,
  skills_acquired: [
    'Installer et configurer une machine virtuelle Debian',
    `Déployer un environnement de bureau (KDE Plasma)`,
    `Comparer et choisir entre plusieurs gestionnaires de paquets`,
    `Maîtriser les méthodes d'installation Snap, Flatpak et par archive`,
    'Documenter une procédure technique sous forme de carte mentale',
    `Diagnostiquer et anticiper des problèmes liés aux ressources système`
  ],
  competences: [
    { code: 'C3', title: 'Administrer des systèmes informatiques communicants complexes' }
  ]
},
5: {
  filePath: '~/projets/bivouacool.md',
  type: 'DÉVELOPPEMENT DESKTOP — JAVA / JAVAFX [ PROJET PHARE ]',
  title: 'Bivouacool',
  meta: { team: '5 pers.', duration: '2 semaines', year: '2025-2026', code: 'MÉGA SAÉ · R2.01/02/05/06' },
  description: `Application de bureau JavaFX pour la gestion de sorties de bivouac en montagne, développée dans le cadre d'un méga SAÉ réparti sur quatre modules (R2.01, R2.02, R2.05, R2.06). Le projet couvre l'ensemble du cycle, du cadrage à la soutenance : modélisation, architecture logicielle, développement de l'application en MVC et documentation.`,
  objectives: [
    `Concevoir une application de gestion de sorties de bivouac en architecture MVC (Java/JavaFX)`,
    `Modéliser la logique métier et les règles de gestion : calculs de matériel/nourriture, liste d'attente, détection de conflits`,
    `Structurer le projet à travers un document de cadrage, un Lean Canvas, des personas et une modélisation UML complète`,
    `Préparer et livrer une soutenance technique bilingue (français/anglais) de 15 minutes`
  ],
  tech: ['Java', 'JavaFX', 'MVC', 'UML'],
  group: `Équipe de 5 personnes, avec une cheffe de projet dédiée au pilotage et une répartition claire des rôles entre les membres. Le méga SAÉ s'est étalé sur plusieurs modules (R2.01, R2.02, R2.05, R2.06), avec des points de coordination réguliers pour aligner développement, modélisation et documentation.`,
  role: `J'ai occupé le rôle de responsable technique. J'ai porté l'architecture MVC de l'application (Java/JavaFX) et la logique métier — calculs de matériel et de nourriture, gestion de la liste d'attente, détection de conflits entre sorties. J'ai également contribué au dossier IHM avec une analyse heuristique selon les critères de Bastien & Scapin, au dossier de modélisation UML, ainsi qu'à la construction de personas et de scénarios d'usage à partir de données sourcées. Côté cadrage, j'ai participé au document de cadrage de projet et au Lean Canvas. Enfin, j'ai préparé les scripts de pitch oral en français et en anglais, et piloté l'ensemble de la soutenance technique de 15 minutes : scripts oraux, scénarios de démonstration, jeux de données de test, et anticipation des questions du jury à partir du code source réel.`,
  skills_acquired: [
    `Concevoir une application desktop complète en architecture MVC (Java/JavaFX)`,
    `Modéliser une logique métier complexe : calculs paramétrés, gestion de liste d'attente, détection de conflits`,
    `Réaliser une analyse heuristique IHM selon les critères de Bastien & Scapin`,
    `Produire un dossier de modélisation UML complet`,
    `Construire des personas et des scénarios d'usage à partir de données sourcées`,
    `Rédiger un document de cadrage de projet et un Lean Canvas`,
    `Préparer un pitch oral bilingue (français/anglais)`,
    `Piloter une soutenance technique de 15 minutes : scripts, démo, jeux de test, anticipation du jury`,
    `Assumer un rôle de responsable technique au sein d'une équipe de 5`
  ],

  competences: [
    { code: 'C1', title: `Réaliser un développement d'application` },
    { code: 'C5', title: 'Conduire un projet' },
    { code: 'C6', title: 'Travailler dans une équipe informatique' }
  ]
},


};
 
 
// ─── OUVERTURE / FERMETURE MODAL ───
function openProjectModal(id) {
  const project = PROJECTS[id];
  if (!project) return;
 
  const modal = document.getElementById('projectModal');
  const filePath = document.getElementById('modalFilePath');
  const body = document.getElementById('modalBody');
 
  filePath.textContent = project.filePath;
 
  // Construction du HTML interne
  let html = '';
 
  // Header
  html += '<div class="mb-header">';
  html += '<span class="mb-type">// ' + project.type + '</span>';
  html += '<h2 class="mb-title">' + project.title + '</h2>';
  html += '<div class="mb-meta-row">';
  html += '<span class="mb-chip"><span class="k">&gt;</span> ' + project.meta.team + '</span>';
  html += '<span class="mb-chip"><span class="k">&gt;</span> DURATION:' + project.meta.duration + '</span>';
  if (project.meta.code) {
    html += '<span class="mb-chip"><span class="k">&gt;</span> ' + project.meta.code + '</span>';
  }
  html += '<span class="mb-chip"><span class="k">&gt;</span> ' + project.meta.year + '</span>';
  html += '</div></div>';
 
  // Description
  html += '<div class="mb-section">';
  html += '<span class="mb-section-label"><span class="accent">//</span> Description</span>';
  html += '<p class="mb-text">' + project.description + '</p>';
  html += '</div>';
 
  // Objectifs
  html += '<div class="mb-section">';
  html += '<span class="mb-section-label"><span class="accent">//</span> Objectifs</span>';
  html += '<ul class="mb-list">';
  project.objectives.forEach(o => { html += '<li>' + o + '</li>'; });
  html += '</ul></div>';
 
  // Technos
  html += '<div class="mb-section">';
  html += '<span class="mb-section-label"><span class="accent">//</span> Technologies & outils</span>';
  html += '<div class="mb-tags">';
  project.tech.forEach(t => { html += '<span class="mb-tag">' + t + '</span>'; });
  html += '</div></div>';
 
  // Groupe / Individuel
  if (project.group) {
    html += '<div class="mb-section"><div class="mb-twocol">';
    html += '<div class="mb-block">';
    html += '<span class="mb-section-label"><span class="accent">//</span> Travail en groupe</span>';
    html += '<p class="mb-text">' + project.group + '</p>';
    html += '</div>';
    html += '<div class="mb-block alt">';
    html += '<span class="mb-section-label"><span class="accent">//</span> Mon rôle</span>';
    html += '<p class="mb-text">' + project.role + '</p>';
    html += '</div></div></div>';
  } else {
    html += '<div class="mb-section">';
    html += '<div class="mb-block alt">';
    html += '<span class="mb-section-label"><span class="accent">//</span> Travail individuel</span>';
    html += '<p class="mb-text">' + project.role + '</p>';
    html += '</div></div>';
  }
 
  // Savoir-faire acquis
  html += '<div class="mb-section">';
  html += '<span class="mb-section-label"><span class="accent">//</span> Techniques & savoir-faire acquis</span>';
  html += '<ul class="mb-list">';
  project.skills_acquired.forEach(s => { html += '<li>' + s + '</li>'; });
  html += '</ul></div>';
 
  // Pièce jointe (si présente)
if (project.attachment) {
  html += '<div class="mb-section">';
  html += '<span class="mb-section-label"><span class="accent">//</span> Livrable</span>';
  html += '<a href="' + project.attachment.url + '" target="_blank" class="mb-attachment">';
  html += '<span class="att-icon">📄</span>';
  html += '<span class="att-content">';
  html += '<span class="att-label">' + project.attachment.label + '</span>';
  html += '<span class="att-desc">' + project.attachment.description + '</span>';
  html += '</span>';
  html += '<span class="att-action">[ TÉLÉCHARGER → ]</span>';
  html += '</a>';
  html += '</div>';
}

  // Compétences
  html += '<div class="mb-section">';
  html += '<span class="mb-section-label"><span class="accent">//</span> Compétences mobilisées</span>';
  html += '<div class="mb-skills">';
  project.competences.forEach(c => {
    html += '<a href="competences.html#' + c.code.toLowerCase() + '" class="mb-skill" title="' + c.title + '">' + c.code + '</a>';
  });
  html += '</div></div>';
 
  body.innerHTML = html;
  body.scrollTop = 0;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
 
function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
}
 
// Listeners de fermeture
document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeProjectModal);
});
document.getElementById('projectModal').addEventListener('click', function(e) {
  if (e.target === this) closeProjectModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProjectModal();
});

// ─── OUVERTURE AUTO DE LA MODAL VIA L'URL ───
// Si l'URL contient #projet-X au chargement (ex: depuis competences.html),
// ouvre automatiquement la modal du projet correspondant.
document.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash;
  const match = hash.match(/^#projet-(\d+)$/);
  if (match) {
    const projectId = parseInt(match[1], 10);
    // Scroll vers la section projets d'abord
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Puis ouvre la modal avec un petit délai pour laisser le scroll se faire
    setTimeout(() => openProjectModal(projectId), 600);
  }
});

// Si l'utilisateur clique sur un lien #projet-X DEPUIS la page index.html
// (clic interne, pas un chargement de page), ouvre aussi la modal
window.addEventListener('hashchange', function() {
  const hash = window.location.hash;
  const match = hash.match(/^#projet-(\d+)$/);
  if (match) {
    const projectId = parseInt(match[1], 10);
    openProjectModal(projectId);
  }
});

// ─── PAGE PROJET : navigation dynamique ───
// Si tu veux que les liens "Projet précédent / suivant" fonctionnent,
// remplace les href avec les bons noms de fichiers selon tes projets.
// Exemple : href="project-2.html" au lieu de project.html?id=next

// ─── CURSOR PERSONNALISÉ (optionnel, décommenter pour activer) ───
/*
const cursor = document.createElement('div');
cursor.style.cssText = `
  position:fixed; pointer-events:none; z-index:99999;
  width:8px; height:8px; background:var(--accent);
  border-radius:0; transform:translate(-50%,-50%);
  transition: width 0.2s, height 0.2s;
  mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

const cursorRing = document.createElement('div');
cursorRing.style.cssText = `
  position:fixed; pointer-events:none; z-index:99998;
  width:28px; height:28px; border:1px solid var(--accent);
  border-radius:0; transform:translate(-50%,-50%);
  transition: all 0.08s linear;
  opacity:0.5;
`;
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 60);
});
*/
