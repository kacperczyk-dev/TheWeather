import { AngularWeatherPage } from './app.po';

describe('angular-weather App', () => {
  let page: AngularWeatherPage;

  beforeEach(() => {
    page = new AngularWeatherPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
