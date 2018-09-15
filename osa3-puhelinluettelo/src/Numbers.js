import React from 'react';


const Numbers = (props,removeButton) => (
  <table><tbody>
  {props.persons
    .filter( a => props.filter==='' || a.name.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1 )
    .map( a => <tr key={a.id}>
      <td>{a.name}</td>
      <td>{a.number} </td>
      <td><button onClick={removeButton(a)}>Poista</button></td>
    </tr> )}
  </tbody></table>
);


export default Numbers;