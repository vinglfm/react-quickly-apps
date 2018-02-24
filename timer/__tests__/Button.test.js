const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

const sinon = require('sinon');
const {expect} = require('chai');

const React = require('react');
const Button = require('Button');

test('render button with text and in disabled state', () => {

  const btn = Enzyme.shallow(<Button disabled={true} labelText="label text"/>);

  expect(btn.props().type).to.equal('button');
  expect(btn.props().disabled).to.be.true;
  expect(btn.props().children).to.equal('label text');
});

test('button click deligate call to props apply', () => {

  const click = sinon.spy();

  const btn = Enzyme.shallow(<Button disabled={false} labelText="label text" apply={click}/>);

  btn.find('button').simulate('click');
  expect(click).to.have.property('callCount', 1);
});
