import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = (props) => {
    return (<h1> {props.kurssi.nimi} </h1>);
}

const Sisalto = (props) => {
    var sis = [];
    props.osat.forEach( function(a) {
        var d = React.createElement('p', {key:a.nimi}, a.nimi + ' ' + a.tehtavia );
        sis.push(d);
    });
    return React.createElement('div', null, sis);
}

const Yhteensa = (props) => {
    var count = 0;
    props.osat.forEach( a => count += a.tehtavia );
    return React.createElement('div', null, "Yhteensä " + count + " tehtävää");
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: "Reactin perusteet",
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    };

    
    return (
      <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto osat={kurssi.osat} />
        <Yhteensa osat={kurssi.osat} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)