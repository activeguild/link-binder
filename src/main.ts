import './style.css';

const input = document.querySelector<HTMLInputElement>('#url-input')!;
const linkArea = document.querySelector<HTMLDivElement>('#link-area')!;
const errorEl = document.querySelector<HTMLParagraphElement>('#error')!;

function parseUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    // javascript: や data: などの危険なスキームを拒否する
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function render(): void {
  const value = input.value.trim();
  linkArea.replaceChildren();
  errorEl.hidden = true;

  if (value === '') {
    return;
  }

  const url = parseUrl(value);
  if (url === null) {
    errorEl.textContent = 'http:// または https:// で始まる有効なURLを入力してください。';
    errorEl.hidden = false;
    return;
  }

  const anchor = document.createElement('a');
  anchor.href = url.href;
  anchor.textContent = url.href;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  linkArea.append(anchor);
}

input.addEventListener('input', render);
