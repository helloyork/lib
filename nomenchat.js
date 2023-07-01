
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
    var iframeContainer = document.getElementById('iframe-container');
    var robotIcon = document.getElementById('robot-icon');
    var closeIcon = document.getElementById('close-icon');

    button.addEventListener('click', function () {
        if (iframeContainer.classList.contains('show')) {
            iframeContainer.classList.remove('show');
            closeIcon.style.display = 'none';
            robotIcon.style.display = 'block';
            iframeContainer.addEventListener('transitionend', function() {
                if (!iframeContainer.classList.contains('show')) {
                    iframeContainer.style.display = "none";
                }
            }, {once: true}); 
        } else {
            iframeContainer.style.display = "block";
            setTimeout(function(){
                iframeContainer.classList.add('show');
            },0);
            closeIcon.style.display = 'block';
            robotIcon.style.display = 'none';
        }
    });
});
setTimeout(main,2000)
