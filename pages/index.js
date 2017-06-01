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
                        {(updateCredit, updateFinances) => (
                            <button onClick={() => updateFinances('total', 10)}>
                                $10
                            </button>
                        )}
                    </GameState>
                </div>
            )}
        </GameContainer>
    )
}
