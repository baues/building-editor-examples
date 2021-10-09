import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }),
);

interface FloatingActionButtonProps {
  openIED: () => void;
}

export default function FloatingActionButton(props: FloatingActionButtonProps): React.ReactElement {
  const { openIED } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value] = useState(0);

  /*
  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  */

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary' as 'primary',
      className: classes.fab,
      icon: <ImportExportIcon />,
      label: 'ImportExport',
      click: (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        event.stopPropagation();
        openIED();
      },
    },
    {
      color: 'secondary' as 'secondary',
      className: classes.fab,
      icon: <EditIcon />,
      label: 'Edit',
      click: (): void => console.log('test'),
    },
    {
      color: 'inherit' as 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <UpIcon />,
      label: 'Expand',
      click: (): void => console.log('test'),
    },
  ];

  return (
    <>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={fab.click}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </>
  );
}
