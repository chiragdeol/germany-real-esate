import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    "https://kommunalkapital.com/",
    "https://kommunalkapital.com/datenschutz",
    "https://kommunalkapital.com/admin"
]

for url in urls:
    print(f"\n--- Fetching {url} ---")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            print(f"Status Code: {response.status}")
            print(f"URL: {response.geturl()}")
            print(f"Content Type: {response.headers.get('content-type')}")
            # print first 200 chars of body
            html_body = response.read(200).decode('utf-8', errors='ignore')
            print(f"Body: {html_body[:200]}")
    except Exception as e:
        print(f"Error fetching: {e}")
