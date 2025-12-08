# scraper.py
# pip install requests beautifulsoup4
import requests
from bs4 import BeautifulSoup

URL = "https://www.bbc.com/news"

def fetch_headlines(url=URL):
    r = requests.get(url, timeout=10)
    r.raise_for_status()
    doc = BeautifulSoup(r.text, "html.parser")
    headlines = []
    for h in doc.select("h3"):
        text = h.get_text(strip=True)
        if text:
            headlines.append(text)
    return headlines[:10]

if __name__ == "__main__":
    for i, h in enumerate(fetch_headlines(), 1):
        print(i, h)
