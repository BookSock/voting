import { Container, Grid, Message, TextArea, Button, Form } from 'semantic-ui-react'
import React from 'react'
import { Chart } from 'react-google-charts'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      apiResponse: "You haven't sent any queries yet!",
      textInput: '',
      pieChart: true,
      error: false,
      data: [],
      /* eslint-disable */
      data: [
        ["Path", "Frequency"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
        /* eslint-enable */
      ],
    }
  }

  handleChange(event) {
    this.setState({ textInput: event.target.value })
  }

  async handleClick() {
    try {
      // change the fetch url depending on what api
      // spec is and what is typed in the box. then erase text

      const response = await fetch('https://gv-api.tools.shave.io/paths?page_url=&type=0&path_length=')
      const r = await response.json()
      this.setState({
        apiResponse: JSON.stringify(r, null, '  '),
      })
      // translate response into data and set state again
      this.setState({
        pieChart: true,
        textInput: '',
        data: [['Path', 'Frequency'], ...r.data.paths],
      })
    } catch (e) {
      console.log(e)
      this.setState({
        error: true,
      })
    }
  }

  render() {
    const pieChart = this.state.pieChart
    const error = this.state.error
    return (
      <Container fluid={true} >
        <div>
          <Grid centered={true}>
            {error ? <Grid.Row><h2 color="red">Error! Are you sure you are on the Dev VPN? If so, yell at Jason Seibel about this error</h2></Grid.Row> : null}
            <Grid.Row>
              <h1>Graph DB Portal</h1>
            </Grid.Row>
            <Grid.Row>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Select label='Before or After?' options = {[
                    { key: 'b', text: 'Before', value: 'before' },
                    { key: 'a', text: 'After', value: 'after' }]} />
                  <Form.Input label='Page URL' placeholder='Page URL'/>
                  <Form.Input label='Number of Results' placeholder='An integer' />
                </Form.Group>
              </Form>
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
              {pieChart ? <Chart
                chartTitle="DonutChart"
                chartType= "PieChart"
                data={this.state.data}
                options={{
                  pieHole: 0.4,
                  is3D: true,
                }}
                width="100%"
                height="400px"
              /> : null}
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
