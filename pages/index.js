import React from 'react'
import GameContainer from '../containers/GameContainer'
import GameState from '../components/Game'
import { date } from '../utils/time'

export default (props) => {
    return (
        <GameContainer debug={props.url.query.debug}>
            {gameTime => (
                <div>
                    <h1>Credit Clicker {date(gameTime)}</h1>
                    <GameState gameTime={gameTime}>
                            {(gameState, updateCredit, updateFinances, startNewCard) => (
                                <div>
                                <button onClick={() => updateFinances('cash', gameState.job.wage)}>
                                        ${gameState.job.wage}
                                    </button>
                                    <button onClick={startNewCard}>
                                        New Card
                                    </button>
                                </div>
                            )}
                    </GameState>
                    <style global jsx>{`
                        @import url('https://fonts.googleapis.com/css?family=Rubik:400,500,700');
                        body {
                            font-family: 'Rubik', sans-serif;
                        }
                    `}</style>
                </div>
            )}
        </GameContainer>
    )
}
