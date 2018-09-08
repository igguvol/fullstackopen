import React from 'react'
import ReactDOM from 'react-dom'


const Statistic = (name, value) => {
  return (
    <tr key={name}>
      <td key={name}>{name} </td>
      <td key={value}>{value}</td>
    </tr>
  );
}


const Statistics = (props) => {
  var stats = [];
  var total = 0;
  for ( var key in props.value )
  {
    stats.push( Statistic(key,props.value[key]) );
    total += props.value[key];
  }
  var ka = props.value['Hyvä'] - props.value['Huono'];
  if ( total > 0 )
    ka /= total;
  stats.push( Statistic('keskiarvo',ka.toFixed(1)) );

  var po = total>0 ? (props.value['Hyvä'] * 100 / total).toFixed(1) + '%' : '-'
  stats.push( Statistic('positiivisia',po) );
  
  return ( <div><table><tbody>{stats}</tbody></table></div> )
}


class App extends React.Component 
{
    constructor(props) {
      super(props)
      this.state = {
        value: { 'Hyvä': 0, 'Neutraali': 0, 'Huono': 0 }
      }
    }
  
    Button = (a) => () => {
        var d = this.state.value;
        d[a]++;
        this.setState({
            value: d

      })
    }
  
    render() {
      return (
        <div>
          <div>
            <button key="b1" onClick={this.Button('Hyvä')}>hyvä</button>
            <button key="b2" onClick={this.Button('Neutraali')}>neutraali</button>
            <button key="b3" onClick={this.Button('Huono')}>huono</button>
            {Statistics(this.state)}
          </div>
        </div>
      )
    }
  }


ReactDOM.render(
  <App />,
  document.getElementById('root')
)