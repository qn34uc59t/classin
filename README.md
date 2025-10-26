# Business English E-Learning Platform

Interactive Business English lessons built with React, TypeScript, and Tailwind CSS, designed for ClassIn integration.

## 📚 Lessons

- **Module 1.1: World of Work** - Training and Workshops
  - Job roles and responsibilities
  - Grammar: Present Simple
  - Work-life balance discussion
  - Interactive quizzes and exercises

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Open http://localhost:5173

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
./deploy.sh
```
This will build and push to GitHub Pages.

## 🌐 Deployment

### Option 1: GitHub Pages (Recommended)
1. Repository: https://github.com/qn34uc59t/classin
2. Auto-deploys from `main` branch
3. URL: https://qn34uc59t.github.io/classin/

### Option 2: Netlify/Vercel
Drag and drop `dist` folder to deploy.

### Option 3: SCORM Package
```bash
./build_scorm.sh
```
Upload `business-english-module-scorm.zip` to ClassIn.

## 📁 Project Structure

```
.
├── src/
│   ├── BusinessEnglishModule.tsx  # Module 1.1 content
│   ├── App.tsx                   # App router
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind styles
├── public/                        # Static assets
├── dist/                         # Production build
├── index.html                    # HTML template
└── package.json                  # Dependencies
```

## 🎯 Adding New Lessons

1. Create new component in `src/lessons/`
2. Add to `App.tsx` router
3. Deploy with `./deploy.sh`

## 🔧 Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- SCORM 1.2 API

## 📝 License

Educational use only.
