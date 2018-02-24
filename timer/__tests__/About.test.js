const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

const sinon = require('sinon');
const {expect} = require('chai');
const React = require('react');
const {About} = require('About');

test('clear button disabled when logs are empty', () => {
  const click = sinon.spy();

  const about = Enzyme.shallow(
      <About apply={click} logs={[]}/>
  );

  expect(about.find('Button').prop('disabled')).to.be.true;
});
