# Instructions for Uploading FarmConnect Mobile to GitHub

## Prerequisites
- Git installed on your system
- GitHub account (https://github.com/siddharth10ss)
- Repository created: https://github.com/siddharth10ss/Farm_Connect.git

## Step-by-Step Upload Process

### 1. Initialize Git Repository
```bash
# Navigate to your project directory
cd "d:/Main Projects/FarmConnect Mobile"

# Initialize git repository
git init

# Add all necessary files to staging
git add .

# Check what files will be committed
git status
```

### 2. Configure Git (if not already done)
```bash
# Set your username
git config user.name "siddharth10ss"

# Set your email
git config user.email "your-email@example.com"
```

### 3. Commit the Files
```bash
# Make initial commit
git commit -m "Initial commit: FarmConnect Mobile React Native app with Expo"
```

### 4. Add Remote Repository
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/siddharth10ss/Farm_Connect.git
```

### 5. Push to GitHub
```bash
# Push to main branch
git branch -M main
git push -u origin main
```

## Files Being Uploaded

### Essential Files (Included)
- ✅ `App.tsx` - Main application component
- ✅ `app.json` - Expo configuration
- ✅ `package.json` - Dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `metro.config.js` - Metro bundler configuration
- ✅ `README.md` - Comprehensive documentation
- ✅ `LICENSE` - MIT License
- ✅ `CONTRIBUTING.md` - Contribution guidelines
- ✅ `PRIVACY.md` - Privacy policy
- ✅ `TERMS.md` - Terms of service
- ✅ `Attributions.md` - Attribution credits
- ✅ `.gitignore` - Git ignore rules

### Source Code (Included)
- ✅ `src/` - All source code files
- ✅ `components/` - Additional components
- ✅ `styles/` - Global styles
- ✅ `guidelines/` - Development guidelines

### Excluded Files (via .gitignore)
- ❌ `node_modules/` - Dependencies (will be installed via npm)
- ❌ `.expo/` - Expo build files
- ❌ `ios/` - iOS build files
- ❌ `android/` - Android build files
- ❌ `build/` - Build artifacts
- ❌ `.env` - Environment variables
- ❌ Log files and cache

## After Upload

### For Contributors
1. Clone the repository:
   ```bash
   git clone https://github.com/siddharth10ss/Farm_Connect.git
   cd Farm_Connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development:
   ```bash
   npm start
   ```

### Repository Structure Preview
```
Farm_Connect/
├── src/
│   ├── components/     # UI components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── navigation/    # Navigation setup
│   ├── screens/       # Screen components
│   ├── theme/         # Design system
│   └── utils/         # Utility functions
├── components/        # Additional components
├── styles/           # Global styles
├── guidelines/       # Development guidelines
├── README.md         # Project documentation
├── LICENSE           # MIT License
├── CONTRIBUTING.md   # Contribution guidelines
├── PRIVACY.md        # Privacy policy
├── TERMS.md          # Terms of service
├── Attributions.md   # Attribution credits
├── package.json      # Dependencies
├── app.json          # Expo config
├── tsconfig.json     # TypeScript config
└── metro.config.js   # Metro bundler config
```

## Troubleshooting

### If you get authentication errors:
```bash
# Use personal access token instead of password
git push https://<YOUR_TOKEN>@github.com/siddharth10ss/Farm_Connect.git main
```

### If files are too large:
```bash
# Remove large files if accidentally added
git rm --cached large-file.ext
```

### If you need to update later:
```bash
# Add changes
git add .

# Commit
git commit -m "Update description"

# Push
git push origin main
```

## Security Notes
- Never commit `.env` files with sensitive data
- Review `.gitignore` to ensure no sensitive files are included
- Use environment variables for API keys and secrets

## Support
If you encounter any issues during upload, check:
- GitHub documentation: https://docs.github.com
- Git documentation: https://git-scm.com/doc
- Expo documentation: https://docs.expo.dev

---

**Ready to upload!** Follow the steps above to get your FarmConnect Mobile app on GitHub.
