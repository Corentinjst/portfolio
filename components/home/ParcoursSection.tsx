import ExperienceItem from '@/components/about/ExperienceItem'
import type { Experience } from '@/components/about/ExperienceItem'

const experiences: Experience[] = [
  {
    period: 'Mars 2025 - Aujourd\'hui',
    title: 'Alternant Data Scientist',
    company: 'CCF, La Défense, Courbevoie',
    preview:
      'Mesure de la performance des campagnes CRM et détection de flux vers plateformes crypto via NLP.',
    role:
      'Au sein de l\'équipe Data du CCF, j\'interviens sur deux axes principaux : l\'évaluation de l\'impact réel des campagnes CRM sur le comportement client, et la détection de flux financiers vers des plateformes de cryptomonnaies à des fins de conformité réglementaire (KYC).',
    responsibilities: [
      'Développement d\'un dashboard Power BI analysant le comportement client dans les 2 mois post-campagne (souscriptions, flux financiers entrants/sortants)',
      'Conception mensuelle de groupes de contrôle artificiels par Propensity Score Matching (PSM) pour isoler l\'effet causal des communications CRM',
      'Mesure des revenus incrémentaux réels générés, en distinguant l\'effet campagne des tendances naturelles de comportement client',
      'Développement d\'un pipeline de classification NLP sur les libellés de transactions bancaires pour identifier les flux vers des plateformes de cryptomonnaies',
      'Contribution aux enjeux de conformité réglementaire et de connaissance client (KYC)',
    ],
    accomplishments: [
      'Mise en place d\'une méthodologie causale robuste (PSM) permettant d\'attribuer précisément les revenus générés aux campagnes CRM',
      'Déploiement d\'un modèle NLP de classification de transactions bancaires opérationnel en production',
      'Automatisation du reporting CRM via Power BI, offrant une visibilité mensuelle sur l\'impact des campagnes',
    ],
    skills: [
      'Python', 'SQL', 'NLP', 'Scikit-learn', 'Propensity Score Matching', 'Power BI', 'Git',
    ],
  },
  {
    period: 'Sept. 2024 - Mars 2025',
    title: 'Alternant Assistant Chef de Projet Data',
    company: 'CCF, La Défense, Courbevoie',
    preview:
      'Conception et déploiement d\'un dashboard Power BI de monitoring opérationnel des campagnes CRM, actualisé quotidiennement.',
    role:
      'Première mission au sein de CCF Banque, intégré à l\'équipe CRM. J\'ai piloté la construction d\'un outil de suivi de la performance des campagnes multicanales, devenu référence interne pour le pilotage quotidien des équipes CRM.',
    responsibilities: [
      'Conception et déploiement d\'un dashboard Power BI de monitoring opérationnel des campagnes CRM, actualisé quotidiennement',
      'Suivi de bout en bout de la performance des envois sur tous les canaux : taux d\'ouverture, taux de clic sur pièces jointes, désabonnements',
      'Maintenance et évolution de l\'outil en fonction des besoins remontés par l\'équipe CRM',
    ],
    accomplishments: [
      'Dashboard adopté comme outil de référence interne pour le pilotage quotidien des campagnes par l\'équipe CRM',
    ],
    skills: [
      'SQL', 'Power BI', 'Data Visualisation', 'Reporting'
    ],
  },
  {
    period: 'Juin 2023 - Août 2023',
    title: 'Stagiaire Data Analyst',
    company: 'SIPLEC E.LECLERC, Ivry-sur-Seine',
    preview:
      'Conception et déploiement d\'un dashboard Qlik Sense de pilotage de l\'activité support au sein de la DSI.',
    role:
      'Au sein de l\'équipe support applicatif de la DSI, en soutien aux équipes métiers, j\'ai conçu et développé un outil de monitoring opérationnel permettant de suivre en temps réel la qualité de service et d\'identifier les goulots d\'étranglement dans le traitement des demandes.',
    responsibilities: [
      'Conception et développement d\'un dashboard Qlik Sense de pilotage de l\'activité support',
      'Suivi des KPIs opérationnels : taux de prise en charge, délais de traitement, taux de résolution selon le niveau de criticité des tickets',
      'Identification des goulots d\'étranglement dans le traitement des demandes support',
    ],
    accomplishments: [
      'Outil permettant à l\'équipe de monitorer en temps réel la qualité de service, adopté pour le suivi opérationnel quotidien de l\'activité support',
    ],
    skills: [
      'SQL', 'Qlik Sense', 'Data Visualisation', 'Reporting'
    ],
  }
]

export default function ParcoursSection() {
  return (
    <section id="parcours" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-surface-border">
      <div className="max-w-4xl mx-auto">
        <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
          Expérience
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-100 mb-2">
          Parcours
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          Cliquer sur une expérience pour voir les détails.
        </p>
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <ExperienceItem
              key={`${exp.title}-${exp.period}`}
              experience={exp}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
