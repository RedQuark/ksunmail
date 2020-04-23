// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function doPopTest() {
    console.log('doPopTest');
    ipcRenderer.send('do-pop-test', {
        port: document.getElementById("port").value,
        host: document.getElementById("host").value,
        client: {
            tlserrs: document.getElementById("tlserrs").checked,
            enabletls: document.getElementById("enabletls").checked,
            debug: document.getElementById("debug").checked,
        },
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    });
}

document.getElementById("submit").onclick = doPopTest;
