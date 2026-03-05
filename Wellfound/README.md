# Wellfound Auto-Apply Script

Automates job applications on [Wellfound (AngelList)](https://wellfound.com/jobs).

Works for any role, any experience level — fresher, mid-level, or senior. You control what gets applied to and what gets skipped through a simple config block. Setup takes under 5 minutes.

---

## Disclaimer

This script is for personal use only. Update the `CONFIG` and cover letter with your own details before running. Do not use someone else's information. Use responsibly — the script includes built-in delays to reduce the risk of rate-limiting.

---

## Step 1 — Create an Account

Go to [wellfound.com](https://wellfound.com) and sign up. Using **Continue with LinkedIn** auto-fills your profile and saves time.

![Wellfound homepage](images/01_homepage.png)

---

## Step 2 — Complete Your Profile

Go to [wellfound.com/u/edit](https://wellfound.com/u/edit). Fill in your name, headline, experience, education, and links. A complete profile increases response rates from recruiters.

![Profile edit page](images/03_profile_edit.png)

---

## Step 3 — Set Job Preferences

On the same edit page, scroll down to **Preferences**. Set your target role, job type, location, and expected salary so Wellfound surfaces the right listings for you.

![Job preferences](images/05_job_preferences.png)

---

## Step 4 — Check Your Public Profile

Visit your public profile to confirm everything looks complete before running the script.

![Public profile](images/06_profile_complete.png)

---

## Step 5 — Search for Your Target Jobs and Set Filters

Go to [wellfound.com/jobs](https://wellfound.com/jobs). In the search bar, type the role you are targeting — for example `Software Engineer`, `Backend Developer`, or `Full Stack Engineer`.

Then use the filter panel to narrow down by:
- **Experience level** (Entry Level, Mid Level, etc.)
- **Location** (Remote, India, US, etc.)
- **Job type** (Full-time)

Do this before running the script. The script applies to everything visible on the filtered page — the more focused your filters, the better your results.

![Jobs page](images/07_jobs_page.png)

Example — searching "Software Engineer" with experience and location filters applied:

![Filtering jobs by role and experience](images/04_filter_jobs.png)

---

## Step 6 — Customize the Script

Open `wellfound_autoapply.js` and update the `CONFIG` block at the top with your details:

```javascript
const CONFIG = {
  name: "Your Full Name",
  college: "Your College Name (Graduating Month Year)",
  currentRole: "Your Current Role (e.g. Software Developer Intern at XYZ)",
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://www.linkedin.com/in/YOUR_USERNAME",
  portfolio: "https://your-portfolio.com",

  // Titles with any of these words will be skipped.
  //
  // Fresher / Junior:
  //   ["senior", "staff", "principal", "lead", "manager", "director", "vp", "head of", "architect"]
  //
  // Mid-level (skip only management):
  //   ["manager", "director", "vp", "head of"]
  //
  // Apply to everything:
  //   []
  excludedTitles: [
    "senior", "staff", "principal", "lead", "manager",
    "director", "vp", "head of", "architect",
  ],
};
```

Then scroll down and update the `applicationText` cover letter — replace every `[placeholder]` line with your own content.

---

## Step 7 — Open the Browser Console

On the Wellfound jobs page, press **`Cmd + Option + J`** (macOS) or **`Ctrl + Shift + J`** (Windows/Linux). Click the **Console** tab.

![DevTools console open](images/08_devtools_console.png)

> If Chrome shows a security warning about pasting, type `allow pasting` in the console and press Enter first.

---

## Step 8 — Paste and Run the Script

Copy the entire contents of `wellfound_autoapply.js`. Click inside the console next to the `>` prompt, paste, and press **Enter**.

![Script pasted in console](images/10_script_pasted.png)

Do not switch tabs or scroll manually while the script is running — it controls the page on its own.

---

## Step 9 — Watch It Run

The script scrolls through jobs, opens each modal, fills the cover letter, answers skill questions, and clicks Apply. You can follow along in the console in real time.

![Script running in console](images/11_script_running.png)

When the script finishes processing all visible jobs, it prints a summary:

![Final summary in console](images/12_final_summary.png)

---

## How the Filter Works

The filter reads the job title **directly from the open modal** — not from the job card on the listing page. This is more reliable because the card-level DOM elements on Wellfound often return company names instead of role titles.

- Any title containing a word from `excludedTitles` → modal closed, job skipped
- `excludedTitles: []` → applies to every visible job with no filtering at all

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Chrome shows paste warning | Type `allow pasting` in the console first, then paste |
| Cover letter not filling | The React-compatible native setter is already built in — confirm you copied the full script |
| "Access denied" after a few jobs | Wellfound rate-limiting — wait 5–10 minutes and re-run |
| Script finishes before all jobs | Increase `maxScrolls` from `15` to `25` near the bottom of the script |
| Apply button always disabled | Your Wellfound profile is likely incomplete — go back to Steps 2–4 |
| A senior role slipped through | Add that keyword to `excludedTitles` in `CONFIG` |

---

## Repository Structure

```
Wellfound_AutoApply/
├── Wellfound/
│   ├── wellfound_autoapply.js    Main script — update CONFIG and cover letter before use
│   ├── images/                   Screenshots used in this README
│   └── README.md                 This file
└── README.md                     Root index linking both bots
```

> Never commit your resume or personal credentials to a public repository.
