import React, { Component } from 'react'

export default class GameContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTime: 0,
            start: null
        }
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        window.requestAnimationFrame(this.update)
    }

    update(timestamp) {
        this.setState({ gameTime: timestamp - this.state.start, start: this.state.start || timestamp })
        window.requestAnimationFrame(this.update)
    }

    render() {
        const { gameTime } = this.state
        const { debug, children } = this.props
        return (
            <main>
                {debug && (
                    <pre><code>{gameTime}</code></pre>
                )}
                {children(gameTime)}
            </main>
        )
    }
}
