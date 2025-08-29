# Contributing to FarmConnect Mobile 🌾

Thank you for your interest in contributing to FarmConnect Mobile! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Expo CLI (`npm install -g expo-cli`)

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Farm_Connect.git
   cd Farm_Connect
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Types of Contributions

### 🐛 Bug Reports
- Check existing issues before creating new ones
- Use the bug report template
- Include steps to reproduce, expected vs actual behavior
- Add screenshots or screen recordings when helpful

### 💡 Feature Requests
- Check if the feature already exists or is planned
- Use the feature request template
- Explain the use case and benefits
- Consider implementation complexity

### 🔧 Code Contributions
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

### 📖 Documentation
- Fix typos and grammar
- Improve clarity and examples
- Add missing documentation
- Translate to other languages

### 🌍 Translations
- Help translate the app to new languages
- Improve existing translations
- Follow the i18n guidelines

## 🎯 Development Workflow

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow the conventional commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(home): add product filtering by location
fix(cart): resolve quantity update issue
docs(readme): update installation instructions
```

### Pull Request Process
1. Ensure your branch is up to date with `main`
2. Run tests and linting:
   ```bash
   npm test
   npm run lint
   ```
3. Create a descriptive PR title and description
4. Link related issues
5. Request review from maintainers
6. Address feedback promptly

## 🧪 Testing Guidelines

### Unit Tests
- Write tests for new components and utilities
- Use Jest and React Native Testing Library
- Aim for >80% code coverage

### E2E Tests
- Add E2E tests for critical user flows
- Use Detox for E2E testing
- Test on both iOS and Android

### Manual Testing
- Test on different screen sizes
- Test in both light and dark modes
- Test offline functionality
- Test with different languages

## 🎨 Design Guidelines

### UI/UX Standards
- Follow the existing design system
- Use consistent spacing and typography
- Ensure accessibility compliance (WCAG 2.1)
- Test on various devices and orientations

### Component Guidelines
- Create reusable components when possible
- Follow the established component structure
- Use TypeScript for type safety
- Document component props and usage

## 📱 Platform Guidelines

### iOS
- Follow iOS Human Interface Guidelines
- Test on various iOS versions
- Ensure proper SafeArea usage
- Handle notch and dynamic island properly

### Android
- Follow Material Design guidelines
- Test on various Android versions
- Handle system navigation properly
- Support different screen densities

## 🔍 Code Review Guidelines

### For Authors
- Keep PRs small and focused
- Provide clear descriptions
- Respond to feedback promptly
- Test thoroughly before requesting review

### For Reviewers
- Be constructive and helpful
- Focus on code quality and maintainability
- Check for security issues
- Verify tests are adequate

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority-high` - Critical issues
- `priority-medium` - Important but not critical
- `priority-low` - Nice to have

## 🛠️ Development Tools

### Recommended VS Code Extensions
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- React Native Tools
- Auto Rename Tag
- Bracket Pair Colorizer

### Debugging
- Use React Native Debugger
- Enable remote debugging in development
- Use Flipper for advanced debugging
- Monitor performance with React DevTools

## 📊 Performance Guidelines

### Best Practices
- Use React.memo for expensive components
- Implement proper image optimization
- Minimize re-renders with useMemo and useCallback
- Use FlatList for large lists
- Implement proper caching strategies

### Performance Monitoring
- Monitor app startup time
- Track screen transition performance
- Monitor memory usage
- Check bundle size regularly

## 🌐 Internationalization (i18n)

### Adding New Languages
1. Create language file in `src/locales/`
2. Add translations following the existing structure
3. Update language selection UI
4. Test thoroughly

### Translation Guidelines
- Use meaningful keys
- Keep translations concise
- Consider cultural context
- Test with native speakers

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat with contributors
- **Email**: support@farmconnect.com

### Before Asking for Help
1. Check existing documentation
2. Search closed issues
3. Provide minimal reproduction steps
4. Include relevant environment details

## 🏆 Recognition

### Contributors
- Contributors will be listed in the README
- Special mentions for significant contributions
- Contributor badges in GitHub profile

### Hall of Fame
Outstanding contributors may be invited to:
- Join the core team
- Become maintainers
- Get early access to new features

## 📋 Checklist

### Before Submitting PR
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Performance impact considered
- [ ] Accessibility checked
- [ ] Cross-platform testing done

### For Bug Fixes
- [ ] Bug reproduced and understood
- [ ] Fix tested thoroughly
- [ ] Edge cases considered
- [ ] Regression tests added

### For Features
- [ ] Feature discussed in issues
- [ ] Design approved
- [ ] Tests written
- [ ] Documentation updated
- [ ] Performance impact assessed

## 📄 License

By contributing to FarmConnect Mobile, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FarmConnect Mobile! Together, we're building a better future for farmers and consumers. 🌱
