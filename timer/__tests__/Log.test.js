const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

const {expect} = require('chai');

const React = require('react');
const Log = require('Log');

test('Log renders data as children', () => {

  const log = Enzyme.shallow(<Log data="for rendering"/>);

  expect(log.props().children).to.equal('for rendering');
});
