# Cloudflare Pages Deployment Guide for PicSwap

## 📋 Prerequisites

- Cloudflare account (free tier works fine)
- GitHub account
- PicSwap repository pushed to GitHub

## 🚀 Deployment Steps

### Option 1: Automatic Deployment via Git (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/picswap.git
   git push -u origin main
   ```

2. **Go to Cloudflare Dashboard**
   - Navigate to https://dash.cloudflare.com/
   - Click on **Pages** in the sidebar
   - Click **Create a project**

3. **Connect to Git**
   - Click **Connect to Git**
   - Select **GitHub**
   - Authorize Cloudflare Pages to access your repositories
   - Select your PicSwap repository

4. **Configure Build Settings**
   ```
   Project name: picswap (or your preferred name)
   Production branch: main
   Framework preset: None
   Build command: cd Picswap.Client && npm install && npm run build:css && dotnet publish -c Release -o dist
   Build output directory: Picswap.Client/dist/wwwroot
   Root directory: (leave blank or /)
   ```

5. **Environment Variables**
   No environment variables needed for this project!

6. **Deploy**
   - Click **Save and Deploy**
   - Wait for the build to complete (usually 2-5 minutes)
   - Your site will be live at `https://picswap-xxx.pages.dev`

7. **Custom Domain (Optional)**
   - Go to your Pages project settings
   - Click **Custom domains**
   - Add your domain (e.g., `picswap.yourdomain.com`)
   - Follow Cloudflare's DNS configuration instructions

### Option 2: Direct Upload

1. **Build the project locally**
   ```bash
   cd Picswap.Client
   npm install
   npm run build:css
   dotnet publish -c Release -o dist
   ```

2. **Go to Cloudflare Pages**
   - Navigate to https://dash.cloudflare.com/
   - Click **Pages** → **Create a project**
   - Choose **Upload assets**

3. **Upload**
   - Select all files from `Picswap.Client/dist/wwwroot/`
   - Upload and deploy

4. **Your site is live!**
   - Access at `https://YOUR-PROJECT.pages.dev`

### Option 3: Using Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build the project**
   ```bash
   cd Picswap.Client
   npm install
   npm run build:css
   dotnet publish -c Release -o dist
   ```

4. **Deploy**
   ```bash
   cd dist/wwwroot
   wrangler pages deploy . --project-name=picswap
   ```

5. **Access your site**
   - URL will be shown in the terminal
   - Also available in Cloudflare Dashboard

## 🔄 Continuous Deployment

Once set up with Git integration:

1. Make changes to your code
2. Commit and push to GitHub
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Cloudflare automatically rebuilds and deploys
4. Check deployment status in Cloudflare Dashboard

## 🐛 Troubleshooting

### Build Fails: .NET SDK Not Found

Cloudflare Pages uses a Linux build environment. The build command handles .NET installation automatically. If issues persist:

1. Check your build command is correct
2. Ensure your project targets .NET 8.0
3. Verify `Picswap.Client.csproj` exists in the correct path

### Build Fails: Node/npm Issues

1. Make sure `package.json` is in `Picswap.Client/` directory
2. Verify build command includes `npm install`
3. Check that `tailwind.config.js` is present

### CSS Not Loading

1. Verify `npm run build:css` ran successfully
2. Check that `wwwroot/css/app.css` exists in the build output
3. Ensure `index.html` references the correct CSS path

### Application Shows Blank Page

1. Open browser console (F12) for errors
2. Check that `_framework/blazor.webassembly.js` is loading
3. Verify all files from `wwwroot` are present
4. Clear browser cache and reload

### WebP Conversion Not Working

- WebP support requires modern browsers
- Check browser compatibility: Chrome 23+, Firefox 65+, Safari 14+, Edge 18+
- Test in a different browser

## 📊 Build Output Verification

After building, your `dist/wwwroot/` should contain:

```
wwwroot/
├── _framework/         (Blazor framework files)
├── css/
│   └── app.css        (Compiled Tailwind CSS)
├── js/
│   └── imageConverter.js
├── index.html
├── service-worker.js
└── service-worker.published.js
```

## ⚙️ Advanced Configuration

### Enable PWA Features

The project includes service workers for PWA support. To enable:

1. Service workers are already configured
2. Cloudflare Pages serves them automatically
3. Users can "Install" your app from browser menu

### Custom Headers

Create `_headers` file in `wwwroot/`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Redirects

Create `_redirects` file in `wwwroot/`:

```
# Redirect /old-path to /new-path
/old-path /new-path 301

# SPA fallback (if needed)
/* /index.html 200
```

## 🔐 Security Best Practices

✅ **Already Implemented:**
- No server-side code (static site)
- All processing client-side
- No data transmission
- HTTPS enforced by Cloudflare

✅ **Recommended:**
- Use custom domain with SSL
- Enable Cloudflare WAF (free tier available)
- Monitor access logs in Cloudflare Analytics

## 📈 Performance Optimization

Cloudflare Pages automatically provides:
- ✅ Global CDN distribution
- ✅ HTTP/2 and HTTP/3 support
- ✅ Brotli compression
- ✅ Automatic minification
- ✅ Edge caching

No additional configuration needed!

## 💰 Cost

**FREE!** Cloudflare Pages free tier includes:
- ✅ Unlimited sites
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ Custom domains
- ✅ SSL certificates

## 📞 Support

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Community Forum**: https://community.cloudflare.com/
- **Status Page**: https://www.cloudflarestatus.com/

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Images can be uploaded
- [ ] Conversion to PNG works
- [ ] Conversion to WebP works
- [ ] Download buttons function
- [ ] Dark mode toggle works
- [ ] Responsive on mobile devices
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Test in multiple browsers

---

**Congratulations! Your PicSwap image converter is now live! 🎉**

Share your deployment URL:
`https://your-project.pages.dev`
