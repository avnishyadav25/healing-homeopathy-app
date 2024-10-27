import React from 'react';
import PropTypes from 'prop-types';
import { Button as MUIButton, CircularProgress, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  className = '',
  startIcon = null,
  endIcon = null,
  disabled = false,
  loading = false,
}) => {
  const classes = useStyles();

  return (
    <Fade in timeout={3000}>
    <MUIButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      className={`${classes.button} ${className}`}
      startIcon={loading ? <CircularProgress size={20} /> : startIcon}
      endIcon={endIcon}
      disabled={disabled || loading}
      fullWidth
    >
      {children}
    </MUIButton>
    </Fade>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
