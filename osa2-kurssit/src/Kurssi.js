import React from 'react';


const Kurssi = (props) => {
  return (
    <div key={props.id}>
      <div>
        <h1>{props.nimi}</h1>
      </div>
      {props.osat.map( a => <div key={a.id}>{a.nimi} {a.tehtavia}</div> )}
      <div>
        yhteensä {props.osat.map( a=>a.tehtavia ).reduce( (a,b) => a+b )} tehtävää
      </div>
    </div>
  )
}


export default Kurssi;
