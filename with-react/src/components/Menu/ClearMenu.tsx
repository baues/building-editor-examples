import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useActions } from 'building-editor-react';

interface ClearMenuProps {
  close?: () => void;
}

export default function ClearMenu(props: ClearMenuProps): React.ReactElement {
  const { close } = props;
  const { clearEditor } = useActions();

  return (
    <ListItem
      button
      onClick={(): void => {
        if (window.confirm('Clear all of objects and settings. Are you sure?')) {
          close && close();
          clearEditor();
        }
      }}
    >
      <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
      <ListItemText primary='Clear Editor' />
    </ListItem>
  );
}
