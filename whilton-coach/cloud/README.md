# The team's shared brain: setup

The app runs without any of this. With it, every driver signs in with their email, every lap goes to one shared store, every phone shows the whole team's laps, and the app learns a Team driver level from the quickest driver's real brake points.

It uses a free Supabase project (a hosted Postgres database with email sign-in). Whoever runs the team does this once, about ten minutes.

1. Go to https://supabase.com, sign up, and create a new project. Any name, any region. Wait for it to finish setting up.
2. In the project, open the SQL editor, paste the whole of `cloud/schema.sql`, and run it. Then run one more statement with your team's emails, for example:
   `insert into members (email) values ('one@example.com'), ('two@example.com'), ('three@example.com'), ('four@example.com');`
   Only these addresses can sign in and see the laps.
3. In Authentication, Providers, make sure Email is enabled. In Authentication, URL configuration, set the Site URL to the app's address (https://yariso.github.io/annual_plan/) and add the same address to the redirect URLs. Under Email templates you can leave the defaults: the sign-in link is the "Magic Link" template.
4. In Project settings, API, copy the Project URL and the anon public key.
5. Open the app on each phone, Start tab, section 5, paste the URL and the key, press Save. It is remembered on that phone. Or send them to whoever maintains the app to bake into the page, so nobody has to paste anything.
6. Each driver types their email and presses Send me a sign-in link. The email's link opens the app on that phone signed in. From then on their live laps go up as they drive them and the team's laps come down when the app opens or when they press Fetch the team's laps.

What the app learns: once one driver has five laps within 3% of their best on a layout, a Team driver level appears next to Novice, Intermediate, Advanced and Model. It is the Advanced plan with each brake zone's start moved to that driver's median real brake point, never later than 10 m past the Advanced plan's start and never earlier than the Novice's. It updates as more laps arrive.

Privacy: the anon key is public by design; the members table decides who can read or write anything. Laps hold a name, a layout, lap and corner times, and the phone's clock. No positions are uploaded.
