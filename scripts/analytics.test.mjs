import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadAnalytics(window) {
  const source = fs.readFileSync(path.join(__dirname, '../lib/analytics.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const context = { exports: {}, window };
  vm.runInNewContext(code, context);
  return context.exports.trackAnalyticsEvent;
}

test('export event contains only explicitly supplied product metadata', () => {
  const calls = [];
  const track = loadAnalytics({ localStorage: { getItem: () => null }, gtag: (...args) => calls.push(args) });
  const parameters = { tool_type: 'bulk', format: 'png', output_count: 3, failed_count: 1 };
  track('crop_export_succeeded', parameters);
  assert.deepEqual(calls, [['event', 'crop_export_succeeded', parameters]]);
});

test('QA opt-out suppresses events', () => {
  const track = loadAnalytics({ localStorage: { getItem: () => '1' }, gtag: () => assert.fail('QA event leaked') });
  track('crop_export_succeeded', {});
});

test('missing or throwing analytics never fails a product action', () => {
  for (const window of [undefined, {}, { localStorage: { getItem: () => null }, gtag: () => { throw Error('blocked'); } }]) {
    assert.doesNotThrow(() => loadAnalytics(window)('crop_export_succeeded', {}));
  }
});

test('GA initialization disables local, preview and opted-out sessions before config', () => {
  const source = fs.readFileSync(path.join(__dirname, '../components/GoogleAnalytics.tsx'), 'utf8');
  const tree = ts.createSourceFile('GoogleAnalytics.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let script;
  function visit(node) {
    if (ts.isTemplateExpression(node) && node.head.text.startsWith('window.dataLayer')) {
      script = node.head.text + node.templateSpans.map(span => 'G-TEST' + span.literal.text).join('');
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  assert.ok(script);
  for (const [hostname, optedOut, disabled] of [
    ['localhost', false, true], ['127.0.0.1', false, true],
    ['preview.vercel.app', false, true], ['imagecropkit.com', true, true],
    ['imagecropkit.com', false, false],
  ]) {
    const context = { location: { hostname }, localStorage: { getItem: () => optedOut ? '1' : null } };
    context.window = context;
    vm.runInNewContext(script, context);
    assert.equal(Boolean(context['ga-disable-G-TEST']), disabled);
    assert.equal(context.dataLayer[1][0], 'config');
  }
});
