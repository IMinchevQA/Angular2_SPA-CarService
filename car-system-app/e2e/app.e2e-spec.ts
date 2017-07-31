import { CarSystemAppPage } from './app.po';

describe('car-system-app App', () => {
  let page: CarSystemAppPage;

  beforeEach(() => {
    page = new CarSystemAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
