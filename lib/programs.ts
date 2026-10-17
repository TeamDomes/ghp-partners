// ─────────────────────────────────────────────────────────────
// The three ways a partner can direct its contribution.
// Each option carries its own Community Impact Plan narrative
// and renewal-portal answers. {{company}} = partner's name.
// Every figure here is sourced (see SOURCES at the bottom);
// update when GHP publishes new numbers.
// ─────────────────────────────────────────────────────────────
import { GUIDE, PLAN } from "./content";

export type ProgramId = "general" | "beyond_ged" | "justice";

type QuantSection = { heading: string; paras: string[]; bullets: string[]; after?: string };
type Goal = { title: string; body: string; measure: string };

export type Program = {
  id: ProgramId;
  label: string; // short name used in the form, admin, documents
  tagline: string; // one line for cards
  cardBody: string;
  cardStat: { value: string; label: string };
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
  "Hudson’s poverty rate is 28.2 percent, more than double Columbia County’s 12.1 percent, and its median household income of $54,139 trails both the county ($81,528) and New York State ($85,974) (U.S. Census Bureau, American Community Survey 2020–2024). These disparities have deep roots. In the late 1960s and early 1970s, urban renewal demolished 286 buildings near Hudson’s waterfront and displaced more than 200 families, nearly one in ten residents; many of the Black families displaced were rehoused in public housing and were far less likely to go on to own homes or build wealth. Decades of cannabis prohibition compounded that harm: statewide, more than 80 percent of people arrested for marijuana possession were Black or Latino.";

const ABOUT_GHP =
  "Greater Hudson Promise (GHP) has served Hudson since 2011, when it was selected as one of fifteen communities nationwide for a U.S. Department of Education Promise Neighborhood planning grant. Modeled on the Harlem Children’s Zone, GHP is a place-based, cradle-to-career organization headquartered at 369 Warren Street in Hudson, serving children and families from birth through adulthood.";

export const PROGRAMS: Record<ProgramId, Program> = {
  general: {
    id: "general",
    label: "General support for GHP",
    tagline: "Fund the whole cradle-to-career continuum",
    cardBody:
      "Unrestricted support lets GHP put resources where need is greatest: early learning, free after-school, Beyond GED, emergency assistance, and support for families affected by incarceration.",
    cardStat: { value: "760+", label: "residents received emergency grocery support during the Nov. 2025 SNAP lapse" },
    purpose: "provide general operating support for GHP’s cradle-to-career programs in Hudson and Columbia County",
    uses:
      "Funds sustain the staff, space, and programs GHP families rely on, from early learning and after-school to Beyond GED, emergency assistance, and support for families affected by incarceration, directed where community need is greatest.",
    plan: {
      need: [
        "The {{company}}/Greater Hudson Promise (GHP) partnership addresses the deep and persistent economic disparities facing children and families in the City of Hudson and Columbia County, disparities rooted in decades of state and federal policy, including urban renewal and the enforcement of cannabis prohibition, that fell hardest on Black and Latino residents.",
        CONTEXT,
        ABOUT_GHP +
          " Its programs include free early learning for children ages 0–5, a countywide early literacy network, free after-school programming with hot meals and transportation, the Beyond GED program for Opportunity Youth ages 16–24, emergency assistance for families in crisis, enhanced visiting for children of incarcerated parents at the Columbia County Jail, and court advocacy for justice-impacted residents.",
        "General operating support allows GHP to direct resources where community need is greatest and to sustain the staff, space, and programs that families rely on at every stage of life. By investing in the full continuum rather than a single program, the {{company}}–GHP partnership helps break cycles of poverty and justice involvement that span generations.",
      ],
      who: [
        "The targeted population is children, youth, and families in the City of Hudson and Columbia County who have been disproportionately impacted by poverty, systemic oppression, and the enforcement of cannabis prohibition, including justice-impacted individuals and their families. GHP’s mission is to build an equitable community by providing opportunities and support to individuals and families affected by systemic oppression and failures. Across all GHP programs, 79 percent of participants are BIPOC.",
      ],
      goals: [
        {
          title: "Strengthen Early Learning and School Success.",
          body: "Provide free, play-based early learning for children ages 0–5 and free after-school programming with homework help, daily reading, hot meals, and transportation, so children enter and stay in school ready to learn.",
          measure:
            "Measured by the number of children served in early learning and after-school programs (2022: 20+ children daily in the Early Learning Program, 143+ children through the Traveling Early Learning Program, and 30+ students in after-school).",
        },
        {
          title: "Expand Pathways to Education and Employment.",
          body: "Through Beyond GED, help Opportunity Youth ages 16–24 earn a high school equivalency credential and move into employment, training, or college, with stipends, meals, and individualized support.",
          measure:
            "Measured by GED credentials earned and participants gaining employment (2025: 6 GEDs earned and 16 participants employed; 11 GEDs earned since program inception).",
        },
        {
          title: "Increase Family Stability and Reduce Justice-System Harm.",
          body: "Provide emergency assistance to families in crisis and keep children connected to incarcerated parents through enhanced, child-friendly jail visits.",
          measure:
            "Measured by households and individuals receiving emergency support and dollars distributed (Nov. 2025: $58,970 in grocery support to 760+ residents; 2022: $76,000+ to 100+ households), and by families and visits served through enhanced visiting (90+ families and 750+ visits, August 2016–August 2025).",
        },
      ],
      qualitative: [
        "Qualitative success will be measured through participant and family feedback, interviews, and stories that show growth in stability, confidence, and connection. GHP staff, several with lived experience of the systems families are navigating, build trusted, individualized relationships with participants across programs.",
        "Participants describe the difference this makes. A Beyond GED student called the program “one of the best decisions I’ve made for my future,” and a parent said, “It’s been heaven sent for my child, and without this program I am not sure where my son would be.” Families in GHP’s enhanced jail visiting program reported improved parent behavior and reduced anxiety among children in surveys.",
        "These qualitative measures, gathered through surveys, interviews, and ongoing staff contact, show not only whether programs are reaching families, but whether families feel more stable, supported, and hopeful about their future.",
      ],
      quantIntro:
        "Success will be measured through clear, quantitative outcomes across GHP’s cradle-to-career continuum, tracked by program staff and reported in GHP’s annual impact summary.",
      quantSections: [
        {
          heading: "Early Childhood and Youth",
          paras: ["In 2022:"],
          bullets: [
            "20+ children attended the Early Learning Program daily",
            "143+ children were reached through the Traveling Early Learning Program at 10+ sites countywide",
            "30+ students enrolled in free after-school programming",
          ],
          after: "Tracking includes enrollment, daily attendance, and reading time, as every after-school scholar reads a minimum of twenty minutes per day.",
        },
        {
          heading: "Young Adults (Beyond GED)",
          paras: ["In 2025:"],
          bullets: ["34 GED tests were taken", "6 participants earned their GED (11 since program inception)", "16 participants gained employment", "20 participants received DMV identification cards"],
        },
        {
          heading: "Family Stability",
          paras: [],
          bullets: [
            "$58,970 in grocery support to 760+ residents during the November 2025 SNAP lapse",
            "189 air conditioners delivered to Hudson families, summers 2021–2024",
            "$76,000+ in emergency assistance to 100+ households (235+ individuals) in 2022",
          ],
          after:
            "GHP also helps administer HudsonUP, a guaranteed income pilot for 128 Hudson residents; independent research by the Jain Family Institute found employment among the first cohort rose from 33 percent to 85.7 percent.",
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
      reachNote: "GHP reached 760+ residents through emergency grocery support alone in November 2025. Select the closest range the portal offers.",
      researchNote:
        "Select the options that are true for your business. GHP\u2019s work began with a federally funded community planning process in 2011 and is shaped by ongoing conversations with Hudson families; GHP can walk you through that research.",
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
      "Young people ages 16–24 who left school, often to work and support their families, get paid stipends, hot meals, GED instruction, and one-on-one help with jobs, IDs, court, and housing.",
    cardStat: { value: "0", label: "program completers have re-entered the justice system" },
    purpose: "fund the Beyond GED program, which serves Opportunity Youth ages 16 to 24 in Hudson and Columbia County",
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
    tagline: "Keep children connected; support justice-impacted adults",
    cardBody:
      "GHP’s enhanced visiting program at the Columbia County Jail keeps children connected to incarcerated parents, and its court advocacy program helps justice-impacted residents navigate court and reentry.",
    cardStat: { value: "750+", label: "child-friendly jail visits for 90+ families since 2016" },
    purpose:
      "support GHP’s programs for families impacted by incarceration, including the Greater Hudson Initiative for Children of Incarcerated Parents and the Community Court Advocacy Program",
    uses:
      "Funds support enhanced, child-friendly visits at the Columbia County Jail, facilitated virtual visits, training for police and providers on protecting children at a parent’s arrest, and court navigation and reentry support for justice-impacted residents.",
    plan: {
      need: [
        "The {{company}}/Greater Hudson Promise (GHP) partnership addresses the harm that arrest and incarceration, driven in large part by drug enforcement that fell hardest on Black and Latino New Yorkers, inflicts on children and families in the City of Hudson and Columbia County.",
        CONTEXT,
        "When a parent is arrested or incarcerated, children can lose contact with a caregiver while their family absorbs new financial and emotional strain. Since August 2016, GHP’s Greater Hudson Initiative for Children of Incarcerated Parents (GHICIP) has partnered with the Columbia County Sheriff to offer enhanced, child-friendly visits at the Columbia County Jail, along with facilitated virtual visits. GHP’s work helped create the jail’s Enhanced Child Visiting policy. Through Safeguarding Children of Arrested Parents, GHP works with the Hudson Police Department and the Osborne Association to protect children at the moment of a parent’s arrest, and its Community Court Advocacy Program provides court navigation, direct service, and reentry support for justice-impacted residents, delivered by staff with lived experience.",
        ABOUT_GHP +
          " The {{company}}–GHP partnership will sustain and expand these services, keeping children connected to their parents, reducing the collateral harm of arrest and incarceration, and supporting justice-impacted adults as they rebuild stability.",
      ],
      who: [
        "The targeted population is children and families of incarcerated and justice-involved parents in the City of Hudson and Columbia County, and adults navigating the court system and reentry. These families have been disproportionately impacted by drug enforcement, poverty, and systemic oppression. GHP’s mission is to build an equitable community by providing opportunities and support to individuals and families affected by systemic oppression and failures. Across all GHP programs, 79 percent of participants are BIPOC.",
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
          measure: "Measured by the number of officers and providers trained (2022: 25 Hudson Police Department officers and 16 providers from 6 organizations).",
        },
        {
          title: "Support Justice-Impacted Adults Through Court and Reentry.",
          body: "Provide court navigation, direct service, and reentry support through GHP’s Community Court Advocacy Program, delivered by staff with lived experience.",
          measure: "Measured by the number of individuals supported, court appearances accompanied, and referrals completed, with a baseline established in the first year of the partnership.",
        },
      ],
      qualitative: [
        "Qualitative success will be measured through family surveys, participant interviews, and feedback from partners including the Columbia County Sheriff’s Office and the Hudson Police Department.",
        "Families participating in enhanced visiting have reported improved parent behavior and reduced anxiety among children. GHP’s advocates, several with lived experience of the justice system, build trusted relationships that help participants navigate court and reentry with dignity.",
        "These measures, together with ongoing staff contact, show whether children remain connected to their parents and whether justice-impacted adults are gaining stability.",
      ],
      quantIntro:
        "Success will be measured through clear, quantitative outcomes for children and families impacted by incarceration, tracked by GHP staff and reported in GHP’s annual impact summary.",
      quantSections: [
        {
          heading: "Enhanced Visiting",
          paras: ["August 2016–August 2025:"],
          bullets: ["90+ families served", "750+ enhanced visits at the Columbia County Jail", "87 percent of visits held in person"],
          after: "Tracking includes families enrolled, visits completed (in person and virtual), and family survey results.",
        },
        {
          heading: "Training and Systems Change",
          paras: ["In 2022:"],
          bullets: ["25 Hudson Police Department officers trained", "16 providers from 6 organizations trained", "33 facilitated virtual visits in the program’s first months"],
          after: "GHP’s work helped establish the Columbia County Jail’s Enhanced Child Visiting policy.",
        },
        {
          heading: "Court Advocacy and Reentry",
          paras: ["GHP will track individuals supported, court appearances accompanied, referrals made and completed, and reentry outcomes such as housing and employment."],
          bullets: [],
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
        "Select the options that are true for your business. GHP\u2019s enhanced visiting program is informed by family surveys and its partnership with the Columbia County Sheriff; GHP can walk you through that research.",
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
