// @flow
import React, { useState } from 'react';
import { clipboard } from 'electron';
import { Box, Fade, IconButton, Tooltip } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

type CopyButtonProps = { label: string, onClick: () => void };

function CopyButton({ label, onClick }: CopyButtonProps) {
  return (
    <Tooltip title={`copy ${label}`} placement="right">
      <IconButton aria-label="copy to clipboard" size="small" onClick={onClick}>
        <FileCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

type VisibilityToggleProps = {
  label: string,
  visible: boolean,
  onClick: () => void
};

function VisibilityToggle({ label, visible, onClick }: VisibilityToggleProps) {
  const VisibilityToggleIcon = visible ? VisibilityOffIcon : VisibilityIcon;
  const title = visible ? `hide ${label}` : `reveal ${label}`;

  return (
    <Tooltip title={title} placement="right">
      <IconButton aria-label="reveal" size="small" onClick={onClick}>
        <VisibilityToggleIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

type Props = {
  hidden?: boolean,
  label: string,
  value: string
};

export default function ShowField({ hidden, label, value }: Props) {
  const [show, setShow] = useState(!hidden);
  const [showControls, setShowControls] = useState(false);
  const toggleShow = () => setShow(!show);
  const copyToClipboard = () => clipboard.writeText(value);

  return (
    <Box
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Box component="span" marginRight={1}>
        {show ? value : '*****'}
      </Box>
      <Fade in={showControls}>
        <span>
          <CopyButton label={label} onClick={copyToClipboard} />
          {hidden && (
            <VisibilityToggle
              label={label}
              visible={show}
              onClick={toggleShow}
            />
          )}
        </span>
      </Fade>
    </Box>
  );
}

ShowField.defaultProps = {
  hidden: false
};
