import fs from 'fs';

function fixFile(filePath) {
    console.log(`Reading ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    // First, remove the old style block if we already injected it so we can update it
    const oldStyleBlockRegex = /<style>html, body \{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; \} div \{ width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; \} img \{ width: 100%; height: 100%; object-fit: cover; display: block; \}<\/style>/;
    content = content.replace(oldStyleBlockRegex, '');

    let headEnd = content.indexOf('</head>');
    if (headEnd === -1) {
        console.log(`Could not find </head> in ${filePath}`);
        return;
    }

    // Using object-fit: fill forces it to stretch to the exact boundaries with NO cuts (cropping) and NO gaps.
    const styleBlock = '<style>html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; } div { width: 100%; height: 100%; } img { width: 100%; height: 100%; object-fit: fill; display: block; }</style>';

    const newContent = content.substring(0, headEnd) + styleBlock + content.substring(headEnd);

    console.log(`Writing ${filePath}...`);
    fs.writeFileSync(filePath, newContent);
    console.log(`Done fixing ${filePath}`);
}

fixFile('src/assets/delivery.html');
