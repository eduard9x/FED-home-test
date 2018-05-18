import {getJSON} from '../src/app/utils/fetch';
import config from '../src/config/environment';

describe ('Configuration', () => {

  test('retrieving the environment config', () => {
    expect(typeof config).not.toBe('undefined');
    expect(typeof config.api).not.toBe('undefined');
    expect(typeof config.api.host).not.toBe('undefined');

    const url = `${config.api.host}/creditReportInfo.json`;
    expect(url).toBe('https://s3.amazonaws.com/cdn.clearscore.com/native/interview_test/creditReportInfo.json');
  });

  test('retrieving the initial data set', () => {
    const url = `${config.api.host}/creditReportInfo.json`;

    Promise.resolve(getJSON(url, null))
      .then((results) => {
        console.log(results);

        expect(typeof results.creditReportInfo.score).toBe('number');
        expect(results.creditReportInfo.score).toBe(514);
      })
      .catch((error) => {
        console.log(error);
      });
  });

});
