# ✉️ Email Classifier (Next.js + Gmail + OpenAI)

This project is an **AI-powered Email Classifier** built with **Next.js 14**, **Google OAuth**, and **OpenAI API**.  
It fetches your latest emails from Gmail, classifies them into categories using AI, and displays them neatly in a dashboard.

---

## 🚀 Features

- 🔐 Google Login (OAuth2 with NextAuth)
- 📬 Fetch last 15 emails from Gmail automatically
- 🤖 Classify emails using OpenAI API (with a local mock fallback)
- 🧠 View categorized results directly in the dashboard
- 🧰 Clean UI built using TailwindCSS
- ⚙️ `.env.local` based configuration

---

## 🧩 Project Structure

```

email_classifier/
│
├── app/
│   ├── api/
│   │   ├── classify/route.js     → Handles classification (OpenAI + mock)
│   │   └── gmail/route.js        → Fetches Gmail messages via OAuth
│   ├── dashboard/                → Dashboard UI components
│   ├── components/               → Navbar, Loader, etc.
│   ├── utils/                    → Helper utilities (mock data, storage)
│   ├── globals.css               → Global styles
│   └── layout.jsx / page.jsx     → Next.js app structure
│
├── pages/api/auth/[...nextauth].js → Handles Google authentication
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md

````

---

## ⚙️ How It Works

1. **User logs in with Google** using NextAuth.
2. The app fetches the **latest 15 emails** from the Gmail API.
3. Each email is passed to the **OpenAI API** (or mock classifier if API limit is reached).
4. The AI model categorizes emails (e.g. *Work, Personal, Promotions, Finance*).
5. Classified emails appear in a **clean, scrollable dashboard**.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14, React 18, TailwindCSS |
| Backend | Node.js (Next.js API Routes) |
| Authentication | Google OAuth (NextAuth.js) |
| AI Processing | OpenAI API / Local Mock |
| Email Source | Gmail API |
| Hosting | Vercel / Localhost |

---

## 🧰 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bhakthi-Shetty7811/Email_Classifer.git
cd Email_Classifer
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a file named `.env.local` in the root folder and add:

```env
# ==== Google OAuth Credentials ====
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here

# ==== NextAuth (for authentication handling) ====
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# ==== OpenAI API Key (for classification) ====
OPENAI_API_KEY=your_openai_api_key_here
```

> 🧪 Note: If you don’t have an OpenAI key, the app automatically uses a **mock classification module** for testing.

---

## ▶️ Run the App Locally

```bash
npm run dev
```

Then open your browser and go to:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 Mock Mode (Without OpenAI Key)

If your OpenAI key has expired or limits are reached,
the classifier automatically switches to **mock mode**,
where example categories are generated locally.

---

## 🧑‍💻 Author
**Bhakthi Shetty**
