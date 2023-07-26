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

function waitForTimeout(timeout: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

app.get('/scrape', async (req, res) => {
    console.log('step 0')

    const browser = await puppeteer.launch({ 'headless': 'new' });
    const page = await browser.newPage();

    await page.goto('https://www.google.com/');
    const textToType = 'crm applications';

    await page.type('textarea.gLFyf', textToType);
    await page.keyboard.press('Enter');
    await waitForTimeout(1000);
    // await page.screenshot({ path: 'screenshot.png' });

    // now scrape data
    // Grab the search result titles and descriptions
    console.log('step 1')
    const selector = '.LC20lb.MBeuO.DKV0Md'
    console.log('step 2')
    const divElements = await page.$$eval(selector, divs => {
        return divs.map(div => div.textContent)
    })

    console.log('step 3')
    console.log({ divElements })

    await browser.close();
    res.send({ text: 'text' });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});