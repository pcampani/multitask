import React, { useState } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  margin-top: 20px;
  padding: 1em;
  /* border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 10px 10px 8px rgba(0, 0, 0, 0.6); */
  margin-bottom: 20px;
  border-radius: 20px;
`;

const Button = styled.button(({ selected }) => `
  font-size: 1.5em;
  color: #000;
  opacity: ${selected ? 1.0 : 0.5};
  border: none;
  padding: 10px 20px;
  cursor: ${selected ? 'initial' : 'pointer'};
  transition: opacity 0.5s ease;

  &:hover {
    opacity: 1.0;
    text-decoration: underline;
  }
`);

const AuthTabs = ({ menuTitles, children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <MenuContainer>
        {menuTitles.map((title, index) => (
          <Button 
            key={index}
            selected={index === selectedTab}
            onClick={e => {
              e.preventDefault();

              setSelectedTab(index);
            }
          }>
            {title}
          </Button>
        ))}
      </MenuContainer>
      <div>
        {React.Children.map(children, (child, index) => {
          if (index !== selectedTab) {
            return null;
          }

          return (
            <div className="test">{child}</div>
          );
        })}
      </div>
    </div>
  );
}

export default AuthTabs;
