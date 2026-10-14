import { prefersLightweightRendering } from './rendering';

test.each([
  ['Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15', true],
  ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0) AppleWebKit/605.1.15 CriOS/130 Mobile Safari/604.1', true],
  ['Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Chrome/130 Safari/537.36', false],
  ['Mozilla/5.0 Firefox/130.0', false],
])('chooses the appropriate rendering profile for %s', (agent, expected) => {
  expect(prefersLightweightRendering(agent)).toBe(expected);
});
