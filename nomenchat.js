
let main = (async()=>{
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
    var button = document.getElementById('circle-button');
    var robotIcon = document.getElementById('robot-icon');
    var closeIcon = document.getElementById('close-icon');
    var iframeContainer = document.getElementById('iframe-container');

    button.addEventListener('click', function () {
        if (iframeContainer.classList.contains('show')) {
            iframeContainer.classList.remove('show');
            robotIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            iframeContainer.classList.add('show');
            robotIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        }
    });
});
setTimeout(main,2000)
