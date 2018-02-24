const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
const {clearLog, fetchLog} = require('./flow/log.js');
const Button = require('Button.jsx');
const Log = require('Log.jsx');

class About extends React.Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    const query ='query {\n  logs {\n    text\n  }\n}';

    axios.get(`/graphql?query=${query}`).then(response => {
      this.props.fetchLog(response.data.data.logs);
    });
  }

  clear() {
    this.props.clearLog();
  }

  render() {
    return (
      <div>
        <Button labelText="Clear" apply={this.clear} disabled={this.props.logs.length === 0}/>
        {this.props.logs.map((log, index) => (
          <Log key={index} data={log.text}/>
        ))}
      </div>
    );
  }
}

module.exports = connect(({log})=>({logs: log.logs}), {
  clearLog,
  fetchLog
})(About);

module.exports.About = About;
