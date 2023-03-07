//@ts-nocheck

//https://em8umf-5173.preview.csb.app/src/static/script/nomenmain.js
//fetch('https://em8umf-5173.preview.csb.app/src/static/script/nomenmain.js').then(v=>v.text()).then(v=>eval(v));

let coreURL='https://em8umf-5173.preview.csb.app';
let createCoreURL = relativeURL=>coreURL+relativeURL;
let initHTML = `
<p>Nomen Proxyæ­£åœ¨å°è¯•å¯åŠ¨</p>
`
function createUIKit(txt){
    let kit = document.createElement('div')
    kit.innerHTML=txt;
    document.body.appendChild(kit);
}
async function createBlankGUI(){
    let mainHTML = await new Promise(resolve=>{
        fetch(createCoreURL('/src/static/script/mainBlank.txt'))
        .then(v=>v.text())
        .then(v=>resolve(v));
    })
    document.write(mainHTML);
}
async function createPageGUI(){
    let mainHTML = await new Promise(resolve=>{
        fetch(createCoreURL('/src/static/script/mainPage.txt'))
        .then(v=>v.text())
        .then(v=>resolve(v));
    })
    createUIKit(mainHTML);
}

(async()=>{
    if(document===undefined){
        createUIKit('<p>å‡ºçŽ°äº†ä¸€äº›é”™è¯¯ï¼Œè¯·æ£€æŸ¥å½“å‰é¡µé¢çŽ¯å¢ƒåŽé‡è¯•<p>');
        return;
    }
    let isPage = location.href!='about:blank';
    if(isPage) {
        await createPageGUI();
    } else {
        document.title='[Loading...] Nomen ToolBox';
        await createBlankGUI();
    }
})()
