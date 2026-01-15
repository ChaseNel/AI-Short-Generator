import { createMocks } from 'node-mocks-http';
import prisma from '../lib/prisma';
import { clearDatabase, disconnectPrisma } from './setup';

// Import API handlers
import projectsHandler from '../ai-video-saas/pages/api/projects/index';
import storyHandler from '../ai-video-saas/pages/api/projects/[id]/story';
import generateHandler from '../ai-video-saas/pages/api/projects/[id]/generate';
import shortHandler from '../ai-video-saas/pages/api/projects/[id]/short';
import sceneHandler from '../ai-video-saas/pages/api/scenes/[id]';
import jobHandler from '../ai-video-saas/pages/api/jobs/[id]';
import assetHandler from '../ai-video-saas/pages/api/assets/[id]';

describe("API Tests", () => {
  let userId: string;
  let projectId: string;
  let sceneId: string;
  let jobId: string;
  let assetId: string;

  beforeAll(async () => {
    await clearDatabase();

    // Create a user with fixed ID to match API
    const user = await prisma.user.create({
      data: { id: 'demo-user-id', email: "test@example.com", passwordHash: "hash" },
    });
    userId = user.id;

    // Create a project
    const project = await prisma.videoProject.create({
      data: { title: "Test Project", userId },
    });
    projectId = project.id;

    // Scene
    const scene = await prisma.scene.create({
      data: { videoProjectId: projectId, order: 1, visualPrompt: "initial", narrationText: "initial" },
    });
    sceneId = scene.id;

    // Job
    const job = await prisma.generationJob.create({
      data: { videoProjectId: projectId, type: "VIDEO", status: "QUEUED" },
    });
    jobId = job.id;

    // Asset
    const asset = await prisma.asset.create({
      data: { videoProjectId: projectId, type: "VIDEO_LONG", url: "https://example.com/video.mp4" },
    });
    assetId = asset.id;
  });

  afterAll(async () => {
    await clearDatabase();
    await disconnectPrisma();
  });

  // ================= Projects GET / POST =================
  it("GET /api/projects returns projects", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await projectsHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].id).toBe(projectId);
  });

  it("POST /api/projects creates a project", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "New Project" },
    });
    await projectsHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const project = res._getJSONData();
    expect(project.title).toBe("New Project");
  });

  // ================= Story POST =================
  it("POST /api/projects/[id]/story starts story generation", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: { id: projectId },
    });
    await storyHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(data.message).toContain(projectId);
  });

  // ================= Generate POST =================
  it("POST /api/projects/[id]/generate creates a generation job", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: { id: projectId },
    });
    await generateHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const job = res._getJSONData();
    expect(job.videoProjectId).toBe(projectId);
    expect(job.type).toBe("VIDEO");
  });

  // ================= Short POST =================
  it("POST /api/projects/[id]/short creates a short generation job", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: { id: projectId },
    });
    await shortHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const job = res._getJSONData();
    expect(job.videoProjectId).toBe(projectId);
    expect(job.type).toBe("SHORT");
  });

  // ================= Scene PUT =================
  it("PUT /api/scenes/[id] updates a scene", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      query: { id: sceneId },
      body: { visualPrompt: "updated", narrationText: "updated text" },
    });
    await sceneHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const scene = res._getJSONData();
    expect(scene.visualPrompt).toBe("updated");
    expect(scene.narrationText).toBe("updated text");
  });

  // ================= Job GET =================
  it("GET /api/jobs/[id] returns a job", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: jobId },
    });
    await jobHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const job = res._getJSONData();
    expect(job.id).toBe(jobId);
  });

  // ================= Asset GET =================
  it("GET /api/assets/[id] returns an asset", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: assetId },
    });
    await assetHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const asset = res._getJSONData();
    expect(asset.id).toBe(assetId);
  });
});
