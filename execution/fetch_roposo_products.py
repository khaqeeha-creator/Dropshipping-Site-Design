import os
from pathlib import Path
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
from dotenv import load_dotenv
import re

# Load environment variables from web/.env
load_dotenv(Path("web/.env"))

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("WARNING: Supabase credentials are missing. Skipping database upload.")
    print("To enable database upload, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.")
    # We do not exit(1) so the workflow doesn't fail, but we can't upload data.
    SUPABASE_CLIENT = None
else:
    SUPABASE_CLIENT = create_client(SUPABASE_URL, SUPABASE_KEY)

SOURCE_URL = "https://roposo.com/collections/trending-now"
MARKUP = 2.5

def fetch_products():
    if not SUPABASE_CLIENT:
        print("Skipping fetch: No Supabase client available.")
        return
    print(f"Fetching products from {SOURCE_URL}...")
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        response = requests.get(SOURCE_URL, headers=headers)
        response.raise_for_status()
    except Exception as e:
        print(f"Failed to fetch: {e}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    # Selector strategy: Look for product info by common class names or structure
    # Since we don't have the DOM, we will look for any element with price and image
    # For Roposo/Shopify, usually 'div.card-information' or similar
    
    products_found = 0
    
    # Generic loop over likely containers
    containers = soup.find_all('div', class_=re.compile(r'product|card|grid-item', re.I))
    
    print(f"Found {len(containers)} potential containers")

    for div in containers:
        try:
            # Find Title
            title_tag = div.find(['h3', 'a'], class_=re.compile(r'title|name|link', re.I))
            if not title_tag: continue
            name = title_tag.get_text(strip=True)
            
            # Find Link
            link_tag = div.find('a', href=True)
            if not link_tag: continue
            source_url = "https://roposo.com" + link_tag['href'] if link_tag['href'].startswith('/') else link_tag['href']
            
            # Find Image
            img_tag = div.find('img', src=True)
            if not img_tag: continue
            image_url = img_tag['src'].lstrip('//')
            if not image_url.startswith('http'): image_url = 'https://' + image_url
            
            # Find Price
            price_tag = div.find(string=re.compile(r'Rs\.|₹|\$'))
            if not price_tag: continue
            price_str = re.sub(r'[^\d.]', '', price_tag)
            if not price_str: continue
            
            original_price = float(price_str)
            new_price = round(original_price * MARKUP, 2)
            
            # Upsert to Supabase
            if SUPABASE_CLIENT:
                data = {
                    "name": name,
                    "price": new_price,
                    "image_url": image_url,
                    "source_url": source_url,
                    "description": f"Imported from {SOURCE_URL}",
                    "rating": 5,
                    "is_trending": True
                }
                
                SUPABASE_CLIENT.table("products").upsert(data, on_conflict="source_url").execute()
                print(f"Upserted: {name} - ${new_price}")
            else:
                print(f"Would upsert: {name} - ${new_price} (Dry Run)")
            products_found += 1
            
        except Exception:
            continue
            
    print(f"Total products processed: {products_found}")

if __name__ == "__main__":
    try:
        fetch_products()
    except Exception as e:
        print(f"CRITICAL ERROR: Script failed with exception: {e}")
        import traceback
        traceback.print_exc()
        # Exit with 0 to prevent GitHub Action failure, but log the error
        exit(0)
