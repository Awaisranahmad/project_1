# 🏋️‍♂️ Gym Pulse | Fitness Redefined

Gym Pulse is a modern, responsive fitness website designed for the 2026 aesthetics. It features a clean UI, professional navigation, and a functional BMI calculator to help users track their fitness journey.

## 🚀 Features
- **Modern UI:** Built with 2025/2026 aesthetic colors (Mocha & Blue).
- **Fully Responsive:** Works perfectly on Desktop, Tablets, and Mobile devices.
- **BMI Calculator:** A real-time calculator built with Vanilla JavaScript.
- **Clean Structure:** Semantic HTML5 and modular CSS using Grid and Flexbox.

## 🛠️ Tech Stack
- **HTML5:** Semantic markup for better accessibility and SEO.
- **CSS3:** Custom properties (variables), Flexbox, and CSS Grid.
- **JavaScript:** DOM manipulation and logic for the calculator.

## 📂 Project Structure
```text
├── css/
│   └── style.css   # Main stylesheet
├── js/
│   └── script.js  # BMI Logic
└── index.html      # Main Landing Page


```
This project is for normal blue print , you can use this for only give the concept and 
if you want some other project then meet and connect together with new ideas

## 🧪 Tests
No build step needed — the BMI calculator is covered by plain Node tests
(no dependencies, no browser):

```sh
node --test tests/test-bmi.js
```

The suite runs the real `js/script.js` against a tiny DOM stub and checks
valid results, invalid inputs (empty, non-numeric, zero, negative, out of
range) and the page markup (unique section ids, no inline `onclick`,
labelled inputs, `aria-live` result).

## 📜 Changelog
- **2026-11-24:** BMI calculator fixed — empty, non-numeric, zero or
  negative inputs now show a clear error instead of `Infinity` or a
  negative BMI; inputs are validated to 1–500 kg and 50–250 cm; categories
  now use the standard WHO cut-offs (25 / 30). Inputs have real `<label>`s
  and the result is announced via `aria-live="polite"`; inline `onclick`
  replaced with `addEventListener`; the duplicate `id="services"` is fixed
  (second section is now `id="specialities"`); the script moved to the end
  of `<body>`; visible `:focus-visible` outline added. Tests: 10 checks
  in `tests/test-bmi.js`, all passing (`node --test tests/test-bmi.js`).
