import React from 'react';
import Numbers from './Numbers';
import TextInputs from './TextInputs';
import Notification from './Notification';
import phonebookService from './services/Phonebook'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: '',
      notificationStyle: ''
    }
  }


  componentDidMount() 
  {
    phonebookService.getAll()
      .then( response => {
        this.setState( {persons:response.data } );
       } );
  }

  handleItemChange = (event) => {
    var n = {};
    n[event.target.name] = event.target.value;
    this.setState(n);
  }

  handleFilterChange = (event) => {
    this.setState( { filter: event.target.value });
  }


  showNotification = (message, style) => {
    this.setState( {notification:message,notificationStyle:style} );
    setTimeout(() => { this.setState({notification: null}) }, 5000);
  }

  addName  = (event) => {
    event.preventDefault()

    var names = this.state.persons;
    var newEntry = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.newName
    };

    var existing = names.findIndex(a => a.name === this.state.newName);
    if ( existing >= 0 )
    {
      if ( window.confirm(this.state.newName + ' on jo luettelossa, korvataanko vanha numero uudella?') )
      {
        names[existing].number = this.state.newNumber;
        phonebookService.update( names[existing].id, newEntry )
          .then( () => this.showNotification('Numero päivitetty','success') )
          .catch( error => this.showNotification('Henkilöä ei löydy','error') );
        }
    }
    else
    {
      phonebookService.create( newEntry )
        .then( (entry) => {
          this.showNotification('Numero lisätty','success');
          names.push(entry.data);
          this.setState({ 
            persons: names 
          });
        })
        .catch( error => {
          console.log(error);
          this.showNotification('virhe: ' + error,'error');
        });
    }
    
    this.setState({ 
        newName: '',
        newNumber: '',
      });
  }

  removeNumber = (a) => () => {
    if ( window.confirm('Poistetaanko ' + a.name + '?') )
    {
      var names = this.state.persons;
      this.setState( { persons: names.filter( person => person.id !== a.id ) } );
      phonebookService.remove(a.id)
        .then( () => this.showNotification('Numero poistettu','success') )
        .catch( error => { this.showNotification('Henkilöä ei löydy','error') });
    }
  }


  render() {
    return (
      <div>
        <Notification message={this.state.notification} style={this.state.notificationStyle}/>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä: <input name="filter" onChange={this.handleFilterChange} />
        </div>
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addName}>
          <div>
            {TextInputs( this.state, this.handleItemChange, 
              [{ text:'nimi', variable:'newName'}, 
              { text:'numero', variable: 'newNumber'}]) }
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h3>Numerot</h3>
          {Numbers(this.state,this.removeNumber)}
      </div>
    )
  }
}

export default App  