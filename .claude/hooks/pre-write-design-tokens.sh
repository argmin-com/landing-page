#!/usr/bin/env bash
# PreToolUse hook: Block Write/Edit operations that introduce hardcoded colors in source files.
#
# Claude Code invokes this with JSON on stdin:
#   {"tool_name":"Edit|Write","tool_input":{"file_path":"...","new_string":"...","content":"..."}}
# We respond with JSON:
#   {"decision":"block","reason":"..."} to block, or {} to allow.

set -euo pipefail

input=$(cat)
# Extract file and content without requiring jq; fall back gracefully.
file=$(printf '%s' "$input" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path') or '')")
content=$(printf '%s' "$input" | python3 -c "import json,sys; d=json.load(sys.stdin); ti=d.get('tool_input',{}); print(ti.get('new_string') or ti.get('content') or '')")

# Only check source files, skip docs and the validator itself
case "$file" in
  */src/*.astro|*/src/*.css|*/src/*.tsx|*/src/*.jsx)
    ;;
  *)
    echo '{}'
    exit 0
    ;;
esac

# Skip the tokens themselves — CSS var definitions legitimately have rgb() values
if printf '%s' "$content" | grep -qE '^\s*--color-argmin-' 2>/dev/null; then
  echo '{}'
  exit 0
fi

# Detect hardcoded Tailwind palette
if printf '%s' "$content" | grep -qE '\b(text|bg|border|ring|fill|stroke|decoration|accent|caret|outline)-(amber|emerald|sky|rose|red|green|blue|yellow|orange|purple|pink|indigo|teal|cyan|lime|fuchsia|violet|slate|gray|zinc|neutral|stone)-[0-9]{2,3}\b' 2>/dev/null; then
  python3 -c "import json; print(json.dumps({'decision':'block','reason':'Hardcoded Tailwind palette class detected. Use --color-argmin-* tokens or semantic tokens (success/warning/danger). See docs/design-system.md. Block applied to: $file'}))"
  exit 0
fi

# Detect hex literals in style attrs
if printf '%s' "$content" | grep -qE 'style=.*#[0-9a-fA-F]{3,8}' 2>/dev/null; then
  python3 -c "import json; print(json.dumps({'decision':'block','reason':'Inline hex color in style attribute. Use CSS variable from --color-argmin-* tokens. See docs/design-system.md. Block applied to: $file'}))"
  exit 0
fi

# Detect arbitrary hex in Tailwind
if printf '%s' "$content" | grep -qE '(text|bg|border|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]' 2>/dev/null; then
  python3 -c "import json; print(json.dumps({'decision':'block','reason':'Hardcoded hex in Tailwind arbitrary value. Use token class. See docs/design-system.md. Block applied to: $file'}))"
  exit 0
fi

echo '{}'
