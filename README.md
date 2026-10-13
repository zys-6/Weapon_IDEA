# NORINCO Code Agent for IntelliJ IDEA

NORINCO Code Agent is a local Chinese customization of the Cline 2.0.7
IntelliJ plugin. It combines the official compiled JetBrains integration with
an adapted Chinese web interface and custom branding.

See [2026-10-13 work summary](docs/2026-10-13-work-summary.md) for the complete
record of the initial customization, debugging, packaging, and repository work.

## Project origin

The project uses three inputs:

- The official [Cline](https://github.com/cline/cline) IntelliJ plugin 2.0.7
  (`bot.cline`) provides the compiled Java/Kotlin integration, JetBrains tool
  window, editor and file operations, terminal access, approvals, JCEF host,
  and standalone Cline core.
- [Cline Chinese](https://github.com/SSYCloud/cline-chinese) 4.1.23, published
  by HybridTalentComputing under Apache-2.0, provides the compiled Chinese web
  interface.
- Locally supplied replacement icons provide the NORINCO Code Agent branding.

This repository does not contain a new IntelliJ implementation of Cline. It
repackages the official compiled IntelliJ plugin and adapts only the
browser-based Chinese frontend. The VS Code host, command registration, editor,
terminal, and extension lifecycle code are not used.

## Why this design was chosen

VS Code and IntelliJ use different extension APIs, package formats, webview
bridges, lifecycle models, editor APIs, and terminal APIs. Porting the complete
VS Code extension would require rebuilding and maintaining all native JetBrains
integration from scratch.

The Chinese VS Code extension already contained the translated chat, settings,
onboarding, messages, React components, and styling. Reusing that frontend while
keeping the official IntelliJ host provided the requested local plugin faster
and preserved the native functionality already implemented by Cline.

```text
Patched Chinese frontend 4.1.23
        ↓ standalone JSON bridge
Official compiled IntelliJ integration 2.0.7
        ↓ gRPC/protobuf
Official IntelliJ Cline core 2.0.7
        ↓
Configured cloud or local AI provider
```

The Cline core and native Java/Kotlin `.class` files were not modified. They
were copied from the locally installed official plugin and repackaged. Internal
plugin ID `bot.cline` and tool-window ID `Cline` were preserved because the
compiled classes refer to them directly.

## Changes and compatibility fixes

| Problem or requirement | Cause | Change |
| --- | --- | --- |
| Chinese name and appearance | The official plugin used Cline branding and English native resources | Changed visible branding to NORINCO Code Agent, added Chinese IntelliJ strings, and replaced plugin, tool-window, and embedded icons |
| Sidebar stayed on “Connecting” | The Chinese frontend used the VS Code `postMessage` bridge | Selected the IntelliJ `standalone` handler and JSON message encoding |
| Sidebar failed while opening settings and other views | IntelliJ's `internal.resources` handler could not load runtime JavaScript chunks | Bundled 18 frontend modules into one browser entry with no runtime dynamic imports |
| Batch displayed `Unknown service: cline.LoomLoomService` | Cline Chinese 4.1.23 expected a service absent from the IntelliJ 2.0.7 core | Removed the Batch selector and disabled persisted Batch controls; Plan and Act remain available |
| Renaming internal IDs could break the plugin | Compiled JetBrains classes use the original identifiers | Changed only user-facing branding and retained `bot.cline` and `Cline` internally |

## Scope and limitations

This repository can change the web interface, translations, icons, branding,
HTML, CSS, JavaScript behavior, and packaging process. It cannot normally
rebuild or maintain native IntelliJ behavior because the matching Java/Kotlin
source project is not included.

The Chinese frontend and IntelliJ core are different versions. Newer frontend
features may request services unavailable in the older core and must be adapted
or disabled. Future upgrades should retest message compatibility, resource
loading, and service availability.

The result is a hybrid binary customization for local testing and internal use,
not a fully source-buildable independent IntelliJ port. Access to installed JAR
files also does not by itself grant redistribution rights; verify upstream
licenses before publishing a complete modified binary.

## Repository contents

- `branding/`: replacement icons and Chinese native resource strings
- `webview-ui/build/`: patched Chinese standalone web interface
- `scripts/package.sh`: repeatable local repackaging script

Extracted official binaries, backups, working directories, and generated plugin
packages are excluded from Git.

## Build locally

Prepare the following local inputs:

```text
work/main-jar/    extracted cline-2.0.7.jar
work/plugin/lib/  libraries from the official IntelliJ plugin
work/standalone/  extracted official standalone.zip
```

Run:

```bash
./scripts/package.sh
```

The package is generated at:

```text
dist/NORINCO-Code-Agent-2.0.7-zh-local.zip
```

The ZIP is approximately 245 MB and exceeds GitHub's normal 100 MB Git object
limit. Publish it as a GitHub Release asset instead of committing it to Git.

## Install

Disable or uninstall the official Cline plugin first. In IntelliJ IDEA, open
**Settings > Plugins**, choose **Install Plugin from Disk**, select the generated
ZIP, and restart the IDE.

This is an unofficial local customization and is not an official NORINCO or
Cline release.
