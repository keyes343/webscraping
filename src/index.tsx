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
    const browser = await puppeteer.launch({ 'headless': 'new' });
    const page = await browser.newPage();

    await page.goto('https://www.google.com/');
    const textToType = 'crm applications';

    await page.type('textarea.gLFyf', textToType);
    await page.keyboard.press('Enter');
    await waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot.png' });

    await browser.close();
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});