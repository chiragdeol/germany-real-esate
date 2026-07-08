with open(r"C:\Users\Boxinall\.gemini\antigravity\brain\d0899570-6bd7-45b4-882b-825453f4c0c0\.system_generated\steps\985\content.md", "r", encoding="utf-8") as f:
    text = f.read()

# Let's clean the HTML tags and print non-empty lines to see all textual content
import html
import re

# Remove script and style elements
text_clean = re.sub(r'<(script|style).*?>.*?</\1>', '', text, flags=re.DOTALL)
# Remove all HTML tags
text_clean = re.sub(r'<[^>]+>', ' ', text_clean)
# Decode HTML entities
text_clean = html.unescape(text_clean)
# Split into lines
lines = [l.strip() for l in text_clean.split("\n") if l.strip()]

print(f"Total lines: {len(lines)}")
# Write to a file for review
with open("scratch/clean_text_check.txt", "w", encoding="utf-8") as f_out:
    for l in lines:
        f_out.write(l + "\n")

# Print lines that contain interesting words or show first 50 lines
for i, l in enumerate(lines[:80]):
    if len(l) > 10:
        print(f"{i}: {l[:120]}")
