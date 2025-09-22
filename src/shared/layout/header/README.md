# Header Component - Clean Code Refactoring

## Overview
The Header component has been refactored to follow clean code principles, making it more maintainable, testable, and readable.

## Key Improvements

### 1. **Single Responsibility Principle**
- **Before**: One large component (347 lines) handling multiple concerns
- **After**: Split into focused components:
  - `Header` - Main orchestrator (20 lines)
  - `MobileHeader` - Mobile-specific UI
  - `DesktopHeader` - Desktop-specific UI
  - `Sidebar` - Mobile navigation drawer
  - `LanguageSwitcher` - Language switching logic
  - `NavigationItems` - Navigation menu items
  - `AuthSection` - Authentication UI

### 2. **Eliminated Code Duplication**
- **Before**: Language switching logic duplicated in 3 places
- **After**: Single `LanguageSwitcher` component with variants
- **Before**: Navigation items defined twice
- **After**: Single `NavigationItems` component with variants

### 3. **Custom Hooks for Logic Separation**
- `useLanguageSwitch` - Handles language switching logic
- `useAuth` - Manages authentication state and logout

### 4. **Constants Extraction**
- `HEADER_CONSTANTS` - Colors, dimensions, spacing
- `NAVIGATION_ITEMS` - Navigation configuration

### 5. **Improved Styling**
- **Before**: Heavy use of inline styles
- **After**: Dedicated SCSS files for each component
- Centralized color and dimension constants

### 6. **Better TypeScript Support**
- Proper interfaces for component props
- Type-safe constants
- Better type inference

## File Structure
```
header/
├── components/
│   ├── AuthSection.tsx
│   ├── AuthSection.scss
│   ├── DesktopHeader.tsx
│   ├── DesktopHeader.scss
│   ├── LanguageSwitcher.tsx
│   ├── LanguageSwitcher.scss
│   ├── MobileHeader.tsx
│   ├── MobileHeader.scss
│   ├── NavigationItems.tsx
│   ├── NavigationItems.scss
│   ├── Sidebar.tsx
│   ├── Sidebar.scss
│   └── index.ts
├── hooks/
│   ├── useAuth.ts
│   └── useLanguageSwitch.ts
├── constants.ts
├── header.tsx (refactored)
├── header.scss (updated)
└── README.md
```

## Benefits

### Maintainability
- Each component has a single responsibility
- Easy to locate and modify specific functionality
- Clear separation of concerns

### Reusability
- Components can be reused in other parts of the application
- Language switcher can be used anywhere
- Navigation items are configurable

### Testability
- Each component can be tested in isolation
- Custom hooks can be tested independently
- Mock dependencies easily

### Readability
- Main Header component is now only 20 lines
- Clear component names and structure
- Self-documenting code

### Performance
- Better code splitting potential
- Reduced bundle size through tree shaking
- More efficient re-renders

## Usage Example
```tsx
// The main Header component is now clean and simple
const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <MobileHeader onMenuClick={toggleSidebar} />
      <DesktopHeader />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </>
  );
};
```

## Migration Notes
- All existing functionality is preserved
- No breaking changes to the public API
- Styling is maintained through SCSS files
- Responsive behavior is preserved
