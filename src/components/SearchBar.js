import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
    margin: '16px 0',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            placeHolder: 'Taper votre film...',
            search: ''
        };
    }

    render(){
        const { classes } = this.props;
        return (
          <Paper className={classes.root} elevation={1}>
            <InputBase id='input-search-bar' className={classes.input} placeholder={this.state.placeHolder} onChange={this.handleChange.bind(this)} />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={this.handleSubmit.bind(this)}>
              <SearchIcon />
            </IconButton>
          </Paper>
        );
    }
    handleChange(event){
        this.setState(
            {search: event.target.value}
        );
    }
    handleSubmit() {
        this.props.callback(this.state.search)
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);