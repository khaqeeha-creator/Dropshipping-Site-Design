# Directive: Fetch Trending Products

**Goal**: Populate the `trending_products` Supabase table with top items from Roposo Cloud.

## Inputs
- Source URL: `https://roposo.com/collections/trending-now`
- Markup Factor: 2.5x

## Tools
- `execution/fetch_roposo_products.py`

## Process
1. **Run Scraper**:
   ```bash
   python execution/fetch_roposo_products.py
   ```
2. **Logic**:
   - Fetch HTML from Roposo.
   - Parse Product Title, Image, Original Price.
   - Calculate New Price = Original * 2.5.
   - Upsert to Supabase (match on `source_url`).

## Output
- Supabase Table `trending_products` populated with 50+ items.
- Frontend displays these items automatically.
