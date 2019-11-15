import React, { Component } from "react";
import Card from "./extra/card/card";
import Wrapper from "./extra/wrapper/wrapper";
import Title from "./extra/topNavThing/topNavThing";
import cards from "./cards.json";
import shuffle from "shuffle-array";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage =
  "Click on a movie to gain points! Click on the same one twice and you lose!";

class App extends Component {
  state = {
    cards,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {
    // const cards = this.state.cards;
    const cards = this.state.cards.filter(match => match.id === id);
    // this.setState({ cards });
    console.log(cards);

    if (cards[0].clicked) {
      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "You already clicked on this one.";

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      //   this.setState({ cards });
    } else if (correctGuesses < 11) {
      cards[0].clicked = true;

      correctGuesses++;

      clickMessage = "Keep going!";

      shuffle(this.state.cards);

      console.log(cards);

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }

      //   this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    } else {
      cards[0].clicked = true;

      correctGuesses = 0;

      clickMessage = "Now, let's see if you can do it again!";
      bestScore = 12;
      this.setState({ bestScore });

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      //   cards = [1, 2, 3, 4, 5];

      //   this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    }
  };

  render() {
    return (
      <Wrapper>
        <Title>Favourite 80s Guessing Game</Title>

        <h3 className="scoreSummary">{this.state.clickMessage}</h3>

        <h3 className="scoreSummary card-header">
          Correct Guesses: {this.state.correctGuesses}
          <br />
          Best Score: {this.state.bestScore}
        </h3>
        <div className="container">
          <div className="row">
            {this.state.cards.map(match => (
              <Card
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default App;
