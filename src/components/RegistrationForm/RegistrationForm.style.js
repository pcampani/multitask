import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
`;

export const ErrorContainer = styled.div`
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-size: 0.75rem;
  color: tomato;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  position: relative;

  img {
    position: absolute;
    top: 2rem;
    left: 1.5rem;
  }

  input {
    display: block;
    margin: 0.5em auto;
    width: 80%;
    text-indent: 12px;
  }
`;
