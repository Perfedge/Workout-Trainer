# Workout Trainer

A standalone, illustrated 12-week exercise planner. No account, sign-in, backend, dependencies, or API keys are required.

## Use the app

Open `index.html` in a modern browser, or visit the GitHub Pages deployment. Choose a program start date, select a training week, and use Start beside Strength A or Strength B for illustrated instructions and set logging.

- Monday, Wednesday, Friday: Peloton, 45 minutes.
- Tuesday: Strength A and a 3-mile walk.
- Thursday: Strength B and a 3-mile walk.
- Saturday: 3-mile walk.
- Sunday: optional 3-mile walk or recovery.

Weeks 1–2 use one set per exercise; weeks 3–10 use two; weeks 11–12 offer two or three. Log repetitions or hold duration, resistance, and completed sets. A rest timer supports 60- or 90-second breaks.

Weekly reviews track average weight, recovery, discomfort, and notes. The progress view compares all 12 weeks. Sunday’s optional walk is tracked separately from the eight planned activities.

## Peloton-day strength and weekly totals

Monday, Wednesday, and Friday have a separate Strength button for front biceps and side hammer dumbbell curl logs. Add or remove sets, enter reps per arm and the weight of one dumbbell in pounds, then check completed sets. Enter actual curl-session minutes for calorie estimates. These logs do not change the eight core activities.

The top of each weekly review summarizes completed rides and minutes, walking sessions and miles (including completed Sunday walks), Strength A/B sessions, checked curl sets, reps and weight ranges, and complete slant-board routines. Calorie estimates use the current week’s entered body weight and documented, adjustable duration/effort assumptions from the 2024 Adult Compendium of Physical Activities. Estimates represent total energy during the logged exercise, including resting energy. Missing curl durations yield a partial estimate; missing weight leaves calories blank. Partial Strength A/B and slant-board sessions are excluded from calories. JSON backups retain all logs and settings; CSV includes weekly totals.

## Animated exercise demonstrations

Every Strength A and B exercise and slant-board movement includes a looping SVG demonstration alongside the static graphics. Controls support play/pause, replay, and slow speed. Demonstrations pause outside the visible workout area and start paused when reduced motion is enabled. Balance and stretches show a steady hold rather than repeated movement; use the workout timer for prescribed hold durations. The demos are schematic visual aids, not a measurement of your repetitions or a prescribed movement tempo.

## Slant-board supplement

After Tuesday and Thursday strength, use the 5–7 minute illustrated slant-board routine. Log two 30-second straight-knee holds, two 30-second bent-knee holds, and 10 ankle mobility rocks. In weeks 1–2, use only these three exercises. From week 3, shallow supported squats are optional (one set of eight); in weeks 7–12, gradually work toward 10–12 repetitions if comfortable. Skip squats for pain or instability. Use stable support, nonslip footwear, and no weights. The weekly view includes separate Tuesday and Thursday checklists and a reset that affects only the selected week’s slant-board logs. Progress and exports include supplement completion without changing the main activity count.

## Storage and backups

Logs are saved in this browser on this device using localStorage. There is no server storage, account, or device sync. Browser settings or clearing site data can remove logs. Export JSON backups regularly. Importing a backup replaces the browser’s current log after confirmation. CSV exports summarize weekly reviews.

Storage is specific to the site address. To move logs from the previous ChatGPT Sites version, export a backup there and import it on this app. Logs are never included in the repository.

## GitHub Pages

Publish this repository from `main` and `/ (root)` under Settings > Pages using Deploy from a branch. No build step is needed. Keep `.nojekyll` and the seven app files in the repository root. Relative asset links support a project subpath.

## Development

Edit the HTML, CSS, and JavaScript directly. For a local preview, run `python3 -m http.server 8765` in this directory and visit http://localhost:8765.

Illustrations are original schematic SVG diagrams, with numbered movement positions and text instructions. They are general visual aids, not personalized assessment or a substitute for instruction on exercise technique. Follow clinician restrictions and the app’s safety reminders.
