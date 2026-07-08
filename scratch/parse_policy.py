import re

path = r"C:\Users\Boxinall\.gemini\antigravity\brain\d0899570-6bd7-45b4-882b-825453f4c0c0\.system_generated\steps\985\content.md"

with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Find all text content from paragraphs and headings
# Since wix pages put text inside span / p tags, let's search for span or p text
# We can find tag patterns
text_blocks = []
# Find all occurrences of text inside p, span, h1-h6 tags
pattern = re.compile(r'<(h1|h2|h3|h4|h5|h6|p|span)[^>]*>(.*?)</\1>', re.DOTALL)
matches = pattern.findall(html)

for tag, text in matches:
    # clean HTML tags inside text
    clean_text = re.sub(r'<[^>]+>', '', text).strip()
    # clean whitespace
    clean_text = re.sub(r'\s+', ' ', clean_text)
    if len(clean_text) > 10:
        # Avoid navigation headers
        if any(nav in clean_text for nav in ["Über uns", "Media Centre", "FAQ", "Impressum", "Veräußerung als Globalobjekt", "Mezzanine"]):
            continue
        text_blocks.append((tag, clean_text))

# Let's save the cleaned text blocks
with open("scratch/policy_content_raw.txt", "w", encoding="utf-8") as f_out:
    for tag, txt in text_blocks:
        f_out.write(f"[{tag.upper()}]: {txt}\n")

print(f"Extracted {len(text_blocks)} blocks.")
# Print the first 30 blocks
for tag, txt in text_blocks[:40]:
    print(f"[{tag.upper()}]: {txt[:100]}...")
