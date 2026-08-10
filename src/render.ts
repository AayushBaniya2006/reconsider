// Markdown packet → print-styled HTML → PDF (via installed Chrome).
// The PDF is the filing artifact; markdown stays the source of truth.
import { existsSync } from 'node:fs';
import { marked } from 'marked';
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const CSS = `
@page { margin: 0.85in 0.8in; }
body { font: 11.5pt/1.55 Georgia, 'Times New Roman', serif; color: #1a1a1a; max-width: 7.2in; margin: 0 auto; }
h1 { font-size: 17pt; border-bottom: 2.5px solid #1a1a1a; padding-bottom: 6px; }
h2 { font-size: 12.5pt; margin-top: 1.6em; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #999; padding-bottom: 3px; }
table { border-collapse: collapse; width: 100%; font-size: 9pt; margin: 0.7em 0; }
td, th { border: 1px solid #bbb; padding: 4px 7px; text-align: left; vertical-align: top; }
th { background: #f2f2f2; }
blockquote { border-left: 3px solid #555; margin: 0.8em 0; padding: 0.3em 1em; font-style: italic; background: #fafafa; }
code { font: 9.5pt Menlo, monospace; background: #f4f4f4; padding: 0 3px; }
li { margin: 0.25em 0; }
strong { letter-spacing: 0.01em; }
`;

export function toHtml(markdown: string, title: string): string {
  const body = marked.parse(markdown, { async: false });
  return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>${CSS}</style></head><body>${body}</body></html>`;
}

export async function htmlToPdf(html: string, outPath: string): Promise<void> {
  if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME} — PDF step skipped`);
  const browser = await puppeteer.launch({ executablePath: CHROME });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.pdf({ path: outPath, format: 'letter', printBackground: true });
  } finally {
    await browser.close();
  }
}
