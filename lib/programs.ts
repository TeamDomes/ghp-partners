// ─────────────────────────────────────────────────────────────
// The three ways a partner can direct its contribution.
// Each option carries its own Community Impact Plan narrative
// and renewal-portal answers. {{company}} = partner's name.
// Every figure here is sourced (see SOURCES at the bottom);
// update when GHPN publishes new numbers.
// ─────────────────────────────────────────────────────────────
import { GUIDE, LANDING, PLAN, STATS } from "./content";

export type ProgramId = "general" | "beyond_ged" | "justice";

type QuantSection = { heading: string; paras: string[]; bullets: string[]; after?: string };
type Goal = { title: string; body: string; measure: string };

export type Program = {
  id: ProgramId;
  label: string; // short name used in the form, admin, documents
  tagline: string; // one line for cards
  cardBody: string;
  cardStat: { value: string; label: string };
  closer: {
    paras: string[];
    stats: { value: string; label: string }[];
    quotes: { text: string; who: string }[];
  };
  purpose: string; // "...to {purpose}"
  uses: string; // what funds pay for
  plan: {
    need: string[];
    who: string[];
    goals: Goal[];
    qualitative: string[];
    quantIntro: string;
    quantSections: QuantSection[];
  };
  guide: {
    zips: string;
    reach: string;
    reachNote?: string;
    researchNote?: string;
    activities: string[];
    activitiesNote: string;
  };
};

// Shared context paragraph (sourced: ACS 2020–24; Hilverman/City of Hudson records; NYCLU 2021)
const CONTEXT =
  "Hudson’s poverty rate is 28.2 percent, more than double Columbia County’s 12.1 percent, and its median household income of $54,139 trails both the county ($81,528) and New York State ($85,974) (U.S. Census Bureau, American Community Survey 2020–2024). These disparities have deep roots. In the late 1960s and early 1970s, urban renewal cleared more than 50 acres near Hudson’s waterfront and displaced more than 200 families, nearly one in ten residents. Decades of cannabis prohibition compounded that harm: statewide, more than 80 percent of people arrested for marijuana possession were Black or Latino.";

const ABOUT_GHP =
  "Greater Hudson Promise Neighborhood (GHPN) has served Hudson since 2011, when it was selected as one of fifteen communities nationwide for a U.S. Department of Education Promise Neighborhood planning grant. Modeled on the Harlem Children’s Zone, GHPN is a place-based, cradle-to-career organization headquartered at 364 Warren Street in Hudson, serving children and families from birth through adulthood.";

