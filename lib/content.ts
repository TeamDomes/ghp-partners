// ─────────────────────────────────────────────────────────────
// ALL EDITABLE COPY LIVES HERE.
// Update stats each year. {{company}} is replaced with the
// partner's business name in the generated Community Impact Plan.
// ─────────────────────────────────────────────────────────────

export const ORG = {
  name: "Greater Hudson Promise Neighborhood",
  short: "GHPN",
  program: "Beyond GED",
  contactEmail: "jeff@greaterhudsonpromise.org",
  website: "https://greaterhudsonpromise.org/",
  donateUrl: "https://greaterhudsonpromise.networkforgood.com/projects/207361-greater-hudson-promise-neighborhood",
  checkPayable: "Greater Hudson Promise Neighborhood, Inc.", // legal name per IRS; confirm with Jeff
  mailingAddress: "364 Warren Street, Hudson, NY 12534", // per GHPN edits Oct 2026; confirm checks go here
};

// Plan + guide unlock once GHPN confirms the Year 1 contribution.
export const DEPOSIT = {
  share: 0.5,
  turnaround: "within 2 business days", // how fast GHPN confirms and unlocks — TODO confirm with Jeff
};

// Headline stats shown on the landing page.
export const STATS = [
  { value: "11", label: "students have earned their GED since launch" },
  { value: "16", label: "participants gained employment in 2025" },
  { value: "0", label: "completers have re-entered the justice system" },
  { value: "25", label: "Opportunity Youth enrolled in 2025/2026" },
];

// Preset annual contribution levels (dollars per year).
export const TIERS = [
  { amount: 2500, name: "Supporter", recommended: false },
  { amount: 5000, name: "Partner", recommended: true },
  { amount: 10000, name: "Champion", recommended: false },
  { amount: 25000, name: "Cornerstone", recommended: false },
];

// Tax language. Contributions are deductible "to the extent allowed by law" — the standard
// phrasing; confirm with GHPN's accountant. Add the EIN once Jeff confirms it.
export const TAX = {
  ein: "85-0949720", // per IRS/ProPublica
  line: "Greater Hudson Promise Neighborhood is a registered 501(c)(3) nonprofit organization. Contributions are tax-deductible to the extent allowed by law, and GHPN will send a written acknowledgment of each contribution for your tax records.",
  advisor: "Please consult your tax advisor about how deductibility applies to your business.",
};

export const REVIEW_DISCLAIMER =
  "The Community Impact Plan and renewal application responses provided here are a suggested draft for your review. Each licensee is solely responsible for reviewing, editing, and approving its own submission to the Office of Cannabis Management, and for the accuracy and completeness of everything it submits. Greater Hudson Promise Neighborhood and its volunteers do not provide legal or tax advice.";

export const RECOMMENDED = {
  annual: 5000,
  years: 2,
  line: "We recommend $5,000 a year for two years \u2014 $10,000 across your two-year renewal period.",
};

export const OCM_GUIDANCE = {
  label: "OCM Community Impact Plan guidance (PDF)",
  url: "https://cannabis.ny.gov/system/files/documents/2026/03/3.27.26-community-impact-plan-guidance.pdf",
};

// Partners who joined outside the online form. Shown right after the first online partner (Domes).
export const MANUAL_PARTNERS: { name: string; city: string }[] = [
  { name: "Aphrodite Pre-Rolls", city: "Columbia County" }, // Love and Beauty Holdings, LLC · OCM-PROC-24-000232
];

export const PARTNERS_PAGE = {
  eyebrow: "Community Partners",
  title: "Pledged Licensees",
  sub: "These New York cannabis businesses are investing in Hudson and Columbia County families through their Community Impact Plans with Greater Hudson Promise Neighborhood.",
  empty: "Our first Community Partners are signing on now. Yours could be the first name here.",
  cta: "Join them",
};

export const FREQUENCIES = {
  annual: { label: "Once a year", perYear: 1 },
  quarterly: { label: "Quarterly", perYear: 4 },
  monthly: { label: "Monthly", perYear: 12 },
} as const;
export type Frequency = keyof typeof FREQUENCIES;

