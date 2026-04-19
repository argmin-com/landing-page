#!/usr/bin/env bash
# PostToolUse hook: Remind to check dark mode when visual files are staged.
#
# Claude Code invokes this with JSON on stdin after tool execution.
# We respond with JSON containing `additionalContext` for advisory messages.

set -euo pipefail

input=$(cat)

if command -v node >/dev/null 2>&1; then
  tool=$(printf '%s' "$input" | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); console.log(d.tool_name || '')")
  cmd=$(printf '%s' "$input" | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); console.log((d.tool_input && d.tool_input.command) || '')")
elif command -v python3 >/dev/null 2>&1; then
  tool=$(printf '%s' "$input" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_name',''))")
  cmd=$(printf '%s' "$input" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))")
else
  echo '{}'
  exit 0
fi

# Only act on Bash tool calls that look like git add
case "$tool" in
  Bash) ;;
  *) echo '{}'; exit 0 ;;
esac

case "$cmd" in
  git\ add*) ;;
  *) echo '{}'; exit 0 ;;
esac

# Check actual staged files rather than parsing the command string
if git diff --cached --name-only 2>/dev/null | grep -qE '\.(astro|css)$'; then
  echo '{"additionalContext":"Visual file staged. CLAUDE.md rule 6: verify dark mode and capture before/after screenshots at 375px + 1440px before committing."}'
  exit 0
fi

echo '{}'
