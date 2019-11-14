import React, { Component } from "react";
import Card from "./extra/card/card";
import Wrapper from "./extra/wrapper/wrapper";
import Title from "./extra/topNavThing/topNavThing";
import cards from "./cards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a movie or tv show to gain points! Click on the same one twice and you lose!";

class App extends Component {
    
    state = {
        cards,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {
        const cards = this.state.cards;
        const clickedMatch = cards.filter(match => match.id === id);

        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "You already clicked on this one."

            for (let i = 0 ; i < cards.length ; i++){
                cards[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({cards});

        } else if (correctGuesses < 11) {

            clickedMatch[0].clicked = true;

            correctGuesses++;
            
            clickMessage = "You haven't click on that one yet! Keep going!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            cards.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({ cards });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            clickedMatch[0].clicked = true;

            correctGuesses = 0;

            clickMessage = "WOW!!! You got ALL of them!!! Now, let's see if you can do it again!";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < cards.length ; i++){
                cards[i].clicked = false;
            }

            cards.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({ cards });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Favourite 80s Guessing Game</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
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
                        id={cards.id}
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