// React \\
import React, { Component } from 'react';

// Material-ui \\
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'

// CSS \\
const styles = {
    root: {
        height: '350px ',
        width: '100%',
    },
};

// Const \\
const STARTER_LINK_YTB = "https://www.youtube.com/embed/"

class VideoYtb extends Component {
    render(){
        const {classes, ytbId} = this.props;
        return (
            <div>
                <iframe className={classes.root} src={STARTER_LINK_YTB + ytbId} title={STARTER_LINK_YTB + ytbId}/>
            </div>
        );
    }
}
VideoYtb.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoYtb);