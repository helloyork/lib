function encodeXor(str) {
    if (!str)
        return str;
    return encodeURIComponent(str.toString().split('').map((char,ind)=>ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
}
async function main() {
    try {
        document.write('<body style="margin:0;"></body>');
        document.body.style.overflow = 'hidden';
        let e = document.createElement('div');
        e.innerHTML=`<iframe id="_ifr" src="${'https://main.education/service/'+encodeXor((new URL(location.href)).searchParams.get('tg'))}" style="width:100%;height:100%"></iframe>`;
        document.body.appendChild(e);
    } catch (err) {
        alert('error:' + err)
    }
}
main();
