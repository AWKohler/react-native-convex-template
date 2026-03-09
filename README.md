# React Native + Convex Template

A mobile-first template using React Native (Expo), TypeScript, and Convex for realtime data and serverless functions.

## Features

- **React Native + Expo**: Cross-platform mobile development with Expo Router for navigation
- **Convex Backend**: Realtime data synchronization with `useQuery` and `useMutation` hooks
- **TypeScript**: Full type safety across client and server
- **Parent Communication**: Automatic forwarding of logs, errors, and metrics to parent IDE
- **Error Boundary**: React Error Boundary with parent window integration for error tracking
- **Platform-Injected Convex**: `EXPO_PUBLIC_CONVEX_URL` supplied by orchestrator

## Getting Started

### Prerequisites
- Node.js ≥18.0.0
- pnpm ≥8.0.0
- Expo CLI (installed via pnpm)

### Installation

```bash
pnpm install
```

### Development

```bash
# Start development server (choose platform)
pnpm start

# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Home screen
├── components/
│   └── ErrorBoundary.tsx  # React Error Boundary
├── lib/
│   ├── convexClient.ts    # Convex client initialization
│   └── ParentCommunication.ts  # IDE communication layer
convex/
├── schema.ts              # Convex schema definition
└── _generated/            # Auto-generated Convex types
```

## Key Integrations

### Convex

The template expects `EXPO_PUBLIC_CONVEX_URL` to be injected by the platform:

```typescript
// Use in your components
import { useQuery, useMutation } from "react-native-convex";

const data = useQuery("myFunction");
const mutate = useMutation("myMutation");
```

### Parent Communication

Automatically forwards:
- Console logs/errors (`console.log`, `console.error`, etc.)
- React errors (caught by ErrorBoundary)
- App lifecycle events (ready, metrics)

### Error Handling

The `ErrorBoundary` component catches and displays runtime errors:

```tsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

Errors are automatically sent to the parent IDE for visibility.

## Environment Variables

Create a `.env.local` file:

```
EXPO_PUBLIC_CONVEX_URL=<injected-by-platform>
```

## Development Tips

1. **Hot Reload**: Expo supports fast refresh for instant feedback
2. **Type Safety**: Run `pnpm build` to check types without building
3. **Debugging**: Use Expo DevTools overlay (shake device or press `d` in terminal)
4. **Parent IDE**: Monitor logs and errors in parent IDE window via console

## Building for Production

```bash
pnpm build
```

Then use `eas build` or `expo build` to create native apps.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Convex Documentation](https://docs.convex.dev/)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
