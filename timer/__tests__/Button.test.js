const React = require('react');
const { createRenderer } = require('react-test-renderer/shallow');
const Button = require('../src/Button.jsx');

test('button renders data', () => {

  const btnRenderer = createRenderer();
  btnRenderer.render(<Button disabled={true} labelText="label text"/>);
  const btn = btnRenderer.getRenderOutput();

  expect(btn.type).toBe('button');
  expect(btn.props.disabled).toBeTruthy();
  expect(btn.props.onClick).toBeDefined();
  expect(btn.props.children).toBe("label text");
});
