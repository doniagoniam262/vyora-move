---
name: AI exercise video generation
description: Guardrails learned while producing gender-matched exercise clips for VYORA.
---

Inspect every video-generation job separately and only connect files that actually exist and match their requested exercise. Stop after repeated provider failures instead of retrying a paid batch blindly; a different clean, logo-free full-body reference may resolve reference-specific failures.

**Why:** One reference produced valid clips while another repeatedly returned no video URL across different prompts and a cleaned derivative. Replacing it with a different clean full-body reference produced the requested clips. Batch-level failure also hid successful sibling jobs, so retrying the whole batch would duplicate cost.

**How to apply:** Prefer logo-free references with the complete body visible. Reuse successful outputs, retry only failed jobs with a genuinely different approach, cap retries, visually review representative frames, and verify MP4 dimensions, duration, endpoint, and content type before publishing.
