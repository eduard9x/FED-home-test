import React, {Component} from 'react';

import './carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    if(!this.state.animate) {
      this.setState({ animate: !this.state.animate });
      this.props.renderNextSlide();

      setTimeout( () => {
        this.setState({ animate: !this.state.animate });
      }, 700); // same as animation duration in scss
    }
  }

  render() {
    return (
      <div className="carousel circle">
        <div className={this.state.animate ? 'content animate' : 'content'} onClick={this.handleOnClick}>
          <p>Your credit score is</p>
          <span>{this.props.score}</span>
          <p>out of <span>{this.props.maxScoreValue}</span></p>
          <span>{this.props.equifaxScoreBandDescription}</span>
        </div>
      </div>
    );
  }
}

export default Carousel;
