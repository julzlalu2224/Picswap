# PicSwap - Image Converter

A modern, production-ready **Blazor WebAssembly** image converter that runs entirely in your browser. Convert images to PNG and WebP formats with optional resizing and quality adjustment - all client-side with zero server dependency.

![Blazor](https://img.shields.io/badge/Blazor-8.0-512BD4?logo=blazor)
![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=.net)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🖼️ **Multiple Format Support**: Convert images to PNG or WebP
- 📐 **Smart Resizing**: Optional image resizing with aspect ratio preservation
- 🎚️ **Quality Control**: Adjustable compression quality (10% - 100%)
- 👀 **Live Previews**: See original and converted images side-by-side
- ⚡ **100% Client-Side**: No uploads, all processing happens in your browser
- 🔒 **Privacy First**: Your images never leave your device
- 🌓 **Dark Mode**: Built-in light/dark theme toggle
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS
- 🚀 **Drag & Drop**: Easy file upload with drag and drop support
- 📦 **Batch Processing**: Convert multiple images at once

## 🚀 Quick Start

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/picswap.git
   cd picswap/Picswap.Client
   ```

2. **Install Node dependencies (for Tailwind CSS)**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS**
   ```bash
   npm run build:css
   ```

4. **Run the application**
   ```bash
   dotnet run
   ```

5. **Open your browser**
   Navigate to `https://localhost:5001` or `http://localhost:5000`

## 🏗️ Project Structure

```
Picswap.Client/
├── Pages/
│   └── Index.razor              # Main converter page
├── Shared/
│   └── MainLayout.razor         # Layout with header, footer, theme toggle
├── Styles/
│   └── app.css                  # Tailwind source CSS
├── wwwroot/
│   ├── css/
│   │   └── app.css              # Compiled Tailwind CSS (generated)
│   ├── js/
│   │   └── imageConverter.js   # Image processing JavaScript
│   ├── index.html               # Entry point HTML
│   ├── service-worker.js        # Service worker (optional PWA)
│   └── service-worker.published.js
├── _Imports.razor               # Global using statements
├── App.razor                    # App component with routing
├── Program.cs                   # Application entry point
├── Picswap.Client.csproj        # Project file
├── package.json                 # Node dependencies
└── tailwind.config.js           # Tailwind configuration
```

## 🔧 Development

### Watch Tailwind CSS (auto-rebuild on changes)
```bash
npm run watch:css
```

### Run in development mode
```bash
dotnet watch run
```

## 📦 Building for Production

### 1. Build Tailwind CSS
```bash
npm run build:css
```

### 2. Publish the application
```bash
dotnet publish -c Release -o dist
```

The output will be in `dist/wwwroot/` - this is your static site ready for deployment!

## ☁️ Deploying to Cloudflare Pages

### Method 1: Using Cloudflare Dashboard

1. **Build the project**
   ```bash
   npm run build:css
   dotnet publish -c Release -o dist
   ```

2. **Upload to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Upload the contents of `dist/wwwroot/` folder
   - Deploy!

### Method 2: Using Git Integration (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to Cloudflare Pages → **Create a project**
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `cd Picswap.Client && npm install && npm run build:css && dotnet publish -c Release -o dist`
     - **Build output directory**: `Picswap.Client/dist/wwwroot`
     - **Root directory**: `/` (or leave blank)

3. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will automatically build and deploy
   - Every push to `main` triggers a new deployment

### Method 3: Using Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Build the project**
   ```bash
   npm run build:css
   dotnet publish -c Release -o dist
   ```

3. **Deploy**
   ```bash
   cd dist/wwwroot
   wrangler pages deploy . --project-name=picswap
   ```

## 🎨 Customization

### Tailwind Theme
Edit [tailwind.config.js](Picswap.Client/tailwind.config.js) to customize colors, fonts, and more:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0ea5e9',  // Change primary color
        600: '#0284c7',
        // ...
      },
    },
  },
}
```

### Custom CSS
Add custom styles to [Styles/app.css](Picswap.Client/Styles/app.css)

### JavaScript Features
Extend [wwwroot/js/imageConverter.js](Picswap.Client/wwwroot/js/imageConverter.js) to add more image processing features

## 🔍 How It Works

1. **Image Upload**: Uses Blazor's `InputFile` component to read files
2. **Data URL Creation**: Converts images to base64 data URLs
3. **Canvas Processing**: JavaScript draws images to HTML5 Canvas
4. **Format Conversion**: `canvas.toDataURL()` converts to target format (PNG/WebP)
5. **Download**: Creates temporary anchor element to trigger download

All processing happens in the browser - no server required!

## 🧪 Supported Formats

### Input Formats
- JPEG/JPG
- PNG
- GIF
- BMP
- WebP
- SVG

### Output Formats
- PNG (lossless)
- WebP (lossy/lossless)

## ⚙️ Configuration

### File Size Limits
Default max file size: **10MB per file**

To change, edit [Pages/Index.razor](Picswap.Client/Pages/Index.razor):
```csharp
private const long MaxFileSize = 10 * 1024 * 1024; // Change this
```

### Quality Settings
Default quality: **90%**
Range: **10% - 100%**

## 🐛 Troubleshooting

### Tailwind CSS not working
```bash
# Rebuild Tailwind CSS
npm run build:css
```

### Application won't start
```bash
# Restore packages
dotnet restore

# Clean and rebuild
dotnet clean
dotnet build
```

### Images not converting
- Check browser console for JavaScript errors
- Ensure browser supports HTML5 Canvas
- Try smaller images (under 10MB)
- Check image format is supported

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

WebP support requires modern browsers (Chrome 23+, Firefox 65+, Safari 14+, Edge 18+)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Blazor WebAssembly](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)
- [Tailwind CSS](https://tailwindcss.com/)
- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## 📊 Performance

- ⚡ **Instant conversion** for images under 2MB
- 🚀 **No upload time** - all client-side
- 💾 **No storage costs** - nothing saved on servers
- 🔐 **Complete privacy** - images never transmitted

## 🎯 Roadmap

- [ ] Add AVIF format support
- [ ] Batch download as ZIP
- [ ] Advanced filters and effects
- [ ] Image comparison slider
- [ ] History/undo functionality
- [ ] Custom presets for common use cases

## 📧 Support

For issues and questions:
- Open an [Issue](https://github.com/yourusername/picswap/issues)
- Check [Discussions](https://github.com/yourusername/picswap/discussions)

---

**Built with ❤️ using Blazor WebAssembly and Tailwind CSS**

*Convert images with confidence - everything happens in your browser!*
