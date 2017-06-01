import React from 'react'
import GameContainer from '../containers/GameContainer'

export default (props) => {
    return (
        <GameContainer debug={props.url.query.debug}>
            {gameTime => (
                <h1>Credit Clicker</h1>
            )}
        </GameContainer>
    )
}
