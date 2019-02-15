// React \\
import React, { Component } from 'react';

// Material-ui \\
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'

// CSS \\
const styles = {
    root: {
        
    },
};
class DescriptionVideo extends Component {
    render(){
        const {title, desc} = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
        );
    }
}
DescriptionVideo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DescriptionVideo);