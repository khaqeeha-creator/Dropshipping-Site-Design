# Directive: Update Site Hierarchy

**Goal**: Restructure the site layout to prioritize Key Metrics ("APU") and adjust the visual hierarchy of the product listing.

## Context
The user wants to emphasize "APU numbers" (interpreted as Key Metrics like Sales, Active Users, etc.) over the standard product grid. This involves adding a new "Stats" section and managing the layout.

## Process
1. **Directory Structure**: Ensure web app lives in `web/` to separate it from Agent logic.
2. **Components**:
   - `web/src/app/components/Stats.tsx`: Create this component to display metrics.
   - Use `framer-motion` for dominance (animations, size).
3. **Integration**:
   - Import `Stats` in `web/src/app/App.tsx`.
   - Place `Stats` immediately after `Hero`.
   - Add visual separation to `Products`.

## Verification
- Check that `Stats` appears above `Products`.
- Verify metrics are readable and dominant.
