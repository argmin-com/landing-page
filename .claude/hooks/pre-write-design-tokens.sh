#!/usr/bin/env bash
# PreToolUse hook: Block Write/Edit operations that introduce hardcoded colors in source files.
#
# Claude Code invokes this with JSON on stdin:
#   {"tool_name":"Edit|Write","tool_input":{"file_path":"...","new_string":"...","content":"..."}}
# We respond with JSON:
#   {"decision":"block","reason":"..."} to block, or {} to allow.
#
# Color pattern is aligned with scripts/validate-design-tokens.mjs so the hook
# catches the same violations CI would catch. Runs BEFORE the write lands so
# violations never reach the working tree.

set -euo pipefail

input=$(cat)
file=$(printf '%s' "$input" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path') or '')")
content=$(printf '%s' "$input" | python3 -c "import json,sys; d=json.load(sys.stdin); ti=d.get('tool_input',{}); print(ti.get('new_string') or ti.get('content') or '')")

# Only check source files that should follow the token system.
# Use explicit matchers that cover nested paths (src/pages/*, src/components/*, src/styles/*, etc.).
case "$file" in
  *src/*.astro|*src/*.css|*src/*.tsx|*src/*.jsx|*src/*.ts|*src/*.js) ;;
  *) echo '{}'; exit 0 ;;
esac

# Path-scoped exemptions:
# - global.css defines the token palette itself; rgb() values are expected there.
# - argmin_enterprise_system_er_diagram.jsx is a legacy standalone artifact.
case "$file" in
  *src/styles/global.css|*src/components/argmin_enterprise_system_er_diagram.jsx)
    echo '{}'; exit 0 ;;
esac

block() {
  local reason="$1"
  python3 -c "import json,sys; print(json.dumps({'decision':'block','reason':sys.argv[1]}))" "$reason"
  exit 0
}

# Check 1: Hardcoded Tailwind palette classes, including base colors (black/white/transparent)
# and gradient stop utilities (from/to/via). Aligned with validate-design-tokens.mjs.
# Strip the allowlisted `border-transparent` utility before matching (mirrors validator allowlist).
check1_content=$(printf '%s' "$content" | sed 's/\bborder-transparent\b//g')
if printf '%s' "$check1_content" | grep -qE '\b(text|bg|border|ring|from|to|via|fill|stroke|decoration|accent|caret|outline)-((amber|emerald|sky|rose|red|green|blue|yellow|orange|purple|pink|indigo|teal|cyan|lime|fuchsia|violet|slate|gray|zinc|neutral|stone)-[0-9]{2,3}|black|white|transparent)\b' 2>/dev/null; then
  block "Hardcoded Tailwind palette class in $file. Use --color-argmin-* tokens or semantic tokens (success/warning/danger). See docs/design-system.md."
fi

# Check 2: Inline hex literals in style attributes (HTML string or JSX object syntax)
if printf '%s' "$content" | grep -qE 'style=(\"[^\"]*|\{\{?[^}]*)(#[0-9a-fA-F]{3,8}|rgb\s*\(|rgba\s*\(|hsl\s*\()' 2>/dev/null; then
  block "Inline hardcoded color in style attribute in $file. Use a token class or a CSS variable. See docs/design-system.md."
fi

# Check 3: Hardcoded hex in Tailwind arbitrary values
if printf '%s' "$content" | grep -qE '(text|bg|border|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]' 2>/dev/null; then
  block "Hardcoded hex in Tailwind arbitrary value in $file. Use a token class. See docs/design-system.md."
fi

echo '{}'
