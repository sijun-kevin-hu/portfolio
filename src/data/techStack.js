import {
    IconPython,
    IconJava,
    IconJavaScript,
    IconTypeScript,
    IconC,
    IconCpp,
    IconCSharp,
    IconHtml,
    IconCss,
    IconSql,
    IconReact,
    IconAngular,
    IconNext,
    IconTailwind,
    IconFlask,
    IconDjango,
    IconNode,
    IconExpress,
    IconGit,
    IconFirebase,
    IconSupabase,
    IconAws,
    IconDocker,
    IconPandas,
    IconNumpy,
    IconSklearn,
    IconStreamlit
} from './techIcons';

export const technicalLanguages = [
    { name: "Python",     icon: IconPython,     color: "from-blue-500 to-blue-600",     iconColor: "#3776AB" },
    { name: "C#",         icon: IconCSharp,     color: "from-purple-600 to-purple-700", iconColor: "#9B59D0" },
    { name: "JavaScript", icon: IconJavaScript, color: "from-yellow-400 to-yellow-500", iconColor: "#F7DF1E" },
    { name: "TypeScript", icon: IconTypeScript, color: "from-blue-500 to-blue-600",     iconColor: "#3178C6" },
    { name: "Java",       icon: IconJava,       color: "from-orange-500 to-orange-600", iconColor: "#ED8B00" },
    { name: "C",          icon: IconC,          color: "from-gray-400 to-gray-500",     iconColor: "#A8B9CC" },
    { name: "C++",        icon: IconCpp,        color: "from-blue-600 to-blue-700",     iconColor: "#00599C" },
    { name: "HTML",       icon: IconHtml,       color: "from-orange-600 to-orange-700", iconColor: "#E34F26" },
    { name: "CSS",        icon: IconCss,        color: "from-blue-400 to-blue-500",     iconColor: "#1572B6" },
    { name: "SQL",        icon: IconSql,        color: "from-blue-500 to-blue-600",     iconColor: "#4479A1" },
];

export const technicalFrameworks = [
    { name: "React",       icon: IconReact,    color: "from-cyan-400 to-cyan-500",   iconColor: "#61DAFB" },
    { name: "Angular",     icon: IconAngular,  color: "from-red-500 to-red-600",     iconColor: "#DD0031" },
    { name: "Next.js",     icon: IconNext,     color: "from-gray-400 to-gray-500",   iconColor: "#E5E7EB" },
    { name: "TailwindCSS", icon: IconTailwind, color: "from-cyan-400 to-cyan-500",   iconColor: "#06B6D4" },
    { name: "Flask",       icon: IconFlask,    color: "from-gray-400 to-gray-500",   iconColor: "#E5E7EB" },
    { name: "Django",      icon: IconDjango,   color: "from-green-600 to-green-700", iconColor: "#44B78B" },
    { name: "Node.js",     icon: IconNode,     color: "from-green-500 to-green-600", iconColor: "#339933" },
    { name: "Express",     icon: IconExpress,  color: "from-gray-400 to-gray-500",   iconColor: "#E5E7EB" },
];

export const technicalTools = [
    { name: "Git",      icon: IconGit,      color: "from-red-500 to-red-600",     iconColor: "#F05032" },
    { name: "Firebase", icon: IconFirebase, color: "from-yellow-500 to-yellow-600",iconColor: "#FFCA28" },
    { name: "Supabase", icon: IconSupabase, color: "from-green-400 to-green-500", iconColor: "#3ECF8E" },
    { name: "AWS",      icon: IconAws,      color: "from-orange-400 to-orange-500",iconColor: "#FF9900" },
    { name: "Docker",   icon: IconDocker,   color: "from-blue-400 to-blue-500",   iconColor: "#2496ED" },
];

const aiDataTools = [
    { name: "Pandas",       icon: IconPandas,    color: "from-indigo-500 to-indigo-600", iconColor: "#E70488" },
    { name: "NumPy",        icon: IconNumpy,     color: "from-blue-500 to-cyan-500",     iconColor: "#4D77CF" },
    { name: "scikit-learn", icon: IconSklearn,   color: "from-orange-400 to-blue-500",   iconColor: "#F7931E" },
    { name: "Streamlit",    icon: IconStreamlit, color: "from-red-400 to-red-500",       iconColor: "#FF4B4B" },
];

const skillsByName = new Map(
    [...technicalLanguages, ...technicalFrameworks, ...technicalTools, ...aiDataTools]
        .map((skill) => [skill.name, skill])
);

const selectSkills = (names) => names.map((name) => skillsByName.get(name)).filter(Boolean);

export const capabilityGroups = [
    {
        id: 'ai-ml',
        label: 'AI / ML Systems',
        description: 'I build end-to-end machine-learning features—from data preparation and model evaluation to explainable, product-facing inference.',
        skills: selectSkills(['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Streamlit']),
        evidence: ['Clash Predictor', 'AdaLens', 'Financial Regression Pipeline'],
        accent: 'cyan'
    },
    {
        id: 'full-stack',
        label: 'Full-Stack Products',
        description: 'I turn product ideas into responsive applications across interfaces, APIs, authentication, data, and deployment.',
        skills: selectSkills(['React', 'Angular', 'C#', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'SQL', 'TailwindCSS']),
        evidence: ['Tap Detail', 'Break My House', 'Infinite Story Universe'],
        accent: 'purple'
    }
];

export const supportingSkillGroups = [
    {
        id: 'toolkit',
        label: 'Engineering Toolkit',
        description: 'Platforms and delivery tools I use to move work from local development into production.',
        skills: selectSkills(['Firebase', 'Git', 'Docker', 'AWS', 'Supabase'])
    },
    {
        id: 'additional',
        label: 'Additional Experience',
        description: 'Languages and frameworks that broaden the systems I can understand and contribute to.',
        skills: selectSkills(['Java', 'C', 'C++', 'Express', 'Flask', 'Django', 'HTML', 'CSS'])
    }
];
