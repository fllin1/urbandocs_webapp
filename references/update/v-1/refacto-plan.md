# Vue Refactoring Todo List for UrbanDocs

## Phase 1: Setup and Foundation (Week 1-2)

### 1.1 Project Setup

- [x] Create Vue 3 project with Vite

  ```bash
  npm create vite@latest mwplu_webapp
  cd mwplu_webapp
  npm install
  ```

- [x] Install essential dependencies:

  ```bash
  npm install @supabase/supabase-js
  npm install vue-router@4
  npm install pinia
  npm install @vueuse/core
  npm install axios
  npm install firebase
  npm install -g firebase-tools
  ```

- [x] Setup Firebase hosting configuration for Vue
- [x] Configure environment variables (.env files)
- [x] Setup ESLint and Prettier for code consistency

### 1.2 Project Structure Setup

Create the following folder structure:

```text
src/
├── assets/          # Static assets (copy from current project)
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/      # Reusable Vue components
│   ├── common/      # Shared components
│   ├── auth/        # Auth-related components
│   ├── plu/         # PLU-specific components
│   └── layout/      # Layout components
├── views/           # Page components (routes)
│   ├── HomeView.vue
│   ├── LoginView.vue
│   ├── SignupView.vue
│   ├── ProfileView.vue
│   └── PluSynthesisView.vue
├── router/          # Vue Router configuration
├── stores/          # Pinia state management
├── services/        # API services
├── composables/     # Reusable composition functions
├── utils/           # Utility functions
└── styles/          # Global styles
```

### 1.3 Core Infrastructure

- [x] Setup Vue Router with route guards for authentication
- [x] Setup Pinia for state management
- [x] Create Supabase service module
- [x] Setup global error handling
- [x] Configure Turnstile CAPTCHA integration

## Phase 2: Authentication System (Week 2-3)

### 2.1 Auth Store (Pinia)

- [ ] Create auth store with state for:
  - User object
  - Authentication status
  - Loading states
  - Error states
- [ ] Implement auth actions:
  - Login
  - Signup
  - Logout
  - Email confirmation
  - Session management

### 2.2 Auth Components

- [ ] Create LoginForm component
- [ ] Create SignupForm component
- [ ] Create ConfirmationView component
- [ ] Create AuthGuard composable for protected routes
- [ ] Implement Turnstile CAPTCHA component

### 2.3 Auth Services

- [ ] Create auth service module connecting to your Python functions
- [ ] Implement token management
- [ ] Setup auto-refresh for sessions
- [ ] Add error handling and user feedback

## Phase 3: Layout and Navigation (Week 3-4)

### 3.1 Layout Components

- [ ] Create AppHeader component with:
  - Navigation menu
  - User profile dropdown
  - Responsive mobile menu
- [ ] Create AppFooter component
- [ ] Create AppLayout wrapper component
- [ ] Create LoadingSpinner component
- [ ] Create NotificationToast component

### 3.2 Navigation Setup

- [ ] Configure all routes in router/index.js
- [ ] Implement navigation guards for protected routes
- [ ] Setup redirect logic for unauthenticated users
- [ ] Create breadcrumb component for PLU pages

## Phase 4: Core Features Migration (Week 4-6)

### 4.1 Home Page

- [ ] Create CitySelector component
- [ ] Create ZoningSelector component
- [ ] Create ZoneSelector component
- [ ] Implement selection flow with Pinia store
- [ ] Add loading states and error handling

### 4.2 PLU Synthesis Page

- [ ] Create PluSynthesisView with tabs:
  - Synthesis tab
  - Comments & Likes tab
  - Sources tab
  - Download tab
- [ ] Create PluDocument component for displaying synthesis
- [ ] Create DocumentMeta component for document info
- [ ] Implement tab navigation

### 4.3 Comments and Likes System

- [ ] Create CommentList component
- [ ] Create CommentItem component
- [ ] Create CommentForm component
- [ ] Create LikeButton component
- [ ] Implement real-time updates with Supabase

### 4.4 Download Feature

- [ ] Create DownloadSection component
- [ ] Implement download tracking
- [ ] Add download progress indicator
- [ ] Handle different file formats

## Phase 5: Additional Features (Week 6-8)

### 5.1 Contact Form

- [ ] Create ContactView page
- [ ] Create ContactForm component with validation
- [ ] Integrate with backend service
- [ ] Add success/error notifications

### 5.2 User Profile

