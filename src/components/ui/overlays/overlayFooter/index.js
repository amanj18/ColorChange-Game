import Button from 'components/ui/button';
import React, { useCallback, useEffect } from 'react';

const OverlayFooter = ({
  cancelBtn,
  submitBtn,
  btnPrimary,
  btnPrimaryTransKey,
  btnPrimaryIcon,
  btnSecondary,
  btnSecondaryTransKey,
  isDisabled,
  onCancelClick = () => {},
  onConfirmClick = () => {},
  customClsBtnPrimary,
  customClsBtnSecondary,
  customFooter = null
}) => {
  useEffect(() => {
    const BODY_CLASS = 'noBodyScroll';
    document.body.classList.add(BODY_CLASS);
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.body.classList.remove(BODY_CLASS);
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape' && cancelBtn) {
      onCancelClick();
    }
  }, []);
  return (
    <>
      <div className='si-popup__foot'>
        {cancelBtn && (
          <Button
            variant={`${customClsBtnSecondary ?? 'primaryOutline'}`}
            onClick={onCancelClick}
            transKey={btnSecondaryTransKey}
          >
            {btnSecondary}
          </Button>
        )}
        {submitBtn && (
          <Button
            variant={`${customClsBtnPrimary ?? 'primary'}`}
            icon={btnPrimaryIcon}
            disabled={isDisabled}
            onClick={() => {
              onConfirmClick();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isDisabled) {
                e.preventDefault();
                onConfirmClick();
              }
            }}
            transKey={btnPrimaryTransKey}
          >
            {btnPrimary}
          </Button>
        )}
        {customFooter && customFooter}
      </div>
    </>
  );
};

export default OverlayFooter;
