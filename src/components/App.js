import { Container, Grid, Message, TextArea, Button } from 'semantic-ui-react'
import React from 'react'
import { Chart } from 'react-google-charts'
import BarChart from './BarChart'
import WorldMap from './WorldMap'


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
              <p>google chart through script tag below</p>
              <div id="chart_div"></div>
            </Grid.Row>
            <Grid.Row>
              <Message>{this.state.apiResponse}</Message>
            </Grid.Row>
            <Grid.Row>
              <p>d3 map drawn by react</p>
              <WorldMap />
            </Grid.Row>
            <Grid.Row>
              <p>d3 graph drawn by d3 outside react lifecycle (another way to do d3)</p>
              <BarChart data={[5, 10, 1, 3, 12, 7, 4, 5, 6, 7, 2.5, 3.3333]} size={[500, 500]} />
            </Grid.Row>
            <Grid.Row>
              <p>google chart through react-google-charts package</p>
              <Chart
                chartType="ScatterChart"
                data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
                options={{}}
                graph_id="ScatterChart"
                width="100%"
                height="400px"
                legend_toggle
              />
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    )
  }
}


export default App
