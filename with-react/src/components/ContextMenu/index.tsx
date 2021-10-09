import React from 'react';
import { useEditor, useActions, ContextMenu, ContextMenuItem } from 'building-editor-react';

export default function ContextMenuIndex(): React.ReactElement {
  const { editor } = useEditor();
  const { setTransformControlsMode } = useActions();

  const closeContextMenu = () => {
    editor.contextMenu.hide();
  };

  return (
    <ContextMenu onClose={closeContextMenu}>
      <ContextMenuItem
        onClick={(): void => {
          closeContextMenu();
          setTransformControlsMode('translate');
        }}
      >
        Translate Mode
      </ContextMenuItem>
      <ContextMenuItem
        onClick={(): void => {
          closeContextMenu();
          setTransformControlsMode('rotate');
        }}
      >
        Rotate Mode
      </ContextMenuItem>
      <ContextMenuItem
        onClick={(): void => {
          closeContextMenu();
          setTransformControlsMode('scale');
        }}
      >
        Scale Mode
      </ContextMenuItem>
    </ContextMenu>
  );
}
