---
name: AI exercise video generation
description: Guardrails learned while producing gender-matched exercise clips for VYORA.
---

Inspect every video-generation job separately and only connect files that actually exist and match their requested exercise. Stop after repeated provider failures instead of retrying a paid batch blindly; a different clean, logo-free full-body reference may resolve reference-specific failures.

**Why:** One reference produced valid clips while another repeatedly returned no video URL across different prompts and a cleaned derivative. Replacing it with a different clean full-body reference produced the requested clips. Batch-level failure also hid successful sibling jobs, so retrying the whole batch would duplicate cost.

**How to apply:** Prefer logo-free references with the complete body visible. Reuse successful outputs, retry only failed jobs with a genuinely different approach, cap retries, visually review representative frames, and verify MP4 dimensions, duration, endpoint, and content type before publishing.

Portrait exercise clips need portrait references with the full body in frame. A landscape still can produce a portrait MP4 whose active picture is a small horizontal inset or crops the athlete during movement; metadata alone will not catch this.

**Why:** Two 9:16 outputs based on landscape exercise cards had cropped or letterboxed movement despite valid portrait dimensions.

**How to apply:** Use a clean portrait reference for portrait clips, inspect frames from the beginning, middle, and end, and do not wire the video until the exercise and full-body framing are clear.

Provide a browser-compatible fallback when generated H.264 MP4 clips fail decoding, and do not let a failed child source unmount the video before the browser tries other sources.

**Why:** HTTP 200 and valid ffprobe metadata did not establish playback: the testing browser rejected generated H.264 streams, while locally transcoded VP9 WebM copies played successfully. React's bubbling source errors also prematurely displayed the still-image fallback.

**How to apply:** Preserve the original MP4, supply a correctly typed WebM alternative, react only to video-element errors, and verify advancing playback time inside the actual exercise page.
