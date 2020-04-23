// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
myConsole.log('Hello World!');

console.log("Test");

var pop3Client = require("poplib");
var client = new pop3Client(995, "server211.webhostingbuzz.com", {
    tlserrs: true,
    enabletls: true,
    debug: true
});
console.log("Client Created");

client.on("error", function(err) {

    if (err.errno === 111) console.log("Unable to connect to server");
    else console.log("Server error occurred");

    console.log(err);

});

client.on("connect", function() {

    console.log("CONNECT success");
    client.login("mark@ksunmail.com", "ZF6)RoPb.R");

});

client.on("invalid-state", function(cmd) {
    console.log("Invalid state. You tried calling " + cmd);
});

client.on("locked", function(cmd) {
    console.log("Current command has not finished yet. You tried calling " + cmd);
});

client.on("login", function(status, rawdata) {

	if (status) {

		console.log("LOGIN/PASS success");
		client.list();

	} else {

		console.log("LOGIN/PASS failed");
		client.quit();

	}
});

// Data is a 1-based index of messages, if there are any messages
client.on("list", function(status, msgcount, msgnumber, data, rawdata) {

	if (status === false) {

		console.log("LIST failed");
		client.quit();

	} else {

		console.log("LIST success with " + msgcount + " element(s)");

		if (msgcount > 0)
			client.retr(1);
		else
			client.quit();

	}
});

client.on("retr", function(status, msgnumber, data, rawdata) {

	if (status === true) {

		console.log("RETR success for msgnumber " + msgnumber);
		client.dele(msgnumber);
		client.quit();

	} else {

		console.log("RETR failed for msgnumber " + msgnumber);
		client.quit();

	}
});

client.on("dele", function(status, msgnumber, data, rawdata) {

	if (status === true) {

		console.log("DELE success for msgnumber " + msgnumber);
		client.quit();

	} else {

		console.log("DELE failed for msgnumber " + msgnumber);
		client.quit();

	}
});

client.on("quit", function(status, rawdata) {

	if (status === true) console.log("QUIT success");
	else console.log("QUIT failed");

});