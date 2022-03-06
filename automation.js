//npm init
//npm install minimist
//npm install puppeteer

let minimist = require("minimist");
let fs = require("fs");
let puppeteer = require("puppeteer");
//node automation.js --url=https://www.google.co.in/ --camp=song.json

let args = minimist(process.argv);
//console.log(args.url);
//console.log(args.camp)

let data = fs.readFileSync(args.camp, "utf-8");
let maindata = JSON.parse(data);
//let CRX_PATH = 'C:\Users\sachin sharma\AppData\Local\Google\Chrome\User Data\Default\Extensions'
try {
    async function mysongs() {



        let browser = await puppeteer.launch({
            headless: false,
            args: [
                '--start - maximized '
            ],
            // args: [
            //     `--disable-extensions-except=${CRX_PATH}`,
            //     `--load-extension=${CRX_PATH}`,
            //    '--user-agent=PuppeteerAgent'
            // ],

            defaultViewport: null

        });
        let page = await browser.newPage();

        for (let i = 0; i < maindata.gaana.length; i++) {
            await page.goto(args.url);
            await page.waitForSelector("input[jsaction='paste:puy29d;']")
            await page.click("input[jsaction='paste:puy29d;']");
            await page.type("input[jsaction='paste:puy29d;']", maindata.gaana[i] + " from " + maindata.site, );
            await page.keyboard.press("Enter");

            let select = '.yuRUbf > a'
            await page.waitForSelector(select);


            let curls = await page.$$eval(select, function(tag) {
                let url = tag[0].getAttribute("href");
                return url;
            })

            let ctab = await browser.newPage();
            await handel(ctab, curls)

            async function handel(ctab, fullcurl) {
                await ctab.goto(fullcurl);
                await ctab.bringToFront();

                await ctab.click("div.downloaddiv")
                await ctab.close();
            }
        }
        //const pages = await browser.newPage();
        //await page.goto('chrome-extension://ajkhmmldknmfjnmeedkbkkojgobmljda/')

        await waitFor(5000);
        await browser.close();
    }
    mysongs();
} catch {
    console.log(err);
}