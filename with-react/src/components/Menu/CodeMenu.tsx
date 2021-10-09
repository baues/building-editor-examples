import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/Code';

interface CodeMenuProps {
  close?: () => void;
}

export default function CodeMenu(props: CodeMenuProps): React.ReactElement {
  const { close } = props;

  return (
    <ListItem
      button
      onClick={(): void => {
        close && close();
        window.location.href = 'https://github.com/baues/building-editor-sample';
      }}
    >
      <ListItemIcon><CodeIcon /></ListItemIcon>
      <ListItemText primary='Code' />
    </ListItem>
  );
}
