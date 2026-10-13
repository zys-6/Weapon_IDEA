# Work Summary — 2026-10-13

## Objective

Create a locally installable Chinese IntelliJ IDEA edition of Cline named
**NORINCO Code Agent**, apply custom icons, make the transplanted Chinese UI
work with the IntelliJ host, and publish the editable customization files and
documentation to GitHub.

## Source material

- Official compiled Cline IntelliJ plugin 2.0.7 (`bot.cline`)
- Cline Chinese VS Code extension 4.1.23 from
  [SSYCloud/cline-chinese](https://github.com/SSYCloud/cline-chinese)
- Replacement icons supplied locally in
  `/home/z/Desktop/cline-logo-replacements/icons`

The project reuses the official compiled IntelliJ Java/Kotlin classes,
dependency JARs, and bundled Cline core. It does not rebuild or modify their
implementation. The Chinese VS Code extension supplies only the browser-based
frontend; its VS Code host and native IDE integration are not used.

## Implementation completed

### Branding and localization

- Changed the visible product name to **NORINCO Code Agent**.
- Changed the visible vendor to **NORINCO**.
- Replaced plugin-manager, tool-window, light, dark, and embedded frontend
  icons.
- Added Chinese resource strings for IntelliJ-native notifications, actions,
  trust prompts, JCEF messages, and MCP messages.
- Preserved internal plugin ID `bot.cline` and tool-window ID `Cline` because
  compiled classes refer to them.

### Chinese frontend integration

- Extracted the compiled web UI from Cline Chinese 4.1.23.
- Replaced the English web UI in the IntelliJ standalone runtime.
- Kept the official IntelliJ host, editor integration, file operations,
  terminal integration, approvals, and core process.

### IntelliJ bridge fix

The first Chinese build remained on the connecting screen even though logs
showed the host bridge and Cline core were healthy.

Cause:

```text
postMessageHandler: vscode
messageEncoding: none
```

Fix:

```text
postMessageHandler: standalone
messageEncoding: json
```

The selected platform and related frontend capability flags were also changed
to their JetBrains standalone values.

### Dynamic module loading fix

After the bridge fix, IntelliJ displayed a frontend rendering error:

```text
TypeError: Failed to fetch dynamically imported module
```

The Chinese frontend contained runtime chunk imports that IntelliJ attempted to
load through `https://internal.resources/...`. The plugin resource handler
could not load those modules. Eighteen frontend modules were bundled into one
browser JavaScript entry with Bun, leaving zero runtime dynamic imports.

### Unsupported Batch service fix

The Batch button called:

```text
cline.LoomLoomService
```

That service exists in the Chinese VS Code build but is absent from the
official IntelliJ 2.0.7 core. The Batch mode selector and persisted Batch
timeline controls were disabled. Plan and Act remain available.

### Packaging

- Added `scripts/package.sh` to apply branding, copy the patched web UI,
  rebuild `standalone.zip`, rebuild `cline-2.0.7.jar`, and create the final
  JetBrains plugin ZIP.
- Installed the patched resources into the active local IntelliJ plugin for
  testing.
- Preserved backups and extracted working files locally while excluding them
  from Git.

## Final architecture

```text
Patched Chinese frontend 4.1.23
        ↓ standalone JSON bridge
Official compiled IntelliJ integration 2.0.7
        ↓ gRPC/protobuf
Official IntelliJ Cline core 2.0.7
        ↓
Configured cloud or local AI provider
```

This is a hybrid binary customization. It is not a complete conversion of the
VS Code extension and is not a new source-built IntelliJ implementation.

## Validation performed

- Confirmed IntelliJ loaded the plugin as NORINCO Code Agent 2.0.7.
- Confirmed the local host bridge and Cline core connected successfully.
- Confirmed frontend requests reached the IntelliJ gRPC bridge.
- Checked the final JavaScript bundle with `node --check`.
- Confirmed zero runtime dynamic imports in the main frontend entry.
- Confirmed the Batch selector was removed and its timeline disabled.
- Confirmed required JAR entries, plugin metadata, icons, and `standalone.zip`
  were present.
- Tested the generated plugin ZIP for archive corruption.
- Rebuilt the package successfully with the repository packaging script.

## Generated artifact

```text
/home/z/projects/cline-intellij-zh-local/dist/
NORINCO-Code-Agent-2.0.7-zh-local.zip
```

- Size: `245326491` bytes
- SHA-256: `c340c6208e56cdbcf53e16b150e2b98a459fed8b48459507b2d99871a88923bb`

The approximately 245 MB ZIP exceeds GitHub's normal 100 MB Git object limit,
so it is excluded from the repository and should be uploaded as a GitHub
Release asset.

## Repository work

- Initialized `/home/z/projects/cline-intellij-zh-local` as a Git repository.
- Added `.gitignore` rules for official binaries, backups, working directories,
  and generated packages.
- Added the patched frontend, branding assets, packaging script, and README.
- Documented project origin, architecture, rationale, fixes, build procedure,
  installation, limitations, and redistribution considerations.
- Consolidated duplicate documentation into one structured README.
- Configured and pushed to
  [zys-6/Weapon_IDEA](https://github.com/zys-6/Weapon_IDEA) on branch `main`.

Commits created before this summary:

```text
eeb01ff Add NORINCO Code Agent IntelliJ customization
5510ce7 Document project origin and compatibility fixes
08790b3 Explain project background and hybrid design
84f3687 Add project architecture FAQ
11e724f Consolidate project documentation
```

## Current scope and remaining limitations

- The editable repository covers frontend behavior, Chinese text, icons,
  branding, and packaging.
- Native IntelliJ behavior remains inside compiled Java/Kotlin classes and
  cannot be rebuilt normally from this repository.
- The frontend and core versions differ, so additional frontend-only features
  may expose further protocol or service mismatches.
- A future independent implementation would require a source-built JetBrains
  host connected to an open Cline core interface.
- Redistribution of the complete modified binary requires checking the license
  and distribution terms of every bundled upstream component.
