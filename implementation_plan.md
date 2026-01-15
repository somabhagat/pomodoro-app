# Pomodoro Timer Web App - Implementation Plan

## Goal Description
Create a functional, premium-design Pomodoro timer web app.
Key features:
- 25-minute default timer.
- Start/Pause/Reset controls.
- Visual progress ring animation.
- Aesthetic, modern UI (Dark mode, smooth gradients).

## User Review Required
> [!NOTE]
> I am planning to use a dark-themed "Focus" design with deep blue/purple background and a teal/coral accent for the timer ring.

## Proposed Changes

### Project Structure

#### [NEW] [index.html](file:///C:/Users/bhaga/.gemini/antigravity/scratch/pomodoro-timer/index.html)
- Main container centered on screen.
- SVG Circle for the progress ring.
- Digital timer display (MM:SS) centered in the ring.
- Control buttons (Start, Pause, Reset) below the ring.

#### [NEW] [style.css](file:///C:/Users/bhaga/.gemini/antigravity/scratch/pomodoro-timer/style.css)
- **Design System:**
    - Font: 'Inter', sans-serif (Google Fonts).
    - Colors: Deep background (`#0F172A`), Surface (`#1E293B`), Accent (`#38BDF8` or `#F472B6`).
    - Effects: Soft shadows, glassmorphism for container.
- **Components:**
    - `.timer-container`: Flexbox/Grid centering.
    - `.progress-ring`: SVG with `stroke-dasharray` and `stroke-dashoffset` transition.
    - `.controls`: styled buttons with hover effects.


#### [MODIFY] [index.html](file:///C:/Users/bhaga/.gemini/antigravity/scratch/pomodoro-timer/index.html)
- Add `<input type="number">` for custom minutes settings in a settings area or near controls.

#### [MODIFY] [style.css](file:///C:/Users/bhaga/.gemini/antigravity/scratch/pomodoro-timer/style.css)
- Style the input field to be transparent/glassmorphic, fitting the theme.
- Hide the default spin buttons if possible, or style them.

#### [MODIFY] [script.js](file:///C:/Users/bhaga/.gemini/antigravity/scratch/pomodoro-timer/script.js)
- Select the input field.
- Event listener for input change: updates `WORK_TIME` and resets timer.
- In `updateTimer()`: when `timeLeft <= 0`, play a beep using `AudioContext` (no external file needed).

## Verification Plan

### Automated Tests
- None.

### Manual Verification
1.  **Custom Time**: Enter different values (e.g., 1, 5) and verify timer updates.
2.  **Sound**: Set timer to 1 minute (or edit code to few seconds), wait for finish, listen for sound (Note calls out `dog_bark.mp3` requirement).

