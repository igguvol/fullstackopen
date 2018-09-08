import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countryName: '',
      selected: 0,
      countries: []
    }

  }

  componentDidMount()
  {
    const xhttp = new XMLHttpRequest()

    var app = this;
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const data = JSON.parse(this.responseText)
        app.setState( {countries:data} );
      }
    }

    xhttp.open('GET', 'https://restcountries.eu/rest/v2/all', true)
    xhttp.send();
  }


  ChangeCountry = (event) => {
    this.setState( { countryName: event.target.value });
  }

  CopyName = (event) => {
    console.log(event.target.innerHTML);
    this.setState( {countryName: event.target.innerHTML});
  }

  ShowResults = (props) => {
    // try exact hits first
    var c = props.countries.filter( a => a.name.toLowerCase() === props.countryName.toLowerCase() );
    // if there's no exact hit, filter with part of name
    if ( c.length !== 1 )
      c = props.countries.filter( a => a.name.toLowerCase().indexOf(props.countryName.toLowerCase()) >= 0 );
    if ( c.length === 1 )
    {
      return (
        <div>
          <h1>{c[0].name}</h1>
          <b key="cap">capital: {c[0].capital}</b> <br />
          <b>population: {c[0].population}</b><br />
          <img alt="flag" src={c[0].flag} />
        </div>
      );
    }
    if ( c.length >= 10 )
      return ( "" + c.length + " matches, specify another filter")
    return c.map( a => (<div onClick={this.CopyName} key={a.name}>{a.name}</div>) );
  }


  render() {
    return (
      <div>
        <form key='name'>
          find countries: <input name='name' value={this.state.countryName} onChange={this.ChangeCountry} />
        </form>
        <div>
          {this.ShowResults(this.state)}
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <App  />,
  document.getElementById('root')
)