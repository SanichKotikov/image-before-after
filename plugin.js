const START_POSITION = 50;

function hasNotImage(images) {
  return Boolean(
    images
      .map(img => img instanceof HTMLImageElement)
      .find(res => !res)
  );
}

function createControl() {
  const control = document.createElement('div');
  control.classList.add('control');
  return control;
}

function getClipPath(x) {
  return `polygon(${x}% 0%, 100% 0%, 100% 100%, ${x}% 100%)`;
}

function plugin(root) {
  if (!(root instanceof HTMLElement)) {
    throw new Error('Root element should be HTMLElement');
  }

  const images = [...root.querySelectorAll('img')];

  if (images.length !== 2 || hasNotImage(images)) {
    throw new Error('Root element should contain two HTMLImageElement');
  }

  let moving = false;

  const after = images[1];
  const control = createControl();
  root.append(control);

  after.style.clipPath = getClipPath(START_POSITION);
  control.style.left = `${START_POSITION}%`;

  control.addEventListener('mousedown', function() {
    moving = true;
  });

  root.addEventListener('mousemove', function(event) {
    if (!moving) return;
    event.preventDefault();
    const x = event.clientX * 100 / window.innerWidth;

    after.style.clipPath = getClipPath(x);
    control.style.left = `${x}%`;
  });

  root.addEventListener('mouseup', function() {
    moving = false;
  });
}

export default plugin;
