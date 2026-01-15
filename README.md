# AI Video SaaS – MVP Feature List

**Goal of MVP:**
Build the smallest possible version that:

* You can use yourself immediately
* Can accept paying users
* Proves demand
* Is technically scalable

---

## 🎯 MVP DEFINITION (NON-NEGOTIABLE)

The MVP is successful if:

* A user can go from **idea → AI-generated video**
* With **minimal clicks**
* With **clear usage limits**
* And **export YouTube-ready content**

Anything not listed below is  **NOT MVP** .

---

# 🧱 CORE MVP FEATURES (BUILD THESE ONLY)

## 1️⃣ Authentication & Accounts

**Status:** REQUIRED

### Features

* Email + password login
* Basic user profile
* One workspace per user

### Why

* Needed for subscriptions later
* Needed for usage limits

---

## 2️⃣ Subscription Tiers (Basic)

**Status:** REQUIRED (even if free-only at first)

### MVP Tiers

* Free
* Pro (logic only; payments can be enabled later)

### What to Implement Now

* Tier field on user
* Usage limits based on tier

❌ No Stripe UI yet if you want to move fast

---

## 3️⃣ Dashboard

**Status:** REQUIRED

### Features

* List of generated videos
* Status per video:
  * Draft
  * Generating
  * Ready
  * Failed

### Why

* User needs visibility
* You need debug clarity

---

## 4️⃣ Create Video (CORE VALUE)

**Status:** REQUIRED

### Input Options (MVP)

User must choose ONE:

#### Option A – AI Story Generator

User inputs:

* Topic / idea
* Tone
* Target length

Button: **Generate Story Scenes**

#### Option B – Manual Scenes

User inputs:

* Scene text (Visual + Voice)

Button: **Generate Video**

---

## 5️⃣ Scene Editor (VERY IMPORTANT)

**Status:** REQUIRED

### Features

* Editable scene list
* Each scene has:
  * Visual description
  * Narration text

### Why

* Human review gate
* Monetization-safe
* Prevents garbage output

---

## 6️⃣ AI Story Engine (CORE IP)

**Status:** REQUIRED

### Capabilities

* Generates:
  * Hook
  * Logical story arc
  * Scene pacing

### MVP Constraints

* One prompt template
* One model
* No fine-tuning yet

---

## 7️⃣ AI Video Generation Engine

**Status:** REQUIRED

### MVP Behavior

* Convert scenes → full video
* 16:9 only
* Single style preset

### Output

* MP4 video

---

## 8️⃣ AI Voiceover

**Status:** REQUIRED

### MVP Behavior

* One voice
* One language

---

## 9️⃣ Auto Subtitles

**Status:** REQUIRED

### MVP Behavior

* Burned-in captions OR
* Downloadable SRT

---

## 🔟 Shorts Generator (LIGHT MVP)

**Status:** REQUIRED (basic)

### MVP Scope

* 1 short per video
* AI summarizes content
* Vertical (9:16)

❌ No multi-short logic yet

---

## 1️⃣1️⃣ Export & Download

**Status:** REQUIRED

### Export Types

* Long video (MP4)
* Short video (MP4)
* Subtitle file (optional)

❌ No direct YouTube upload yet

---

# 🚫 NOT MVP (DO NOT BUILD YET)

* Mobile apps
* Team accounts
* Brand voice memory
* Multiple video styles
* Custom thumbnails
* YouTube API upload
* Analytics dashboards
* Marketplace
* API access

---

# 🧠 MVP USER FLOW (ONE SENTENCE)

**User logs in → enters idea → reviews scenes → clicks generate → downloads video + short.**

---

# ⏱️ MVP BUILD ESTIMATE

* Solo dev: 3–5 weeks
* Focused execution: 2–3 weeks

---

# ✅ MVP SUCCESS CRITERIA

* You personally use it for your channel
* First external user signs up
* Someone asks "Can I pay for this?"

---

## FINAL NOTE

This MVP is intentionally:

* Small
* Opinionated
* Monetizable

Everything else is iteration.
