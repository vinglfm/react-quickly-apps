const React = require('react');
const { createRenderer } = require('react-test-renderer/shallow');
const Log = require('../src/Log.jsx');

test('Log renders props.data', () => {

  const logRenderer = createRenderer();
  logRenderer.render(<Log data="for rendering"/>);
  const log = logRenderer.getRenderOutput();

  expect(log.type).toBe('p');
  expect(log.props.children).toBe("for rendering");
});