export const LICENSE_TYPES = [
  "Adult-Use Retail Dispensary",
  "Adult-Use Conditional Retail Dispensary (CAURD)",
  "Microbusiness",
  "Cultivator",
  "Processor",
  "Distributor",
  "Registered Organization with Dispensing (ROD)",
  "Delivery",
  "Nursery",
  "On-Site Consumption",
  "Other",
];

// Optional non-cash commitments a partner can add to their plan.
export const ENGAGEMENTS = [
  {
    id: "awareness",
    label: "Share GHPN program information with customers and staff",
    plan: "{{company}} will display information about GHPN's programs and refer eligible young adults and families to GHPN.",
    programs: ["general", "beyond_ged", "justice"],
  },
  {
    id: "roundup",
    label: "In-store round-up / donation prompt for GHPN",
    plan: "{{company}} will offer customers an optional round-up or donation prompt at checkout, with all proceeds directed to GHPN.",
    programs: ["general", "beyond_ged", "justice"],
  },
  {
    id: "volunteer",
    label: "Staff volunteer hours (tutoring, mock interviews, events)",
    plan: "{{company}} staff will contribute volunteer hours to GHPN, including mock interviews, résumé support, and event assistance.",
    programs: ["general", "beyond_ged", "justice"],
  },
  {
    id: "career",
    label: "Career talks / business skills workshops (participants 21+ for on-site)",
    plan: "{{company}} will host or deliver career-readiness and small-business workshops for Beyond GED participants, with any on-premises activity limited to participants aged 21 and over in compliance with OCM rules.",
    programs: ["general", "beyond_ged"],
  },
  {
    id: "driving",
    label: "Sponsor driving lessons or ID/DMV costs",
    plan: "{{company}} will designate a portion of its contribution to driving lessons and identification costs, removing transportation and documentation barriers to employment.",
    programs: ["general", "beyond_ged"],
  },
  {
    id: "stipends",
    label: "Sponsor student stipends and hot meals",
    plan: "{{company}} will designate a portion of its contribution to participant stipends and hot meals on study days.",
    programs: ["beyond_ged"],
  },
];

