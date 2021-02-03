import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {

    state = {
        trackTitle: ''
    }

    findTrack = (dispatch,e) => {
        e.preventDefault();
        console.log(this.state.trackTitle);

        axios
            .get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
                this.state.trackTitle
            }&page_size=10&page=1&s_track_rating=desc&apikey=${
                process.env.REACT_APP_MM_KEY
            }`)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });
            this.setState({trackTitle: ''});
        })
        .catch(err => console.log(err));
    }

    onChange =e => {
        this.setState({[e.target.name] : e.target.value});
    }
    render() {
        return (
            <Consumer>
                {value => {
                    //console.log(value);
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search for a Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Song title..."
                                    name="trackTitle"
                                    value={this.state.trackTitle} 
                                    onChange={this.onChange}/>
                                </div>
                                <br/>
                                <div className="col lg-12 text-center">
                                <button className="btn btn-primary btn-lg mb-10 btn-block text-center" type="submit">Get track lyrics</button>
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}

export default Search;
