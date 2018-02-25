const React = require('react');
const ReactDOM = require('react-dom');
const request = require('axios');

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options: this.props.options,
      filteredOptions: this.props.options,
      currentOption: ''
    }
    this.filter = this.filter.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  componentDidMount() {
    if (this.props.url === 'test') {
      return true;
    }
    request({url: this.props.url})
      .then(response=>response.data)
      .then(body => {
        if(!body) {
          return console.error('Failed to load');
        }
        this.setState({options: body});
      })
      .catch(console.error);
  }

  filter(event) {
    this.setState({
      currentOption: event.target.value,
      filteredOptions: (this.state.options.filter(function(option, index, list){
        return (event.target.value === option.name.substr(0, event.target.value.length))
      }))
    }, function(){
    })
  }

  addOption(event) {
    let currentOption = this.state.currentOption;
    request
      .post(this.props.url, {name: currentOption})
      .then(response => response.data)
      .then((body) => {
        if(!body){
          return console.error('Failed to save')
        }
        this.setState({ options: [body].concat(this.state.options) }, ()=>{
          this.filter({target: {value: currentOption}})
        })
      })
      .catch(error=>{return console.error('Failed to save')})
  }

  removeOption(event) {
    event.preventDefault();
    const optionId = event.target.getAttribute('data-optId');
    const updatedOptions = this.state.options.filter(elem => elem._id !== optionId);
    this.setState({
      options: updatedOptions,
      filteredOptions: updatedOptions.filter(function(option, index, list){
        return (event.target.value === option.name.substr(0, event.target.value.length))
      })
    });
  }

  render() {
    const that = this;
    return (
      <div className="form-group">
        <input type="text"
          onKeyUp={(event)=>(event.keyCode==13)?this.addOption():''}
          className="form-control option-name"
          onChange={this.filter}
          value={this.currentOption}
          placeholder="React.js">
        </input>
        {this.state.filteredOptions.map(function(option, index, list){
          return <div key={option._id}>
            <a className="btn btn-default option-list-item"
              href={'/#/'+option.name} target="_blank">
              #{option.name}
              <button data-optId={option._id} onClick={that.removeOption}>x</button>
            </a>
          </div>
        })}
        {(()=>{
          if (this.state.filteredOptions.length == 0 && this.state.currentOption!='')
            return <a className="btn btn-info option-add" onClick={this.addOption}>
              Add #{this.state.currentOption}
            </a>
        })()}
      </div>
    )
  }
}

module.exports = Autocomplete
