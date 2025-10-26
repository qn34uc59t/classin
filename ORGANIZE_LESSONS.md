# 🎓 How to Add Multiple Lessons (Clean Structure)

## Current Structure

```
business english/
├── src/
│   └── BusinessEnglishModule.tsx  # Module 1.1
├── dist/                          # Built files
└── ...
```

## Recommended Structure for Multiple Lessons

When you add more lessons, organize like this:

```
business english/
├── src/
│   ├── lessons/
│   │   ├── Module1.1.tsx          # World of Work
│   │   ├── Module1.2.tsx         # Future lessons
│   │   └── Module2.1.tsx
│   ├── components/
│   │   └── SlideNavigator.tsx    # Shared components
│   ├── App.tsx                    # Router for all lessons
│   └── main.tsx
├── dist/
└── ...
```

## Adding New Lesson

1. **Create new lesson file:**
   ```
   src/lessons/Module2.1.tsx
   ```

2. **Add to App.tsx:**
   ```tsx
   import Module21 from './lessons/Module2.1';
   
   function App() {
     return <Module21 />; // or add routing
   }
   ```

3. **Deploy:**
   ```bash
   ./deploy.sh
   ```

## GitHub Organization

- **main branch** - Source code
- **gh-pages branch** - Built/deployed version

All lessons share the same:
- Navigation components
- SCORM integration
- Styling
- Build process

