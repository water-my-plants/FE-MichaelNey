import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../actions'
class Home extends React.Component {
    
    render() {
        return (
            <div>
                Welcome Home!
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps, { userLogin })(Home);