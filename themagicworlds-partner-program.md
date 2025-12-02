The Magic Worlds Partner Program: Strategy
Blueprint (Tapfiliate Focus)
Prepared for: The Magic Worlds Leadership Team Focus: High-Conversion, Dual-Incentive Web3 Model
Final Landing Page URL: https://www.themagicworlds.com/play
I. Program Overview & Financial Model
The program uses a dual-incentive model to maximize recruitment and retention, appealing to both
high-value content creators and Web3 players.

1. Affiliate Commission Structure
   Payout Type Basis Rate & Timing Purpose
   Long-Term
   Commission
   Referred Player's
   Transaction Value
   (Revenue)
   20% of total player spend
   (LTV basis). Paid Weekly
   (Saturdays).
   Motivates affiliates to drive
   high-quality, high-spending
   users.
   Instant Bonus Successful Wallet
   Connect (First-Time)
   $TOKEN (Amount TBC) Motivates affiliates with an
   immediate reward for driving
   the primary conversion
   event.
2. Payout and Currency
   ● Payment Method: Manual (Data Export Required)
   ● Currency: MWG token or equivalent.
   ● Process: Tracking data is exported from Tapfiliate weekly, and rewards are sent manually by the
   operations team.
   II. Conversion & S2S Tracking Protocol
3. Primary Conversion Event (PCE)
   The successful conversion for the affiliate is defined by the Wallet Connect action. This event triggers the
   instant $TOKEN bonus and establishes the player's lifetime affiliate link.
4. S2S Postback Tracking Implementation
   Since the key events occur inside the game app, we are utilizing Server-to-Server (S2S) Postback
   Tracking for maximum security and accuracy.
   Tracking Detail Status Protocol
   Tracking Platform Tapfiliate S2S Postback (V1.7 API)
   Authentication API Key 13e59dc5cac6c9465facaa7d86379c77d3793133
   Affiliate ID Link referral_code Captured from the affiliate's ref= URL parameter on the
   landing page.
   LTV Tracking ID customer_id Player's Wallet Address (used in S2S calls).
5. Required S2S Events (Implemented by Engineering)
   Event Type Purpose (Reward Trigger) API Call
   Wallet Connect
   (Customer)
   Triggers the Instant $TOKEN Bonus and
   establishes LTV tracking.
   /cus/c/ (Create
   Customer)
   Revenue Event
   (Conversion)
   Triggers the 20% Revenue Commission. /con/c/ (Create
   Conversion)
   III. Target Audiences & Pitch Summary
   Target Group Primary Motivation Affiliate Pitch Focus
   The Affiliate
   (Recruiter)
   Financial (High LTV + Instant
   Bonus)
   "20% Revenue Share" and "Easy Wallet Connect
   Conversions."
   The Customer
   (Player)
   Earning, Quality, and
   Accessibility
   "FREE Download," "Instant $TOKEN," and
   "Immersive AI RPG."
