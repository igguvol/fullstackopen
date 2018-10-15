import React from 'react';


class App extends React.Component {

  modifyInput = (e) => {
    this.setState( {input:e.target.value} );
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e) => this.props.store.dispatch( {type:'VOTE', id:anecdote.id} )}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={(e) => {e.preventDefault(); this.props.store.dispatch({type:'ADD',content:  this.state.input})}}>
          <div><input onChange={this.modifyInput}/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App