import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { serialize } from 'utils/commonFunctions';
import { TRACKING_ELEMENT_ID } from 'utils/constants';

const button = cva('', {
  variants: {
    disabled: {
      true: 'si-disabled'
    },
    leadingIcon: {
      true: 'si-icon--leading'
    },
    selected: {
      true: 'si-selected'
    },
    variant: {
      primary: 'si-btn si-btn__primary',
      secondary: 'si-btn si-btn__secondary',
      primaryOutline: 'si-btn si-btn__primary si-btn__primary--outline',
      secondaryOutline: 'si-btn si-btn__secondary si-btn__secondary--outline',
      primaryLink: 'si-btn si-btn__primary si-btn__primary--link',
      secondaryLink: 'si-btn si-btn__secondary si-btn__secondary--link',
      onlyIcon: 'si-btn si-btn__icon'
    },
    size: {
      sm: 'si-btn--sm',
      md: 'si-btn--md',
      lg: 'si-btn--lg'
    }
  },

  defaultVariants: {
    variant: ''
  }
});

const Button = ({
  variant,
  size,
  selected,
  disabled,
  children,
  leadingIcon,
  icon,
  classes,
  trackingKey,
  transKey,
  isContinue,
  allVotesSelected,
  ...restProps
}) => {
  isContinue && !allVotesSelected ? disabled = true : disabled = disabled;
  return (
    <button
      id={TRACKING_ELEMENT_ID}
      track-event={trackingKey ? serialize(trackingKey) : ''}
      disabled={disabled}
      className={clsx(button({ variant, size, selected, disabled, leadingIcon }), classes)}
      {...restProps}
    >
      {children &&
        (transKey ? window?.['translations']?.[transKey] ?? <span>{children}</span> : children)}
      {icon && <i className={icon}></i>}
    </button>
  );
};

export default Button;