// ─────────────────────────────────────────────────────────────
// Landing page copy
// ─────────────────────────────────────────────────────────────
// "The problem" section. Every figure is sourced; update when new ACS data lands.
export const PROBLEM = {
  eyebrow: "Why Hudson",
  title: "One small city carries New York\u2019s story",
  stats: [
    { value: "28.2%", label: "of Hudson residents live below the poverty line \u2014 more than double Columbia County\u2019s 12.1%", src: 1 },
    { value: "1 in 10", label: "Hudson residents were displaced by urban renewal north of Warren Street", src: 3 },
    { value: "80%+", label: "of people arrested for marijuana possession in New York were Black or Latino", src: 2 },
  ],
  body: [
    "Hudson\u2019s working-class and Black families have absorbed one policy blow after another. In the late 1960s and early \u201970s, urban renewal cleared more than 50 acres of the North Bay, a working-class neighborhood by the waterfront, north of Warren Street, and the most racially diverse in the city. More than 200 families, nearly 850 people, were displaced.",
    "The same project shaped the city still visible today. North of Warren, homes were bulldozed and public housing went up in their place, including the nine-story Bliss Towers. On Warren Street, the historic houses were saved: the city restored them with federal urban renewal money, and in 1973 Hudson became the first city in the country to receive federal funds for historic rehabilitation through facade easements. Those restored blocks are the Warren Street visitors know today.",
    "Homeownership has long been the main way American families build wealth to pass down, and for decades Black families were largely kept out of it: the Federal Housing Administration refused to insure mortgages in or around Black neighborhoods. In New York today, 67% of white households own their homes, compared with 32% of Black households.",
    "Then came the War on Drugs. New York\u2019s drug laws and cannabis prohibition were enforced hardest on Black and Latino New Yorkers. An arrest could cost a job, an apartment, or a place in school, and the damage carried into the next generation.",
    "Today Warren Street is a destination for galleries, restaurants, and now dispensaries. North of Warren is home to nearly all of the city\u2019s subsidized housing and most of its Black residents; in 2018, 28.8% of residents there were Black, compared with 13.3% south of Warren. Hudson\u2019s median household income is $54,139, against $81,528 for Columbia County and $85,974 statewide, and more than one in four residents lives in poverty. Young people leave school to work and support their families, and too many are pulled into the justice system.",
    {
      quote:
        "There was probably about 90 percent of the stores on Warren Street I had never, ever stepped inside\u2026 There wasn\u2019t anybody that worked there that you recognized or looked like you. It was just like Warren Street was a separate city from the rest of Hudson.",
      who: "Kamal Johnson, Hudson\u2019s first Black mayor, 2020",
    },
    "You don\u2019t have to be in Hudson for this to be your community\u2019s story. The same state and federal policies hit Black neighborhoods across New York. Hudson is where a proven program is already turning that history around, and where your Community Impact Plan can show measurable results.",
  ] as (string | { quote: string; who: string })[],
  solutionEyebrow: "The solution",
  sources: [
    { n: 1, text: "U.S. Census Bureau, American Community Survey 2020\u20132024 5-year estimates (via Census Reporter)", url: "https://censusreporter.org/profiles/16000US3635969-hudson-ny" },
    { n: 2, text: "NYCLU, legislative memo on the Marihuana Regulation and Taxation Act, 2021", url: "https://www.nyclu.org/uploads/2021/03/2021-legislativememo-mrta.pdf" },
    { n: 3, text: "Caitie Hilverman, \u201cBliss Towers, Then,\u201d citing City of Hudson records, 2026", url: "https://deadandlivingthings.substack.com/p/bliss-towers-then" },
    { n: 4, text: "Abigail Bliss, \u201cFault Lines: The Legacy of Urban Renewal in Hudson, NY,\u201d MIT, 2020", url: "https://dspace.mit.edu/entities/publication/cc53b0b4-ab8f-4f31-9116-867012ec1d00" },
    { n: 5, text: "New York State Attorney General, \u201cRacial Disparities in Homeownership,\u201d 2023", url: "https://ag.ny.gov/sites/default/files/reports/oag-report-racial-disparities-in-homeownership.pdf" },
  ],
  furtherReading: [
    {
      text: "Andrea Elliott, \u201cWhen the Weed Wars Came to Warren Street,\u201d The New York Times, Sept. 26, 2026",
      url: "https://www.nytimes.com/interactive/2026/09/26/nyregion/hudson-weed-wars.html",
    },
    {
      text: "Abigail Bliss, \u201cFault Lines: The Legacy of Urban Renewal in Hudson, NY,\u201d MIT master\u2019s thesis, 2020",
      url: "https://dspace.mit.edu/entities/publication/cc53b0b4-ab8f-4f31-9116-867012ec1d00",
    },
  ],
};

