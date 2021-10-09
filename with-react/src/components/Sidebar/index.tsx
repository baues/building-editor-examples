import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SceneTree from './SceneTree';

export const sidebarWidth = 220;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'fixed',
    top: 70,
    right: 0,
    backgroundColor: 'transparent',
    width: sidebarWidth,
    maxHeight: '100%',
    overflow: 'auto',
    borderLeft: 'dotted 1px #666',
    ...theme.mixins.toolbar,
  },
}));

export default function Sidebar(): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <SceneTree />
    </div>
  );
}
