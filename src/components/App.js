import { Container, Grid, Message, Button, Form } from 'semantic-ui-react'
import React from 'react'
import { Chart } from 'react-google-charts'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      apiResponse: "You haven't sent any queries yet!",
      pieChart: false,
      error: false,
      beforeAfter: null,
      pageURL: '',
      numResults: '',
      pathLength: '',
      data: [],
      // /* eslint-disable */
      // data: [
      //   ["Path", "Frequency"],
      //   ["Work", 11],
      //   ["Eat", 2],
      //   ["Commute", 2],
      //   ["Watch TV", 2],
      //   ["Sleep", 7],
      //   /* eslint-enable */
      // ],
    }
  }


  async handleClick() {
    try {
      const response = await fetch('https://gv-api.tools.shave.io/paths?' +
        `page_url=www.dollarshaveclub.com/${this.state.pageURL}&` +
        `type=${this.state.beforeAfter}&` +
        `path_length=${this.state.pathLength}&` +
        `num_res=${this.state.numResults}`)
      const r = await response.json()
      this.setState({
        apiResponse: JSON.stringify(r, null, '  '),
      })
      // translate response into data and set state again
      this.setState({
        pieChart: true,
        error: false,
        data: [['Path', 'Frequency'], ...r.data.paths],
      })
    } catch (e) {
      console.log(e)
      this.setState({
        error: true,
      })
    }
  }
  handleChange(event) {
    let value
    let name
    const target = event.target
    if (target.type === 'text') {
      value = target.value
      name = target.name
    } else {
      value = target.innerText
      name = 'beforeAfter'
    }
    this.setState({
      [name]: value,
    })
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
              <h3>All URLs Begin With www.DollarShaveClub.com/</h3>
            </Grid.Row>
            <Grid.Row>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Select
                    type='select'
                    name='beforeAfter'
                    label='Before or After?'
                    value={this.state.beforeAfter}
                    onChange={this.handleChange}
                    options = {[
                      { key: 'b', text: 'Before', value: 'Before' },
                      { key: 'a', text: 'After', value: 'After' }]}
                  />
                  <Form.Input label='Page URL'
                    type='input'
                    name='pageURL'
                    placeholder='...com/YOURINPUT'
                    value={this.state.pageURL}
                    onChange={this.handleChange}/>
                  <Form.Input label='Path Length'
                    name='pathLength'
                    type='input'
                    placeholder='An integer'
                    value={this.state.pathLength}
                    onChange={this.handleChange} />
                  <Form.Input label='Number of Results'
                    name='numResults'
                    type='input'
                    placeholder='An integer'
                    value={this.state.numResults}
                    onChange={this.handleChange} />
                </Form.Group>
                <Button onClick={this.handleClick} type='submit'>Send Database Query</Button>
              </Form>
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
                height="700px"
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
