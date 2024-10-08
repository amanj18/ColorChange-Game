import { TRANSLATIONS_KEY } from './constants';

/* 
    Returns the translation for the given key.
    If the translation is not found, the defaultValue is returned.
*/
export const getTranslations = (key, defaultValue) => {
  const translation = window[TRANSLATIONS_KEY];
  return translation[key] ?? defaultValue;
};

export const getToken = async () => {
  try {
    let token = await  window?.getAuthInfo()
    return token?.idToken
  } catch (error) {
    console.log("err", error)
  }
}

/* 
    Replaces the placeholders in the given string with the values from the given object.
 */
export const replacePlaceholder = (input, replaceObj) => {
  const pattern = /\{([^}]+)\}/g;

  function replacer(str) {
    return str.replace(pattern, (match, key) => {
      return replaceObj.hasOwnProperty(key) ? replaceObj[key] : match;
    });
  }

  if (typeof input === 'string') {
    return replacer(input);
  }

  if (Array.isArray(input)) {
    return input.map((item) => {
      if (typeof item === 'string') {
        return replacer(item);
      }
      if (typeof item === 'object' && item !== null) {
        return replacePlaceholder(item, replaceObj);
      }
      return item;
    });
  }

  if (typeof input === 'object' && input !== null) {
    return Object.keys(input).reduce((acc, key) => {
      if (typeof input[key] === 'string') {
        acc[key] = replacer(input[key]);
      } else if (typeof input[key] === 'object') {
        acc[key] = replacePlaceholder(input[key], replaceObj);
      } else {
        acc[key] = input[key];
      }
      return acc;
    }, {});
  }

  return input;
};

export const getCurrentRoute = (pathname) => {
  const routeParts = pathname.split('/');
  return routeParts[routeParts.length - 1];
};

export const serialize = (data) => {
  if (!data) return;
  return typeof data === 'string' ? data : JSON.stringify(data);
};

export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const formatDate = (date) => {
  if (!date) return '';
  const [day, month, year] = date?.split('-');
  const dateObj = new Date(`${year}-${month}-${day}`);
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  const formattedDate = dateObj?.toLocaleDateString('en-GB', options);
  return formattedDate?.toUpperCase();
};
