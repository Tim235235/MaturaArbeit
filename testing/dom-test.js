function test(website){
    const {chromium}=require("playwright");

    (async()=>{
    const browser=await chromium.launch({headless:false});
    const page=await browser.newPage();

    let requests=0;
    let data=0;

    page.on("request",()=>requests++);
    page.on("response",async r=>{
    try{data+=(await r.body()).length}catch{}
    });

    let start=Date.now();

    await page.goto(website,{waitUntil:"domcontentloaded"});

    await page.addScriptTag({
    path:"../adblocker/javascript/cosmetic_ad_blocker.js"
    });

    await page.waitForTimeout(5000);

    let blocked=await page.evaluate(()=>{
    return window.blockedAds || 0;
    });

    console.log("Load time:",Date.now()-start,"ms");
    console.log("Requests:",requests);
    console.log("Data:",(data/1024).toFixed(2),"KB");
    console.log("Blocked elements:", blocked);

    await browser.close();
    })();
}

test("https://edition.cnn.com/");