#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
work_root="$project_root/work"
main_jar="$work_root/main-jar"
standalone="$work_root/standalone"
plugin_lib="$work_root/plugin/lib"
branding="$project_root/branding"
webview="$project_root/webview-ui/build"
output="$project_root/dist/NORINCO-Code-Agent-2.0.7-zh-local.zip"
temporary_root="$(mktemp -d)"
trap 'rm -rf "$temporary_root"' EXIT

cp "$branding/pluginIcon.svg" "$main_jar/META-INF/pluginIcon.svg"
cp "$branding/pluginIcon_dark.svg" "$main_jar/META-INF/pluginIcon_dark.svg"
cp "$branding/plugin.xml" "$main_jar/META-INF/plugin.xml"
cp "$branding/toolWindow.svg" "$main_jar/icons/clineLogo13x13.svg"
cp "$branding/toolWindow.svg" "$main_jar/icons/clineLogo13x13_dark.svg"
cp "$branding/toolWindow.svg" "$main_jar/icons/clineLogo16x16.svg"
cp "$branding/toolWindow.svg" "$main_jar/icons/clineLogo16x16_dark.svg"
cp "$branding/ClineBundle.properties" "$main_jar/messages/ClineBundle.properties"
cp "$branding/ClineBundle_zh_CN.properties" "$main_jar/messages/ClineBundle_zh_CN.properties"

cp "$branding/embedded-icons/icon.png" "$standalone/extension/assets/icons/icon.png"
cp "$branding/embedded-icons/icon.svg" "$standalone/extension/assets/icons/icon.svg"
cp "$branding/embedded-icons/cline-bot.svg" "$standalone/extension/assets/icons/cline-bot.svg"
cp "$branding/embedded-icons/cline-bot.ttf" "$standalone/extension/assets/icons/cline-bot.ttf"
cp "$branding/embedded-icons/cline-bot.woff" "$standalone/extension/assets/icons/cline-bot.woff"

# Replace the official JetBrains webview with the patched Chinese standalone build.
rm -rf "$standalone/extension/webview-ui/build"
mkdir -p "$standalone/extension/webview-ui/build"
cp -a "$webview/." "$standalone/extension/webview-ui/build/"

(
  cd "$standalone"
  zip -q -r "$temporary_root/standalone.zip" .
)
cp "$temporary_root/standalone.zip" "$main_jar/standalone.zip"

(
  cd "$main_jar"
  zip -q -r "$temporary_root/cline-2.0.7.jar" .
)

mkdir -p "$temporary_root/NORINCO-Code-Agent/lib"
cp -a "$plugin_lib/." "$temporary_root/NORINCO-Code-Agent/lib/"
cp "$temporary_root/cline-2.0.7.jar" "$temporary_root/NORINCO-Code-Agent/lib/cline-2.0.7.jar"

(
  cd "$temporary_root"
  zip -q -r "$output" NORINCO-Code-Agent
)

unzip -t "$output" >/dev/null
sha256sum "$output"
