(async()=>{
    if(!window || !document)return;
    function loadSource(src){
        return new Promise(r=>{
            fetch(src).then(v=>v.text()).then(v=>r(v));
        })
    }
    async function initButton(){
        let b = document.createElement("div");
        b.innerHTML=await loadSource("https://raw.githubusercontent.com/helloyork/lib/main/nomenchat.html");
        document.body.appendChild(b);
    };
    await initButton();
})()
