import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useActions } from 'building-editor-react';

export function useImportExportDialog(): [boolean, () => void, () => void] {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);

  return [open, handleClickOpen, handleClose];
}

interface DialogListItemPorps {
  primary: string;
  secondary?: string;
  divider?: boolean;
  handleClick: () => void;
}

function DialogListItem(props: DialogListItemPorps): React.ReactElement {
  const { primary, secondary, divider, handleClick } = props;

  return (
    <ListItem
      button
      divider={divider}
      onClick={handleClick}
      role="listitem"
    >
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

interface ImportExportDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function ImportExportDialog(props: ImportExportDialogProps): React.ReactElement {
  const { open, handleClose } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { loadFilesFromLocal, exportObject, exportScene, exportDAE } = useActions();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="import-export-title"
    >
      <DialogTitle id="import-export-title">Import / Export</DialogTitle>
      <DialogContent>
        <List component="div" role="list">
          <DialogListItem
            divider
            primary="Import"
            secondary=".obj .dae .stl .ply... are supported."
            handleClick={(): void => {
              handleClose();
              loadFilesFromLocal();
            }}
          />
          <DialogListItem
            primary="Export Object"
            handleClick={(): void => {
              handleClose();
              exportObject();
            }}
          />
          <DialogListItem
            divider
            primary="Export Scene"
            handleClick={(): void => {
              handleClose();
              exportScene();
            }}
          />
          <DialogListItem
            primary="Export DAE"
            handleClick={(): void => {
              handleClose();
              exportDAE();
            }}
          />
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
