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
                </div>
            )}
        </GameContainer>
    )
}
