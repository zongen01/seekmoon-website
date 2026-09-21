const views = {
  workspace: { image: 'assets/workspace.png', alt: 'SeekMoon 真实界面：左侧智能体任务与右侧代码变更审查', caption: '任务、代码与审查，在同一个工作空间。', count: '01 / 03' },
  review: { image: 'assets/review.png', alt: 'SeekMoon Diff Review 真实界面：查看代码变更、查找引用并预览关联代码', caption: '审查变更时，直接查找引用与关联代码。', count: '02 / 03' },
  visualization: { image: 'assets/visualization.png', alt: 'SeekMoon 真实界面：在 MoonBit 代码中渲染架构图与文档', caption: '让文档与架构图，就在代码身旁。', count: '03 / 03' }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activate(tab) {
  const view = views[tab.dataset.view];
  tabs.forEach(item => {
    item.setAttribute('aria-selected', String(item === tab));
    item.tabIndex = item === tab ? 0 : -1;
  });
  const image = document.getElementById('product-image');
  image.src = view.image;
  image.alt = view.alt;
  document.getElementById('image-open').href = view.image;
  document.getElementById('open-original').href = view.image;
  document.getElementById('product-panel').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activate(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].focus();
    activate(tabs[next]);
  });
});

const viewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewport = document.getElementById('viewer-viewport');
const zoomLevel = document.getElementById('zoom-level');
let zoom = 1;
let drag = null;

function setZoom(value, reset = false) {
  if (!viewerImage.naturalWidth) return;
  const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / (viewerImage.naturalWidth * zoom);
  const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / (viewerImage.naturalHeight * zoom);
  zoom = Math.max(0.05, Math.min(2, value));
  viewerImage.style.width = `${Math.round(viewerImage.naturalWidth * zoom)}px`;
  zoomLevel.value = `${Math.round(zoom * 100)}%`;
  document.getElementById('zoom-out').disabled = zoom <= 0.05;
  document.getElementById('zoom-in').disabled = zoom >= 2;
  if (reset) {
    viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
    viewport.scrollTop = 0;
  } else {
    viewport.scrollLeft = centerX * viewerImage.naturalWidth * zoom - viewport.clientWidth / 2;
    viewport.scrollTop = centerY * viewerImage.naturalHeight * zoom - viewport.clientHeight / 2;
  }
}

document.getElementById('image-open').addEventListener('click', async event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const source = document.getElementById('product-image');
  viewerImage.src = source.src;
  viewerImage.alt = source.alt;
  document.getElementById('viewer-title').textContent = `${tabs.find(tab => tab.getAttribute('aria-selected') === 'true').textContent.trim()} · 高清原图`;
  try { await viewerImage.decode(); } catch { window.open(source.src, '_blank', 'noopener'); return; }
  viewer.showModal();
  document.body.classList.add('viewer-open');
  setZoom(1, true);
});

document.getElementById('zoom-in').addEventListener('click', () => setZoom(zoom + 0.25));
document.getElementById('zoom-out').addEventListener('click', () => setZoom(zoom - 0.25));
document.getElementById('zoom-original').addEventListener('click', () => setZoom(1));
document.getElementById('zoom-fit').addEventListener('click', () => setZoom(Math.min(viewport.clientWidth / viewerImage.naturalWidth, viewport.clientHeight / viewerImage.naturalHeight, 1), true));
document.getElementById('viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  drag = null;
  viewport.classList.remove('dragging');
});
viewport.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  event.preventDefault();
  drag = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
  viewport.setPointerCapture(event.pointerId);
  viewport.classList.add('dragging');
});
viewport.addEventListener('pointermove', event => {
  if (!drag) return;
  viewport.scrollLeft = drag.left - (event.clientX - drag.x);
  viewport.scrollTop = drag.top - (event.clientY - drag.y);
});
for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) viewport.addEventListener(eventName, () => {
  drag = null;
  viewport.classList.remove('dragging');
});
