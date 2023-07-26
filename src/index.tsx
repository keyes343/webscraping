import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config();

const app = express();
const port = 5000;

const uri = process.env.URI

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.get('/scrape', async (req, res) => {
    const browser = await puppeteer.launch({ 'headless': 'new' });
    const page = await browser.newPage();

    console.log('step 1')
    await page.goto('https://www.google.com/');
    console.log('step 2')
    const textToType = 'Your text here';
    console.log('step 3')
    await page.type('textarea.gLFyf', textToType);
    console.log('step 4')
    await page.keyboard.press('Enter');
    console.log('step 5')
    await page.screenshot({ path: 'screenshot.png' });

    // if (inputElement) {
    //     console.log('-------yes--------')
    // } else {
    //     console.log('-------no--------')
    // }
    // const screenshot = await page.screenshot({ path: 'google_search_abcd.png' });

    // console.log({ screenshot })
    // Close the browser
    await browser.close();
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});