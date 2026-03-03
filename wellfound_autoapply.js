// ============================================================
//  Wellfound Auto-Apply Script
//  Target: SDE-1 / Junior / Associate Engineer roles (0-2 YOE)
//
//  BEFORE RUNNING:
//  1. Update the CONFIG section with your details
//  2. Update the applicationText with your own cover letter
//  3. Paste the entire script into the browser console on
//     https://wellfound.com/jobs and press Enter
// ============================================================

(async () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const waitForElement = async (selector, timeout = 5000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const el = document.querySelector(selector);
      if (el) return el;
      await delay(100);
    }
    return null;
  };

  // ============================================================
  // CONFIG -- Update this section with your own details
  // ============================================================
  const CONFIG = {
    name: "Your Full Name",
    college: "Your College Name (Graduating Month Year)",
    currentRole: "Your Current Role (e.g. Software Developer Intern at XYZ)",

    // Role keywords used to confirm a title looks like a job title (not a company name)
    targetRoleTitles: [
      "engineer", "developer", "sde", "software", "backend",
      "frontend", "full stack", "fullstack", "associate", "junior",
    ],

    // Roles to always skip -- senior / managerial titles only
    excludedTitles: [
      "senior", "staff", "principal", "lead", "manager",
      "director", "vp", "head of", "architect",
    ],

    github: "https://github.com/YOUR_USERNAME",
    linkedin: "https://www.linkedin.com/in/YOUR_USERNAME",
    portfolio: "https://your-portfolio.vercel.app",
  };

  // ============================================================
  // COVER LETTER -- Replace the placeholder lines with your content
  // ============================================================
  const applicationText = `Hi,

I am ${CONFIG.name}, a final-year B.Tech (CSE) student at ${CONFIG.college}, currently working as a ${CONFIG.currentRole}.

Here is a quick snapshot of what I bring:

[POINT 1 -- Describe your strongest experience]
[POINT 2 -- Second strongest point]
[POINT 3 -- Notable project or AI/ML work]
[POINT 4 -- Any other relevant experience]

Tech Stack:
  - Backend: [Your backend skills]
  - Frontend: [Your frontend skills]
  - Databases: [Your database skills]
  - Cloud/DevOps: [Cloud and DevOps tools]

Achievements:
  - [Competitive programming rank or rating]
  - [Number of DSA problems solved]
  - [Any certifications]

Links:
  GitHub: ${CONFIG.github}
  LinkedIn: ${CONFIG.linkedin}
  Portfolio: ${CONFIG.portfolio}

I am actively looking for full-time SDE-1 / Junior Engineer roles. As a fresher with strong internship experience, I am eager to learn fast and contribute meaningfully from day one.

Looking forward to hearing from you!
Best,
${CONFIG.name}`;

  // ============================================================
  // ROLE FILTER -- Only skips clearly senior/managerial roles.
  // If the job title cannot be confidently read, the job is let
  // through so nothing is accidentally missed.
  // ============================================================
  const isRelevantJob = (jobCardEl) => {
    // Use the most specific selector first; fall back to data-test="JobListing" text
    const titleEl =
      jobCardEl.querySelector('[data-test="JobTitle"]') ||
      jobCardEl.querySelector('[class*="jobTitle"]') ||
      jobCardEl.querySelector('[class*="job-title"]') ||
      jobCardEl.querySelector('[class*="role"]');

    const title = (titleEl?.innerText || "").toLowerCase().trim();

    // If we cannot read a title (or what we read looks like a company name --
    // i.e. it has no spaces and no common role word), let it through.
    const looksLikeRoleTitle =
      title.includes(" ") ||
      CONFIG.targetRoleTitles.some((kw) => title.includes(kw));

    if (!title || !looksLikeRoleTitle) return true;

    // Only block roles that are explicitly senior / managerial
    const isExcluded = CONFIG.excludedTitles.some((kw) => title.includes(kw.toLowerCase()));
    if (isExcluded) {
      console.log(`Skipping senior/managerial role: "${titleEl?.innerText}"`);
      return false;
    }

    return true;
  };

  // ============================================================
  // RELOCATION HANDLER -- Fills the location dropdown if it appears
  // ============================================================
  const handleRelocationQuestion = async () => {
    try {
      const firstRadio = document.querySelector('input[name="qualification.location.action"]');
      if (firstRadio) {
        firstRadio.click();
        console.log("Selected relocation option");
      }

      const dropdownContainer = document.querySelector(
        "#form-input--qualification.location.locationId .select__control"
      );
      if (dropdownContainer) {
        dropdownContainer.click();
        console.log("Opened location dropdown");
        await delay(500);

        const firstOption = document.querySelector(".select__menu-list div");
        if (firstOption) {
          firstOption.click();
          console.log("Selected first location option");
        }

        await delay(2000);
        return true;
      } else {
        console.log("Location dropdown not found");
      }
    } catch (err) {
      console.log("Error while handling relocation question:", err);
    }
    return false;
  };

  // ============================================================
  // SKILL QUESTIONS -- Selects an honest answer for radio questions
  // For freshers: Intermediate (3 options) / Beginner (2 options)
  // ============================================================
  const handleCustomQuestions = () => {
    const allGroups = document.querySelectorAll('[data-test^="RadioGroup-customQuestionAnswers"]');
    allGroups.forEach((group) => {
      const options = group.querySelectorAll('input[type="radio"]');
      if (options.length === 3) {
        options[1].click(); // middle option -- typically "Intermediate"
        console.log("Selected Intermediate for skill question");
      } else if (options.length === 2) {
        options[0].click(); // first option -- typically "Beginner"
        console.log("Selected first option for skill question");
      } else {
        console.log("Unexpected number of radio options:", options.length);
      }
    });
  };

  // ============================================================
  // TEXTAREA FILL -- Works with React-controlled inputs
  // Standard textarea.value assignment does not trigger React onChange,
  // so the native setter is used to force the event properly.
  // ============================================================
  const fillTextarea = (textarea, text) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(textarea, text);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.dispatchEvent(new Event("change", { bubbles: true }));
  };

  // ============================================================
  // STATE
  // ============================================================
  let appliedCount = 0;
  let skippedCount = 0;
  let filteredCount = 0;
  let scrollCount = 0;
  let processedButtons = new Set();

  console.log("Wellfound Auto-Apply started");
  console.log(`Targeting SDE-1 / Junior / Associate roles -- max ${CONFIG.maxYOE} YOE`);

  // ============================================================
  // BATCH PROCESSOR -- Processes all visible job cards on the page
  // ============================================================
  const processBatch = async () => {
    const allCards = [...document.querySelectorAll('[data-test="StartupResult"]')];
    const allButtons = [...document.querySelectorAll('button[data-test="LearnMoreButton"]')];

    let eligibleButtons = [];
    allButtons.forEach((btn, idx) => {
      if (processedButtons.has(btn)) return;
      const card =
        allCards[idx] ||
        btn.closest('[data-test="StartupResult"]') ||
        btn.parentElement;

      if (isRelevantJob(card)) {
        eligibleButtons.push(btn);
      } else {
        processedButtons.add(btn);
        filteredCount++;
      }
    });

    if (eligibleButtons.length === 0) return false;

    for (let i = 0; i < eligibleButtons.length; i++) {
      const learnMoreBtn = eligibleButtons[i];
      processedButtons.add(learnMoreBtn);

      learnMoreBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      await delay(500);

      learnMoreBtn.click();
      console.log(`[${appliedCount + skippedCount + 1}] Opening job modal...`);

      const applyBtn = await waitForElement(
        'button[data-test="JobDescriptionSlideIn--SubmitButton"]'
      );

      if (!applyBtn) {
        console.log("Modal did not load -- skipping");
        skippedCount++;
        continue;
      }

      // If apply is disabled, attempt to handle the questionnaire then skip
      if (applyBtn.disabled) {
        const filled = await handleRelocationQuestion();
        if (!filled) {
          console.log("Apply button disabled and no questionnaire handled -- skipping");
        }
        const closeBtn = await waitForElement('button[data-test="closeButton"]');
        if (closeBtn) closeBtn.click();
        skippedCount++;
        await delay(800);
        continue;
      }

      // Answer any skill-level radio questions
      handleCustomQuestions();

      // Fill the cover letter
      const textarea = document.querySelector("textarea:not([disabled])");
      if (textarea) {
        fillTextarea(textarea, applicationText);
        console.log("Cover letter filled");
      } else {
        console.log("No textarea found -- submitting without cover letter");
      }

      await delay(1500);

      // Submit the application
      applyBtn.click();
      await delay(4000); // intentional delay to avoid rate-limiting

      appliedCount++;
      console.log(`[${appliedCount}] Applied at ${new Date().toLocaleTimeString()}`);

      // Close the modal
      const closeBtn = await waitForElement('button[data-test="closeButton"]');
      if (closeBtn) {
        closeBtn.click();
        console.log("Modal closed");
      }

      await delay(2000);
    }

    return true;
  };

  // ============================================================
  // SCROLL LOOP -- Scrolls to load lazy-loaded job cards
  // ============================================================
  const maxScrolls = 15;
  while (scrollCount < maxScrolls) {
    const found = await processBatch();
    if (!found) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      console.log(`Scrolling to load more jobs (${scrollCount + 1}/${maxScrolls})...`);
      scrollCount++;
      await delay(3000);
    } else {
      scrollCount = 0;
    }
  }

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log("--- Run complete ---");
  console.log(`Applied  : ${appliedCount}`);
  console.log(`Skipped  : ${skippedCount}`);
  console.log(`Filtered : ${filteredCount}  (senior / irrelevant roles excluded)`);
  console.log(`Total    : ${appliedCount + skippedCount + filteredCount}`);
})();
