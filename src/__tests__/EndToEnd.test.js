import puppeteer from 'puppeteer';
import { mockData } from '../mock-data';




describe('show/hide an event details', () => {

  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250, // slow down by 250ms
    //   ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    // });
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .btn-details');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .btn-collapse');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

});



describe('filter events by city', () => {

  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250, // slow down by 250ms
    //   ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    // });
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    const eventLocations = await page.$$('.event .location');
    expect(eventLocations).toHaveLength(mockData.map(event => event.location).length);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    const suggestionListIsHidden = await page.$eval('.CitySearch .suggestions', element => element.style.display !== 'none');
    expect(suggestionListIsHidden).toBeTruthy();
  });

  test('When user selects a city from the suggested list, the suggestion list disappears', async () => {
    await page.type('.city', 'Berlin');
    await page.click('.suggestions li');
    const suggestionListIsHidden = await page.$eval('.CitySearch .suggestions', element => element.style.display !== 'none');
    expect(suggestionListIsHidden).toBeFalsy();
  });

  test('When user selects a city from the suggested list, the events from that city are displayed', async () => {
    await page.type('.city', 'Berlin');
    await page.click('.suggestions li');
    const eventLocation = await page.$eval('.event .location', element => element.innerText);
    expect(eventLocation).toEqual('Berlin, Germany');
  });

});