export const SOLUTION = {
  eyebrow: "The solution",
  title: "Greater Hudson Promise Neighborhood",
  paras: [
    "Greater Hudson Promise Neighborhood has been part of Hudson since 2011. That year it was one of fifteen communities in the country selected for a U.S. Department of Education Promise Neighborhoods planning grant, the Obama Administration\u2019s initiative modeled on the Harlem Children\u2019s Zone. Today GHPN is an independent 501(c)(3), led since its 2011 beginnings by Joan Hunt, now Executive Director, with a team that includes staff with lived experience and represents the community it serves.",
    "Its home is a renovated historic building in the heart of the city, where children and adults take part in daily programming or seek individual support. 364 Warren Street, which operated as a jail and courthouse from 1805 to 1835, now serves, fittingly, as a community hub and headquarters for programs that provide opportunities and support to families and individuals impacted by systemic oppression and failures.",
    "GHPN offers a pipeline of free programming from cradle through career: early learning for babies and toddlers, after-school for school-age kids, Beyond GED for young adults, and emergency aid, guaranteed-income support, and support for individuals and families impacted by the criminal legal system. Since 2020, GHPN has expanded its programs and significantly increased its reach, and its annual revenue has grown from about $138,000 in 2020 to $2.3 million in 2024. In 2025 alone, GHPN distributed $350,170 in emergency assistance to Columbia County residents, helped divert 90 evictions, administered $730,000 in guaranteed income to City of Hudson residents through the HudsonUP pilot, and hosted community-building events in the City of Hudson with 400+ attendees.",
  ],
  timeline: [
    { year: "2011", text: "Selected for a federal Promise Neighborhood planning grant" },
    { year: "2014", text: "After-school program opens" },
    { year: "2015", text: "Greater Hudson Initiative for Children of Incarcerated Parents (GHICIP) launches" },
    { year: "2016", text: "Enhanced Child Visit Program launches full-contact, child-friendly visiting at the Columbia County Jail" },
    { year: "2020", text: "HudsonUP guaranteed income pilot launches (first of three cohorts)" },
    { year: "2020", text: "Becomes an independent 501(c)(3)" },
    { year: "2021", text: "Promise Early Learning launches for children ages 0\u20135" },
    { year: "2022", text: "Beyond GED launches for Opportunity Youth ages 16\u201324" },
    { year: "2025", text: "County-wide guaranteed income pilot launches for single caregivers of children under 6; $350,170 in emergency aid, including groceries for 760+ residents during the SNAP lapse" },
    { year: "2026", text: "Childcare Works launches to train new early educators" },
  ],
  stats: [
    { value: "Since 2011", label: "serving Hudson families" },
    { value: "$2.3M", label: "annual revenue (2024)" },
    { value: "$350K+", label: "emergency assistance to Columbia County residents (2025)" },
    { value: "800+", label: "child-friendly jail visits for 90+ families since 2016" },
    { value: "128", label: "Hudson residents in the HudsonUP guaranteed income pilot GHPN helps run" },
    { value: "90", label: "evictions diverted through rent assistance (2025)" },
  ],
  optionsEyebrow: "Choose where your contribution goes",
  optionsTitle: "Three ways to partner",
  optionsSub: "Your Community Impact Plan and portal responses are written around the option you choose.",
  sources: [
    { text: "U.S. Department of Education, Promise Neighborhoods grant awards (FY2011)", url: "https://www.ed.gov/grants-and-programs/grants-birth-grade-12/school-and-community-improvement-grants/promise-neighborhoods-pn/grant-awards-promise-neighborhoods-84215n" },
    { text: "IRS Form 990 data via ProPublica Nonprofit Explorer", url: "https://projects.propublica.org/nonprofits/organizations/850949720" },
    { text: "Jain Family Institute, HudsonUP Year 4 report (2025)", url: "https://jfiresearch.org/wp-content/uploads/2025/04/HudsonUP-Basic-Income-Pilot-Year-4-2025.pdf" },
    { text: "NYS DCJS, Enhanced Child Visiting profile (2025)", url: "https://knowledgebank.criminaljustice.ny.gov/system/files/documents/2025/09/enhanced-child-visiting-printable-090825_0.pdf" },
    { text: "Greater Hudson Promise Neighborhood 2025 and 2022 Annual Reports", url: "https://greaterhudsonpromise.org/reports" },
    { text: "Greater Hudson Promise Neighborhood program pages", url: "https://greaterhudsonpromise.org/" },
  ],
};

