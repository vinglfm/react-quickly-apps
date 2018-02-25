const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

const sinon = require('sinon');
const {expect} = require('chai');
const React = require('react');
const {About} = require('About');
const Log = require('Log');

test('clear button disabled when logs are empty', () => {
  const about = Enzyme.shallow(
      <About logs={[]}/>
  );

  expect(about.find('Button').prop('disabled')).to.be.true;
});

test('clear button enabled when logs not empty', () => {
  const click = sinon.spy();

  const about = Enzyme.shallow(
      <About apply={click} logs={[{text:'log'}]}/>
  );

  const btn = about.find('Button');

  expect(btn.prop('disabled')).to.be.false;
  expect(btn.prop('labelText')).to.equal('Clear');
});

test('deligate logs text to Log data property', () => {
  const about = Enzyme.shallow(
      <About logs={[{text:'log'}]}/>
  );

  let log = about.find(Log);

  expect(log.prop('data')).to.equal('log');
});

test('create Log for every logs record', () => {
  const about = Enzyme.shallow(
      <About logs={[{text:'log'},{text:'new logs'}]}/>
  );

  let log = about.find(Log);

  expect(log).to.have.property('length', 2);
});
