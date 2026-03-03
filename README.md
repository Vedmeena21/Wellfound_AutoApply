# 🚀 Wellfound Auto-Apply Script

> Automate job applications on [Wellfound (AngelList)](https://wellfound.com/jobs) for **SDE-1 / Junior / Associate Engineer** roles (0–2 YOE).  
> Built for freshers and early-career engineers. **Takes ~30 seconds to set up.**

---

## ⚠️ Important Disclaimer

- This script is for **personal use only**.
- You **must customize** the `CONFIG` and cover letter with **your own details** before running.
- Do **not** use someone else's profile text or links.
- Use responsibly — excessive automation may get your account flagged by Wellfound.

---

## 📋 Table of Contents

1. [What This Script Does](#-what-this-script-does)
2. [Step 1 — Create a Wellfound Account](#-step-1--create-a-wellfound-account)
3. [Step 2 — Complete Your Profile](#-step-2--complete-your-profile)
4. [Step 3 — Customize the Script](#-step-3--customize-the-script)
5. [Step 4 — Open the Right Jobs Page](#-step-4--open-the-right-jobs-page)
6. [Step 5 — Open Browser Console](#-step-5--open-browser-console)
7. [Step 6 — Run the Script](#-step-6--run-the-script)
8. [What You'll See in Console](#-what-youll-see-in-console)
9. [Role & YOE Filtering — How It Works](#-role--yoe-filtering--how-it-works)
10. [Troubleshooting](#-troubleshooting)
11. [FAQ](#-faq)

---

## ✅ What This Script Does

| Feature | Details |
|---------|---------|
| 🎯 **Role Filtering** | Only applies to SDE-1, Junior, Associate, Software Engineer roles |
| 🚫 **Excludes Senior Roles** | Automatically skips Senior, Staff, Principal, Lead, Manager titles |
| 📅 **YOE Filter** | Skips jobs requiring more than 2 years of experience |
| 📝 **Auto Cover Letter** | Fills your customized cover letter in every application |
| 🎚️ **Skill Questions** | Answers skill-level radio questions (Intermediate for freshers) |
| 📍 **Relocation Questions** | Handles location preference dropdowns automatically |
| 📜 **Auto Scroll** | Scrolls the page to load all available job listings |
| 📊 **Summary Report** | Shows Applied / Skipped / Filtered counts at the end |

---

## 👤 Step 1 — Create a Wellfound Account

1. Go to **[wellfound.com](https://wellfound.com)**
2. Click **"Sign Up"** in the top right corner

   > 💡 **Tip:** Use **"Continue with LinkedIn"** — it auto-fills your profile from LinkedIn, saving you time.

3. Select **"I'm a candidate looking for a job"**
4. Verify your email if required

---

## 🧑‍💼 Step 2 — Complete Your Profile

A complete profile = more applications accepted. Fill **every** field.

### 2.1 — Basic Info
- Go to **[wellfound.com/u/edit](https://wellfound.com/u/edit)**
- Fill in:
  - ✅ Full Name
  - ✅ Profile photo
  - ✅ One-line headline (e.g. `"Final Year CS Student | Java · Spring Boot · React"`)
  - ✅ Location (your city)
  - ✅ LinkedIn URL
  - ✅ GitHub URL
  - ✅ Portfolio URL (if any)

### 2.2 — Work Experience
- Click **"Add Position"**
- Add your **internships** with title, company, dates, and 2–3 bullet points of what you did
- Example:
  ```
  Software Developer Intern — Mercer | Mettl (Jan 2026 – Present)
  • Built 10+ REST APIs using Java & Spring Boot secured with Spring Security
  • Designed PostgreSQL schemas across 8+ normalized tables
  ```

### 2.3 — Education
- Add your **college**, degree, branch, and graduation year

### 2.4 — Skills
- Add **all relevant skills** — these are used for matching:
  ```
  Java, Spring Boot, Spring Security, Python, FastAPI, React.js,
  PostgreSQL, MySQL, AWS, Docker, Git, LangChain, REST API, Node.js
  ```

### 2.5 — Upload Resume
- Click **"Resume"** section → **"Upload Resume"**
- Upload your latest PDF resume
- ⚠️ **Do NOT commit your resume to this GitHub repo**

### 2.6 — Job Preferences
| Field | What to Fill |
|-------|-------------|
| **Job Type** | Full-time |
| **Role** | Software Engineer |
| **Experience Level** | Entry Level / Junior |
| **Location** | Your preferred cities (e.g. Bangalore, Gurgaon, Hyderabad) + Remote |
| **Expected Salary** | ₹12–18 LPA (or your target range) |
| **Availability** | Immediate / Your joining date |

### 2.7 — Verify Profile Completeness
- Your profile progress bar should show **100%**
- Go to [wellfound.com/u/YOUR_USERNAME](https://wellfound.com/u/) to preview how recruiters see you

---

## 🔧 Step 3 — Customize the Script

> ⚠️ **This is the most important step. Do NOT skip this.**

Open `wellfound_autoapply.js` and find the `CONFIG` section at the top:

```javascript
const CONFIG = {
  name: "Your Full Name",                        // ← Change this
  college: "Your College (Graduating Month Year)", // ← Change this
  currentRole: "Your Current Role at XYZ",        // ← Change this

  targetRoleTitles: [                             // ← Add/remove role keywords
    "software engineer", "sde", "backend engineer", ...
  ],

  excludedTitles: [                               // ← Roles to skip
    "senior", "staff", "principal", ...
  ],

  maxYOE: 2,                                      // ← Max years of experience required

  github: "https://github.com/YOUR_USERNAME",     // ← Change this
  linkedin: "https://www.linkedin.com/in/YOUR_USERNAME", // ← Change this
  portfolio: "https://your-portfolio.vercel.app", // ← Change this
};
```

Then update the **cover letter** (the `applicationText` variable) below the CONFIG:

```javascript
const applicationText = `Hi,

I'm ${CONFIG.name}, a final-year B.Tech student at ...

[POINT 1 — Replace with your strongest experience]
[POINT 2 — Replace with your second strongest]
...
```

**Replace all `[POINT X — ...]` placeholders with your actual experience.**

---

## 🌐 Step 4 — Open the Right Jobs Page

Go to this URL in **Google Chrome** (filtered for SDE-1 / fresher roles):

```
https://wellfound.com/jobs?role=software-engineer&jobType=full-time
```

Or manually filter on [wellfound.com/jobs](https://wellfound.com/jobs):

| Filter | Value |
|--------|-------|
| **Role** | Software Engineer / Backend Engineer |
| **Job Type** | Full-time |
| **Experience** | 0–2 years |
| **Location** | Your preferred cities or Remote |

Make sure you are **logged in** and can see job cards on the page before proceeding.

---

## 🛠️ Step 5 — Open Browser Console

### On macOS (Chrome):
Press: **`Cmd ⌘ + Option ⌥ + J`**

### On Windows (Chrome):
Press: **`Ctrl + Shift + J`**

The DevTools panel opens at the bottom of your browser:

```
┌────────────────────────────────────────────────────────────────┐
│  Elements   Console   Sources   Network   Performance  ...     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  >  |  ← Click here — this is where you paste the script      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

> ✅ Make sure you're on the **Console** tab (not Elements, Sources, etc.)

### ⚠️ Allow Pasting (First Time Only)

Chrome blocks pasting by default. When you first try to paste, you may see:

> *"Warning: Don't paste code you don't understand into the DevTools Console..."*

If you see this, **type exactly this** into the console and press Enter:
```
allow pasting
```
You'll see a confirmation. Now you can paste the script.

---

## ▶️ Step 6 — Run the Script

1. Open `wellfound_autoapply.js` in any text editor or VS Code
2. Press **`Cmd + A`** (Mac) / **`Ctrl + A`** (Windows) to select all
3. Press **`Cmd + C`** / **`Ctrl + C`** to copy
4. Click inside the Console (next to the `>` prompt)
5. Press **`Cmd + V`** / **`Ctrl + V`** to paste
6. Press **`Enter`**

> ⚠️ **Do NOT** switch tabs, click elsewhere, or scroll manually while the script runs.

---

## 📺 What You'll See in Console

```
🚀 Wellfound Auto-Apply Started
🎯 Targeting: SDE-1 / Junior / Associate roles (0–2 YOE)

⏭️ Skipping senior/irrelevant role: "Senior Backend Engineer"
⏭️ Skipping 5+ YOE role: "Staff Software Engineer"
🔍 [1] Opened job modal...
📝 Cover letter autofilled
🎯 Selected Intermediate for 3-option skill question
✅ [1] Applied at 10:23:04
❎ Modal closed

🔍 [2] Opened job modal...
📝 Cover letter autofilled
✅ [2] Applied at 10:23:11
❎ Modal closed

📜 Scrolling to load more jobs... (1/15)

🎉 Auto-apply finished!
📌 Jobs Applied  : 18
📌 Jobs Skipped  : 3
📌 Jobs Filtered : 11 (senior/irrelevant roles)
📌 Total Seen    : 32
```

---

## 🎯 Role & YOE Filtering — How It Works

The script reads **each job card's title and text** before opening the modal:

### ✅ Roles it WILL apply to:
- Software Engineer, SDE, SDE-1, SDE 1
- Backend Engineer, Full Stack Engineer
- Associate Engineer, Junior Engineer, Junior Developer
- Engineer I

### ❌ Roles it WILL skip automatically:
- Senior / Staff / Principal / Lead Engineer
- Engineering Manager, Director, VP, Head of Engineering
- Any role mentioning 5+, 7+, 8+, 10+ years

### 📅 YOE Filter:
If the job card text contains something like `"3+ years"` or `"5 years experience"`, and that number is **greater than `maxYOE` (default: 2)**, the job is automatically skipped.

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| **"allow pasting" warning** | Type `allow pasting` in console first, then paste |
| **Cover letter not filling** | The React fix is already built in — make sure you saved your edits to the script |
| **"Access Denied" after ~5 jobs** | Wellfound rate-limits bots. Wait 5–10 mins, then re-run |
| **Modal not loading** | Slow internet — increase `waitForElement` timeout from `5000` to `8000` |
| **Script stops early** | Increase `maxScrolls` from `15` to `25` if you have many jobs |
| **All jobs showing as filtered** | Check your `targetRoleTitles` — add more keywords matching your search results |
| **Apply button always disabled** | Your Wellfound profile may be incomplete — go back to Step 2 |

---

## ❓ FAQ

**Q: Will this get my account banned?**  
A: Wellfound doesn't explicitly ban for this, but using large delays (already built in) reduces risk. Don't run it for 100+ jobs in one session.

**Q: What if a job requires answering custom questions (not just radio buttons)?**  
A: The script will skip jobs where the Apply button remains disabled after handling the questionnaire.

**Q: Can I run this on multiple pages?**  
A: Yes — navigate to the next page and run the script again. `processedButtons` resets each run.

**Q: Should I change `maxYOE`?**  
A: If you have 1+ years of internship experience, keeping it at `2` is fine. Don't set it higher than `3` for early-career targeting.

**Q: The script applied to a senior role I didn't want!**  
A: The job title on the card may not have had a keyword like "senior". You can add more keywords to `excludedTitles` in `CONFIG`.

---

## 📁 Repository Structure

```
Wellfound_AutoApply/
├── wellfound_autoapply.js   # The main auto-apply script (customize before use)
└── README.md                # This file
```

> ⚠️ **Resume is intentionally NOT included in this repo.** Never commit your personal resume to a public GitHub repository.

---

## 🌟 If This Helped You

- ⭐ Star this repo
- 🍴 Fork it and customize it for your own profile
- 🐛 Found a bug? Open an issue!

---

*Made for early-career engineers grinding the job hunt. Good luck! 💪*
