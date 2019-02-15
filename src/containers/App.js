// React \\
import React, { Component } from 'react';

// Material-ui \\
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

// Componants \\
import SearchBar from '../components/SearchBar'
import VideoList from './VideoList';
import VideoYtb from '../components/VideoYtb'
import DescriptionVideo from '../components/DescriptionVideo'

// Libraries \\
import Axios from 'axios';

// CSS \\
const styles = {
	root: {
		fontFamily: 'Roboto',
	},
	divSearchBar: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	}
};

// Const \\
const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const SEARCH = "search/movie?language=fr-FR&page=1&include_adult=false&query="
const RECOMMENDATION = "/recommendations?language=fr-FR&page=1&include_adult=false"
const API_KEY = "&api_key=3c9c9607fcfdcb352962d0a25ca43ec1"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mostPopularMovie: '',
			moviesList: ''
		};
	};

	componentDidMount(){
		Axios.get(API_END_POINT + POPULAR_MOVIES_URL + API_KEY).then(res => {
			this.setState({
				mostPopularMovie: res.data.results[0],
				moviesList: res.data.results.slice(1, 5)
			}, function(){
				this.getIdYtbVideo();
			});
		})
	}
	getIdYtbVideo(){
		Axios.get(API_END_POINT + "movie/" + this.state.mostPopularMovie.id + "/videos?language=fr-FR" + API_KEY).then(res => {
			if (res.data && res.data.results[0]){
				const ytbKey = res.data.results[0].key;
				let newCurrentMovieState = this.state.mostPopularMovie;
				newCurrentMovieState.videoId = ytbKey; 
				this.setState({currentMovie : newCurrentMovieState});
			}
			else{
				const ytbKey = "";
				let newCurrentMovieState = this.state.mostPopularMovie;
				newCurrentMovieState.videoId = ytbKey; 
				this.setState({currentMovie : newCurrentMovieState});
			}
		})
	}

	onClickListItems(movie){
		this.setState({
			mostPopularMovie: movie	
		}, function(){
			this.getIdYtbVideo()
			this.setRecommendation()
		}.bind(this))
	}

	onClickSearch(search){
		if(search){
			Axios.get(API_END_POINT + SEARCH + search + API_KEY).then(res => {
				if(res.data && res.data.results[0]){
					if (res.data.results[0].id !== this.state.mostPopularMovie.id){
						this.setState({
							mostPopularMovie: res.data.results[0]
						}, function() {
							this.getIdYtbVideo();
							this.setRecommendation();
						}.bind(this))
					}
				}
			})
		}
	}

	setRecommendation(){
		Axios.get(API_END_POINT + "movie/" + this.state.mostPopularMovie.id + RECOMMENDATION + API_KEY).then(res => {
			this.setState({
				moviesList: res.data.results.slice(0, 4)
				
			})
		})
	}
	
	render(){
		const {classes} = this.props;
		const {moviesList, mostPopularMovie} = this.state;
		const initVideoList = () => {
			if (moviesList.length > 3){
				return (
					<VideoList moviesList={moviesList} callback={this.onClickListItems.bind(this)}/>
				);
			}
		}
		const initVideoYtb = () => {
			if (mostPopularMovie.videoId !== undefined){
				return (
					<VideoYtb ytbId={mostPopularMovie.videoId}/>
				);
			}
		}
		return (
			<div className={classes.root}>
				<Grid container
					direction="column"
					justify="space-evenly"
					alignItems="center">
						<SearchBar callback={this.onClickSearch.bind(this)}/>
				</Grid>
				<Grid container
					direction="row"
					justify="space-between">
						<Grid item
							xs={6}
							>
								{initVideoYtb()}
								<DescriptionVideo title={mostPopularMovie.title} desc={mostPopularMovie.overview} />
						</Grid>
						<Grid item
							xs={5}>
								{initVideoList()}
						</Grid>
				</Grid>
			</div>
		);
	}
  }

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
