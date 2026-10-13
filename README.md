# NORINCO Code Agent for IntelliJ IDEA

This repository contains a local Chinese customization of the Cline 2.0.7
IntelliJ plugin. It keeps Cline's JetBrains integration and replaces its web UI
with a Chinese build branded as **NORINCO Code Agent**.

## Project origin

This project is a hybrid customization assembled from these sources:

- The official [Cline](https://github.com/cline/cline) IntelliJ plugin,
  version **2.0.7** (`bot.cline`). It provides the JetBrains tool window,
  editor and file integration, terminal integration, approval handling,
  host bridge, and Cline core runtime.
- The community [Cline Chinese](https://github.com/SSYCloud/cline-chinese)
  VS Code extension, version **4.1.23**, published by
  **HybridTalentComputing** under Apache-2.0. It provides the compiled Chinese
  web interface used in this customization.
- Locally supplied replacement icons, used for the NORINCO Code Agent
  branding.

This is not a direct conversion of the complete VS Code extension into a
JetBrains plugin. The official IntelliJ plugin remains the native host, while
the Chinese VS Code web interface was transplanted and adapted to communicate
with that host.

## Background and design decision

The project began with a practical requirement: provide a Chinese, locally
installable IntelliJ IDEA edition of Cline named **NORINCO Code Agent**, using
custom icons and without rebuilding the complete coding agent from the ground
up.

A VS Code extension cannot run directly as an IntelliJ plugin. The two
platforms use different extension APIs, package formats, webview bridges,
lifecycle models, editor APIs, terminal APIs, and approval mechanisms. A full
port of Cline Chinese would therefore require rebuilding and maintaining all of
its IDE integration for JetBrains.

This project instead uses a hybrid design:

1. Keep the official Cline IntelliJ plugin as the native JetBrains host.
2. Keep its editor, file, terminal, approval, tool-window, host-bridge, and core
   runtime integration.
3. Transplant the compiled interface from Cline Chinese.
4. Adapt that interface to the protocol and resource-loading behavior expected
   by the IntelliJ host.
5. Apply the NORINCO Code Agent name, Chinese native resources, and replacement
   icons at the user-facing layer.

This approach was selected because it produces a usable local IntelliJ plugin
much faster and with less risk than writing a new JetBrains integration from
scratch. It also preserves the behavior already implemented and tested by the
official Cline IntelliJ plugin.

The main tradeoff is version coupling. The Chinese interface comes from Cline
Chinese 4.1.23, while the IntelliJ host and core come from Cline 2.0.7. Features
that exist only in the Chinese VS Code fork may call services that the IntelliJ
core does not implement. Such features must be adapted or disabled, as was done
for Batch/LoomLoom. Future upgrades should test the message protocol, frontend
resource loading, and service availability again before release.

## Key questions and answers

### Did this project create a new IntelliJ plugin from source?

No. It customizes and repackages the compiled official Cline IntelliJ plugin.
The native Java/Kotlin implementation was not rebuilt from source.

### Did this project convert the complete VS Code extension to IntelliJ?

No. It adapted the compiled Chinese web interface from the VS Code extension
to run inside the existing Cline IntelliJ plugin. VS Code-specific host code,
command registration, editor integration, terminal integration, and extension
lifecycle code were not used.

### What is reused from the official IntelliJ plugin?

The project reuses the official compiled Java/Kotlin classes, dependency JARs,
standalone Cline core, JetBrains tool window, JCEF hosting, editor and file
operations, terminal integration, approvals, and plugin lifecycle handling.

### Was the Cline core changed?

No. The Cline core bundled with the official IntelliJ plugin 2.0.7 is copied
and repackaged without implementation changes. The project changes the
frontend, resources, branding, and package contents around that core.

### Are the VS Code and IntelliJ backends identical?

They belong to the same Cline architecture and share many concepts and service
interfaces, but the builds used here are not identical. The Chinese frontend
comes from version 4.1.23, while the IntelliJ host and core are version 2.0.7.
The newer frontend can therefore request services that the older IntelliJ core
does not provide.

### Why use the VS Code extension at all?

The Cline Chinese VS Code extension already contained the Chinese chat,
settings, onboarding, labels, messages, React components, and styling needed
for the requested interface. Reusing that frontend avoided translating and
rebuilding every screen from scratch.

Only its browser-based frontend was reused. The official IntelliJ plugin still
performs all native IDE operations.

### Why could the installed IntelliJ plugin be customized if its matching native source was unavailable?

IntelliJ must store the installed plugin's compiled distribution locally in
order to run it. That distribution contains JAR files, JVM `.class` files,
resources, and the standalone runtime. JAR files can be extracted and
repackaged even when the original `.java` or `.kt` source project is not
available.

Access to a compiled distribution is not the same as having a complete
open-source project. The native implementation cannot be maintained or rebuilt
normally without its corresponding source code.

### What exactly was changed?

- Replaced the user-facing name with NORINCO Code Agent.
- Replaced plugin, tool-window, and embedded interface icons.
- Added Chinese native IntelliJ resource strings.
- Replaced the English web interface with the Cline Chinese frontend.
- Changed frontend messaging from the VS Code bridge to the IntelliJ
  `standalone` JSON bridge.
- Bundled dynamic JavaScript modules into one entry file for IntelliJ's
  internal resource loader.
- Removed Batch/LoomLoom controls because the IntelliJ core has no
  `cline.LoomLoomService`.
- Added a repeatable local packaging script and technical documentation.

### What can be changed easily now?

The visible web interface, translations, branding, icons, HTML, CSS,
JavaScript behavior, and packaging process can be changed. Native IntelliJ
behavior implemented in the compiled Java/Kotlin classes cannot be changed or
rebuilt normally from this repository.

### What is the current result?

The result is a locally installable hybrid binary customization:

```text
Patched Chinese frontend 4.1.23
        +
Official compiled IntelliJ integration 2.0.7
        +
Official IntelliJ Cline core 2.0.7
        +
NORINCO Code Agent branding
```

It is suitable for local testing and internal use. It is not a fully
source-buildable, independent IntelliJ implementation of Cline.

## Changes

- Changed the displayed plugin name and vendor.
- Replaced the plugin, tool-window, and embedded webview icons.
- Added Chinese IntelliJ resource strings.
- Changed the transplanted VS Code webview to use the JetBrains `standalone`
  message bridge with JSON encoding.
- Bundled dynamically imported frontend modules into one JavaScript file because
  IntelliJ's internal resource handler could not load the original chunks.
- Removed the unsupported Batch/LoomLoom UI. The IntelliJ Cline core does not
  provide `cline.LoomLoomService`.

## Problems found and fixes applied

| Problem | Cause | Fix |
| --- | --- | --- |
| The sidebar remained on “Connecting” | The Chinese web UI was compiled for the VS Code `postMessage` bridge | Changed the frontend platform configuration to JetBrains `standalone`, enabled JSON message encoding, and selected the standalone message handler |
| The sidebar showed “Failed to load” | The Chinese frontend used runtime JavaScript chunk imports through `internal.resources`, which the IntelliJ resource handler could not load | Rebundled 18 frontend modules into one browser JavaScript bundle and removed runtime dynamic imports |
| Pressing Batch showed `Unknown service: cline.LoomLoomService` | Batch/LoomLoom is an extra service in the Chinese VS Code build and is absent from the official IntelliJ core | Removed the Batch mode selector and disabled rendering of persisted Batch controls; Plan and Act remain available |
| Branding was inconsistent | Native IntelliJ resources and embedded web assets used different Cline names and icons | Changed visible names to NORINCO Code Agent, added Chinese native strings, and replaced plugin, tool-window, and embedded icons |
| Changing internal IDs risked breaking the compiled plugin | Compiled JetBrains classes refer directly to the original plugin and tool-window identifiers | Kept internal plugin ID `bot.cline` and tool-window ID `Cline`, while changing only user-facing branding |
| The installable plugin could not be committed to GitHub | The generated ZIP is approximately 245 MB and exceeds GitHub's normal 100 MB Git object limit | Excluded generated packages from Git and documented publishing the ZIP as a GitHub Release asset |

The internal plugin ID remains `bot.cline`, and the internal tool-window ID
remains `Cline`, because compiled JetBrains classes refer to those identifiers.
Disable or uninstall the official Cline plugin before installing this build.

## Repository layout

- `branding/`: replacement icons and Chinese native resource strings
- `webview-ui/build/`: patched Chinese standalone web UI
- `scripts/package.sh`: local repackaging script

The repository intentionally excludes extracted official plugin binaries,
temporary working directories, backups, and generated ZIP files.

## Build locally

Prepare these local inputs under `work/`:

- `work/main-jar/`: extracted `cline-2.0.7.jar`
- `work/plugin/lib/`: libraries from the official plugin
- `work/standalone/`: extracted official `standalone.zip`

Then run:

```bash
./scripts/package.sh
```

The generated plugin is written to:

```text
dist/NORINCO-Code-Agent-2.0.7-zh-local.zip
```

The generated ZIP is larger than GitHub's normal 100 MB file limit. Publish it
as a GitHub Release asset instead of committing it to Git history.

## Install

In IntelliJ IDEA, open **Settings > Plugins**, choose **Install Plugin from
Disk**, select the generated ZIP, and restart the IDE.

This is an unofficial local customization and is not an official NORINCO or
Cline release.
