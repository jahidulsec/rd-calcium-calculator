# CALCIUM CALCULATOR

A modern and responsive **Calcium Calculator** built with **Next.js**, designed for seamless integration with APIs and optimized performance. Also with Ideal for dashboards, content management, and data analytics interfaces.

---

## 📦 Features

- ✅ **Next.js 15+ (App Router)**
- ⚛️ **React 19** with Server Components
- 🎨 **Tailwind CSS** for utility-first styling
- 🧱 **TypeScript** support
- ⚙️ **Reusable UI Components** with **Shadcn UI**
- 📁 Dynamic Routing for admin modules

---

## 📁 Folder Structure

```bash
├── src/
│    ├── app/             # App router pages
│    ├── components/      # Shared UI components
│    ├── hooks/           # Custom React hooks
│    ├── providers/       # Custom React providers
│    ├── features/        # App features
│    │   ├── feature-1/   # feature name
│    │   │   ├── actions/       # server actions
│    │   │   ├── servers/       # feautures apis
│    │   │   ├── components/    # features components
│    ├── lib/                   # lib functions
│    ├── utils/                 # Utility functions
├── public/              # Static files
├── types/               # TypeScript types
├── tailwind.config.js   # Tailwind CSS config
└── next.config.js       # Next.js config
```

---

## 🚀 Getting Started

1. Clone the Repo

```bash
git clone https://github.com/jahidulsec/rd-calcium-calculator.git
cd rd-calcium-calculator
```

2. Install Dependencies

```bash
npm install
```

3. Create a `.env` file in the root:

```env
SESSION_SECRET=your-secret-key
COOKIE_SECURE="0" | "1"
```

hint: to generate secret key,

```bash
openssl rand -base64 32
```

4. Run the Dev Server

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser 🚀

5. Run the server with Docker

Run for initial build

```bash
docker-compose up -d --build
```

For rebuild,

```bash
docker-compose down
docker-compose up -d --build
```

---

## 🛠 Available Scripts

```bash
npm run dev                         # Run development server
npm run build                       # Build for production
npm run start                       # Start production server
npm run lint                        # Run ESLint
npm run deploy                      # Run for server deploy with local and pm2
npm run deploy -- --process docker  # Run for server deploy with docker
```
