"use strict";
// Multi Install ISO web shell. All work happens in the host through typed bridge actions;
// this file only renders state and sends { action, args }.

(() => {
  const $ = (id) => document.getElementById(id);
  const host = window.chrome && window.chrome.webview;

  const state = {
    init: null,
    settings: null,
    visuals: { transparency: true, highContrast: false, reducedMotion: false },
    glassOverride: null,
    definition: null,
    dirty: false,
    run: null,        // { runDirectory, planHash, plan, media }
    verify: null,     // last VerifyMedia results by VM
    deps: null
  };

  // --- Bridge ---------------------------------------------------------------
  const pending = new Map();
  let nextId = 1;

  function call(action, args = {}) {
    if (!host) return Promise.reject(new Error("Not running inside the app window."));
    const id = String(nextId++);
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject, started: performance.now() });
      syncOrb();
      host.postMessage({ id, action, args });
    });
  }

  if (host) {
    host.addEventListener("message", (event) => {
      const msg = event.data;
      if (msg && msg.event) return onHostEvent(msg.event, msg.data);
      const entry = msg && pending.get(msg.id);
      if (!entry) return;
      pending.delete(msg.id);
      const slow = performance.now() - entry.started > 900;
      if (msg.ok) { entry.resolve(msg.data); settleOrb(true, slow); }
      else { entry.reject(new Error(msg.error || "Unknown error")); settleOrb(false, slow); }
    });
  }

  function onHostEvent(name, data) {
    if (name === "visuals") { state.visuals = data; applyLook(); }
    if (name === "settings") { state.settings = data; renderSettings(); }
  }

  // --- Version orb: thinks while work is in flight, flashes on finish, red on error.
  const versionButton = $("versionButton");
  const badge = window.GlimmerBadge ? window.GlimmerBadge.attach(versionButton, { app: "MultiInstallIso", preset: "frost" }) : null;
  let orbHeld = null;
  let orbTimer = 0;
  function syncOrb() {
    versionButton.dataset.state = orbHeld ?? (pending.size > 0 ? "thinking" : "idle");
  }
  function holdOrb(s, ms) {
    if (orbHeld === "error" && s !== "error") return;
    orbHeld = s;
    clearTimeout(orbTimer);
    syncOrb();
    orbTimer = setTimeout(() => { orbHeld = null; syncOrb(); }, ms);
  }
  function settleOrb(ok, slow) {
    if (!ok) holdOrb("error", 4000);
    else if (slow && pending.size === 0) holdOrb("success", 1400);
    else syncOrb();
  }

  // --- Helpers --------------------------------------------------------------
  function esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function toast(text, isError = false) {
    const t = $("toast");
    t.textContent = text;
    t.classList.toggle("error", isError);
    t.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { t.hidden = true; }, isError ? 7000 : 3500);
  }
  async function attempt(fn) {
    try { return await fn(); }
    catch (err) { toast(err.message, true); return undefined; }
  }
  function busy(button, on, label) {
    if (!button) return;
    if (on) { button.dataset.label = button.textContent; button.textContent = label || "Working…"; button.disabled = true; }
    else { button.textContent = button.dataset.label || button.textContent; button.disabled = false; }
  }
  const fileName = (p) => (p || "").split(/[\\/]/).pop();
  const bytes = (n) => n >= 1073741824 ? (n / 1073741824).toFixed(2) + " GB" : n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : (n / 1024).toFixed(0) + " KB";
  const when = (iso) => iso ? new Date(iso).toLocaleString() : "—";
  const chip = (cls, text) => `<span class="chip ${cls}">${esc(text)}</span>`;
  const statusChip = (s) => chip(s === "PASS" || s === "OK" || s === "SUCCESS" || s === "SET" ? "ok" : s === "FAIL" || s === "MISSING" || s === "FAILED" ? "bad" : s === "PARTIAL" || s === "NOT ELEVATED" || s === "NOT SET" || s === "OPTIONAL" ? "warn" : "off", s);

  // --- Look: glass vs solid ------------------------------------------------
  const forcedColors = window.matchMedia("(forced-colors: active)");
  function glassAllowed() {
    const v = state.visuals;
    if (forcedColors.matches) return "Windows is using forced colours, so surfaces are solid.";
    if (v.highContrast) return "Windows high contrast is on, so surfaces are solid.";
    if (!v.transparency) return "Windows transparency effects are off, so surfaces are solid.";
    if (!(CSS.supports("backdrop-filter", "blur(1px)") || CSS.supports("-webkit-backdrop-filter", "blur(1px)"))) return "Blur is not available here, so surfaces are solid.";
    return null;
  }
  function applyLook() {
    const s = state.settings || { glassEnabled: true, glassOpacity: 0.55, glassBlur: 18 };
    const wanted = state.glassOverride ?? s.glassEnabled;
    const blocked = glassAllowed();
    const glass = wanted && !blocked;
    const root = document.documentElement;
    root.classList.toggle("glass", glass);
    root.classList.toggle("solid", !glass);
    root.classList.toggle("reduce-motion", !!state.visuals.reducedMotion);
    root.style.setProperty("--glass-alpha", String(s.glassOpacity));
    root.style.setProperty("--glass-blur", `${s.glassBlur}px`);
    const note = $("glassForced");
    note.hidden = !(wanted && blocked);
    note.textContent = blocked || "";
  }
  forcedColors.addEventListener?.("change", applyLook);

  // --- Navigation -----------------------------------------------------------
  const titles = {
    overview: ["Overview", "Plan, build answer media, and apply — each step checks the one before it."],
    definition: ["Definition", "The VMs to build. YAML, JSON, or CSV."],
    plan: ["Plan", "Validated VMs, blocking issues, and the hash that later steps must quote."],
    media: ["Answer media", "One small ISO per VM that makes the install unattended."],
    iso: ["Install ISOs", "Check that install media is genuine and holds the edition you plan to install."],
    apply: ["Apply", "Create the VMs from a reviewed plan."],
    runs: ["Runs", "Every plan this app has written, with its media and apply results."],
    deps: ["Dependencies", "What the app and engine need, and where each piece lives."],
    settings: ["Settings", "Look, window behaviour, storage, and help."]
  };
  let current = "overview";
  function show(view) {
    if (!titles[view]) view = "overview";
    current = view;
    document.querySelectorAll(".view").forEach((s) => { s.hidden = s.dataset.view !== view; });
    document.querySelectorAll(".nav-item").forEach((b) => { if (b.dataset.nav === view) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    $("pageTitle").textContent = titles[view][0];
    $("pageSub").textContent = titles[view][1];
    if (view === "runs") loadRuns();
    if (view === "deps" && !state.deps) loadDeps();
    if (view === "apply") renderApply();
    if (view === "media") renderMedia();
  }
  document.querySelectorAll("[data-nav]").forEach((b) => b.addEventListener("click", () => show(b.dataset.nav)));
  document.addEventListener("click", (e) => {
    const go = e.target.closest("[data-goto]");
    if (go) { e.preventDefault(); show(go.dataset.goto); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && !e.shiftKey && !e.altKey && /^[1-9]$/.test(e.key)) {
      e.preventDefault();
      show(Object.keys(titles)[Number(e.key) - 1]);
    }
    if (e.ctrlKey && e.key.toLowerCase() === "s" && current === "definition") { e.preventDefault(); saveDefinition(); }
    if (e.ctrlKey && e.key === "Enter" && current === "definition") { e.preventDefault(); runPlan(); }
  });

  // --- Overview -------------------------------------------------------------
  function renderOverview() {
    const d = state.definition;
    $("ovDefinition").textContent = d ? fileName(d.path) + (d.isSample ? "  (bundled sample, read-only)" : "") : "—";
    $("ovDefinition").title = d?.path ?? "";
    $("ovArtifacts").textContent = state.init?.artifactRoot ?? "—";
    const r = state.run;
    if (r) {
      const s = r.plan.summary;
      $("ovPlan").innerHTML = `${s.ready ? chip("ok", "Ready") : chip("bad", `${s.blockingIssues} blocking`)} ${esc(s.vmCount)} VM(s), ${esc(when(r.plan.generatedAt))}`;
      const n = r.media?.media?.length ?? 0;
      $("ovMedia").innerHTML = n ? `${chip("ok", `${n} ISO(s)`)} built ${esc(when(r.media.createdAt))}` : chip("off", "Not built");
    } else {
      $("ovPlan").innerHTML = chip("off", "No plan yet");
      $("ovMedia").innerHTML = chip("off", "—");
    }
    let next;
    if (!r) next = "Open a definition and choose Validate and plan.";
    else if (!r.plan.summary.ready) next = "Fix the blocking issues in the definition, then plan again.";
    else if (!(r.media?.media?.length)) next = "Build answer media for the reviewed plan.";
    else next = "Check readiness and copy the apply command.";
    $("ovNext").textContent = next;
  }

  // --- Definition -----------------------------------------------------------
  const defText = $("defText");
  function renderDefinition() {
    const d = state.definition;
    if (!d) return;
    $("defPath").textContent = d.path;
    $("defPath").title = d.path;
    $("defBadges").innerHTML = (d.isSample ? chip("warn", "Bundled sample — read-only") : "") + (state.dirty ? chip("warn", "Unsaved") : "");
    $("defSave").disabled = d.isSample || !state.dirty;
  }
  function setDefinition(d) {
    if (!d) return;
    state.definition = d;
    defText.value = d.text;
    state.dirty = false;
    renderDefinition();
    renderOverview();
  }
  defText.addEventListener("input", () => { if (!state.dirty) { state.dirty = true; renderDefinition(); } });
  defText.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      const { selectionStart: a, selectionEnd: b } = defText;
      defText.setRangeText("  ", a, b, "end");
      defText.dispatchEvent(new Event("input"));
    }
  });
  $("defOpen").addEventListener("click", () => attempt(async () => {
    if (state.dirty && !confirm("Discard unsaved changes?")) return;
    const d = await call("pickDefinition");
    if (d) setDefinition(d);
  }));
  $("defReload").addEventListener("click", () => attempt(async () => {
    if (state.dirty && !confirm("Discard unsaved changes?")) return;
    setDefinition(await call("loadDefinition", { path: state.definition?.path }));
  }));
  async function saveDefinition() {
    const d = state.definition;
    if (!d) return;
    if (d.isSample) return saveDefinitionAs();
    await attempt(async () => {
      setDefinition(await call("saveDefinition", { path: d.path, text: defText.value }));
      toast("Saved.");
    });
  }
  async function saveDefinitionAs() {
    await attempt(async () => {
      const d = await call("saveDefinitionAs", { text: defText.value, path: state.definition?.path });
      if (d) { setDefinition(d); toast("Saved."); }
    });
  }
  $("defSave").addEventListener("click", saveDefinition);
  $("defSaveAs").addEventListener("click", saveDefinitionAs);

  function selectedTarget() { return document.querySelector('input[name="target"]:checked').value; }
  function syncTargetFields() {
    const v = selectedTarget() === "vsphere";
    document.querySelectorAll("[data-vsphere]").forEach((el) => { el.hidden = !v; });
  }
  document.querySelectorAll('input[name="target"]').forEach((r) => r.addEventListener("change", syncTargetFields));

  async function runPlan() {
    const d = state.definition;
    if (!d) return;
    if (state.dirty) { toast("Save the definition first; planning reads the saved file.", true); return; }
    const button = $("planButton");
    busy(button, true, "Planning…");
    try {
      const args = { path: d.path, target: selectedTarget(), vcenterServer: $("vcServer").value, vcenterCluster: $("vcCluster").value };
      await call("saveSettings", { target: args.target, vcenterServer: args.vcenterServer, vcenterCluster: args.vcenterCluster });
      const result = await call("plan", args);
      await openRun(result.runDirectory);
      show("plan");
      toast(result.blocking > 0 ? `Plan written with ${result.blocking} blocking issue(s).` : "Plan written. Review it, then build answer media.", result.blocking > 0);
    } catch (err) {
      toast(err.message, true);
    } finally {
      busy(button, false);
    }
  }
  $("planButton").addEventListener("click", runPlan);

  // --- Plan -----------------------------------------------------------------
  async function openRun(runDirectory) {
    const r = await call("openRun", { runDirectory });
    state.run = r;
    state.verify = null;
    renderPlan();
    renderOverview();
    return r;
  }

  function renderPlan() {
    const r = state.run;
    $("planEmpty").hidden = !!r;
    $("planBody").hidden = !r;
    if (!r) return;
    const p = r.plan;
    const s = p.summary;
    $("planReady").outerHTML = `<span id="planReady">${s.ready ? chip("ok", "Ready") : chip("bad", `${s.blockingIssues} blocking issue(s)`)}${s.warnings ? " " + chip("warn", `${s.warnings} warning(s)`) : ""}</span>`;
    $("planTarget").textContent = p.target.kind === "hyperv" ? "Hyper-V" : `vSphere${p.target.vcenterServer ? " · " + p.target.vcenterServer : ""}${p.target.vcenterCluster ? " / " + p.target.vcenterCluster : ""}`;
    $("planWhen").textContent = when(p.generatedAt);
    $("planHash").textContent = r.planHash;
    $("planDefinition").textContent = `${p.definition.path}  ·  definition SHA-256 ${p.definition.sha256}` + (r.hashMatchesRecord === false ? "  ·  WARNING: plan file differs from its recorded hash" : "");
    $("planToMedia").disabled = !s.ready;
    const body = $("planTable").querySelector("tbody");
    body.innerHTML = "";
    for (const [i, vm] of p.vms.entries()) {
      const issues = vm.issues || [], warnings = vm.warnings || [];
      const status = issues.length ? chip("bad", `${issues.length} blocking`) : warnings.length ? chip("warn", `${warnings.length} warning`) : chip("ok", "OK");
      const row = document.createElement("tr");
      row.className = "clickable";
      row.innerHTML = `<td><button class="expander" aria-expanded="false" aria-controls="vmd${i}">${esc(vm.name || "(no name)")}</button></td>
        <td>${esc(vm.osFamily)}</td><td class="mono">${esc(vm.guestId)}</td><td class="num">${esc(vm.cpu)}</td><td class="num">${esc(vm.memoryGB)} GB</td>
        <td class="num">${esc(vm.diskGB)} GB${vm.secondDiskGB > 0 ? " + " + esc(vm.secondDiskGB) : ""}</td><td>${esc(vm.network)}</td>
        <td class="mono">${esc(vm.ip ? `${vm.ip}/${vm.prefixLength}` : "DHCP")}</td><td class="mono">${esc(vm.macAddress)}</td><td>${status}</td>`;
      const detail = document.createElement("tr");
      detail.className = "detail";
      detail.id = `vmd${i}`;
      detail.hidden = !(issues.length);
      const list = (items, cls) => items.length ? `<ul>${items.map((x) => `<li class="${cls}">${esc(x)}</li>`).join("")}</ul>` : `<p class="muted small">None.</p>`;
      detail.innerHTML = `<td colspan="10"><div class="detail-grid">
        <div><h3>Blocking issues</h3>${list(issues, "issue")}</div>
        <div><h3>Warnings</h3>${list(warnings, "warning")}</div>
        <div><h3>Planned actions</h3>${list(vm.actions || [], "")}</div>
        <div><h3>Install</h3><p class="mono small">${esc(vm.iso)}</p><p class="small">${esc(vm.imageName || (vm.imageIndex ? "image index " + vm.imageIndex : "no image selected"))} · ${esc(vm.firmware?.toUpperCase())} · ${esc(vm.answerFile || "")}${vm.domain ? " · joins " + esc(vm.domain) : ""}${vm.roles?.length ? " · roles " + esc(vm.roles.join(", ")) : ""}</p></div>
      </div></td>`;
      row.querySelector(".expander").setAttribute("aria-expanded", String(!detail.hidden));
      row.addEventListener("click", () => {
        detail.hidden = !detail.hidden;
        row.querySelector(".expander").setAttribute("aria-expanded", String(!detail.hidden));
      });
      body.append(row, detail);
    }
  }
  $("planCopyHash").addEventListener("click", () => attempt(async () => { await call("copyText", { text: state.run.planHash }); toast("Plan hash copied."); }));
  $("planOpenFolder").addEventListener("click", () => attempt(() => call("openPath", { path: state.run.runDirectory })));
  $("planToMedia").addEventListener("click", () => { show("media"); buildMedia(); });

  // --- Answer media ---------------------------------------------------------
  function renderMedia() {
    const r = state.run;
    $("mediaEmpty").hidden = !!r;
    $("mediaBody").hidden = !r;
    if (!r) return;
    const items = r.media?.media ?? [];
    const presentCount = items.length;
    $("mediaPlanHash").textContent = r.planHash.slice(0, 16) + "…";
    $("mediaState").outerHTML = `<span id="mediaState">${!r.plan.summary.ready ? chip("bad", "Plan not ready") : presentCount ? chip("ok", `${presentCount} ISO(s)`) : chip("off", "Not built")}</span>`;
    const allBuilt = presentCount >= r.plan.vms.length;
    $("mediaBuild").disabled = !r.plan.summary.ready || allBuilt;
    $("mediaBuild").textContent = presentCount && !allBuilt ? "Build missing" : "Build answer media";
    $("mediaBuild").title = allBuilt ? "Every VM has answer media. Delete it first to rebuild." : "";
    $("mediaVerify").disabled = !presentCount;
    $("mediaDelete").disabled = !presentCount;
    const body = $("mediaTable").querySelector("tbody");
    body.innerHTML = items.length ? "" : `<tr><td colspan="7" class="muted">No answer media for this plan yet.</td></tr>`;
    for (const m of items) {
      const v = state.verify?.[m.vm];
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${esc(m.vm)}</td><td class="mono">${esc(m.volumeLabel)}</td><td class="mono small">${(m.files || []).map((f) => esc(f.path)).join("<br>")}</td>
        <td class="num">${esc(bytes(m.bytes))}</td><td class="mono small" title="${esc(m.sha256)}">${esc(m.sha256.slice(0, 16))}…</td>
        <td>${statusChip(m.readBack)}</td><td>${v ? statusChip(v.Status) + (v.Problems?.length ? `<div class="small issue">${esc(v.Problems.join(" "))}</div>` : "") : chip("off", "Not checked")}</td>`;
      body.append(tr);
    }
  }
  async function buildMedia() {
    const r = state.run;
    if (!r || !r.plan.summary.ready) return;
    const button = $("mediaBuild");
    busy(button, true, "Building…");
    try {
      const result = await call("buildMedia", { runDirectory: r.runDirectory, planHash: r.planHash });
      if (result?.canceled) return;
      await openRun(r.runDirectory);
      renderMedia();
      toast(`Built and read back ${result.media.length} answer ISO(s).`);
    } catch (err) {
      toast(err.message, true);
    } finally {
      busy(button, false);
      renderMedia();
    }
  }
  async function verifyMedia() {
    const r = state.run;
    const button = $("mediaVerify");
    busy(button, true, "Verifying…");
    try {
      const result = await call("verifyMedia", { runDirectory: r.runDirectory });
      state.verify = Object.fromEntries((result.results || []).map((x) => [x.Vm, x]));
      const failed = (result.results || []).filter((x) => x.Status !== "PASS").length;
      toast(failed ? `${failed} answer ISO(s) failed verification.` : "All answer media verified.", failed > 0);
    } catch (err) {
      toast(err.message, true);
    } finally {
      busy(button, false);
      renderMedia();
    }
  }
  $("mediaBuild").addEventListener("click", buildMedia);
  $("mediaVerify").addEventListener("click", verifyMedia);
  $("mediaDelete").addEventListener("click", () => attempt(async () => {
    const r = await call("deleteMedia", { runDirectory: state.run.runDirectory });
    if (r.deleted) { toast(`Deleted ${r.deleted} answer ISO(s).`); state.verify = null; await openRun(state.run.runDirectory); renderMedia(); }
  }));
  $("mediaOpenFolder").addEventListener("click", () => attempt(() => call("openPath", { path: state.run.runDirectory + "\\media" }).catch(() => call("openPath", { path: state.run.runDirectory }))));

  // --- Install ISOs ---------------------------------------------------------
  $("isoBrowse").addEventListener("click", () => attempt(async () => {
    const r = await call("pickIso");
    if (r) $("isoPath").value = r.path;
  }));
  $("isoInspect").addEventListener("click", async () => {
    const button = $("isoInspect");
    const path = $("isoPath").value.trim();
    if (!path) { toast("Choose an ISO file.", true); return; }
    busy(button, true, $("isoSkipHash").checked ? "Inspecting…" : "Hashing and inspecting…");
    try {
      const out = await call("inspectIso", { path, expectedSha256: $("isoSha").value.trim(), imageName: $("isoImage").value.trim(), skipHash: $("isoSkipHash").checked });
      renderIso(out.result);
    } catch (err) {
      toast(err.message, true);
    } finally {
      busy(button, false);
    }
  });
  function renderIso(r) {
    $("isoResult").hidden = false;
    $("isoStatus").outerHTML = `<span id="isoStatus">${statusChip(r.status)}</span>`;
    $("isoSummary").textContent = r.status === "PASS" ? "Hash matched and the contents were identified." : r.status === "FAIL" ? "Do not use this media." : "Some checks could not be completed; see notes.";
    const facts = [
      ["File", r.path], ["Size", bytes(r.bytes)], ["Kind", r.kind], ["Volume label", r.volumeLabel || "—"],
      ["File systems", `${r.isIso ? "ISO 9660" : ""}${r.hasUdf ? " + UDF" : ""}` || "—"],
      ["SHA-256", r.sha256 || "not computed"], ["Expected", r.expectedSha256 || "not given"],
      ["Hash", r.hashMatches === true ? "matches" : r.hashMatches === false ? "DOES NOT MATCH" : "not verified"]
    ];
    if (r.imageName) facts.push(["Required image", `${r.imageName}: ${r.imageFound ? "present" : r.imageFound === false ? "NOT PRESENT" : "not checked"}`]);
    if (r.linuxMarkers?.length) facts.push(["Linux markers", r.linuxMarkers.join(", ")]);
    $("isoFacts").innerHTML = facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd class="${k === "SHA-256" || k === "Expected" || k === "File" ? "mono" : ""}">${esc(v)}</dd>`).join("");
    const imgs = r.windowsImages || [];
    $("isoImagesWrap").hidden = !imgs.length;
    $("isoImages").innerHTML = imgs.map((i) => `<tr><td class="num">${esc(i.index)}</td><td>${esc(i.name)}</td><td>${esc(i.edition)}</td><td class="mono">${esc(i.version)}</td></tr>`).join("");
    const notes = [...(r.failures || []).map((f) => `<li class="issue">${esc(f)}</li>`), ...(r.notes || []).map((n) => `<li class="muted">${esc(n)}</li>`)];
    $("isoNotes").innerHTML = notes.join("");
  }

  // --- Apply ----------------------------------------------------------------
  async function renderApply() {
    const r = state.run;
    $("applyEmpty").hidden = !!r;
    $("applyBody").hidden = !r;
    if (!r) return;
    const checks = [];
    const mark = (ok, text, warn) => checks.push(`<li><span class="mark ${ok ? "ok" : warn ? "warn" : "bad"}">${ok ? "✓" : warn ? "!" : "✗"}</span><span>${text}</span></li>`);
    mark(r.plan.summary.ready, r.plan.summary.ready ? "Plan has no blocking issues." : `Plan has ${r.plan.summary.blockingIssues} blocking issue(s).`);
    mark(r.hashMatchesRecord !== false, r.hashMatchesRecord === false ? "Plan file no longer matches its recorded hash." : "Plan file matches its recorded hash.");
    const mediaCount = r.media?.media?.length ?? 0;
    const verified = state.verify && Object.values(state.verify).every((v) => v.Status === "PASS") && Object.keys(state.verify).length === mediaCount;
    mark(mediaCount === r.plan.vms.length && verified, mediaCount === 0 ? "No answer media yet." : verified ? `Answer media verified for ${mediaCount} VM(s).` : `Answer media present for ${mediaCount}/${r.plan.vms.length} VM(s); press Check again to verify it.`, mediaCount > 0 && !verified);
    if (!state.deps) await loadDeps(true);
    const engineDeps = state.deps?.engine || [];
    const depName = r.plan.target.kind === "hyperv" ? "Hyper-V module" : "VMware PowerCLI";
    const dep = engineDeps.find((d) => d.Name === depName);
    mark(dep?.Status === "OK", `${esc(depName)}: ${esc(dep?.Status ?? "unknown")}${dep?.Status === "OK" ? "" : " — " + esc(dep?.Location ?? "")}`);
    if (r.plan.target.kind === "hyperv") mark(false, "Hyper-V apply runs from an elevated PowerShell 7 window.", true);
    else mark(!!r.plan.target.vcenterServer, r.plan.target.vcenterServer ? `vCenter: ${esc(r.plan.target.vcenterServer)}` : "No vCenter server on this plan. Plan again with one.");
    $("applyChecks").innerHTML = checks.join("");
    const cmd = await attempt(() => call("applyCommand", { runDirectory: r.runDirectory, planHash: r.planHash }));
    if (cmd) { $("applyCommand").textContent = cmd.command; $("applyNote").textContent = cmd.note; }
  }
  $("applyRecheck").addEventListener("click", async () => {
    if (state.run?.media?.media?.length) {
      await attempt(async () => {
        const result = await call("verifyMedia", { runDirectory: state.run.runDirectory });
        state.verify = Object.fromEntries((result.results || []).map((x) => [x.Vm, x]));
      });
    }
    state.deps = null;
    renderApply();
  });
  $("applyCopy").addEventListener("click", () => attempt(async () => { await call("copyText", { text: $("applyCommand").textContent }); toast("Command copied."); }));
  $("applyRunbook").addEventListener("click", () => attempt(() => call("openDoc", { name: "RUNBOOK" })));

  // --- Runs -----------------------------------------------------------------
  async function loadRuns() {
    const data = await attempt(() => call("listRuns"));
    if (!data) return;
    $("runsRoot").textContent = data.root;
    const body = $("runsTable").querySelector("tbody");
    body.innerHTML = data.runs.length ? "" : `<tr><td colspan="8" class="muted">No runs yet.</td></tr>`;
    for (const run of data.runs) {
      const tr = document.createElement("tr");
      if (run.error) {
        tr.innerHTML = `<td class="mono">${esc(run.name)}</td><td colspan="7" class="issue">${esc(run.error)}</td>`;
      } else {
        const apply = run.applies.length ? run.applies.map((a) => statusChip(a.status)).join(" ") : chip("off", "None");
        tr.className = "clickable";
        tr.innerHTML = `<td class="mono">${esc(run.name)}</td><td title="${esc(run.definition)}">${esc(fileName(run.definition))}</td><td>${esc(run.target === "hyperv" ? "Hyper-V" : "vSphere")}</td>
          <td class="num">${esc(run.vmCount)}</td><td>${run.ready ? chip("ok", "Ready") : chip("bad", `${run.blocking} blocking`)}</td>
          <td>${run.mediaCount ? chip("ok", `${run.mediaCount} ISO`) : chip("off", "None")}</td><td>${apply}</td><td><button class="btn small">Open</button></td>`;
        tr.addEventListener("click", () => attempt(async () => { await openRun(run.runDirectory); show("plan"); }));
      }
      body.append(tr);
    }
  }
  $("runsRefresh").addEventListener("click", loadRuns);
  $("runsOpenRoot").addEventListener("click", () => attempt(() => call("openPath", { path: $("runsRoot").textContent })));

  // --- Dependencies ---------------------------------------------------------
  async function loadDeps(quiet) {
    const data = quiet ? await call("dependencies").catch(() => null) : await attempt(() => call("dependencies"));
    if (!data) return;
    state.deps = data;
    const row = (d) => `<tr><td>${esc(d.name ?? d.Name)}</td><td>${statusChip(d.status ?? d.Status)}</td><td>${esc(d.requiredFor ?? d.RequiredFor)}</td><td class="mono small">${esc(d.location ?? d.Location)}</td><td class="small">${esc(d.detail ?? d.Detail)}</td></tr>`;
    $("depsApp").innerHTML = (data.app || []).map(row).join("");
    $("depsEngine").innerHTML = data.engine ? data.engine.map(row).join("") : `<tr><td colspan="5" class="issue">${esc(data.engineError || "Engine did not answer.")}</td></tr>`;
    const ok = !!data.engine;
    $("engineState").outerHTML = `<span id="engineState">${ok ? chip("ok", "Engine ready") : chip("bad", "Engine unavailable")}</span>`;
  }
  $("depsRefresh").addEventListener("click", () => loadDeps(false));

  // --- Settings -------------------------------------------------------------
  function renderSettings() {
    const s = state.settings;
    if (!s) return;
    $("setGlass").checked = s.glassEnabled;
    $("setOpacity").value = s.glassOpacity;
    $("setOpacityOut").textContent = Math.round(s.glassOpacity * 100) + "%";
    $("setBlur").value = s.glassBlur;
    $("setBlurOut").textContent = s.glassBlur + " px";
    $("setTray").checked = s.closeToTray;
    $("setArtifacts").textContent = s.artifactRoot || state.init?.artifactRoot || "—";
    $("setEngine").textContent = state.init?.engineRoot ?? "—";
    applyLook();
  }
  let saveTimer = 0;
  function saveLook(patch) {
    Object.assign(state.settings, patch);
    renderSettings();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => attempt(async () => { state.settings = await call("saveSettings", patch); renderSettings(); }), 250);
  }
  $("setGlass").addEventListener("change", (e) => saveLook({ glassEnabled: e.target.checked }));
  $("setOpacity").addEventListener("input", (e) => saveLook({ glassOpacity: Number(e.target.value) }));
  $("setBlur").addEventListener("input", (e) => saveLook({ glassBlur: Number(e.target.value) }));
  $("setTray").addEventListener("change", (e) => attempt(async () => { state.settings = await call("saveSettings", { closeToTray: e.target.checked }); renderSettings(); }));
  $("setResetGlass").addEventListener("click", () => attempt(async () => { state.settings = await call("resetGlass"); renderSettings(); toast("Glass reset."); }));
  $("setArtifactsChange").addEventListener("click", () => attempt(async () => {
    const s = await call("pickArtifactRoot");
    if (s) { state.settings = s; state.init.artifactRoot = s.artifactRoot; renderSettings(); renderOverview(); toast("Artifact folder changed."); }
  }));
  $("setArtifactsOpen").addEventListener("click", () => attempt(() => call("openPath", { path: $("setArtifacts").textContent })));
  $("setDiagnostics").addEventListener("click", () => attempt(async () => { const d = await call("diagnostics"); await call("copyText", { text: d.text }); toast("Diagnostics copied."); }));
  document.querySelectorAll("[data-doc]").forEach((b) => b.addEventListener("click", () => attempt(() => call("openDoc", { name: b.dataset.doc }))));

  // --- About ----------------------------------------------------------------
  versionButton.addEventListener("click", () => {
    const i = state.init || {};
    $("aboutVersion").textContent = "v" + (i.version ?? "");
    $("aboutFacts").innerHTML = [
      ["Version", i.version], ["Engine", i.engineRoot], ["PowerShell 7", i.pwsh || "not found"], ["Artifacts", i.artifactRoot], ["Computer", i.computerName]
    ].map(([k, v]) => `<dt>${esc(k)}</dt><dd class="mono">${esc(v)}</dd>`).join("");
    $("about").showModal();
  });

  // --- Snapshot hook (host --snapshot) ----------------------------------------
  window.mii = {
    idle() { return pending.size === 0; },
    snapshot(opts) {
      state.glassOverride = !!opts.glass;
      applyLook();
      show(opts.view || "overview");
    }
  };

  // --- Start ----------------------------------------------------------------
  async function start() {
    if (!host) {
      document.body.insertAdjacentHTML("afterbegin", `<div class="toast error" style="position:fixed;top:16px;left:16px;right:auto;bottom:auto">Open this page from the Multi Install ISO app.</div>`);
      return;
    }
    try {
      const init = await call("init");
      state.init = init;
      state.settings = init.settings;
      state.visuals = init.visuals;
      $("versionLabel").textContent = "v" + init.version;
      document.title = `Multi Install ISO v${init.version}`;
      const target = init.settings.target === "hyperv" ? "hyperv" : "vsphere";
      document.querySelector(`input[name="target"][value="${target}"]`).checked = true;
      $("vcServer").value = init.settings.vcenterServer || "";
      $("vcCluster").value = init.settings.vcenterCluster || "";
      syncTargetFields();
      renderSettings();
      setDefinition(await call("loadDefinition"));
      if (init.settings.lastRunDirectory) await openRun(init.settings.lastRunDirectory).catch(() => null);
      renderOverview();
      loadDeps(true);
      show("overview");
    } catch (err) {
      toast(err.message, true);
    } finally {
      host.postMessage({ event: "ready" });
    }
  }
  start();
})();
