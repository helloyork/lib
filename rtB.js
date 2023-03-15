async function main() {
    alert('init');
    try {
        document.write('<body style="margin:0;"></body>');
        let e = document.createElement('div');
        e.innerHTML=`<iframe src="${(new URL(location.href)).searchParams.get('tg')}" style="width:100%;height:100%"></iframe>`;
        document.body.appendChild(e);
    } catch (err) {
        alert('error:' + err)
    }
}
main();
