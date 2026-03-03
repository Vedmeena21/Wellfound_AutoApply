# Wellfound Auto-Apply Script

Automates job applications on [Wellfound (AngelList)](https://wellfound.com/jobs). Applies to all visible job listings and skips only clearly senior or managerial roles (Senior, Staff, Lead, Manager, etc.).

Built for freshers and early-career engineers. Setup takes under 5 minutes.

---

## Disclaimer

This script is for personal use only. Update the CONFIG and cover letter with your own details before running. Do not use someone else's information. Use responsibly — the script includes built-in delays to reduce the risk of rate-limiting.

---

## Step 1 — Create an Account

Go to [wellfound.com](https://wellfound.com) and sign up. Using **Continue with LinkedIn** auto-fills your profile and saves time.

![Wellfound homepage](screenshots/01_homepage.png)

---

## Step 2 — Complete Your Profile

Go to [wellfound.com/u/edit](https://wellfound.com/u/edit). Fill in your name, headline, college, experience, and links. A complete profile gets more visibility.

![Profile edit page](screenshots/03_profile_edit.png)

---

## Step 3 — Set Job Preferences

On the same profile edit page, scroll to the **Preferences** section. Set your role, job type (Full-time), location, and expected salary.

![Job preferences](screenshots/05_job_preferences.png)

---

## Step 4 — Check Your Public Profile

Visit your public profile to confirm everything looks good before applying anywhere.

![Public profile](screenshots/06_profile_complete.png)

---

## Step 5 — Open the Jobs Page and Apply Filters

Go to [wellfound.com/jobs](https://wellfound.com/jobs). Use the filters to narrow down by role, experience, and location before running the script.

![Jobs page with filters](screenshots/07_jobs_page.png)

---

## Step 6 — Customize the Script

Open `wellfound_autoapply.js` and update the `CONFIG` block at the top with your details:

```javascript
const CONFIG = {
  name: "Your Full Name",
  college: "Your College Name (Graduating Month Year)",
  currentRole: "Your Current Role at Company",
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://www.linkedin.com/in/YOUR_USERNAME",
  portfolio: "https://your-portfolio.vercel.app",

  // Used only to detect if a card shows a role title vs a company name
  // Add/remove keywords to match your target roles
  targetRoleTitles: [
    "engineer", "developer", "sde", "software", "backend",
    "frontend", "full stack", "fullstack", "associate", "junior",
  ],

  // Roles containing any of these will always be skipped
  excludedTitles: [
    "senior", "staff", "principal", "lead", "manager",
    "director", "vp", "head of", "architect",
  ],
};
```

Then update the cover letter (the `applicationText` variable) by replacing all `[POINT X -- ...]` lines with your own experience.

---

## Step 7 — Open the Browser Console

Press **`Cmd + Option + J`** on macOS or **`Ctrl + Shift + J`** on Windows. Click the **Console** tab.

![DevTools console open](screenshots/08_devtools_console.png)

> If Chrome shows a paste warning, type `allow pasting` into the console and press Enter first.

---

## Step 8 — Paste and Run the Script

Select all the code in `wellfound_autoapply.js`, copy it, click inside the console next to the `>` prompt, paste, and press **Enter**.

![Script pasted in console](screenshots/10_script_pasted.png)

Do not switch tabs or scroll manually while the script is running.

---

## Step 9 — Watch It Run

The script will open each job modal, fill your cover letter, and click Apply. When it finishes you'll see a summary:

```
Wellfound Auto-Apply started
[1] Opening job modal...
Cover letter filled
[1] Applied at 10:23:04
Modal closed
[2] Opening job modal...
...
--- Run complete ---
Applied  : 24
Skipped  : 3
Total    : 27
```

*(Screenshots 11 and 12 — script running and final summary — coming soon)*

---

## How the Filter Works

The script only skips roles where the job title **contains a senior/managerial keyword** (Senior, Staff, Lead, Manager, Director, VP, etc.). Everything else — including roles where the title cannot be confidently read — is applied to. This ensures nothing gets accidentally missed.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Chrome shows paste warning | Type `allow pasting` in the console first |
| Cover letter not filling | Confirm you saved the script after editing — the React-compatible native setter is already used |
| "Access denied" after a few jobs | Wait 5-10 minutes and re-run |
| Script finishes too quickly | Increase `maxScrolls` from `15` to `25` near the bottom of the script |
| Apply button always disabled | Your Wellfound profile may be incomplete — go back to Steps 2-4 |

---

## Repository Structure

```
Wellfound_AutoApply/
├── wellfound_autoapply.js    Main script — update CONFIG and cover letter before use
├── screenshots/              Screenshots used in this README
└── README.md                 This file
```

> The resume file is excluded from this repository via .gitignore. Never commit a personal resume to a public repository.
