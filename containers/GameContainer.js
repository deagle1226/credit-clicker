import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from 'store'

class GameContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameTime: 0,
            start: null
        }
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        if (this.context.profile) {
            const gameTime = store.get(`CK_Clicker_profiles-${this.context.profile}-time`)
            this.setState({ start: -gameTime }, () => {
                this.loop = window.requestAnimationFrame(this.update)
            })
        } else {
            this.loop = window.requestAnimationFrame(this.update)
        }
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.loop)
    }

    update(timestamp) {
        this.setState({ gameTime: timestamp - this.state.start, start: this.state.start || timestamp })
        this.loop = window.requestAnimationFrame(this.update)
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

GameContainer.contextTypes = {
    profile: PropTypes.string
}

export default GameContainer
