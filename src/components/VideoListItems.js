// React \
import React, { Component } from 'react';

// Material-ui \
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey';

// CSS \
const styles = {
    root: {
        listStyleType: 'none',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        backgroundColor: grey[100],
        borderBottomRightRadius: '16px',
        borderTopRightRadius: '16px',
    },
    img: {
        height: '150px',
        marginRight: '8px',
    },
    p: {
        fontSize: '2rem',
    },
    divCenter: {
        width: '100%',
        textAlign: 'center',
    }
};
const START_LINK_IMG = "https://image.tmdb.org/t/p/w500";
class VideoListItems extends Component {
    render(){
        const {classes, movie} = this.props;
        return (
            <li className={classes.root} onClick={this.handleOnClick.bind(this)}>
                <img className={classes.img} src={START_LINK_IMG + movie.poster_path} alt={movie.poster_path}/>
                <div className={classes.divCenter} >
                <p className={classes.p}>{movie.title}</p>
                </div>
            </li>
        );
    }
    handleOnClick(){
        this.props.callback(this.props.movie)
    }
}
VideoListItems.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(VideoListItems);