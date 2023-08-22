//@ts-nocheck

//https://em8umf-5173.preview.csb.app/src/static/script/nomenmain.js
//fetch('https://em8umf-5173.preview.csb.app/src/static/script/nomenmain.js').then(v=>v.text()).then(v=>eval(v));
//https://cdn.jsdelivr.net/npm/lil-gui@0.18

const version = "1.2.11";
let coreURL = 'https://em8umf-5173.preview.csb.app';
let scriptLocation = '/src/static/script/nomenmain.js';
let createCoreURL = relativeURL => coreURL + relativeURL;
let gsettings = {
    bossKey: 'b',
    proxyUrl :location.href,
    plugins:[],
    replaceUrl:'https://google.com',
    devMod:false
}

const requires = ["https://cdn.jsdelivr.net/npm/lil-gui@0.18"];
const loadScript = (src, dc) => {
    if (!dc) dc = document;
    return new Promise((resolve, reject) => {
        const script = dc.createElement('script');
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        script.crossOrigin = 'anonymous';
        script.src = src;
        if (dc.head.append) {
            dc.head.append(script);
        } else {
            dc.getElementsByTagName('head')[0].appendChild(script);
        }
    });
};
const loadText = (src) => {
    return new Promise(r => {
        fetch(src)
            .then(v => v.text())
            .then(v => r(v))
    });
}


