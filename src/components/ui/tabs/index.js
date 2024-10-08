import React from 'react';
import Button from '../button';

const Tabs = ({
  customCls,
  data,
  active,
  handleClick = () => {},
  showIconText = '',
  showIcon = false,
  iconClass = '',
  type = 'text',
  objKey,
  disabledData = ''
}) => {
  let foo = `#`;
  const activeClass = (name) => {
    return name === active ? 'si-active' : '';
  };
  return (
    <>
      <div className={`si-tabs__wrap ${customCls ? customCls : ''}`}>
        {type === 'text' ? (
          <ul>
            {data?.map((name, index) => (
              <li key={index}>
                <Button
                  classes={`${activeClass(name)} ${
                    !Array.isArray(disabledData)
                      ? disabledData === name
                        ? 'si-disabled'
                        : ''
                      : disabledData.includes(name)
                      ? 'si-disabled'
                      : ''
                  }`}
                  disabled={
                    !Array.isArray(disabledData)
                      ? disabledData === name
                      : disabledData.includes(name)
                      ? true
                      : false
                  }
                  onClick={() => handleClick(name)}
                  transKey={name}
                >
                  {name}
                  {showIconText === name && showIcon && <i className={iconClass}></i>}
                </Button>
              </li>
            ))}
          </ul>
        ) : type === 'object' ? (
          <ul>
            {data?.map((item, index) => (
              <li key={index}>
                <Button
                  classes={activeClass(item.id)}
                  onClick={() => {
                    handleClick(item.id);
                  }}
                  transKey={item[objKey]}
                >
                  {item.text}
                  {showIconText === item.id && showIcon && <i className={iconClass}></i>}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Tabs;
