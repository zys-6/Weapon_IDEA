# Work Summary — 2026-10-13

## Background and storyline

The work started with a request for a Chinese edition of Cline for IntelliJ
IDEA, using the name **NORINCO Code Agent** and a set of custom icons. A Chinese
Cline extension already existed for VS Code, which raised the initial question:
why could that extension not simply be renamed and installed in IntelliJ?

The first finding was that VS Code extensions and IntelliJ plugins are different
products even when they display similar browser-based interfaces. VS Code uses
a VSIX package, TypeScript extension host, VS Code APIs, and
`acquireVsCodeApi().postMessage()`. IntelliJ uses a JetBrains plugin ZIP, JVM
classes, `plugin.xml`, IntelliJ Platform APIs, and a JCEF browser embedded in a
tool window. The complete VS Code extension therefore could not run directly in
IntelliJ.

Two possible implementation paths were considered:

1. Build a new JetBrains plugin from source and connect it to an open Cline core.
2. Reuse the official Cline IntelliJ plugin as the native host and adapt the
   existing Chinese browser interface to it.

The second path was chosen for the initial local version. Building a new plugin
would require implementing editor context, file operations, diffs, terminal
execution, approvals, lifecycle management, JCEF hosting, and core
communication. The installed official IntelliJ plugin already implemented all
of those functions. The Chinese VS Code extension already implemented the
translated chat, settings, onboarding, messages, styling, and other visible
screens. Combining those two pieces avoided rebuilding both halves from
scratch.

The official IntelliJ source project matching version 2.0.7 was not available
in this work. The compiled distribution was available because IntelliJ had
installed it on the local machine. Its JAR contained compiled Java/Kotlin
classes, resources, metadata, and an embedded standalone runtime. JAR and ZIP
resources can be extracted and repackaged without having the original `.java`
or `.kt` files. This made resource and frontend customization possible, but it
did not turn the native IntelliJ implementation into editable open source.

The first customized package kept the official `.class` files, dependency JARs,
and Cline core. It changed the visible name, vendor, icons, native resource
strings, and embedded web interface. Internal identifiers were deliberately
preserved because the compiled native code refers to them.

The Chinese frontend did not work immediately. The first installed build stayed
on “Connecting.” IntelliJ and Cline logs showed that the native plugin, local
host bridge, core process, and authentication channel were all healthy. The
failure was isolated to the browser interface: it was still compiled to send
messages through the VS Code bridge. Changing it to the IntelliJ standalone
JSON bridge allowed frontend requests to reach the native host.

After that change, the panel progressed further but failed when it tried to
open dynamically imported frontend modules. The browser requested JavaScript
chunks through IntelliJ's `internal.resources` URL handler, which could not
serve those imports in this plugin. The frontend's 18 modules were therefore
rebundled into a single JavaScript entry. This removed runtime dynamic imports
and allowed the interface to render.

The next incompatibility appeared when Batch was selected. The Chinese
frontend called `cline.LoomLoomService`, an extra service unavailable in the
official IntelliJ 2.0.7 core. Adding that service properly would require native
or core implementation work that this binary-customization project could not
perform. Batch and its persisted controls were removed, while normal Chat,
Plan, Act, editor, file, terminal, settings, and approval functionality remained
on the official IntelliJ path.

Once the runtime issues were resolved, the customization was made repeatable.
A packaging script was created to apply the branding and Chinese resources,
insert the patched frontend, rebuild the embedded standalone archive, rebuild
the main JAR, and create an IntelliJ-installable ZIP. The active local plugin
was updated for testing, and the output archive was checked for integrity.

The final stage created this Git repository. Temporary extractions, original
official binaries, backups, and the generated 245 MB plugin were excluded from
Git. The repository contains the parts that describe and reproduce the
customization around locally supplied official build inputs: branding assets,
Chinese resources, patched frontend, packaging script, architecture notes,
build instructions, limitations, and this development record.

Throughout the work, the project scope was clarified as follows:

- It is not a newly written IntelliJ plugin.
- It is not a complete conversion of the VS Code extension.
- It does not modify or rebuild the Cline core.
- It reuses the official compiled IntelliJ host and core.
- It uses the Chinese VS Code extension as the source of the visible Chinese
  browser interface.
- It adds the compatibility changes required for that interface to run inside
  IntelliJ.
- It is currently intended for local testing and internal use.

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
