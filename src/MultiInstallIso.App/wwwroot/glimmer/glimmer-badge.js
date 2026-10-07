/*! Glimmer badge runtime 0.4.0 | MIT | (c) 2026 mikedopp */
"use strict";
var GlimmerBadge = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/badge-runtime.ts
  var badge_runtime_exports = {};
  __export(badge_runtime_exports, {
    Badge: () => Badge,
    attach: () => attach,
    savedLook: () => savedLook,
    version: () => version
  });

  // src/badge.ts
  var cssNames = {
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    hi: "hi",
    glow: "glow",
    canvas: "canvas",
    rimA: "rim-a",
    rimB: "rim-b"
  };
  function badgeCustomProperties(colors) {
    const out = {};
    for (const state of ["base", "success", "error"]) {
      const prefix = state === "base" ? "--gdx-" : `--gdx-${state}-`;
      for (const k of Object.keys(cssNames)) {
        out[`${prefix}${cssNames[k]}`] = colors[state][k];
      }
    }
    return out;
  }

  // src/badge-runtime.ts
  var version = "0.4.0";
  var scriptBase = (() => {
    const src = document.currentScript?.src;
    return src ? src.slice(0, src.lastIndexOf("/") + 1) : "glimmer/";
  })();
  var storageKey = (app) => `glimmer-badge:${app}`;
  function savedLook(app) {
    try {
      const raw = window.localStorage.getItem(storageKey(app));
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && parsed.v === 1 && parsed.colors ? parsed : null;
    } catch {
      return null;
    }
  }
  function store(app, look) {
    try {
      if (look) window.localStorage.setItem(storageKey(app), JSON.stringify(look));
      else window.localStorage.removeItem(storageKey(app));
    } catch {
    }
  }
  var Badge = class {
    constructor(button, options) {
      this.button = button;
      this.options = options;
      this.overlay = null;
      this.frame = null;
      this.onMessage = (event) => this.handleMessage(event);
      this.onKey = (event) => {
        if (event.key === "Escape") this.closeEditor();
      };
      this.appliedProps = [];
      button.classList.add("glimmer-version");
      if (!button.querySelector(".glimmer-dot")) {
        const dot = document.createElement("span");
        dot.className = "glimmer-dot";
        dot.setAttribute("aria-hidden", "true");
        button.prepend(dot);
      }
      if (!button.dataset.state) button.dataset.state = "idle";
      this.apply(savedLook(options.app));
      if (options.contextMenu !== false) {
        button.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          this.openEditor();
        });
      }
    }
    get state() {
      return this.button.dataset.state || "idle";
    }
    setState(state) {
      this.button.dataset.state = state;
      return this;
    }
    /** The current saved look, or null when showing the default preset. */
    get look() {
      return savedLook(this.options.app);
    }
    /** Forget the custom look and go back to the default preset. */
    reset() {
      store(this.options.app, null);
      this.apply(null);
      this.options.onChange?.(null);
      return this;
    }
    apply(look) {
      const style = this.button.style;
      for (const prop of this.appliedProps) style.removeProperty(prop);
      this.appliedProps = [];
      if (look && !look.preset) {
        this.button.classList.add("glimmer-custom");
        delete this.button.dataset.preset;
        for (const [prop, value] of Object.entries(badgeCustomProperties(look.colors))) {
          style.setProperty(prop, value);
          this.appliedProps.push(prop);
        }
      } else {
        this.button.classList.remove("glimmer-custom");
        this.button.dataset.preset = look?.preset ?? this.options.preset ?? "siri";
      }
    }
    /** Open the full orb editor over the app. Apply saves the look for this app. */
    openEditor() {
      if (this.overlay) return;
      const look = this.look;
      const hash = look?.hash ?? `style=${encodeURIComponent(this.options.preset ?? "siri")}`;
      const base = this.options.editorUrl ?? `${scriptBase}editor/index.html`;
      const url = `${base}?embed=1&app=${encodeURIComponent(this.options.app)}#${hash}`;
      const overlay = document.createElement("div");
      overlay.className = "glimmer-editor-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Orb editor");
      const loading = document.createElement("div");
      loading.className = "glimmer-editor-loading";
      loading.textContent = "Loading the orb editor\u2026";
      const frame = document.createElement("iframe");
      frame.className = "glimmer-editor-frame";
      frame.title = "Orb editor";
      frame.src = url;
      frame.addEventListener("load", () => overlay.classList.add("is-loaded"));
      overlay.append(loading, frame);
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) this.closeEditor();
      });
      document.body.append(overlay);
      this.overlay = overlay;
      this.frame = frame;
      window.addEventListener("message", this.onMessage);
      window.addEventListener("keydown", this.onKey);
      frame.focus();
    }
    closeEditor() {
      if (!this.overlay) return;
      window.removeEventListener("message", this.onMessage);
      window.removeEventListener("keydown", this.onKey);
      this.overlay.remove();
      this.overlay = null;
      this.frame = null;
      this.button.focus();
    }
    handleMessage(event) {
      if (!this.frame || event.source !== this.frame.contentWindow) return;
      const data = event.data;
      if (data?.type === "glimmer:cancel") {
        this.closeEditor();
      } else if (data?.type === "glimmer:apply" && data.hash && data.colors) {
        const look = {
          v: 1,
          hash: data.hash,
          preset: data.preset ?? null,
          colors: data.colors,
          savedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        store(this.options.app, look);
        this.apply(look);
        this.options.onChange?.(look);
        this.closeEditor();
        this.setState("success");
        window.setTimeout(() => {
          if (this.state === "success") this.setState("idle");
        }, 1400);
      }
    }
  };
  function attach(button, options) {
    return new Badge(button, options);
  }
  return __toCommonJS(badge_runtime_exports);
})();
