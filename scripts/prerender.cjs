// Generate crawlable HTML from the same React components and data as the app.
// Run after react-scripts so asset URLs match the production bundle.
process.env.NODE_ENV = 'production';

const fs = require('node:fs');
const path = require('node:path');
const { transformSync } = require('@babel/core');
const React = require('react');
const { prerenderToNodeStream } = require('react-dom/static');
const { renderToStaticMarkup } = require('react-dom/server');

const projectRoot = path.resolve(__dirname, '..');
const sourceRoot = path.join(projectRoot, 'src') + path.sep;
const buildRoot = path.join(projectRoot, 'build');
const manifest = JSON.parse(fs.readFileSync(path.join(buildRoot, 'asset-manifest.json'), 'utf8'));

// Compile only this project's source; dependencies keep Node's normal loader.
const loadJavaScript = require.extensions['.js'];
require.extensions['.js'] = (module, filename) => {
  if (!filename.startsWith(sourceRoot)) return loadJavaScript(module, filename);
  const { code } = transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    babelrc: false,
    configFile: false,
    presets: [
      [require.resolve('@babel/preset-env'), { targets: { node: 'current' }, modules: 'commonjs' }],
      [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
    ],
  });
  module._compile(code, filename);
};
require.extensions['.css'] = (module) => { module.exports = {}; };
for (const [extension, mime] of Object.entries({
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp',
})) {
  require.extensions[extension] = (module, filename) => {
    const basename = path.basename(filename, extension);
    const asset = Object.values(manifest.files).find((url) => (
      url.startsWith(`/static/media/${basename}.`) && url.endsWith(extension)
    ));
    // CRA inlines small assets. A data URL also works in the static snapshot.
    module.exports = asset || `data:${mime};base64,${fs.readFileSync(filename).toString('base64')}`;
  };
}

const App = require('../src/App').default;
const { projects, esportsProjects } = require('../src/data/projects');
const { CONTACT_INFO } = require('../src/constants');
const { ABOUT_CONTENT } = require('../src/data/about');
const { capabilityGroups, supportingSkillGroups } = require('../src/data/techStack');
const siteUrl = 'https://sijunkevinhu.com/';
const personId = `${siteUrl}#person`;
const allProjects = [...projects, ...esportsProjects];
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage', '@id': `${siteUrl}#profile`, url: siteUrl,
      name: 'Sijun Kevin Hu | Software Engineer & Full-Stack Developer',
      mainEntity: { '@id': personId },
      hasPart: allProjects.map((project, index) => ({ '@id': `${siteUrl}#work-${index + 1}` })),
    },
    {
      '@type': 'Person', '@id': personId, name: 'Sijun Kevin Hu',
      alternateName: 'Kevin Hu', url: siteUrl,
      description: ABOUT_CONTENT.introduction,
      jobTitle: 'Software Engineer & Full-Stack Developer',
      homeLocation: { '@type': 'Place', name: CONTACT_INFO.location },
      affiliation: { '@type': 'CollegeOrUniversity', name: 'Georgia Institute of Technology' },
      knowsAbout: [...new Set([...capabilityGroups, ...supportingSkillGroups]
        .flatMap((group) => group.skills.map((skill) => skill.name)))],
      sameAs: [CONTACT_INFO.linkedin, CONTACT_INFO.github],
    },
    ...allProjects.map((project, index) => ({
      '@type': 'SoftwareSourceCode', '@id': `${siteUrl}#work-${index + 1}`,
      name: project.title, description: project.description,
      keywords: project.technologies.join(', '),
      contributor: { '@id': personId },
      ...(project.github ? { codeRepository: project.github } : {}),
      ...(project.liveSite ? { url: project.liveSite } : {}),
    })),
  ],
};

async function renderSnapshot() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error('Portfolio prerender timed out.')), 30000);
  let renderError;
  try {
    // Resolve every lazy section before flattening the tree to static HTML.
    const { prelude, postponed } = await prerenderToNodeStream(
      React.createElement(App, { staticRendering: true }),
      { signal: controller.signal, onError(error) { renderError = error; } },
    );
    for await (const chunk of prelude) { /* Drain the prelude to finish resolving lazy components. */ }
    if (renderError) throw renderError;
    if (postponed) throw new Error('Portfolio prerender left unresolved content.');
    // Flatten the now-resolved tree. Unlike streaming markup, this includes no
    // hidden Suspense segments or scripts needed to assemble the document.
    const html = renderToStaticMarkup(React.createElement(App, { staticRendering: true }));
    if (html.includes('<template') || /<div hidden/.test(html)) {
      throw new Error('Portfolio prerender contains unresolved Suspense segments.');
    }
    return html;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const markup = await renderSnapshot();
  for (const project of allProjects) {
    const escapedDescription = renderToStaticMarkup(React.createElement('p', null, project.description));
    if (!markup.includes(escapedDescription)) {
      // Cards may add attributes to <p>, so compare its escaped text alone.
      const text = escapedDescription.slice(3, -4);
      if (!markup.includes(text)) throw new Error(`Missing static project description: ${project.title}`);
    }
  }
  const htmlPath = path.join(buildRoot, 'index.html');
  const template = fs.readFileSync(htmlPath, 'utf8');
  const rootMarker = '<div id="root"></div>';
  const schemaMarker = /<meta name="portfolio-structured-data"\s*\/?\s*>/;
  if (!template.includes(rootMarker) || !schemaMarker.test(template)) {
    throw new Error('Missing prerender markers. Run npm run build for a fresh HTML template.');
  }
  const schema = JSON.stringify(structuredData).replace(/</g, '\\u003c');
  const html = template.replace(rootMarker, () => `<div id="root">${markup}</div>`)
    .replace(schemaMarker, () => `<script type="application/ld+json">${schema}</script>`);
  fs.writeFileSync(htmlPath, html);
  console.log(`Prerendered portfolio with ${allProjects.length} projects, skills, biography, and structured data.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
