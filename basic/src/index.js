import '@babel/polyfill';
import { Editor } from 'building-editor';
import { config } from './config';
import { settings } from './settings';
import { box, light } from './objects';

const editor = new Editor(config, settings);  // add your own config and settings
document.body.appendChild(editor.renderer.domElement);

const init = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  editor.renderer.setPixelRatio(window.devicePixelRatio);
  editor.renderer.setSize(width, height);
  editor.render();
  editor.addObject(light);
}

init();

// Build-in view cube
const viewCube = document.getElementById('view-cube');
viewCube.appendChild(editor.viewCubeControls.element);

// Add box button
const button1 = document.getElementById('button1');
button1.onclick = () => {
  editor.addObject(box);
  editor.select(box);
};

// Load model from local
const button2 = document.getElementById('button2');
button2.onchange = () => {
  if (button2.files) {
    editor.loader.loadFile(button2.files[0], undefined, undefined, (object) => {
      window.alert(`Successfully loaded ${object.name}`);
    }, () => window.alert('Could not load file'));
  }
};

// Context menu
const contextMenu = document.getElementById('context-menu');
const toggleContextMenu = () => {
  const open = editor.contextMenu.open && editor.contextMenu.y !== null && editor.contextMenu.x !== null;

  if (open) {
    contextMenu.style.display = "flex";
    contextMenu.style.top = editor.contextMenu.y + "px";
    contextMenu.style.left = editor.contextMenu.x + "px";
  } else {
    contextMenu.style.display = "none";
  }
}

editor.editorControls.addEventListener('update', toggleContextMenu);  // Listen Editor Controls update event to catch editor change

const translate = document.getElementById('translate');
translate.onclick = () => {
  editor.transformControls.setMode('translate');
  editor.contextMenu.hide();
};
const rotate = document.getElementById('rotate');
rotate.onclick = () => {
  editor.transformControls.setMode('rotate');
  editor.contextMenu.hide();
};
const scale = document.getElementById('scale');
scale.onclick = () => {
  editor.transformControls.setMode('scale');
  editor.contextMenu.hide();
};
