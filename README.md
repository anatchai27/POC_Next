# POC Next Todo

A simple Todo list application built with Next.js 14.2, TypeScript, and tested with Jest + React Testing Library. Target test coverage: **>= 80%**.

## Scripts
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Watch mode
- `npm run test:coverage` - Run tests with coverage (threshold enforced)

## Structure
```
/pages
  /api
  /auth
  /dashboard
/src
  /components
  /hooks
  /lib
  /styles
  /types
  /utils
/public
```

## Testing Approach
Arrange / Act / Assert (AAA) pattern documented via comments inside test files for clarity.

## Next Steps
1. Implement Todo types & utilities
2. In-memory store + context
3. API route for todos
4. Components & pages
5. Tests & coverage validation

---
Generated scaffold. Fill in features next.
