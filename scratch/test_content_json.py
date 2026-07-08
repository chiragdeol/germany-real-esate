import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://kommunalkapital.com/api/content"
print(f"Fetching content from {url}...")

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
        content_bytes = response.read()
        print(f"Response size: {len(content_bytes)} bytes")
        
        # Decode and try to parse as JSON
        content_text = content_bytes.decode('utf-8')
        data = json.loads(content_text)
        
        print("\n--- Top level keys in returned JSON ---")
        print(list(data.keys()))
        
        # Print the legal page structures
        for key in ['impressum', 'datenschutz', 'cookies']:
            if key in data:
                print(f"\n[{key}] present. Type: {type(data[key])}")
                if isinstance(data[key], dict):
                    print(f"Keys: {list(data[key].keys())}")
                    text_val = data[key].get('text')
                    print(f"Text type: {type(text_val)}")
                    if text_val:
                        print(f"Text length: {len(text_val)} chars")
                        print(f"Text sample (first 100 chars):\n{text_val[:100]}")
                    else:
                        print("WARNING: 'text' field is empty or missing!")
                else:
                    print(f"WARNING: '{key}' is not a dictionary!")
            else:
                print(f"\nWARNING: Key '{key}' is MISSING from response!")
                
except Exception as e:
    print(f"Error: {e}")
