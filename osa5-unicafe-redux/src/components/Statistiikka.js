import React from 'react'


const positiivisia = (stats) => {
  const total = stats.good+stats.ok+stats.bad;
  return (100/total*stats.good).toFixed(1) + " %";
}

const Statistiikka = (props) => {
  const total = props.state.good+props.state.ok+props.state.bad;
console.log('_________ total: ',props,total);
  if (!total) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{props.state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{props.state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{props.state.bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia(props.state)}</td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
}

export default Statistiikka;