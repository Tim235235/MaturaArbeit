const {chromium}=require("playwright");
const fs=require("fs");

async function test(website){
const browser=await chromium.launch({headless:false});
const page=await browser.newPage();

let requests=0;
let data=0;

page.on("request",()=>requests++);

page.on("response",async r=>{
try{
data+=(await r.body()).length;
}catch{}
});

const start=Date.now();

await page.goto(website,{waitUntil:"load"});

const loadTime=Date.now()-start;

const easylist=fs.readFileSync(
"../adblocker/javascript/easylist.txt",
"utf8"
);

await page.evaluate(list=>{
window.easylistText=list;
},easylist);

await page.addScriptTag({
path:"../adblocker/javascript/cosmetic_ad_blocker.js"
});

await page.waitForFunction(
()=>window.blockerReady===true,
{timeout:30000}
);

await page.waitForTimeout(3000);

const info=await page.evaluate(()=>({
rules:window.blockerRules||0,
blocked:window.blockedAds||0
}));

console.log("======================");
console.log("DOM BLOCKER");
console.log("======================");
console.log("Website:",website);
console.log("Load time:",loadTime,"ms");
console.log("Requests:",requests);
console.log("Data:",(data/1024).toFixed(2),"KB");
console.log("Loaded cosmetic rules:",info.rules);
console.log("Blocked elements:",info.blocked);

await browser.close();
}

test("https://edition.cnn.com/");