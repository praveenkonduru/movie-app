import './player.css';
import React, { Component, PropTypes } from 'react';
import { Player } from 'video-react';
import * as VideoApi from './VideoApi';
import _ from 'lodash';
import "../node_modules/video-react/dist/video-react.css"; 

export default class MoviePlayer extends Component {

  static propTypes = {
      track : PropTypes.object
  };

  constructor(props){
      super(props);
       this.state = {
            starTime : 0,
            url : null
        };
  }

  componentWillMount(){
    var self = this;
    var metadata = _.find(this.props.track.movieLinkMetadata, 
                    function(meta){ return meta.default === "true" });

    VideoApi.getMovieUrl(
        metadata.file,
        this.props.track.baseUrl)
        .then(function(resp) {
              if(resp) {
                  self.setState({
                          url: resp
                        });
              }
        }
    );
  }


  render() {
    return (
      <div className="container-fluid">
                <div className="row">
                    <div className="col col-sm-8 offset-sm-2">
                        <Player
                            poster={this.props.track.image}
                            src={this.state.url} >
                        </Player>
                    </div>
                </div>
        </div>
  );
  }
}