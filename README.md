# MERN Skeleton CLI

Generate a professional MERN project skeleton with separate frontend and backend. Perfect for freshers or anyone starting a MERN project.

## Features

- **Backend**
  - Express + Nodemon starter
  - Organized folder structure: `controllers`, `models`, `routes`, `middlewares`, `config`, `utils`
  - `server.js` ready to run
- **Frontend**
  - Vite + React
  - Professional `src/` folders: `components`, `pages`, `hooks`, `services`, `utils`, `context`, `assets`
  - Sample `Hello.jsx` component and API service
- Automatically installs dependencies
- Ready-to-run full stack project

## Installation

You can run it directly with **npx**:

```bash
npx mern-skeleton my-project          # Full stack (frontend + backend)
npx mern-skeleton my-backend backend  # Backend only
npx mern-skeleton my-frontend frontend # Frontend only


git clone https://github.com/yourusername/mern-skeleton.git
cd mern-skeleton
npm link
mern-skeleton my-project
