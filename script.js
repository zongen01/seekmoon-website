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
