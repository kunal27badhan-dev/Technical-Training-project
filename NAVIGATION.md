# Navigation Flow

**User Journey:**

1. **Start:** Visit http://localhost:3000/
   - Landing page (index.html)
   
2. **Click "Get Started"** → Opens http://localhost:3000/frontend
   - Frontend v1.0 page (frontend.html)
   
3. **Click "Explore Issues"** (on frontend page) → Opens http://localhost:3000/issues
   - Issues page (issues.html)
   - Automatically calls /api/results
   - Displays 10 GitHub issues fetched from backend

**Direct Links:**
- http://localhost:3000/ - Home
- http://localhost:3000/frontend - Frontend v1.0
- http://localhost:3000/issues - Issues list (with API call)
- http://localhost:3000/api/results - Raw API data

## Start the app

From this folder:

```bash
npm install
npm start
```

Then open http://localhost:3000/. For automatic restart during development, use
`npm run dev` instead.

The GitHub token is optional. If GitHub rate limits become a problem, copy
`.env.example` to `.env` and set `GITHUB_TOKEN=...` there. It is read only by
the backend and must never be added to frontend files.
