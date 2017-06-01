import React from 'react'
import GameContainer from '../containers/GameContainer'

export default () => (
    <GameContainer debug={true}>
        {gameTime => (
            <h1>Credit Clicker</h1>
        )}
    </GameContainer>
)