export const LANDING = {
  eyebrow: "For New York cannabis licensees",
  headline: "Need a Community Impact Plan?",
  headline2: "We've Got You Covered",
  sub: "New York's Office of Cannabis Management asks every licensee to show a Community Impact Plan at renewal. Partner with Greater Hudson Promise Neighborhood and put your plan to work for children and families in Hudson and Columbia County living with the impact of the War on Drugs.",
  aboutTitle: "Greater Hudson Promise Neighborhood",
  about: [
    "Greater Hudson Promise Neighborhood is a cradle-to-career organization serving young people ages 0 to 24 and beyond. Its mission is to build an equitable community by providing opportunities and support to individuals and families impacted by systemic failures.",
    "Across all GHPN programs, 79 percent of participants are BIPOC.",
  ],
  programTitle: "Beyond GED",
  program: [
    "Beyond GED serves Opportunity Youth — young people 16 to 24 who are out of school and out of work. It was built from interviews with its first cohort, who named poverty as the main reason they left school: they were working to support themselves or their families.",
    "So the program pays them to learn. Enrolled students receive a paid stipend for hours with a tutor, a hot meal on study days, internship and job placement, and a dedicated staff member who builds an individualized plan around whatever stands in the way — IDs, court dates, housing, transportation, mental health.",
    "Many participants facing serious felony charges avoided prison and moved into higher education or employment instead.",
  ],
  quotes: [
    { text: "One of the best decisions I've made for my future.", who: "Beyond GED student" },
    { text: "It's been heaven sent for my child, and without this program I am not sure where my son would be.", who: "Beyond GED parent" },
  ],
  howTitle: "Four steps to your plan",
  how: [
    { step: "Choose your focus", body: "General support for GHPN, Beyond GED, or Families Impacted by Incarceration.", href: "#options" },
    { step: "Sign your pledge", body: "We recommend at least $5,000 a year for two years. The form takes about ten minutes.", href: "/pledge" },
    { step: "Pay Year 1", body: "Pay your first year's contribution online or by check. Year 2 is due on the anniversary.", href: "" },
    { step: "Receive your plan", body: "A complete Community Impact Plan, plus suggested responses to every Community Impact question on the OCM renewal application, ready for your review.", href: "" },
  ],
  reportNote: "Each year, GHPN sends partners an impact summary to support their next renewal.",
  disclaimer:
    "The plan and portal responses are a suggested draft. Each licensee is solely responsible for reviewing, editing, and approving its own submission to OCM. Nothing here is legal or tax advice.",
};

