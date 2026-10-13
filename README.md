# NORINCO Code Agent for IntelliJ IDEA

This repository contains a local Chinese customization of the Cline 2.0.7
IntelliJ plugin. It keeps Cline's JetBrains integration and replaces its web UI
with a Chinese build branded as **NORINCO Code Agent**.

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
