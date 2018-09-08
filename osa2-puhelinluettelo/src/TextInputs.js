import TextInput from './TextInput';

const TextInputs = ( state, changeHandler, items ) => {
  return items.map( v => TextInput(v.text,state,v.variable,changeHandler));
}


export default TextInputs;