// ─────────────────────────────────────────────────────────────
// Community Impact Plan narrative (mirrors the Domes plan)
// ─────────────────────────────────────────────────────────────
export const PLAN = {
  needQ: "What problem or need does your community impact plan seek to address? Please include any relevant data.",
  need: [
    "The {{company}}/Greater Hudson Promise Neighborhood (GHPN) partnership addresses the urgent challenge facing Opportunity Youth in the city of Hudson, NY and Columbia County. Many of the families served have been disproportionately affected by the War on Drugs and its long-term economic and social consequences, contributing to school disengagement, economic instability, and higher rates of justice system involvement among young people of color.",
    "The partnership centers on GHPN's Education and Professional Development work, specifically the Beyond GED program. Beyond GED was created in 2022 in direct response to young adults in Hudson who were increasingly interacting with the justice system and facing incarceration after dropping out of school. Through interviews with the program's first cohort, young people identified poverty as the primary driver of school withdrawal, often leaving school to work and support themselves or their families. Their feedback shaped the program to address real barriers with wraparound support.",
    "The need is clear. Young people without a high school credential face reduced lifetime earnings, higher unemployment rates, and greater risk of justice system involvement. Beyond GED fills a critical gap for youth who have already left the traditional school system and require an alternative, supportive route to completion.",
    "Many participants facing serious felony charges were able to avoid prison and instead transition into higher education or employment. Since participation, none have re-entered the justice system. These outcomes demonstrate the power of combining academic instruction with financial assistance, professional development, vocational exploration, college support, and practical resources.",
    "Since launching in 2022, Beyond GED has served over 23 young people. Within six weeks of the first cohort enrolling, 100 percent completed their GEDs. The {{company}}–GHPN partnership is uniquely positioned to deepen and expand this impact by increasing enrollment of Opportunity Youth across Columbia County, providing a safe learning and workforce development environment, expanding career-connected training opportunities, reducing justice system involvement, and strengthening long-term economic mobility for young adults living in poverty. At its core, this partnership addresses educational and economic disconnection among Opportunity Youth who have been failed by traditional systems. By providing a structured pathway to high school equivalency, career development, and ongoing support, {{company}} and GHPN can interrupt cycles of poverty and justice involvement while building a stronger, more equitable workforce pipeline for Columbia County.",
  ],
  whoQ: "Who are the communities and individuals disproportionately impacted you intend to target?",
  who: [
    "The targeted population are young people ages 16 to 24 who are not enrolled in school and not working, many of whom have been disproportionately impacted by poverty, systemic oppression, and justice system involvement. GHPN is a cradle-to-career organization serving young people ages 0 to 24 and beyond, with a mission to build an equitable community by providing opportunities and support to individuals and families impacted by systemic failures. Beyond GED serves Opportunity Youth within the Hudson City School District and, with expanded support, throughout Columbia County. Across all GHPN programs, 79 percent of participants are BIPOC. In Beyond GED, 100 percent of enrolled students are students of color and all are living below the poverty line, reflecting the disproportionate impact of educational and economic inequities locally.",
  ],
  goals: [
    {
      title: "Increase Educational Attainment.",
      body: "Support Opportunity Youth in earning their high school equivalency credential (GED), providing a critical foundation for long-term success. The program aims to improve graduation outcomes for youth who have disengaged from traditional school systems.",
      measure: "Measured by GED tests taken and GED credentials earned annually and cumulatively (2025: 34 GED tests taken, 6 GEDs earned; 11 GEDs earned since program inception).",
    },
    {
      title: "Strengthen Workforce and Career Pathways.",
      body: "Provide professional development, vocational training opportunities, and career-connected support so participants can access stable employment, job training programs, or post-secondary education. This goal ensures youth are prepared for sustainable careers and economic mobility.",
      measure: "Measured by the number of participants obtaining part-time or full-time employment, job retention, and enrollment in vocational training or postsecondary education (2025: 16 participants gained employment).",
    },
    {
      title: "Reduce Justice System Involvement and Promote Stability.",
      body: "Through wraparound services, mentorship, and academic and financial support, Beyond GED helps youth avoid further involvement with the justice system and build personal stability. Early program outcomes show participants have successfully avoided incarceration and re-entry into the justice system.",
      measure: "Measured by justice system re-entry among program completers (zero since launch) and stability supports provided (2025: 20 DMV identification cards, 6 court supports, 4 eviction prevention supports, 3 mental health connections).",
    },
  ],
  measureQ: "How will you measure your program's success? Please describe both the qualitative and quantitative metrics you plan to use and how you'll gather this information.",
  qualitative: [
    "Qualitative success will be measured through participant stories, feedback, and demonstrated growth in confidence, stability, and future orientation. Beyond GED creates a supportive, calm environment where young people feel safe re-engaging in education after negative experiences in traditional school settings. Participants consistently describe the program as a community where staff provide encouragement, mentorship, and individualized guidance.",
    "Students report gaining not only academic skills, but also practical life skills and motivation. One participant shared that Beyond GED provided “a comfortable space where I can focus, study, and grab some snacks,” while also helping them secure an ID, open a bank account, and find employment. Another student described the program as “one of the best decisions I've made for my future,” emphasizing the unwavering support that kept them from giving up.",
    "Parents also highlight the program's impact, noting that youth who previously struggled to attend school are now consistently showing up, completing work, and passing exams. Families value the wraparound support Beyond GED provides, including court accompaniment, job assistance, and emotional encouragement. As one parent shared, “It's been heaven sent for my child, and without this program I am not sure where my son would be.”",
    "These qualitative measures, combined with participant interviews, retention patterns, and ongoing feedback, ensure the program is not only achieving outcomes, but also transforming how young people see themselves, their education, and their future.",
  ],
  quantIntro:
    "The success of the Beyond GED program will be measured through clear, quantitative outcomes across education, employment, stability, and barrier reduction for Opportunity Youth ages 16 to 24.",
  quantSections: [
    {
      heading: "Participant Demographics and Reach",
      paras: [
        "In 2025, 90 percent of participants identified as BIPOC, and 70 percent identified as male and 30 percent as female. These figures reflect the program's focus on serving youth who are disproportionately impacted by poverty, school disengagement, and justice system involvement.",
      ],
      bullets: [] as string[],
    },
    {
      heading: "Educational Outcomes",
      paras: ["Educational attainment is a primary success metric. In 2025:"],
      bullets: [
        "20 Opportunity Youth were enrolled",
        "34 GED tests were taken",
        "6 participants earned their GED in 2025",
        "11 participants have earned their GED since program inception",
      ],
      after:
        "Tracking includes number of participants enrolled, number of GED tests scheduled and completed, subject test pass rates, and total GED credentials earned annually and cumulatively. Progress toward completion is monitored weekly through attendance, testing benchmarks, and individualized academic plans.",
    },
    {
      heading: "Employment Outcomes",
      paras: ["Workforce engagement is another core indicator of success. In 2025:"],
      bullets: ["16 participants gained employment"],
      after:
        "We measure job placement rates, job retention, and transitions into vocational training or postsecondary education. Employment is defined as obtaining part time or full time work after enrollment in the program.",
    },
    {
      heading: "Barrier Reduction and Stability Metrics",
      paras: [
        "Because Opportunity Youth often face structural barriers that prevent persistence, we measure tangible stability supports that remove obstacles to education and employment. In 2025:",
      ],
      bullets: [
        "20 participants received DMV identification cards",
        "4 participants opened bank accounts",
        "30+ professional driving lessons were scheduled and attended, in partnership with RIMS Driving School and the Spark of Hudson; 2 participants passed the permit exam and 2 passed the road test",
        "6 court supports were provided",
        "4 eviction prevention supports were provided",
        "3 participants were connected to mental health services",
      ],
      after:
        "These indicators are critical benchmarks of progress. Obtaining identification, securing housing stability, resolving legal issues, accessing transportation, and receiving mental health support directly correlate with improved attendance, persistence, and employment readiness.",
    },
    {
      heading: "Justice System Diversion and Recidivism",
      paras: [
        "A key long term metric is reduced justice system involvement. Since launching in 2022, none of the participants who completed the program have re-entered the justice system. We track court involvement, compliance with legal requirements, and post program outcomes.",
      ],
      bullets: [],
    },
    {
      heading: "Overall Program Performance Indicators",
      paras: ["Program success will continue to be measured through:"],
      bullets: [
        "GED completion rate",
        "Employment placement rate",
        "Post secondary enrollment rate",
        "Percentage of participants receiving critical support services",
        "Reduction in justice system involvement",
        "Participant retention and persistence rates",
      ],
      after:
        "By combining academic metrics with employment outcomes and stability indicators, Beyond GED evaluates success holistically. The data demonstrates measurable progress in reconnecting Opportunity Youth to education, employment, and long term economic mobility.",
    },
  ],
  reporting:
    "GHPN will provide {{company}} with an annual impact summary covering the metrics above, along with acknowledgment of contributions received. {{company}} will retain these records, together with proof of each contribution, to document plan implementation at license renewal.",
};

export function fill(text: string, company: string) {
  return text.split("{{company}}").join(company);
}

// ─────────────────────────────────────────────────────────────
// Renewal application guide — suggested responses for the
// Community Impact Plan section of the OCM renewal portal.
// ─────────────────────────────────────────────────────────────
export const GUIDE = {
  title: "Renewal Application Guide",
  intro:
    "Your OCM renewal application includes a Community Impact Plan section with the questions below. We\u2019ve drafted suggested responses based on your partnership with Greater Hudson Promise Neighborhood. Review each one, adjust anything that doesn\u2019t reflect your business, and paste it into the portal yourself.",
  region: "Capital",
  zips: "Primarily 12534 (City of Hudson), expanding throughout Columbia County.",
  reach: "25-50",
  research: "Community conversations",
  researchNote:
    "Select the options that are true for your business. Beyond GED was designed from interviews with its first cohort of participants, and GHPN can walk you through that research.",
  activities: [
    "job placement",
    "job skills services",
    "adult education",
    "system navigation services",
    "legal services to address barriers to reentry",
  ],
  metricsFrequency: "monthly",
  deckPath: "/ghp-overview.pdf",
};
