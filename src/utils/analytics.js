import { EVENT_TRACKING_KEY, TRACKING_ELEMENT_ID } from './constants';

export const gaEventTracking = (event) => {
  if (!event) return;

  const { category, label, eventLabel } = event || {};

  const common = {
    event: 'siGamingEvent'
  };

  let trackingObj = {
    ...common,
    si_gaming: {
      event_name: 'event_name',
      event_parameter: category,
      event_value: label
    }
  };

  if (eventLabel) {
    trackingObj.si_gaming['label'] = eventLabel;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    if (category && label) {
      window.dataLayer.push(trackingObj);
    }
  } catch (error) {
    console.error(error);
  }
};

export const eventTrackingHandler = (e) => {
  const ancestorElement = e.target.closest('#' + TRACKING_ELEMENT_ID);
  const hasTrackingAttribute = ancestorElement?.getAttribute(EVENT_TRACKING_KEY);

  if (hasTrackingAttribute) {
    let trackingConstant;

    try {
      trackingConstant = JSON.parse(hasTrackingAttribute);
    } catch (error) {
      trackingConstant = hasTrackingAttribute;
    }
    if (trackingConstant) {
      gaEventTracking(trackingConstant);
    }
  }
};

export const trackingConstant = {
  BUTTON_CLICKED: {
    category: 'button-clicked',
    label: 'Button Clicked'
  }
};
