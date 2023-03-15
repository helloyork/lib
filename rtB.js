async function main() {
    try {
        document.write('<body style="margin:0;"></body>');
        document.body.style.overflow = 'hidden';
        let e = document.createElement('div');
        e.innerHTML=`<embed id="_ifr" src="${(new URL(location.href)).searchParams.get('tg')}" style="width:100%;height:100%"></embed>`;
        document.body.appendChild(e);
    } catch (err) {
        alert('error:' + err)
    }
}
main();
