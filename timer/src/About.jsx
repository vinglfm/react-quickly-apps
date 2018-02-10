const React = require('react');
const {connect} = require('react-redux');
const {clearLog} = require('./flow/log.js');
const Button = require('Button');
const Log = require('Log');

class About extends React.Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.props.clearLog();
  }

  render() {
    return (
      <div>
        <Button labelText="Clear" apply={this.clear} disabled={this.props.logs.isEmpty}/>
        {this.props.logs.map((log, index) => (
          <Log key={index} data={log}/>
        ))}
      </div>
    );
  }
}

module.exports = connect(({log})=>({logs: log.logs}), {
  clearLog
})(About);
