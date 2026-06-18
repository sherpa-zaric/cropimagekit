#!/bin/bash
# ImageCropKit Code Packager
# Packages all project source code into a zip, excluding third-party dependencies.
# Usage: ./package-pack.sh [output-filename]

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_NAME="${1:-cropimagekit-core.zip}"
OUTPUT_PATH="$PROJECT_ROOT/$OUTPUT_NAME"

echo "📦 Packaging ImageCropKit source code..."
echo "   Output: $OUTPUT_PATH"

cd "$PROJECT_ROOT"

# Use git archive to include only tracked files (auto-excludes node_modules, .next, .git, etc.)
git archive --format=zip --output="$OUTPUT_PATH" HEAD

echo ""
echo "✅ Done!"
echo "   File: $OUTPUT_PATH"
echo "   Size: $(ls -lh "$OUTPUT_PATH" | awk '{print $5}')"
echo "   Files: $(unzip -l "$OUTPUT_PATH" | tail -1 | awk '{print $2}')"