- [ ] Create ProfileView with sections:
  - Personal information
  - Password change
  - Preferences
  - Activity history
- [ ] Create ProfileEdit component
- [ ] Implement profile update functionality

### 5.3 Error Pages

- [ ] Create 404 page component
- [ ] Create generic error page component
- [ ] Setup error boundary for app-wide error catching

## Phase 6: Future Features Preparation (Week 8-9)

### 6.1 Blog Infrastructure

- [ ] Create blog folder structure:

  ```text
  views/blog/
  ├── BlogListView.vue
  ├── BlogPostView.vue
  └── BlogEditorView.vue
  ```

- [ ] Create BlogPost component
- [ ] Create BlogComment component
- [ ] Setup blog routing

### 6.2 Documentation Pages

- [ ] Create docs folder structure:

  ```text
  views/docs/
  ├── DocsLayout.vue
  ├── TutorialView.vue
  └── GuideView.vue
  ```

- [ ] Create DocsSidebar component
- [ ] Create DocsContent component

### 6.3 Payment System Preparation

- [ ] Create payment folder structure
- [ ] Research and choose payment provider (Stripe, PayPal, etc.)
- [ ] Create PaymentForm component skeleton
- [ ] Create SubscriptionManager component skeleton

### 6.4 City Pool Feature

- [ ] Create CityPollView component
- [ ] Create VotingCard component
- [ ] Create PollResults component

## Phase 7: Optimization and Polish (Week 9-10)

### 7.1 Performance Optimization

- [ ] Implement lazy loading for routes
- [ ] Setup component lazy loading
- [ ] Optimize bundle size with tree shaking
- [ ] Implement image lazy loading
- [ ] Add PWA capabilities

### 7.2 UI/UX Improvements

- [ ] Add loading skeletons
- [ ] Implement smooth transitions
- [ ] Add micro-interactions
- [ ] Ensure mobile responsiveness
- [ ] Implement dark mode (optional)

### 7.3 Testing

- [ ] Setup unit testing with Vitest
- [ ] Write tests for critical components
- [ ] Setup E2E testing with Cypress
- [ ] Test authentication flows
- [ ] Test PLU document access flow

## Phase 8: Deployment (Week 10)

### 8.1 Build Configuration

- [ ] Configure production build settings
- [ ] Setup environment-specific configurations
- [ ] Optimize build for production

### 8.2 Firebase Setup

- [ ] Update firebase.json for Vue SPA
- [ ] Configure hosting rewrites for Vue Router
- [ ] Setup preview channels
- [ ] Test deployment process

### 8.3 Migration Strategy

- [ ] Plan gradual migration approach
- [ ] Setup feature flags for gradual rollout
- [ ] Create rollback plan
- [ ] Document deployment process

## Best Practices to Follow

### Code Organization

- Keep components small and focused
- Use composition API for complex logic
- Extract reusable logic into composables
- Use TypeScript for better type safety (optional but recommended)

### State Management

- Use Pinia stores for global state
- Keep component state local when possible
- Implement proper error handling in stores
- Use getters for computed values

### Styling

- Use CSS modules or scoped styles
- Consider using Tailwind CSS or UnoCSS
- Maintain consistent naming conventions
- Create design tokens for consistency

### Security

- Always validate user input
- Implement proper CORS handling
- Use environment variables for sensitive data
- Follow Vue security best practices

## Learning Resources

Since you're new to Vue, here are essential resources:

1. **Vue 3 Documentation**: https://vuejs.org/guide/
2. **Vue Router**: https://router.vuejs.org/
3. **Pinia Documentation**: https://pinia.vuejs.org/
4. **Vue Composition API**: https://vuejs.org/guide/extras/composition-api-faq.html
5. **Vite Documentation**: https://vitejs.dev/

## Migration Tips

1. **Start Small**: Begin with authentication system as it's self-contained
2. **Component by Component**: Convert one page at a time
3. **Maintain Both Versions**: Keep vanilla JS version running while building Vue version
4. **Test Thoroughly**: Test each migrated feature before moving to the next
5. **Use Vue DevTools**: Essential for debugging and understanding component state

## Notes on Firebase App Hosting

Since you mentioned potentially switching to Firebase App Hosting:

- It's beneficial if you plan to use SSR (Server-Side Rendering) with Nuxt
- For a standard Vue SPA, regular Firebase Hosting is sufficient
- App Hosting is better for SEO and initial load performance
- Consider this after completing the basic migration
