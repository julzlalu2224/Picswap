# Deploy PicSwap to Render

## 🚀 Quick Deploy (Easiest Method)

### 1. Push to GitHub

```bash
cd /home/julz/Julz/Picswap
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Connect to Render

1. Go to https://render.com/ and sign up/login
2. Click **New** → **Static Site**
3. Connect your GitHub account
4. Select the **Picswap** repository
5. Render will auto-detect the `render.yaml` configuration!

### 3. Configuration (Auto-filled from render.yaml)

These will be automatically set from `render.yaml`, but verify:

```
Name: picswap
Branch: main
Build Command: cd Picswap.Client && npm install && npm run build:css && dotnet publish -c Release -o dist
Publish Directory: Picswap.Client/dist/wwwroot
```

### 4. Deploy!

- Click **Create Static Site**
- Wait 3-5 minutes for the build
- Your site will be live at: `https://picswap.onrender.com`

## 🔄 Automatic Deployments

Every push to `main` will automatically:
- ✅ Build Tailwind CSS
- ✅ Compile Blazor WebAssembly
- ✅ Deploy to Render

No manual work needed!

## 🌐 Custom Domain

1. Go to your Render dashboard
2. Select your site → **Settings**
3. Click **Add Custom Domain**
4. Follow DNS instructions

## ⚡ Free Tier Features

Render Free Tier includes:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ 100 GB bandwidth/month
- ✅ Unlimited sites

## 🎯 Your Site Will Be Live At:

```
https://picswap.onrender.com
```

Or with custom domain:
```
https://yourdomain.com
```

---

**That's it!** Push your code and Render handles everything automatically! 🚀
