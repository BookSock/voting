import React from 'react'
import { TextArea } from 'semantic-ui-react'

class CypherInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "Query here" }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <TextArea rows="8" value={this.state.value} onChange={this.handleChange} />
    )
  }
}

export default CypherInput

class CypherInput extends React.Component {
  handleChange = (event) => {
    this.props.handleChange(event.target.value)
    console.log(event.target.value)
  }

  render() {
    return (
      <TextArea rows="8" value={this.props.textInput} onChange={this.handleChange} />
    )
  }
}

CypherInput.propTypes = {
  textInput: PropTypes.string,
  handleChange: PropTypes.func,
}

export default CypherInput
