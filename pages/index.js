import React from 'react'
import GameContainer from '../containers/GameContainer'
import GameState from '../components/Game'

export default (props) => {
    return (
        <GameContainer debug={props.url.query.debug}>
            {gameTime => (
                <div>
                    <h1>Credit Clicker</h1>
                    <GameState gameTime={gameTime}>
                            {(updateCredit, updateFinances, startNewCard) => (
                                <div>
                                <button onClick={() => updateFinances('cash', 10)}>
                                        $10
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
