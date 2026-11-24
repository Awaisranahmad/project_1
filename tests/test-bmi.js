// Behaviour tests for js/script.js (BMI calculator) — no browser, no deps.
// Runs the real script in a vm context against a tiny DOM stub, then
// simulates the Calculate button click and checks the result text.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function runScript(weightValue, heightValue) {
    const listeners = {};
    const elements = {
        '#weight-input': { value: weightValue },
        '#height-input': { value: heightValue },
        '.result': { textContent: '', style: {} },
        '#calculate-btn': {
            addEventListener: (event, fn) => { listeners[event] = fn; },
        },
    };
    const sandbox = {
        document: { querySelector: (sel) => elements[sel] || null },
        console,
    };
    vm.createContext(sandbox);
    const src = fs.readFileSync(
        path.join(__dirname, '..', 'js', 'script.js'), 'utf8'
    );
    vm.runInContext(src, sandbox);
    assert.equal(
        typeof listeners.click, 'function',
        'script must wire a click handler on #calculate-btn'
    );
    listeners.click();
    return elements['.result'];
}

test('70 kg / 175 cm -> BMI 22.86 (Normal weight)', () => {
    const result = runScript('70', '175');
    assert.equal(result.textContent, 'Your BMI: 22.86 (Normal weight)');
});

test('90 kg / 170 cm -> BMI 31.14 (Obese)', () => {
    const result = runScript('90', '170');
    assert.equal(result.textContent, 'Your BMI: 31.14 (Obese)');
});

test('50 kg / 180 cm -> BMI 15.43 (Underweight)', () => {
    const result = runScript('50', '180');
    assert.equal(result.textContent, 'Your BMI: 15.43 (Underweight)');
});

test('80 kg / 180 cm -> BMI 24.69 (Normal weight, just under 25)', () => {
    const result = runScript('80', '180');
    assert.equal(result.textContent, 'Your BMI: 24.69 (Normal weight)');
});

test('empty inputs -> clear error, not a number', () => {
    const result = runScript('', '');
    assert.equal(result.textContent, 'Please enter both values!');
    assert.equal(result.style.color, 'red');
});

test('non-numeric input -> clear error', () => {
    const result = runScript('abc', '175');
    assert.equal(result.textContent, 'Please enter both values!');
    assert.equal(result.style.color, 'red');
});

test('height 0 -> range error, never Infinity', () => {
    const result = runScript('70', '0');
    assert.equal(result.textContent, 'Height must be between 50 and 250 cm.');
    assert.equal(result.style.color, 'red');
});

test('negative weight -> range error, never a negative BMI', () => {
    const result = runScript('-50', '175');
    assert.equal(result.textContent, 'Weight must be between 1 and 500 kg.');
    assert.equal(result.style.color, 'red');
});

test('weight above 500 kg -> range error', () => {
    const result = runScript('600', '175');
    assert.equal(result.textContent, 'Weight must be between 1 and 500 kg.');
});

test('page markup: unique ids, labelled inputs, no inline onclick', () => {
    const html = fs.readFileSync(
        path.join(__dirname, '..', 'index.html'), 'utf8'
    );
    // The old page had two <section id="services"> elements.
    assert.equal(
        (html.match(/id="services"/g) || []).length, 1,
        'exactly one id="services"'
    );
    assert.match(html, /id="specialities"/);
    assert.match(html, /<label for="weight-input">/);
    assert.match(html, /<label for="height-input">/);
    assert.match(html, /aria-live="polite"/);
    assert.doesNotMatch(html, /onclick=/, 'no inline onclick handlers');
    // Script loads after the page content, not before it.
    assert.ok(
        html.indexOf('<script src="js/script.js">') > html.indexOf('</main>'),
        'script tag sits after </main>'
    );
});
