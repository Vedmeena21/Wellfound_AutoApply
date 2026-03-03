// ============================================================
//  Wellfound Auto-Apply Script
//  ⚠️  BEFORE RUNNING: Update the CONFIG section below
//      with YOUR details. Do NOT use someone else's info.
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
  // 🔧 CONFIG — CHANGE THIS TO YOUR PROFILE
  // ============================================================
  const CONFIG = {
    // --- Your Details ---
    name: "Your Full Name",
    college: "Your College Name (Graduating Month Year)",
    currentRole: "Your Current Role (e.g. Software Developer Intern at XYZ)",

    // --- Target Roles (script will SKIP jobs that don't match) ---
    // Add keywords that should appear in the job title
    targetRoleTitles: [
      "software engineer",
      "sde",
      "software developer",
      "backend engineer",
      "full stack engineer",
      "associate engineer",
      "junior engineer",
      "junior developer",
      "engineer i",
      "sde-1",
      "sde 1",
    ],

    // --- Jobs to SKIP (even if title matches) ---
    excludedTitles: [
      "senior",
      "staff",
      "principal",
      "lead",
      "manager",
      "director",
      "vp",
      "head of",
      "architect",
      "10+",
      "8+",
      "7+",
      "5+",
    ],

    // --- Max YOE accepted (jobs requiring more will be skipped) ---
    // Reads the job card's experience text and skips if > this value
    maxYOE: 2,

    // --- Your Links ---
    github: "https://github.com/YOUR_USERNAME",
    linkedin: "https://www.linkedin.com/in/YOUR_USERNAME",
    portfolio: "https://your-portfolio.vercel.app",
  };

  // ============================================================
  // 📝 COVER LETTER — CHANGE THIS TO YOUR OWN TEXT
  // ============================================================
  const applicationText = `Hi,

I'm ${CONFIG.name}, a final-year B.Tech (CSE) student at ${CONFIG.college}, currently working as a ${CONFIG.currentRole}.

Here's a quick snapshot of what I bring:

[POINT 1 — Your strongest experience, e.g. "Built and secured 10+ production REST APIs using Java and Spring Boot"]
[POINT 2 — Second strongest, e.g. "Designed PostgreSQL schemas with 8+ normalized tables"]
[POINT 3 — AI/ML or notable project, e.g. "Built LLM chatbot using RAG and LangChain"]
[POINT 4 — Any other relevant experience]

Tech Stack:
  • Backend: [Your backend skills]
  • Frontend: [Your frontend skills]
  • Databases: [Your DB skills]
  • Cloud/DevOps: [Cloud tools you use]

Achievements:
  • [Competitive programming rank or rating]
  • [LeetCode / coding problems solved]
  • [Any certifications]

🔗 Links:
  GitHub: ${CONFIG.github}
  LinkedIn: ${CONFIG.linkedin}
  Portfolio: ${CONFIG.portfolio}

I'm actively looking for full-time SDE-1 / Junior Engineer roles. As a fresher with strong internship experience, I'm eager to grow fast and contribute meaningfully from day one.

Looking forward to hearing from you!
Best,
${CONFIG.name}`;

  // ============================================================
  // 🔍 ROLE FILTER — Checks if a job card is relevant
  // ============================================================
  const isRelevantJob = (jobCardEl) => {
    const titleEl =
      jobCardEl.querySelector('[data-test="JobTitle"]') ||
      jobCardEl.querySelector('h2') ||
      jobCardEl.querySelector('h3') ||
      jobCardEl.querySelector('[class*="title"]');

    const title = (titleEl?.innerText || "").toLowerCase();
    if (!title) return true; // can't determine — let it through

    // Skip if excluded keywords found in title
    const isExcluded = CONFIG.excludedTitles.some((kw) => title.includes(kw.toLowerCase()));
    if (isExcluded) {
      console.log(`%c⏭️ Skipping senior/irrelevant role: "${titleEl?.innerText}"`, "color: gray");
      return false;
    }

    // Must match at least one target role keyword
    const isTarget = CONFIG.targetRoleTitles.some((kw) => title.includes(kw.toLowerCase()));
    if (!isTarget) {
      console.log(`%c⏭️ Skipping non-target role: "${titleEl?.innerText}"`, "color: gray");
      return false;
    }

    // Check YOE if mentioned in the card
    const cardText = (jobCardEl?.innerText || "").toLowerCase();
    const yoeMatch = cardText.match(/(\d+)\+?\s*(years?|yrs?|yoe)/);
    if (yoeMatch) {
      const requiredYOE = parseInt(yoeMatch[1]);
      if (requiredYOE > CONFIG.maxYOE) {
        console.log(`%c⏭️ Skipping ${requiredYOE}+ YOE role: "${titleEl?.innerText}"`, "color: gray");
        return false;
      }
    }

    return true;
  };

  // ============================================================
  // 📍 Handle relocation dropdown if it appears in the modal
  // ============================================================
  const handleRelocationQuestion = async () => {
    try {
      const firstRadio = document.querySelector('input[name="qualification.location.action"]');
      if (firstRadio) {
        firstRadio.click();
        console.log("%c📍 Selected relocation option", "color: orange");
      }

      const dropdownContainer = document.querySelector(
        "#form-input--qualification.location.locationId .select__control"
      );
      if (dropdownContainer) {
        dropdownContainer.click();
        console.log("%c🔽 Opened location dropdown", "color: orange");
        await delay(500);

        const firstOption = document.querySelector(".select__menu-list div");
        if (firstOption) {
          firstOption.click();
          console.log("%c🌍 Selected first location in dropdown", "color: orange");
        }

        await delay(2000);
        return true;
      } else {
        console.log("%c⚠️ Location dropdown not found", "color: gray");
      }
    } catch (err) {
      console.log("%c❌ Error handling relocation question", "color: red", err);
    }
    return false;
  };

  // ============================================================
  // 🎯 Handle skill-level radio questions honestly
  //    Fresher/SDE-1 target: Beginner (2-opt) / Intermediate (3-opt)
  // ============================================================
  const handleCustomQuestions = () => {
    const allGroups = document.querySelectorAll('[data-test^="RadioGroup-customQuestionAnswers"]');
    allGroups.forEach((group) => {
      const options = group.querySelectorAll('input[type="radio"]');
      if (options.length === 3) {
        options[1].click(); // Intermediate — honest for fresher with internship experience
        console.log("%c🎯 Selected Intermediate for 3-option skill question", "color: dodgerblue");
      } else if (options.length === 2) {
        options[0].click(); // Beginner — safe and honest for SDE-1 fresher
        console.log("%c🎯 Selected Beginner for 2-option question", "color: dodgerblue");
      } else {
        console.log("%c⚠️ Unexpected number of options: " + options.length, "color: gray");
      }
    });
  };

  // ============================================================
  // ✏️ Fill textarea — works with React-controlled inputs
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
  // ⚙️ Main batch processor
  // ============================================================
  let appliedCount = 0;
  let skippedCount = 0;
  let filteredCount = 0;
  let scrollCount = 0;
  let processedButtons = new Set();

  console.log(`%c🚀 Wellfound Auto-Apply Started`, "color: green; font-weight: bold; font-size: 14px;");
  console.log(`%c🎯 Targeting: SDE-1 / Junior / Associate roles (0–${CONFIG.maxYOE} YOE)`, "color: #9C27B0; font-weight: bold;");

  const processBatch = async () => {
    // Get all job cards visible on the page
    const allCards = [...document.querySelectorAll('[data-test="StartupResult"]')];
    const allButtons = [...document.querySelectorAll('button[data-test="LearnMoreButton"]')];

    // Pair each button with its card for relevance filtering
    let eligibleButtons = [];
    allButtons.forEach((btn, idx) => {
      if (processedButtons.has(btn)) return;
      const card = allCards[idx] || btn.closest('[data-test="StartupResult"]') || btn.parentElement;
      if (isRelevantJob(card)) {
        eligibleButtons.push(btn);
      } else {
        processedButtons.add(btn); // mark as processed so we don't re-check
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
      console.log(
        `%c🔍 [${appliedCount + skippedCount + 1}] Opened job modal...`,
        "color: blue"
      );

      const applyBtn = await waitForElement(
        'button[data-test="JobDescriptionSlideIn--SubmitButton"]'
      );
      if (!applyBtn) {
        console.log("%c❌ Modal failed to load — skipping", "color: red");
        skippedCount++;
        continue;
      }

      // If apply button is disabled, try to handle questionnaire or skip
      if (applyBtn.disabled) {
        const isFormFilled = await handleRelocationQuestion();
        if (isFormFilled) {
          console.log("%c✅ Relocation questionnaire filled", "color: green");
        } else {
          console.log("%c⏭️ Apply button disabled — skipping this job", "color: gray");
        }
        const closeBtn = await waitForElement('button[data-test="closeButton"]');
        if (closeBtn) closeBtn.click();
        skippedCount++;
        await delay(800);
        continue;
      }

      // Handle custom skill-level questions
      handleCustomQuestions();

      // Fill the cover letter
      const textarea = document.querySelector("textarea:not([disabled])");
      if (textarea) {
        fillTextarea(textarea, applicationText);
        console.log(`%c📝 Cover letter autofilled`, "color: purple");
      } else {
        console.log("%c⚠️ No textarea found — applying without cover letter", "color: orange");
      }

      await delay(1500);

      // Click Apply
      applyBtn.click();
      await delay(4000); // generous delay — avoids "access denied" rate-limiting

      appliedCount++;
      console.log(
        `%c✅ [${appliedCount}] Applied at ${new Date().toLocaleTimeString()}`,
        "color: teal; font-weight: bold;"
      );

      // Close modal
      const closeBtn = await waitForElement('button[data-test="closeButton"]');
      if (closeBtn) {
        closeBtn.click();
        console.log("%c❎ Modal closed", "color: crimson");
      }

      await delay(2000);
    }

    return true;
  };

  // ============================================================
  // 📜 Scroll loop — loads all jobs on the page
  // ============================================================
  const maxScrolls = 15;
  while (scrollCount < maxScrolls) {
    const found = await processBatch();
    if (!found) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      console.log(
        `%c📜 Scrolling to load more jobs... (${scrollCount + 1}/${maxScrolls})`,
        "color: darkcyan"
      );
      scrollCount++;
      await delay(3000);
    } else {
      scrollCount = 0;
    }
  }

  // ============================================================
  // 🎉 Final Summary
  // ============================================================
  console.log("%c🎉 Auto-apply finished!", "color: limegreen; font-size: 16px; font-weight: bold;");
  console.log(`%c📌 Jobs Applied  : ${appliedCount}`, "color: #4CAF50; font-weight: bold;");
  console.log(`%c📌 Jobs Skipped  : ${skippedCount}`, "color: #FF9800; font-weight: bold;");
  console.log(`%c📌 Jobs Filtered : ${filteredCount} (senior/irrelevant roles)`, "color: #9E9E9E; font-weight: bold;");
  console.log(`%c📌 Total Seen    : ${appliedCount + skippedCount + filteredCount}`, "color: #2196F3; font-weight: bold;");
})();
