import fs from 'fs';

function fixHtmlFile(path) {
    if (!fs.existsSync(path)) return;
    let d = fs.readFileSync(path, 'utf8');
    const search = "<title>Converted document</title></head><body><div><img alt='' src='data:";
    const repl = "<title>Converted document</title><style>html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; } div { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; } img { width: 100%; height: 100%; object-fit: cover; display: block; }</style></head><body><div><img alt='' src='data:";

    if (d.includes(search)) {
        d = d.replace(search, repl);
        fs.writeFileSync(path, d);
        console.log("Fixed " + path);
    } else {
        console.log("Could not find search string in " + path + " (already fixed?)");
    }
}

fixHtmlFile('src/assets/delivery.html');
fixHtmlFile('src/assets/LocationStrategyDemo.html');
fixHtmlFile('src/assets/help.html');
