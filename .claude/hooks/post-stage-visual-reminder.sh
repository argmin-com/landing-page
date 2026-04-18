#!/usr/bin/env bash
# PostToolUse hook: Remind to check dark mode when visual files are staged.
#
# Claude Code invokes this with JSON on stdin after tool execution:
#   {"tool_name":"Bash","tool_input":{"command":"git add ..."}}
# We respond with JSON. This is an advisory warning, not a block.

set -euo pipefail

input=$(cat)
tool=$(printf '%s' "$input" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_name',''))")
cmd=$(printf '%s' "$input" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))")

# Only act on git add commands
case "$tool" in
  Bash) ;;
  *) echo '{}'; exit 0 ;;
esac

case "$cmd" in
  git\ add*) ;;
  *) echo '{}'; exit 0 ;;
esac

# Check if any staged files are visual (astro/css)
if echo "$cmd" | grep -qE '\.(astro|css)' 2>/dev/null; then
  echo '{"message":"Visual file staged. CLAUDE.md rule 6: verify dark mode and capture before/after screenshots at 375px + 1440px before committing."}'
  exit 0
fi

echo '{}'
