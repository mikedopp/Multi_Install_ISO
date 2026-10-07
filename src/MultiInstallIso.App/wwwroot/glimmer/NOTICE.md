# Third-party notice

Glimmer includes code from **orb** by **LerSent001**:
<https://github.com/LerSent001/orb>, vendored from commit `8d1736e` (2026-09-16).

## What comes from orb

| Glimmer file | From upstream | Changes |
|---|---|---|
| `src/shader/effect.wgsl` | `effect.wgsl` | Credit header added. Two new flow programs (`glmNebulaFluid`, `glmSonarFluid`) and their two dispatch lines, all marked `GLIMMER`. Upstream code is otherwise unchanged. |
| `src/shader/passes.wgsl` | The WGSL template in `src/shader-source.ts` | Header added only. |
| `src/presets.ts` | `src/presets.ts` | The thirteen upstream presets and the parameter model are kept value for value. The type names were changed, and the Glimmer presets were added. |
| `src/states.ts` | `src/orb-states.ts` | The per-style idle table and the easing curves are kept. Rewritten to add the success and error states, generic idle derivation and per-state overrides. |
| `src/uniforms.ts` | `src/orb-uniforms.ts` | Same buffer layout, rewritten writer. |
| `src/gpu.ts` | `src/orb-renderer.ts` | Pipeline setup follows upstream. Restructured to share one device per page and to compile the particle pipelines lazily. |

### The editor (`editor/`)

`editor/` is a fork of the whole orb editor app: React, Vite, Toolcraft UI, `App.tsx`, the i18n, the audio
input, the Web/SwiftUI exporters and verifiers, the preset thumbnails, and `effect.metal`. Glimmer's
changes are marked `GLIMMER` and listed in [editor/README.md](editor/README.md). orb's MIT license is kept at
`editor/LICENSE`. The editor includes **Toolcraft UI by Pixel Point** (MIT), with its license at
`editor/TOOLCRAFT_LICENSE.md`.

The rest of Glimmer was written for this project: the canvas fallback, the splash and pill UI, the web component, orb-link import, the host bridge, and the .NET splash.

The engine (`src/`, `dist/`) does not include any of the editor UI code.

## orb license

```
MIT License

Copyright (c) 2026 LerSent001

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
