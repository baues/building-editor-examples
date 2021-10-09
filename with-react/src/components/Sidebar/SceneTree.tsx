import React, { useEffect, useCallback, useState, ChangeEvent } from 'react';
import * as THREE from 'three';
import { useEditor, useActions } from 'building-editor-react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { sidebarWidth } from './index';

interface SceneTree {
  uuid: string;
  name: string;
  children?: SceneTree[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: sidebarWidth,
    padding: theme.spacing(1),
    color: '#f9f9f9',
  },
}));

export default function SceneTree(): React.ReactElement {
  const classes = useStyles();
  const { editor } = useEditor();
  // @ts-ignore
  const selectedId = editor.selected?.uuid;
  const { select } = useActions();

  const treeIds = (nodes: SceneTree): string[] => {
    const childIds = Array.isArray(nodes.children) ? nodes.children.map((node) => node.uuid) : [];
    return [nodes.uuid, ...childIds];
  };

  const [expanded, setExpanded] = useState(treeIds(editor.scene));
  const [selected, setSelected] = useState(selectedId ? [selectedId] : []);

  useEffect(() => {
    selectedId && setSelected([selectedId]);
  }, [selectedId]);

  const handleToggle = (event: ChangeEvent<{}>, nodeIds: string[]): void => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: ChangeEvent<{}>, nodeIds: string[]): void => {
    setSelected(nodeIds);
    const object = editor.objects.filter((object: THREE.Object3D) => nodeIds.includes(object.uuid))[0];
    object && select(object);
  };

  const renderTree = useCallback((nodes: SceneTree): React.ReactElement => {
    if (nodes.name === 'building-editor-stencilPlane') return <React.Fragment key={nodes.uuid}></React.Fragment>;
    return (
      <TreeItem key={nodes.uuid} nodeId={nodes.uuid} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );
  }, []);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(editor.scene)}
    </TreeView>
  );
}
