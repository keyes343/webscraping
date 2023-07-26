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
    await waitForTimeout(1000);
    const selector = '.vdQmEd.fP1Qef.EtOod.pkphOe .CCgQ5.vCa9Yd.QfkTvb.N8QANc.MUxGbd.v0nnCb';
    await page.waitForSelector(selector);

    // Function to get the text inside the span element
    const getTitles = async () => {
        const spanTexts = await page.$$eval(selector, divs => {
            return divs.map((div) => {
                const spanElement = div.querySelector('span');
                return spanElement ? spanElement.textContent : null
            })
        });
        return spanTexts;
    };
    // ---------------------
    // Function to get the text inside the span element
    const selector_2 = '.x2VHCd.OSrXXb.ob9lvb';
    await page.waitForSelector(selector_2);

    const getSites = async () => {
        return await page.$$eval(selector_2, spans => {
            console.log({ count: spans.length })
            return spans.map((span) => span.textContent)
        });
    };


    let titles = await getTitles();
    let sites = await getSites();

    console.log({ titles, sites })

    await browser.close();
    res.send({ text: 'text' });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});