import React from 'react'
import PropTypes from 'prop-types'
import store from 'store'
import concat from 'lodash/concat'
import map from 'lodash/map'

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            newProfile: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectProfile = this.selectProfile.bind(this)
    }

    getChildContext() {
        return { profile: this.state.profile }
    }

    componentDidMount() {
        this.setState({ availableProfiles: store.get('CK_Clicker_profiles') })
    }

    handleChange(event) {
        this.setState({ newProfile: event.target.value })
    }

    handleSubmit(event) {
        this.setState({ profile: this.state.newProfile }, () => {
            const previousProfiles = store.get('CK_Clicker_profiles')
            const profiles = concat(previousProfiles || [], [this.state.newProfile])
            store.set('CK_Clicker_profiles', profiles)
        })
    }

    selectProfile(profile) {
        this.setState({ profile })
    }

    render() {
        if (this.state.profile) {
            return (
                <div>
                    <i style={{ position: 'absolute', top: 0, right: 0 }}>{this.state.profile}</i>
                    {this.props.children}
                </div>
            )
        }
        return (
            <form onSubmit={this.handleSubmit} className="profile-form">
                <label>
                    New Profile: <input type="text" name="profile" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Enter" />
                <h3>Profiles:</h3>
                <div>
                    {map(this.state.availableProfiles, (profile, idx) => (
                        <button key={idx} onClick={() => this.selectProfile(profile)}>{profile}</button>
                    ))}
                </div>
                <style jsx>{`
                    .profile-form {
                        display: block;
                        max-width: 400px;
                        margin: 100px auto;
                        background: #eee;
                        text-align: center;
                        padding: 20px;
                    }
                `}</style>
            </form>
        )
    }
}

ProfileContainer.childContextTypes = {
    profile: PropTypes.string
}

export default ProfileContainer
