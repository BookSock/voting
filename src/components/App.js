import { Container, Grid, Message, TextArea, Button } from 'semantic-ui-react'
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      apiResponse: "You haven't sent any queries yet!",
      textInput: '',
    }
  }

  handleChange(event) {
    this.setState({ textInput: event.target.value })
  }

  async handleClick() {
    const response = await fetch('https://gv-api.tools.shave.io/queries')
    // const response = await fetch('http://google.com')
    const data = await response.json()
    this.setState({ apiResponse: data.data.visitCount })
  }

  render() {
    return (
      <Container fluid={true} >
        <div>
          <Grid centered={true}>
            <Grid.Row>
              <h1>Graph Vis Portal</h1>
            </Grid.Row>
            <Grid.Row>
              <TextArea
                rows="8"
                value={this.state.textInput}
                onChange={this.handleChange}
              />
            </Grid.Row>
            <Grid.Row>
              <Button onClick={this.handleClick}>
                Send Database Query
              </Button>
            </Grid.Row>
            <Grid.Row>
              <h1>API Response</h1>
            </Grid.Row>
            <Grid.Row>
              <Message>{this.state.apiResponse}</Message>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    )
  }
}


export default App
