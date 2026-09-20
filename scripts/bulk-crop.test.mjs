import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../lib/bulkCrop.ts', import.meta.url), 'utf8');
const context = { exports: {} };
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
const { transferCrop, bulkOutputNames } = context.exports;

test('mixed source orientations preserve pixel aspect ratio and bounds', () => {
  for (const [sw, sh] of [[1600, 1200], [900, 1600], [1000, 1000]]) {
    for (const [tw, th] of [[900, 1600], [1600, 1200], [1000, 1000]]) {
      for (const ratio of [1, 4 / 5, 16 / 9, 9 / 16]) {
        const w = Math.min(sw, sh * ratio) * .5;
        const crop = { unit: '%', x: 0, y: 0, width: w / sw * 100, height: w / ratio / sh * 100 };
        const result = transferCrop(crop, sw, sh, tw, th);
        assert.ok(Math.abs((result.width * tw) / (result.height * th) - ratio) < 1e-9);
        assert.ok(result.x >= 0 && result.y >= 0);
        assert.ok(result.x + result.width <= 100 + 1e-9);
        assert.ok(result.y + result.height <= 100 + 1e-9);
      }
    }
  }
});

test('same source geometry retains framing', () => {
  const crop = { unit: '%', x: 20, y: 15, width: 30, height: 40 };
  assert.equal(JSON.stringify(transferCrop(crop, 1600, 1200, 1600, 1200)), JSON.stringify({ unit: '%', width: 30, height: 40, x: 20, y: 15 }));
});

test('ZIP names are unique even across extensions and existing suffixes', () => {
  const result = bulkOutputNames(['photo.jpg', 'photo.png', 'photo-cropped-2.png', 'PHOTO.webp'], 'png', '');
  assert.equal(new Set(result.map(n => n.toLowerCase())).size, 4);
  assert.equal(result[1], 'photo-cropped-2.png');
});

test('prefixes cannot create ZIP directories and numbering remains stable', () => {
  assert.equal(bulkOutputNames(['a.png', 'b.png'], 'jpg', '../products')[1], '..-products-02.jpg');
});
