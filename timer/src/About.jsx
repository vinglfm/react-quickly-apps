const React = require('react');
const {connect} = require('react-redux');
const {getLog} = require('./flow/log.js');
const Log = require('Log');

const About = (props) => {
  return (
    <div>
      {props.logs.map((log, index) => (
        <Log key={index} data={log}/>
      ))}
    </div>
  );
};

module.exports = connect(({logs})=>({logs: logs.logs}))(About);
