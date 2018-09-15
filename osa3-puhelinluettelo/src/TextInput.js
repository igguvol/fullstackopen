import React from 'react';

const TextInput = (text,state,variable,change)  => (
  <div key={variable}>
    {text}: <input name={variable} value={state[variable]} onChange={change} />
  </div>
)

export default TextInput;
