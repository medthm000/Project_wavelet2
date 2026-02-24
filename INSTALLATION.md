# Installation Guide

## Prerequisites

This React application requires **Node.js** to run. Follow the steps below to install Node.js and launch the application.

## Step 1: Install Node.js

### Windows Installation

1. **Download Node.js**:
   - Visit: https://nodejs.org/
   - Click on the **LTS (Long Term Support)** version (recommended)
   - Example: Node.js 20.x LTS
   - The download will be a `.msi` installer file

2. **Run the Installer**:
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - Accept the license agreement
   - Choose the default installation path (or customize if needed)
   - **Important**: Make sure "Add to PATH" is checked
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify Installation**:
   - Open a new PowerShell window (important: must be NEW window)
   - Run these commands:
   ```powershell
   node --version
   npm --version
   ```
   - You should see version numbers (e.g., `v20.11.0` and `10.2.4`)
   - If you see errors, restart your computer and try again

## Step 2: Install Project Dependencies

Once Node.js is installed:

1. **Open PowerShell** in the project directory:
   - Navigate to: `d:\Studying\ERP\My presentation\New folder`
   - Or right-click in the folder and select "Open in Terminal"

2. **Install dependencies**:
   ```powershell
   npm install
   ```
   - This will download all required packages (React, Three.js, GSAP, etc.)
   - Takes 2-5 minutes depending on internet speed
   - You'll see a progress bar

3. **Wait for completion**:
   - When finished, you'll see a summary like:
   ```
   added 234 packages, and audited 235 packages in 2m
   ```

## Step 3: Run the Development Server

1. **Start the app**:
   ```powershell
   npm run dev
   ```

2. **Expected output**:
   ```
   VITE v5.0.8  ready in 432 ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```

3. **Open in browser**:
   - Open your browser (Chrome, Edge, Firefox)
   - Navigate to: **http://localhost:3000**
   - The app should load automatically

## Step 4: Navigate the Presentation

### Keyboard Controls:
- **Right Arrow (→)**: Next slide
- **Left Arrow (←)**: Previous slide

### Mouse Controls:
- **Dots on right side**: Click to jump to specific slide
- **Slide counter**: Top-right corner shows current position (e.g., "01 / 09")

### Features:
- 3D animated background responds to mouse movement
- Smooth GSAP transitions between slides
- Interactive charts and visualizations
- Real economic data from authoritative sources

## Troubleshooting

### Issue: "npm: command not found" or "node: command not found"

**Solution**:
1. Restart PowerShell (must use a NEW window after Node.js installation)
2. If still not working, restart your computer
3. Verify Node.js is in PATH:
   ```powershell
   $env:Path -split ';' | Select-String -Pattern 'nodejs'
   ```

### Issue: "Cannot find module" errors during npm install

**Solution**:
1. Delete `node_modules` folder (if exists)
2. Delete `package-lock.json` (if exists)
3. Run `npm install` again

### Issue: Port 3000 already in use

**Solution**:
1. Stop any other servers running on port 3000
2. Or edit `vite.config.ts` and change the port:
   ```typescript
   server: {
     port: 3001  // Change to different port
   }
   ```

### Issue: Slow performance or animations lag

**Solution**:
1. Close other browser tabs
2. Update your graphics drivers
3. Use a modern browser (Chrome, Edge, Firefox latest versions)
4. Disable browser extensions that might interfere

## Building for Production

To create an optimized production build:

```powershell
npm run build
```

This creates a `dist` folder with optimized files. To preview the production build:

```powershell
npm run preview
```

## Technical Details

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **3D Graphics**: Three.js via @react-three/fiber
- **Animations**: GSAP 3
- **Charts**: Recharts + D3.js
- **Styling**: Tailwind CSS
- **Data**: Hardcoded real historical economic data

## Support

If you encounter any issues:
1. Ensure Node.js version is 18.x or higher
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall: `npm install`
4. Check for typos in terminal commands
5. Verify you're in the correct directory

---

**Ready to explore multi-scale economic time series analysis!** 🚀
