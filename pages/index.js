import React from 'react'
import GameContainer from '../containers/GameContainer'
import ProfileContainer from '../containers/ProfileContainer'
import GameState from '../components/Game'

export default (props) => {
    return (
        <div>
            <ProfileContainer>
                <GameContainer debug={props.url.query.debug}>
                    {gameTime => <GameState gameTime={gameTime} />}
                </GameContainer>
            </ProfileContainer>
            <style global jsx>{`
                @import url('https://fonts.googleapis.com/css?family=Rubik:400,500,700');
                body {
                    font-family: 'Rubik', sans-serif;
                    line-height: 1.5;
                }
                button {
                    border: 1px solid #bbb;
                    border-bottom-width: 3px;
                    border-radius: 3px;
                    background: #fff;
                    outline: none;
                    font-size: 14px;
                    text-transform: uppercase;
                    margin: 1px 2px;
                    padding: 5px 10px;
                    cursor: pointer;
                    transition: background 150ms ease-in-out;
                }
                button:hover {
                    background: #eee;
                }

                h1 {
                    font-size: 150%;
                }
            `}</style>
        </div>
    )
}
