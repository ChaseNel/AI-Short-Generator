# AI Video SaaS – MVP Database Schema & API Contracts

This document defines the **minimum safe schema** for your MVP.
It is designed to:

* Avoid rewrites
* Support async AI jobs
* Support subscriptions later
* Stay simple

---

## 🧱 CORE ENTITIES (MVP)

---

## 1️⃣ User

Represents a single account.

```ts
User {
  id: string (uuid)
  email: string (unique)
  passwordHash: string
  tier: 'FREE' | 'PRO'
  createdAt: datetime
}
```

---

## 2️⃣ VideoProject

A single video generation request (long-form + short).

```ts
VideoProject {
  id: string (uuid)
  userId: string (fk → User.id)
  title: string
  status: 'DRAFT' | 'GENERATING' | 'READY' | 'FAILED'
  createdAt: datetime
}
```

---

## 3️⃣ Scene

Individual story scenes belonging to a video.

```ts
Scene {
  id: string (uuid)
  videoProjectId: string (fk → VideoProject.id)
  order: number
  visualPrompt: text
  narrationText: text
}
```

---

## 4️⃣ GenerationJob

Tracks long-running AI tasks.

```ts
GenerationJob {
  id: string (uuid)
  videoProjectId: string (fk → VideoProject.id)
  type: 'STORY' | 'VIDEO' | 'VOICE' | 'SUBTITLES' | 'SHORT'
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED'
  error: text | null
  createdAt: datetime
}
```

---

## 5️⃣ Asset

Stores generated files.

```ts
Asset {
  id: string (uuid)
  videoProjectId: string (fk → VideoProject.id)
  type: 'VIDEO_LONG' | 'VIDEO_SHORT' | 'AUDIO' | 'SUBTITLE'
  url: string
  createdAt: datetime
}
```

---

## 🔁 RELATIONSHIPS

* User 1 → many VideoProjects
* VideoProject 1 → many Scenes
* VideoProject 1 → many GenerationJobs
* VideoProject 1 → many Assets

---

## 🌐 API CONTRACTS (MVP)

All routes are authenticated.

---

### POST /api/projects

Create a new video project

**Body:**

```json
{
  "title": "What If Gravity Stopped?"
}
```

---

### POST /api/projects/:id/story

Generate AI story & scenes

**Body:**

```json
{
  "topic": "What if gravity stopped",
  "tone": "cinematic",
  "length": "8min"
}
```

---

### PUT /api/scenes/:id

Update a scene (human review)

**Body:**

```json
{
  "visualPrompt": "Floating city",
  "narrationText": "Buildings lift into the sky..."
}
```

---

### POST /api/projects/:id/generate

Start full video generation

---

### GET /api/projects

List user projects

---

### GET /api/projects/:id

Get project details (scenes + assets)

---

### GET /api/jobs/:id

Poll generation job status

---

## 🧠 DESIGN RULES (IMPORTANT)

* Never generate video without scenes
* Never mutate scenes during generation
* Always store assets via URLs
* Jobs must be resumable

---

## 🚫 NOT IN MVP SCHEMA

* Teams
* Channels
* Branding
* API keys
* Analytics

---

## ✅ WHY THIS SCHEMA WORKS

* Simple
* Async-safe
* Extensible
* Monetization-ready

---

## NEXT STEP

Turn this into:

* Prisma schema
* SQL migrations
* OR Supabase tables
