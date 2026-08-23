const {chromium}=require("playwright");

(async()=>{
const browser=await chromium.launch({
headless:false,
proxy:{server:"http://127.0.0.1:8080"}
});

const page=await browser.newPage();

let requests=0;
let data=0;

page.on("request",()=>requests++);

page.on("response",async r=>{
try{data+=(await r.body()).length}catch{}
});

const start=Date.now();

await page.goto("https://edition.cnn.com/",{waitUntil:"load"});

await page.waitForTimeout(10000);


console.log("======================");
console.log("PROXY BLOCKER");
console.log("======================");
console.log("Load time:",Date.now()-start,"ms");
console.log("Requests:",requests);
console.log("Data:",(data/1024).toFixed(2),"KB");

await browser.close();
})();