import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router';

const anchorCVA = cva('', {
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
      primary: 'si-btn si-btn__primary si-btn__primary--link',
      secondary: 'si-btn si-btn__secondary si-btn__secondary--link',
      onlyIcon: 'si-btn si-btn__icon'
    },
    size: {
      sm: 'si-btn--sm',
      md: 'si-btn--md',
      lg: 'si-btn--lg'
    }
  },

  defaultVariants: {
    variant: 'primary'
  }
});
function Anchor({
  forMobileNoSpan,
  iconCls,
  linkText,
  hyperLink,
  linkTarget = '_blank',
  children,
  variant,
  size,
  selected,
  disabled,
  classes,
  leadingIcon,
  redirectionURL,
  ...restProps
}) {
  const iconTag = iconCls ? <i className={iconCls}></i> : '';
  const spanTag = linkText ? <span>{linkText}</span> : '';

  const navigate = useNavigate();
  return (
    <>
      <a
        onClick={() => redirectionURL}
        href={hyperLink}
        target={linkTarget}
        rel='noopener noreferrer'
        className={clsx(anchorCVA({ variant, size, selected, disabled, leadingIcon }), classes)}
        disabled={disabled}
        {...restProps}
      >
        {!forMobileNoSpan && spanTag}
        {iconTag}
        {children}
      </a>
    </>
  );
}

export default Anchor;
