// React \
import React, { Component } from 'react';

// Material-ui \
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import VideoListItems from '../components/VideoListItems';

// Import \\

// CSS \
const styles = {
    ul: {
        margin: '0',
    }
};
class VideoList extends Component {
    render(){
        const {classes, moviesList} = this.props;
        return (
            <ul className={classes.ul}>
                {
                    moviesList.map(moviesList => <VideoListItems 
                        key={moviesList.id} 
                        movie={moviesList}
                        callback={this.receiveCallback.bind(this)}
                    />)
                }
            </ul>
        );
    }
    receiveCallback(movie){
        this.props.callback(movie)
    }
}
VideoList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoList);