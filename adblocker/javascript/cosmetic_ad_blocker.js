const rules=[];
let blockedElements=0;

window.blockerReady=false;
window.blockerRules=0;
window.blockedAds=0;

const hostname=location.hostname;
const lines=window.easylistText.split(/\r?\n/);

for(let line of lines){
line=line.trim();

if(!line||line.startsWith("!"))continue;
if(!line.includes("##"))continue;

const parts=line.split("##");
if(parts.length<2)continue;

const domains=parts[0].trim();
const selector=parts.slice(1).join("##").trim();

if(!selector)continue;

if(
selector.includes("{")||
selector.includes("}")||
selector.includes(":has")||
selector.includes(":xpath")||
selector.includes("+js")||
selector.includes(":matches")
)continue;

if(
selector==="html"||
selector==="body"||
selector==="*"
)continue;

if(domains===""){
rules.push(selector);
continue;
}

const domainList=domains.split(",");
let applies=false;
let excluded=false;

for(let domain of domainList){
domain=domain.trim();

if(!domain)continue;

if(domain.startsWith("~")){
const excludedDomain=domain.substring(1);

if(
hostname===excludedDomain||
hostname.endsWith("."+excludedDomain)
){
excluded=true;
break;
}
}else{
if(
hostname===domain||
hostname.endsWith("."+domain)
){
applies=true;
}
}
}

if(applies&&!excluded){
rules.push(selector);
}
}

window.blockerRules=rules.length;

console.log("Loaded cosmetic rules:",rules.length);

function blockAds(){
for(const rule of rules){
try{
const elements=document.querySelectorAll(rule);

for(const element of elements){
if(element.dataset.adblocked)continue;

element.dataset.adblocked="true";

element.style.setProperty(
"display",
"none",
"important"
);

blockedElements++;
}
}catch(error){}
}

window.blockedAds=blockedElements;
}

blockAds();

window.blockerReady=true;

const observer=new MutationObserver(()=>{
blockAds();
});

observer.observe(document.body,{
childList:true,
subtree:true
});