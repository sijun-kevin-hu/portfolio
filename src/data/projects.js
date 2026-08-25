import {
    IconAndroid,
    IconCss,
    IconFirebase,
    IconFlask,
    IconHtml,
    IconJava,
    IconJavaScript,
    IconMysql,
    IconNext,
    IconNumpy,
    IconPandas,
    IconPython,
    IconReact,
    IconSklearn,
    IconStreamlit,
    IconTailwind,
    IconThreejs,
    IconTypeScript,
    IconVite
} from './techIcons';

export function getTagTone(category) {
    if (category === 'AI/ML') {
        return 'bg-purple-500/12 text-purple-300 border-purple-400/35';
    }

    if (category === 'Mobile') {
        return 'bg-cyan-500/12 text-cyan-200 border-cyan-300/35';
    }

    return 'bg-blue-500/12 text-blue-200 border-blue-300/35';
}

export const projects = [
    {
        title: "Break My House",
        description: "Insurance is easier to understand when the roof is caving in. Break My House turns home-insurance risk into an interactive 3D strategy game where players trigger five disasters, buy protections with a $50,000 reserve, and see how each decision changes the damage, payout, and odds of staying solvent.",
        tech_img: [IconReact, IconThreejs, IconVite],
        technologies: ["React", "Three.js", "Vite"],
        github: 'https://github.com/sijun-kevin-hu/break-my-house',
        liveSite: 'https://break-my-house.vercel.app',
        category: "Full-Stack",
        featured: true
    },
    {
        title: "Financial Regression Pipeline",
        description: "Can company culture help predict market value? This end-to-end ML pipeline combines financial ratios with firm culture scores to forecast earnings yield, using feature engineering and scikit-learn to cut model error by roughly 70%.",
        tech_img: [IconPython, IconPandas, IconNumpy, IconSklearn],
        technologies: ["Python", "Pandas", "NumPy", "scikit-learn"],
        github: null,
        repoNote: 'Georgia Tech internal repo — code samples available on request',
        category: "AI/ML",
        featured: true
    },
    {
        title: "Clash Royale Matchup Predictor",
        description: "Bringing data science to the arena. This ML pipeline crawls live Clash Royale data and turns decks, card levels, and trophy gaps into explainable win probabilities through an Optuna-tuned XGBoost model and interactive Streamlit dashboard.",
        tech_img: [IconPython, IconPandas, IconSklearn, IconStreamlit],
        technologies: ["Python", "Pandas", "scikit-learn", "Clash Royale API"],
        github: 'https://github.com/sijun-kevin-hu/clash_predict',
        liveSite: 'https://clashpredict.streamlit.app',
        category: "AI/ML",
        featured: true
    },
    {
        title: "Tap Detail",
        description: "The command center for mobile auto detailers. Tap Detail handles booking, scheduling, reminders, client management, and earnings in one polished workflow—helping independent operators spend less time on admin and more time growing their business.",
        tech_img: [IconNext, IconFirebase, IconTypeScript, IconTailwind],
        technologies: ["Next.js", "Firebase", "TypeScript", "Tailwind"],
        github: 'https://github.com/sijun-kevin-hu/tap-detail-app',
        liveSite: 'https://tapdetail.com',
        category: "Full-Stack",
        featured: true
    },
    {
        title: "Infinite Story Universe",
        description: "What if every reader helped write the next chapter? Infinite Story Universe uses Vertex AI, live voting, and prompt chaining to create branching stories that stay coherent as the community builds an ever-expanding multiverse.",
        tech_img: [IconReact, IconTypeScript, IconFirebase],
        technologies: ["React", "TypeScript", "Firebase", "Vertex AI"],
        github: 'https://github.com/sijun-kevin-hu/infinite_story_universe',
        liveSite: 'https://infinitestoryuniverse.com',
        category: "Full-Stack",
        featured: true
    },
    {
        title: "Spotistats",
        description: "Spotify Wrapped, minus the twelve-month wait. Spotistats turns listening history into year-round insights for top artists and tracks, with friend connections and real-time syncing powered by Android and Firebase.",
        tech_img: [IconJava, IconFirebase, IconAndroid],
        technologies: ["Java", "Firebase", "Android SDK"],
        github: 'https://github.com/sijun-kevin-hu/SpotifyWrapped/tree/main',
        category: "Mobile",
        featured: true
    },
    {
        title: "BubbledIn",
        description: "Built for conversations that refuse to wait for a quiet room. BubbledIn creates private WebRTC audio bubbles with AI-powered live transcription, helping teams hear and understand each other in noisy spaces like hackathons.",
        tech_img: [IconReact, IconTypeScript, IconFirebase],
        technologies: ["React", "TypeScript", "Firebase"],
        github: 'https://github.com/elenesturua/BubbledIn',
        category: "Full-Stack",
        liveSite: 'https://bubbled-in.vercel.app',
        featured: true
    },
    {
        title: "DreamCatcher",
        description: "A journal that dreams in pictures. DreamCatcher uses NLP and diffusion models to turn personal entries into original artwork, with a Flask and React pipeline that transforms messy subconscious thoughts into something users can actually see.",
        tech_img: [IconReact, IconFlask, IconFirebase],
        technologies: ["React", "Flask", "Firebase"],
        github: 'https://github.com/jamesrm67/hacklytics-2025',
        category: "Full-Stack",
        featured: false
    },
    {
        title: "AdaLens",
        description: "The web has a vision problem. AdaLens uses multimodal LLMs to analyze images in real time and generate WCAG-ready metadata, helping screen-reader users access visual content that would otherwise remain invisible.",
        tech_img: [IconTypeScript, IconFlask, IconPython],
        technologies: ["TypeScript", "Flask", "Python"],
        github: 'https://github.com/sijun-kevin-hu/AdaLens',
        liveSite: 'https://chromewebstore.google.com/detail/adalens/kjiefilplldbhlgandhkdpemmnceldod',
        category: "AI/ML",
        featured: true
    },
    {
        title: "Book Club",
        description: "Good books deserve better than a forgotten notes app. Book Club lets readers log progress, organize collections, and connect with fellow readers through a full-stack Flask and React experience.",
        tech_img: [IconReact, IconPython, IconFlask],
        technologies: ["React", "Python", "Flask"],
        github: "https://github.com/sijun-kevin-hu/BookClub",
        category: "Full-Stack",
        featured: false
    },
    {
        title: "Poker Profit Tracker",
        description: "Know when you’re running hot—and when the math disagrees. Poker Profit Tracker logs sessions, win rates, and bankroll performance through a JavaEE backend, turning scattered results into a clearer picture of your game.",
        tech_img: [IconJava, IconMysql, IconHtml, IconCss],
        technologies: ["Java", "MySQL", "HTML5", "CSS3"],
        github: "https://github.com/sijun-kevin-hu/PokerProfitTracker",
        category: "Full-Stack",
        featured: false
    },
    {
        title: "Course Scheduler",
        description: "Built for students whose deadlines all seem to land at once. This Android app organizes courses, assignments, schedules, and weekly priorities so users spend less time juggling tasks and more time finishing them.",
        tech_img: [IconJava, IconAndroid],
        technologies: ["Java", "Android SDK"],
        github: 'https://github.com/sijun-kevin-hu/Scheduler',
        category: "Mobile",
        featured: false
    },
    {
        title: "Atlanta News Scraper",
        description: "Atlanta headlines without the homepage clutter. This Python and Flask scraper collects the latest Fox 5 stories and presents them in one clean feed for a faster daily news check.",
        tech_img: [IconPython, IconFlask],
        technologies: ["Python", "Flask"],
        github: 'https://github.com/sijun-kevin-hu/Atlanta-News-Scraper',
        category: "Full-Stack",
        featured: false
    },
    {
        title: "Restaurant Website",
        description: "A neighborhood favorite needed a better front door. This responsive website brings a local Chinese buffet’s menu, story, and location online, giving customers a quick path from browsing to visiting.",
        tech_img: [IconHtml, IconCss, IconJavaScript],
        technologies: ["HTML5", "CSS3", "JavaScript"],
        github: 'https://github.com/sijun-kevin-hu/chinabuffet-website',
        category: "Full-Stack",
        liveSite: 'https://tnchinabuffet.com',
        featured: false
    },
    {
        title: "Portfolio Website",
        description: "Yes, this project is a little recursive. I built this portfolio with React and Tailwind to showcase my work through a fast, responsive interface with polished motion, accessible interactions, and just enough personality.",
        tech_img: [IconReact, IconJavaScript, IconTailwind, IconCss, IconHtml],
        technologies: ["React", "JavaScript", "Tailwind", "CSS3", "HTML5"],
        github: 'https://github.com/sijun-kevin-hu/portfolio',
        category: "Full-Stack",
        featured: false
    }
];
