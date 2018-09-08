import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    const pisteet = Array( anecdotes.length ).fill(0);
    this.state = {
      selected: 0,
      pisteet: pisteet,
      mostVoted: 0
    }
  }


  Button = (a) => () => {
    this.setState({ 
      selected: Math.floor( Math.random()*anecdotes.length )
    });
  }

  VoteButton = (a) => () => {
    var pisteet = this.state.pisteet;
    pisteet[ this.state.selected ]++;

    var mostVotes = 0;
    var index = 0;
    for ( var i=0; i<this.state.pisteet.length; i++ )
    {
      if ( this.state.pisteet[i] > mostVotes )
      {
        mostVotes = this.state.pisteet[i];
        index = i;
      }
    }

    this.setState({ 
      pisteet: pisteet,
      mostVoted: index
    });

  }

  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
          <br/>
          has {this.state.pisteet[this.state.selected]} votes
        </div>
        <div>
          <button key="next" onClick={this.Button()}>next</button>
          <button key="vote" onClick={this.VoteButton()}>vote</button>
        </div>
        <div>
          <b>Anecdote with most votes:</b><br/>
          {this.props.anecdotes[this.state.mostVoted]}<br/>
          has {this.state.pisteet[this.state.mostVoted]} votes
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)