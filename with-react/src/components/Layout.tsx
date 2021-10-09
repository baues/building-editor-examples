import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Menu, { drawerWidth } from './Menu';
import Sidebar from './Sidebar';
import Fab from './FloatingActionButton';
import ImportExportDialog, { useImportExportDialog } from './ImportExportDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#f8f8f8',
    },
  }),
);

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps): React.ReactElement {
  const { children } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openIED, handleClickOpenIED, handleCloseIED] = useImportExportDialog();

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Building Editor
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <Menu open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        {children}
      </main>
      <Sidebar />
      <Fab openIED={handleClickOpenIED} />
      <ImportExportDialog open={openIED} handleClose={handleCloseIED} />
    </div>
  );
}
