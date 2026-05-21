const fs = require('fs');
const path = require('path');

// Aapka asli sensitive iframe code
const rawCode = `<div class="iframe-container" style="flex: 1; position: relative; background: white; overflow: hidden; min-height: 0; width: 100%; height: 100%;">
  <iframe
    id="preview-iframe"
    src="https://019e0224-4e5b-7c7b-bee9-04b07ced619e.arena.site/?embed=true"
    sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-popups allow-popups-to-escape-sandbox allow-downloads allow-top-navigation-by-user-activation"
    allow="accelerometer; autoplay; camera; encrypted-media; fullscreen; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; usb; vr; xr-spatial-tracking; screen-wake-lock; magnetometer; ambient-light-sensor; battery; gamepad; picture-in-picture; display-capture; bluetooth;"
    referrerpolicy="origin-when-cross-origin"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; display: block;"
  ></iframe>
</div>`;

try {
    // 1. Code ko Base64 mein encode karna
    const base64Data = Buffer.from(rawCode).toString('base64');
    fs.writeFileSync(path.join(__dirname, 'data.txt'), base64Data);
    console.log('✅ data.txt generated with encrypted base64 payload.');

    // 2. template.html ko padhna aur index.html banana
    const templatePath = path.join(__dirname, 'template.html');
    if (fs.existsSync(templatePath)) {
        let templateContent = fs.readFileSync(templatePath, 'utf8');
        
        // JAVIS.AI repository target link replacement
        templateContent = templateContent.replace('YOUR_REPO_NAME', 'JAVIS.AI');
        
        fs.writeFileSync(path.join(__dirname, 'index.html'), templateContent);
        console.log('✅ index.html compiled successfully from template.');
    } else {
        console.error('❌ Error: template.html not found on root!');
    }
} catch (err) {
    console.error('Compiler Error:', err);
    process.exit(1);
}