function createUIKit(gui) {
    function useDevmode(){
        if(gsettings.devMod||confirm("你确定要启用调试模式吗？启动之后可以使用调试功能，需要刷新页面才能关闭")){
            gsettings.devMod=true;
            gui.title(`[DEVMODE] Nomen+ ${version}`);
            return true;
        }
        return false;
    }
    let about = gui.addFolder(`关于`);
    about.close();
    let folder = gui.addFolder(`加载中...`);
    let aboutui = {
        "关于Nomen+": () => {
            alert(`Nomen+ v${version}
        Nomen+是由Nomen开发的免费非商用互联网增强插件，用于增强在管控之下的互联网体验
        如果你想要更多的功能，或有任何意见和反馈，请发送至helloyork@icloud.com
        非常感谢您的使用！`)
        },
        "更新日志": () => {
            alert(`Nomen+ v${version}更新日志
            增加了老板键，启动之后点击指定键将会闪退页面并抹除历史记录，可以设定为其他键（默认为B）
            新增代理模式，可以绕过防火墙访问其他网页
            新增插件模式，启动调试模式之后即可加载插件，插件拥有的功能更复杂`);
        }
    };
    about.add(aboutui, "关于Nomen+");
    about.add(aboutui, "更新日志");
    if (!document || !window || !fetch || !location || !location.href) {
        folder.title(`加载失败：请检查当前浏览器环境`);
    } else {
        folder.title(`页面操作`);
        let uis = {
            "抹去页面历史记录": () => { location.replace(gsettings.replaceUrl) },
            "无痕浏览此页": () => {
                let chtml = `<header><script src="${createCoreURL(scriptLocation)}"></script></header>
                <body style="margin:0;"><embed src="${location.href}" style="margin:0;height:100%;width:100%;border:none;"></embed></body>`;
                let cw = open('about:blank', 'Nomen+')
                cw.document.write(chtml);
                location.replace(gsettings.replaceUrl);
            },
            "解封网页": () => {
                let chtml = `<header><script src="${createCoreURL(scriptLocation)}"></script></header>
                <body style="margin:0;"><embed src="${prompt('网页网址', 'https://google.com')}" style="margin:0;height:100%;width:100%;border:none;"></embed></body>`;
                let cw = open('about:blank', 'Nomen+')
                cw.document.write(chtml);
            },
            "防止封禁": () => {
                window.onbeforeunload = ((e) => {
                    e.preventDefault();
                    return false;
                })
            },
            "老板键": () => {
                document.addEventListener('keydown', (e) => {
                    if (e.key && e.key == gsettings.bossKey) {
                        let chtml = `<header><title>Google</title></header>
                        <body style="margin:0;"><p style="color:white;">.</p></body>`;
                        document.write(chtml);
                        location.replace("https://google.com");
                    }
                });
                alert(`老板键注入成功，按下"${gsettings.bossKey}"闪退页面并抹除\n请注意，这可能在某些页面上不起效，因为页面劫持了按键检测，所以请先初次尝试一次`);
            }
        };
        folder.add(uis, "抹去页面历史记录");
        folder.add(uis, "无痕浏览此页");
        folder.add(uis, "解封网页");
        folder.add(uis, "防止封禁");
        folder.add(uis, "老板键");
        let moreui = {
            "扫雷": loadSaolei,
            "快速退出": () => {
                let chtml = `<header><title>Google</title></header>
                <body style="margin:0;"><p style="color:white;">.</p></body>`;
                document.write(chtml);
                location.replace("https://google.com");
            },
        };
        let more = folder.addFolder(`其他`);
        let saoleib = more.add(moreui, "扫雷");
        more.add(moreui, "快速退出");
        async function loadSaolei() {
            saoleib.name('加载中...');
            let asset = await loadText(createCoreURL('/src/static/script/assets/saolei.txt'));
            let od = open('about:blank', 'Nomen+', 'width=260,height=360');
            od.document.write(asset);
            saoleib.name('扫雷');
        };
        let src = folder.addFolder(`资源`);
        let srcui = {
            "未被墙的Bilibili": () => { open('https://www.bilibili.com') },
            "前往主站访问更多功能": () => { open(coreURL) },
        };
        src.add(srcui, "未被墙的Bilibili");
        src.add(srcui, "前往主站访问更多功能");
        let proxy = folder.addFolder(`绕过防火墙`);
        let proxyui = {
            "目标网站地址": gsettings.proxyUrl,
            "开始代理": () => {
                function isValidURL(url) {
                    var pattern = new RegExp('^(https?:\\/\\/)?' + // 协议（可选）
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // 域名
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // IP 地址
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // 端口和路径
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // 查询字符串
                        '(\\#[-a-z\\d_]*)?$', 'i'); // 锚点（可选）

                    return pattern.test(url);
                }
                if(!isValidURL(gsettings.proxyUrl))alert(`提供的网址无效`);
                else if (confirm(`重要的警告！\n代理服务由Utopia提供，Nomen+无法保证内容是否有害，并且代理商可能不会保证不会出售，传播您的个人信息\n==请绝对不要在代理模式下输入密码，银行卡号等敏感信息！！！==\n!!!请在使用过程中遵守以下规则!!!
                我确认我不会私自传播该服务\nNomen+不会对使用过程中出现的隐私泄漏问题和危害信息负责\n该服务造成的一切后果由本人承担，Nomen+不负任何责任`)) {
                    let y = open("about:blank", "Nomen+ x Utopia");
                    function encodeXor(str) {
                        if (!str)
                            return str;
                        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
                    }
                    y.document.write(`
                    <head><title>Nomen+ U</title><style>body {margin:0;overflow:hidden}</style><script src="${createCoreURL(scriptLocation)}"></script>
                    <script>alert(\`最终提醒：如果您在受监管的校园内使用该服务，请注意，任何尝试绕过防火墙的行为都是禁止的，您可能会触犯校园规定，一切后果Nomen+拒不承担\`)</script></head>
                        <body>
                            <iframe width="100%" height="100%" src="${'https://main.education/service/' + encodeXor(gsettings.proxyUrl)}" frameborder="0"></iframe>
                        </body>`);
                }
            }
        };
        let turl = proxy.add(proxyui, "目标网站地址");
        proxy.add(proxyui, "开始代理");
        turl.onChange(v => {
            gsettings.proxyUrl = v;
        })
    };
    let folder2 = gui.addFolder(`加载中...`);
    if (!document || !window || !fetch || !location || !location.href) {
        folder2.title(`加载失败：请检查当前浏览器环境`);
    } else {
        folder2.title(`调试`);
        folder2.close();
        let uis = {
            "载入Eruda控制台": () => {
                if(!useDevmode())return;
                (function () {
                    var script = document.createElement('script');
                    script.src = "//cdn.jsdelivr.net/npm/eruda";
                    document.body.appendChild(script);
                    script.onload = function () { eruda.init() }
                })();
            },
            "执行语句": () => {
                try {
                    alert(eval(prompt('请键入Javascript语句') || '"none"'))
                } catch (err) {
                    alert(err)
                }
            },
            "插件":async()=>{
                if(confirm("是否启动插件模式？目前该功能还在测试")){
                    if(!useDevmode())return;
                    let pg = prompt("请输入插件id","NomenPro");
                    if(typeof pg != "string")return;
                    fetch(createCoreURL(`/src/static/script/plugins/${pg}.js`),{method:"GET"}).then(v=>v.text())
                    .then(v=>{
                        let plg = Function(v);
                        gsettings.plugins.push(plg(gui));
                        alert(`插件 ${pg}正在运行`);
                    })
                    .catch(r=>{
                        alert("id不存在, "+r);
                        return;
                    });
                }
            }
        };
        folder2.add(uis, "载入Eruda控制台");
        folder2.add(uis, "执行语句");
        folder2.add(uis, "插件");
    };
    let settings = gui.addFolder(`设置`);
    settings.close();
    let settingsui = {
        "跳转地址": 'https://www.google.com',
        "老板键": "b",
        "启动调试模式":()=>{
            if(gsettings.devMod||confirm("你确定要启用调试模式吗？启动之后可以使用调试功能，需要刷新页面才能关闭")){
                gsettings.devMod=true;
                gui.title(`[DEVMODE] Nomen+ ${version}`);
            }
        },
        "退出": () => {
            gui.hide();
        }
    }
    let ppr = settings.add(settingsui, "跳转地址");
    let par = settings.add(settingsui, "老板键", ["b", "g", "e", "a", "Enter", "Tab", "Escape", "Control"]);
    settings.add(settingsui, "退出");
    ppr.onChange(e => {
        gsettings.replaceUrl = e;
    });
    par.onChange(e => {
        gsettings.bossKey = e;
    });
    return folder;
}
async function createBlankGUI() {
    let mainHTML = await new Promise(resolve => {
        fetch(createCoreURL('/src/static/script/mainBlank.txt'))
            .then(v => v.text())
            .then(v => resolve(v));
    })
    document.write(mainHTML);
}

async function initLil() {
    const gui = new lil.GUI({ title: `Nomen+ ${version}` });
    gui.domElement.style.top = "unset";
    gui.domElement.style.bottom = "0";
    gui.domElement.style["z-index"] = 100001000;
    return gui;
}

(async () => {
    console.log('Nomen+ is running');
    for (let i = 0; i < requires.length; i++) {
        await new Promise(resolve => {
            loadScript(requires[i]).then(v => resolve(v))
                .catch(r => {
                    fetch(createCoreURL('/src/static/script/err.txt'))
                        .then(v => v.text())
                        .then(v => {
                            let t = document.createElement('div');
                            t.innerHTML = v;
                            document.appendChild(t);
                        })
                })
        })
        console.log('load: ' + requires[i]);
    };
    let gui = await initLil();
    let mainFolder = createUIKit(gui);
    if (!document || !window || !fetch) { };
    window.NomenPlus={
        settings:{
            gui,
        }
    }
    return;
})()