export const PROGRAMS: Record<ProgramId, Program> = {
  general: {
    id: "general",
    label: "General support for GHPN",
    tagline: "Support the whole cradle-to-career continuum",
    cardBody:
      "Unrestricted support lets GHPN put resources where need is greatest, including early learning, free after-school, Beyond GED, emergency assistance, and support for families affected by incarceration.",
    cardStat: { value: "$350K+", label: "in emergency assistance to Columbia County residents in 2025" },
    closer: {
      paras: [
        "Unrestricted support is the most flexible gift a partner can make. It lets GHPN respond when needs spike, as it did in November 2025, when it got groceries to 760+ residents within ten days of the SNAP lapse, and it sustains the staff, space, and partnerships every program depends on.",
        "Your contribution supports the full continuum: free Promise Early Learning for children 0–5, free after-school enrichment and transportation, Beyond GED tutoring, job placement, and driver’s licenses for young adults, rent assistance, direct cash transfers, and court and systems advocacy for families.",
        "GHPN also convenes more than 40 partner organizations every month to support children, individuals, and families across Hudson and Columbia County, and its staff sit on the Hudson City School District’s Chronic Absenteeism Taskforce.",
      ],
      stats: [
        { value: "31", label: "children enrolled in Promise Early Learning (2025)" },
        { value: "20", label: "Opportunity Youth enrolled in Beyond GED (2025)" },
        { value: "$350K+", label: "emergency assistance to residents (2025)" },
        { value: "40+", label: "partner organizations GHPN convenes monthly" },
      ],
      quotes: [
        {
          text: "It’s been wonderful to see how much confidence and independence he has gained… I’ve especially noticed growth in his social skills and willingness to try new things.",
          who: "Parent of a Promise Early Learner, 2025",
        },
      ],
    },
    purpose: "provide general operating support for GHPN’s cradle-to-career programs in Hudson and Columbia County",
    uses:
      "Funds sustain the staff, space, and programs GHPN families rely on, from early learning and after-school to Beyond GED, emergency assistance, and support for families affected by incarceration, directed where community need is greatest.",
    plan: {
      need: [
        "The {{company}}/Greater Hudson Promise Neighborhood (GHPN) partnership addresses the deep and persistent economic disparities facing children and families in the City of Hudson and Columbia County, disparities rooted in decades of state and federal policy, including urban renewal and the enforcement of cannabis prohibition, that fell hardest on Black and Latino residents.",
        CONTEXT,
        ABOUT_GHP +
          " Its programs include free early learning for children ages 0–5, a countywide early literacy network, free after-school enrichment and transportation, the Beyond GED program (tutoring, job placement, and driver’s licenses) for Opportunity Youth ages 16–24, rent assistance and direct cash transfers for families, enhanced visiting for children of incarcerated parents at the Columbia County Jail, and court and systems advocacy for justice-impacted residents. GHPN also convenes more than 40 partner organizations monthly to support children, individuals, and families across Hudson and Columbia County.",
        "General operating support allows GHPN to direct resources where community need is greatest and to sustain the staff, space, and programs that families rely on at every stage of life. By investing in the full continuum rather than a single program, the {{company}}–GHPN partnership helps break cycles of poverty and justice involvement that span generations.",
      ],
      who: [
        "The targeted population is children, youth, and families in the City of Hudson and Columbia County who have been disproportionately impacted by poverty, systemic oppression, and the enforcement of cannabis prohibition, including justice-impacted individuals and their families. GHPN’s mission is to build an equitable community by providing opportunities and support to individuals and families affected by systemic oppression and failures. Across all GHPN programs, 79 percent of participants are BIPOC.",
      ],
      goals: [
        {
          title: "Strengthen Early Learning and School Success.",
          body: "Provide free, play-based early learning for children ages 0–5 and free after-school programming with homework help, daily reading, hot meals, and transportation, so children enter and stay in school ready to learn.",
          measure:
            "Measured by the number of children served in early learning and after-school programs (2025: 31 children enrolled in Promise Early Learning, serving 30 families; 2022: 30+ students enrolled in after-school and 143+ children reached through the Traveling Early Learning Program).",
        },
        {
          title: "Expand Pathways to Education and Employment.",
          body: "Through Beyond GED, help Opportunity Youth ages 16–24 earn a high school equivalency credential and move into employment, training, or college, with tutoring, stipends, job placement, driver’s license support, and individualized support.",
          measure:
            "Measured by GED credentials earned and participants gaining employment (2025: 6 GEDs earned and 16 participants employed; 12 GEDs earned since program inception).",
        },
        {
          title: "Increase Family Stability and Reduce Justice-System Harm.",
          body: "Provide emergency assistance to families in crisis and keep children connected to incarcerated parents through enhanced, child-friendly jail visits.",
          measure:
            "Measured by individuals receiving emergency support, evictions diverted, and dollars distributed (2025: $350,170 in emergency assistance; rent assistance reaching 482 individuals, including 220 children, and diverting 90 evictions; grocery relief for 760+ residents during the SNAP lapse), and by families and visits served through enhanced visiting (90+ families and 750+ visits, August 2016–August 2025).",
        },
      ],
      qualitative: [
        "Qualitative success will be measured through participant and family feedback, interviews, and stories that show growth in stability, confidence, and connection. GHPN staff build trusted, individualized relationships with participants across programs, and its court advocacy team includes staff with lived experience of the justice system.",
        "Participants describe the difference this makes. A Beyond GED student called the program “one of the best decisions I’ve made for my future,” and a parent said, “It’s been heaven sent for my child, and without this program I am not sure where my son would be.” In surveys from GHPN’s enhanced jail visiting program, incarcerated parents reported improved behavior and fewer disciplinary issues, and children reported reduced anxiety about their parent’s well-being.",
        "A parent of a Promise Early Learner wrote in 2025: \u201cIt\u2019s been wonderful to see how much confidence and independence he has gained\u2026 I\u2019ve especially noticed growth in his social skills and willingness to try new things.\u201d",
        "These qualitative measures, gathered through surveys, interviews, and ongoing staff contact, show not only whether programs are reaching families, but whether families feel more stable, supported, and hopeful about their future.",
      ],
      quantIntro:
        "Success will be measured through clear, quantitative outcomes across GHPN’s cradle-to-career continuum, tracked by program staff and reported in GHPN’s annual impact summary.",
      quantSections: [
        {
          heading: "Early Childhood and Youth",
          paras: [],
          bullets: [
            "31 children enrolled in free Promise Early Learning, serving 30 families, in the program’s fourth year (2025)",
            "143+ children were reached through the Traveling Early Learning Program (2022)",
            "30+ students enrolled in free after-school programming (2022)",
          ],
          after: "GHPN also convenes CO-HOST, a network of 24 youth-serving partner organizations that met monthly in 2025; its 2025 retreat provided free professional development to 36 people from youth-serving organizations. Tracking includes enrollment, daily attendance, and reading time, as every after-school scholar reads a minimum of twenty minutes per day.",
        },
        {
          heading: "Young Adults (Beyond GED)",
          paras: ["In 2025:"],
          bullets: ["20 Opportunity Youth enrolled", "34 GED tests were taken", "6 participants earned their GED (12 since program inception)", "16 participants gained employment", "20 participants received DMV identification cards", "4 participants opened bank accounts"],
        },
        {
          heading: "Family Stability",
          paras: [],
          bullets: [
            "$350,170 in total emergency assistance provided directly to Columbia County residents in 2025",
            "Rent assistance reaching 482 individuals (262 adults and 220 children), diverting 90 evictions (2025)",
            "$28,600 in discretionary emergency support (utilities, car repairs, groceries) for 166 additional individuals (2025)",
            "Grocery relief for 760+ residents during the November 2025 SNAP lapse, delivered in under ten days, with all eligible requests fulfilled",
            "189 air conditioners delivered to residents of the Hudson City School District, summers 2021–2024",
          ],
          after:
            "GHPN also runs HudsonUP, a guaranteed income pilot providing direct cash transfers to 128 Hudson residents. In independent research by the Jain Family Institute, employment among the pilot’s first cohort rose from 33 percent at enrollment to as high as 85.7 percent, and stood at 66.7 percent in the most recent survey reported.",
        },
        {
          heading: "Families Impacted by Incarceration",
          paras: ["August 2016–August 2025:"],
          bullets: ["90+ families served through enhanced visiting at the Columbia County Jail", "750+ enhanced visits, 87 percent in person"],
        },
        {
          heading: "Overall Performance Indicators",
          paras: ["Program success will continue to be measured through:"],
          bullets: [
            "Children and youth served and attendance rates",
            "GED completion and employment placement rates",
            "Households receiving emergency assistance and dollars distributed",
            "Families and visits served through enhanced visiting",
            "Participant and family satisfaction",
          ],
        },
      ],
    },
    guide: {
      zips: "Primarily 12534 (City of Hudson), and throughout Columbia County.",
      reach: "500+",
      reachNote: "GHPN reached 760+ residents through emergency grocery support alone in November 2025. Select the closest range the portal offers.",
      researchNote:
        "Select the options that are true for your business. GHPN\u2019s work began with a federally funded community planning process in 2011 and is shaped by ongoing conversations with Hudson families; GHPN can walk you through that research.",
      activities: ["adult education", "job placement", "job skills services", "system navigation services"],
      activitiesNote:
        "Select each of these. If the portal also lists early childhood education, youth programming, or emergency or basic-needs assistance, select those too.",
    },
  },

  beyond_ged: {
    id: "beyond_ged",
    label: "Beyond GED",
    tagline: "Paid GED and career pathways for Opportunity Youth",
    cardBody:
      "Young people ages 16–24 who left school, often to work and support their families, get paid stipends, hot meals, GED tutoring, job placement, driver’s license support, and one-on-one help with IDs, court, and housing.",
    cardStat: { value: "0", label: "program completers have re-entered the justice system" },
    closer: {
      paras: LANDING.program,
      stats: STATS,
      quotes: LANDING.quotes,
    },
    purpose: "support the Beyond GED program, which serves Opportunity Youth ages 16 to 24 in Hudson and Columbia County",
    uses:
      "Funds support participant stipends, hot meals on study days, GED instruction and testing, internship and job placement, and wraparound services including identification, transportation, court support, and housing stability.",
    plan: {
      need: PLAN.need,
      who: PLAN.who,
      goals: PLAN.goals,
      qualitative: PLAN.qualitative,
      quantIntro: PLAN.quantIntro,
      quantSections: PLAN.quantSections,
    },
    guide: {
      zips: GUIDE.zips,
      reach: GUIDE.reach,
      activities: GUIDE.activities,
      activitiesNote: "Select each of these in the portal.",
    },
  },

  justice: {
    id: "justice",
    label: "Families Impacted by Incarceration",
    tagline: "Keep children connected; support individuals impacted by the criminal legal system",
    cardBody:
      "GHPN’s enhanced visiting program at the Columbia County Jail keeps children connected to incarcerated parents, and its court advocacy program helps legal system-impacted residents navigate court and reentry.",
    cardStat: { value: "800+", label: "child-friendly jail visits for 90+ families since 2016" },
    closer: {
      paras: [
        "When a parent goes to jail, a child can lose that relationship overnight. Since August 2016, the Columbia County Jail has offered full-contact, child-friendly enhanced visits, launched by the Greater Hudson Initiative for Children of Incarcerated Parents with the Columbia County Sheriff’s Office and GHPN. GHPN staff facilitate the visits. There are six weekly slots for in-person enhanced visits, plus flexible, free one-hour virtual visits for families facing distance or other barriers.",
        "The work reaches beyond the jail. Through Safeguarding Children of Arrested Parents, GHPN partnered with the Mayor’s Office, the Hudson Police Department, and the Osborne Association to train officers in trauma-informed, child-sensitive arrest practices. As a result, in 2023 the Hudson Police Department adopted its own policy to reduce the trauma of witnessing a parent’s or caregiver’s arrest, including a trained therapy dog that accompanies officers when children are known to be present. The work also helped introduce an Enhanced Child Visiting policy at the jail, and in 2025 GHPN presented it to administrators from another New York county jail seeking to learn about and potentially replicate it.",
        "GHPN’s Community Court Advocacy Program is led by staff with lived experience of the justice system and supports justice-impacted residents through court and reentry. In 2025 it assisted eight youth and three adults with services including mentorship, emergency assistance, mindfulness coaching, Transformative Community Service, and Beyond GED enrollment.",
      ],
      stats: [
        { value: "800+", label: "enhanced visits since 2016" },
        { value: "90+", label: "families served" },
        { value: "6×", label: "in-person visit times each week (2025)" },
        { value: "11", label: "youth and adults supported by court advocacy (2025)" },
      ],
      quotes: [],
    },
    purpose:
      "support GHPN’s programs for families impacted by incarceration, including its work with the Greater Hudson Initiative for Children of Incarcerated Parents and its Community Court Advocacy Program",
    uses:
      "Funds support enhanced, child-friendly visits at the Columbia County Jail, facilitated virtual visits, training for police and providers on protecting children at a parent’s arrest, and court and reentry support for justice-impacted residents.",
    plan: {
      need: [
        "The {{company}}/Greater Hudson Promise Neighborhood (GHPN) partnership addresses the harm that arrest and incarceration, driven in large part by drug enforcement that fell hardest on Black and Latino New Yorkers, inflicts on children and families in the City of Hudson and Columbia County.",
        CONTEXT,
        "When a parent is arrested or incarcerated, children can lose contact with a caregiver while their family absorbs new financial and emotional strain. Since August 2016, the Columbia County Jail has offered full-contact, child-friendly enhanced visits, launched by the Greater Hudson Initiative for Children of Incarcerated Parents (GHICIP) with the Columbia County Sheriff’s Office and GHPN; GHPN staff facilitate the visits, and in August 2022 GHPN added facilitated virtual visits. The program helped introduce an Enhanced Child Visiting policy at the jail. Through Safeguarding Children of Arrested Parents, GHPN partnered with the Mayor’s Office, the Hudson Police Department, and the Osborne Association to train officers in trauma-informed, child-sensitive arrest practices, and its Community Court Advocacy Program provides direct service, assistance, and advocacy for justice-impacted residents, with a team that includes staff with lived experience. In 2025, in-person enhanced visits expanded to six times a week, the court advocacy program assisted eight justice-impacted youth and three adults, and GHPN presented the visiting program to administrators from another New York county jail seeking to learn about and potentially replicate it.",
        ABOUT_GHP +
          " The {{company}}–GHPN partnership will sustain and expand these services, keeping children connected to their parents, reducing the collateral harm of arrest and incarceration, and supporting justice-impacted adults as they rebuild stability.",
      ],
      who: [
        "The targeted population is children and families of incarcerated and justice-involved parents in the City of Hudson and Columbia County, and youth and adults navigating the court system and reentry. These families have been disproportionately impacted by drug enforcement, poverty, and systemic oppression. GHPN’s mission is to build an equitable community by providing opportunities and support to individuals and families affected by systemic oppression and failures. Across all GHPN programs, 79 percent of participants are BIPOC.",
      ],
      goals: [
        {
          title: "Keep Children Connected to Incarcerated Parents.",
          body: "Provide enhanced, child-friendly in-person visits and facilitated virtual visits at the Columbia County Jail, so children can maintain their relationships with incarcerated parents.",
          measure: "Measured by families served and visits completed (August 2016–August 2025: 90+ families and 750+ enhanced visits, 87 percent in person).",
        },
        {
          title: "Protect Children at the Point of a Parent’s Arrest.",
          body: "Train law enforcement and service providers in practices that reduce trauma for children when a parent is arrested, in partnership with the Hudson Police Department and the Osborne Association.",
          measure: "Measured by the number of officers and providers trained (2022: 25 Hudson Police Department officers, plus 16 individuals from 6 youth-serving organizations).",
        },
        {
          title: "Support Justice-Impacted Youth and Adults Through Court and Reentry.",
          body: "Provide direct service, assistance, and advocacy for justice-impacted residents navigating court and reentry through GHPN’s Community Court Advocacy Program, whose team includes staff with lived experience.",
          measure: "Measured by the number of youth and adults supported and the services provided (2025: 8 justice-impacted youth and 3 adults assisted, with services including mentorship, emergency assistance, mindfulness coaching, Transformative Community Service, and Beyond GED enrollment).",
        },
      ],
      qualitative: [
        "Qualitative success will be measured through family surveys, participant interviews, and feedback from partners including the Columbia County Sheriff’s Office and the Hudson Police Department.",
        "In program surveys, incarcerated parents participating in enhanced visiting reported improved behavior and fewer disciplinary issues, and children reported reduced anxiety about their parent’s well-being and feeling more connected to their incarcerated parent. GHPN’s court advocacy team, which includes staff with lived experience of the justice system, builds trusted relationships that help participants navigate court and reentry with dignity.",
        "These measures, together with ongoing staff contact, show whether children remain connected to their parents and whether justice-impacted adults are gaining stability.",
      ],
      quantIntro:
        "Success will be measured through clear, quantitative outcomes for children and families impacted by incarceration, tracked by GHPN staff and reported in GHPN’s annual impact summary.",
      quantSections: [
        {
          heading: "Enhanced Visiting",
          paras: ["August 2016–August 2025:"],
          bullets: ["90+ families served", "750+ enhanced visits at the Columbia County Jail", "87 percent of visits held in person"],
          after: "In 2025, in-person enhanced visits expanded to six times a week, with virtual visits available for families facing distance barriers. Tracking includes families enrolled, visits completed (in person and virtual), and family survey results.",
        },
        {
          heading: "Training and Systems Change",
          paras: ["In 2022:"],
          bullets: ["25 Hudson Police Department officers completed a full-day training in trauma-informed, child-sensitive arrest practices", "16 individuals from 6 youth-serving organizations completed the training", "33 facilitated virtual visits after the August 2022 pilot launch"],
          after: "The program helped introduce an Enhanced Child Visiting policy at the Columbia County Jail. In November 2025, GHPN presented the program to administrators from another New York county jail and staff from several judicial districts seeking to learn about and potentially replicate it.",
        },
        {
          heading: "Court Advocacy and Reentry",
          paras: ["In 2025:"],
          bullets: ["8 justice-impacted youth and 3 adults assisted", "Services included direct mentorship, emergency assistance, mindfulness coaching, Transformative Community Service, and Beyond GED enrollment"],
          after: "GHPN tracks individuals supported, services provided, referrals completed, and reentry outcomes such as housing and employment.",
        },
        {
          heading: "Overall Performance Indicators",
          paras: ["Program success will continue to be measured through:"],
          bullets: ["Families and children served", "Visits completed", "Officers and providers trained", "Justice-impacted adults supported", "Family and participant satisfaction"],
        },
      ],
    },
    guide: {
      zips: "Primarily 12534 (City of Hudson), and throughout Columbia County.",
      reach: "25-50",
      reachNote: "Select the closest range the portal offers.",
      researchNote:
        "Select the options that are true for your business. GHPN\u2019s enhanced visiting program is informed by family surveys and its partnership with the Columbia County Sheriff; GHPN can walk you through that research.",
      activities: ["system navigation services"],
      activitiesNote:
        "Select this, plus any portal options covering family support, reentry services, or services for children of incarcerated parents.",
    },
  },
};

export const PROGRAM_ORDER: ProgramId[] = ["general", "beyond_ged", "justice"];

export function getProgram(id?: string | null): Program {
  return PROGRAMS[(id as ProgramId) in PROGRAMS ? (id as ProgramId) : "beyond_ged"];
}
