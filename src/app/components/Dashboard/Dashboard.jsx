import React, {Component} from 'react';
import {getJSON} from '../../../app/utils/fetch';
import config from '../../../config/environment';
import Carousel from '../Carousel/Carousel';

import './dashboard.scss';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      score: 'Loading...',
      maxScoreValue: 'Loading...',
      minScoreValue: 'Loading...',
      equifaxScoreBandDescription: 'Loading...',
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderNextSlide = this.renderNextSlide.bind(this);

    this.fetchData();
  }

  renderNextSlide() {
    this.setState({
      score: this.state.score + 1,
    });
  }

  fetchData() {
    const url = `${config.api.host}/creditReportInfo.json`;

    Promise.resolve(getJSON(url, null)).then((results) => {
      const {
        score,
        minScoreValue,
        maxScoreValue,
        equifaxScoreBandDescription,
      } = results.creditReportInfo;

      this.setState({
        score: score,
        minScoreValue: minScoreValue,
        maxScoreValue: maxScoreValue,
        equifaxScoreBandDescription: equifaxScoreBandDescription,
      });
    }).catch((error) => {
      this.setState({score: 'Cannot retrieve score..'});
    });
  }

  render() {
    let carousel = '';

    if (typeof this.state.score === 'number' &&
      typeof this.state.minScoreValue === 'number' &&
      typeof this.state.maxScoreValue === 'number') {
      carousel = <Carousel
        score={this.state.score}
        minScoreValue={this.state.minScoreValue}
        maxScoreValue={this.state.maxScoreValue}
        renderNextSlide={this.renderNextSlide}
        equifaxScoreBandDescription={this.state.equifaxScoreBandDescription}
      />;
    }

    return (
      <div>
        Hello World!!

        {carousel}
      </div>
    );
  }
}

export default Dashboard;
