# 🚀 PicSwap - Quick Reference

## 📋 Essential Commands

### Development
```bash
# Initial setup
cd Picswap.Client
npm install
npm run build:css

# Run development server
dotnet run                    # Regular run
dotnet watch run             # Hot reload

# Watch CSS changes
npm run watch:css            # Auto-rebuild Tailwind
```

### Production Build
```bash
npm run build:css
dotnet publish -c Release -o dist

# Deploy folder: dist/wwwroot/
```

### Quick Start
```bash
cd Picswap.Client
./start.sh                   # Linux/Mac automated setup
```

## 📁 Important Files

| File | Purpose | Edit? |
|------|---------|-------|
| `Pages/Index.razor` | Main converter page | ✅ Yes |
| `Shared/MainLayout.razor` | Layout & theme | ✅ Yes |
| `Styles/app.css` | Tailwind source CSS | ✅ Yes |
| `wwwroot/css/app.css` | Compiled CSS | ❌ Generated |
| `wwwroot/js/imageConverter.js` | Image processing | ✅ Yes |
| `tailwind.config.js` | Tailwind config | ✅ Yes |
| `wwwroot/index.html` | HTML entry point | ✅ Maybe |
| `Program.cs` | App entry point | ⚠️ Rarely |

## 🎨 Common Tasks

### Add a new color
Edit `tailwind.config.js`:
```js
colors: {
  mycolor: '#ff0000'
}
```
Then use: `bg-mycolor`, `text-mycolor`, etc.

### Add custom CSS class
Edit `Styles/app.css`:
```css
@layer components {
  .my-button {
    @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded;
  }
}
```
Rebuild: `npm run build:css`

### Add JavaScript function
Edit `wwwroot/js/imageConverter.js`:
```js
window.imageConverter.myFunc = function(param) {
  return "result";
};
```

Call from C#:
```csharp
var result = await JS.InvokeAsync<string>("imageConverter.myFunc", param);
```

### Change max file size
Edit `Pages/Index.razor`:
```csharp
private const long MaxFileSize = 20 * 1024 * 1024; // 20MB
```

## 🌐 URLs

### Development
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

### After Deployment
- Cloudflare: `https://your-project.pages.dev`
- Custom domain: `https://yourdomain.com`

## 🐛 Quick Fixes

### CSS not loading
```bash
rm wwwroot/css/app.css
npm run build:css
dotnet build
```

### Build fails
```bash
dotnet clean
dotnet restore
dotnet build
```

### Port already in use
```bash
dotnet run --urls "https://localhost:5002;http://localhost:5003"
```

### JavaScript not working
- Press F12 → Check Console for errors
- Verify `imageConverter.js` is loaded
- Clear browser cache (Ctrl+Shift+R)

## 📦 Deploy to Cloudflare Pages

### Via Git (Auto-deploy)
1. Push to GitHub
2. Connect repository in Cloudflare
3. Build command: `cd Picswap.Client && npm install && npm run build:css && dotnet publish -c Release -o dist`
4. Output directory: `Picswap.Client/dist/wwwroot`

### Manual Upload
1. Build: `npm run build:css && dotnet publish -c Release -o dist`
2. Upload: `dist/wwwroot/` folder
3. Done!

## 🔑 Key Concepts

- **Razor Components** (.razor files)
  - Combine HTML, CSS classes, and C# code
  - Use `@code { }` block for C# logic
  - Use `@` to switch between HTML and C#

- **Tailwind CSS**
  - Utility-first CSS framework
  - Use classes like: `bg-blue-500`, `text-white`, `rounded-lg`
  - Must rebuild after adding new classes

- **JavaScript Interop**
  - Call JS from C#: `await JS.InvokeAsync<T>("functionName", args)`
  - Access JS functions via `IJSRuntime`
  - All image processing happens in JS

- **Client-Side Only**
  - No server backend
  - All processing in browser
  - Images never uploaded
  - 100% static deployment

## 📊 Project Stats

- **Lines of Code**: ~1000 (excluding generated)
- **Dependencies**: 2 (.NET packages) + 1 (npm)
- **Build Time**: ~5 seconds
- **Bundle Size**: ~3-4 MB
- **Pages**: 1 (single-page app)
- **Components**: 2 (Index, MainLayout)

## 🎯 Next Steps

1. **Customize branding**
   - Change colors in `tailwind.config.js`
   - Update header in `MainLayout.razor`
   - Update meta tags in `index.html`

2. **Add features**
   - More output formats (AVIF, JPEG)
   - Image filters/effects
   - Batch download as ZIP
   - Image comparison slider

3. **Deploy**
   - Follow Cloudflare Pages guide
   - Add custom domain
   - Enable analytics

4. **Optimize**
   - Enable WASM AOT compilation
   - Trim unused code
   - Add service worker caching

## 💡 Tips

- ⚡ Use `dotnet watch run` for hot reload during development
- 🎨 Keep Tailwind docs open: https://tailwindcss.com
- 🔍 Use browser DevTools (F12) for debugging
- 📝 Comment your code for future reference
- 🧪 Test in multiple browsers before deploying
- 📱 Test mobile responsive with DevTools
- 🌐 Check console for errors after deployment

## 📚 Documentation

- [Full README](README.md) - Complete documentation
- [Deployment Guide](DEPLOYMENT.md) - Cloudflare Pages setup
- [Project Structure](../PROJECT_STRUCTURE.md) - Detailed file guide

---

**Need help?** Check the README or open an issue on GitHub!
