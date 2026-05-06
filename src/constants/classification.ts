export const SENIORITY_RULES: [string, RegExp][] = [
  ['C-Level',   /\b(ceo|cto|cfo|coo|cmo|cpo|ciso|cio|chief|founder|co-founder|cofounder|owner|president|partner|managing director|md\b)/i],
  ['VP',        /\b(vp|vice president|svp|evp)\b/i],
  ['Director',  /\b(director|head of|head\s)/i],
  ['Manager',   /\b(manager|lead|principal|team\s?lead|tl\b)/i],
  ['Senior',    /\b(senior|sr\.?|staff)\b/i],
  ['Junior',    /\b(junior|jr\.?|intern|trainee|graduate|entry)\b/i],
  ['Student',   /\b(student|undergraduate|phd candidate)\b/i],
]

export const ROLE_RULES: [string, RegExp][] = [
  ['Engineering',     /\b(engineer|engineering|developer|dev\b|programmer|sde|swe|devops|sre|backend|frontend|fullstack|full-stack|full stack|architect|coder)\b/i],
  ['Data & AI',       /\b(data scientist|data engineer|data analyst|machine learning|ml engineer|ai engineer|ai\b|nlp|llm|analytics|bi developer|business intelligence)\b/i],
  ['Product',         /\b(product manager|product owner|cpo|product lead|pm\b|product designer)\b/i],
  ['Design',          /\b(designer|design\b|ux|ui|graphic|creative)\b/i],
  ['Security',        /\b(security|cyber|grc|infosec|soc analyst|pentest|red team|blue team|ciso|threat)\b/i],
  ['Marketing',       /\b(marketing|growth|seo|content|brand|community manager|social media|cmo)\b/i],
  ['Sales & BD',      /\b(sales|account executive|ae\b|account manager|business development|bd\b|partnerships|customer success|cs manager|csm)\b/i],
  ['Operations',      /\b(operations|ops\b|coo|chief of staff|program manager|project manager|pmo)\b/i],
  ['Finance & Legal', /\b(finance|cfo|accountant|controller|legal|lawyer|attorney|counsel|compliance)\b/i],
  ['HR & Recruiting', /\b(hr\b|human resources|people|talent|recruit|sourcer|chro)\b/i],
  ['Executive',       /\b(ceo|founder|co-founder|cofounder|president|owner|chief|managing director)\b/i],
  ['QA',              /\b(qa\b|quality assurance|tester|automation engineer|test engineer)\b/i],
  ['Support',         /\b(support|technical support|customer support|help desk)\b/i],
  ['Research',        /\b(research|researcher|scientist|phd|professor|lecturer)\b/i],
]

export const SENIORITY_ORDER = [
  'C-Level', 'VP', 'Director', 'Manager', 'Senior', 'IC / Other', 'Junior', 'Student', 'Unknown',
]
