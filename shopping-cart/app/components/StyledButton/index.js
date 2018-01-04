import styled from 'styled-components';

const StyledButton = styled.button`
  left: ${(props) => (props.clear ? '30%' : '33.33%')} !important;
  margin-top: 2.35rem;
`;

export default StyledButton;
