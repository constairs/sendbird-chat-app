
import styled from 'styled-components';
import { UserProfile } from '../UserProfile';
import { media } from '../../theme/media';

export const StyledHeader = styled.header`
background-color: ${props => props.theme.colors.light};
display: block;
padding: 5px 40px;
display: flex;
justify-content: space-around;
align-items: center;
${media.phoneLg`
  padding: 5px 10px;
`}
${media.phoneSm`
  padding: 5px;
`}
`;

export const HeaderUserProfile = styled(UserProfile)`
div {
  width: 60px!important;
  height: 60px;
  ${media.phoneLg`
    width: 40px!important;
    height: 40px;
  `}
  button {
    font-size: 11px;
    ${media.phoneLg`
      font-size: 9px;
      padding: 0;
    `}
  }
}
h2 {
  font-size: 16px;
  font-weight: 400;
}
`;


export const Nav = styled.nav`
ul {
list-style-type: none;
padding-left: 0;
margin: 10px 0;
${media.phoneSm`
  padding-left: 20px;
`};
li {
  display: inline-block;
  margin: 0 10px;
  ${media.phoneLg`
    margin: 0 5px;
  `}
  ${media.phoneSm`
    display: block;
    margin-bottom: 10px;
  `}
  a {
    padding: 5px 20px;
    border-radius: 3px;
    font-size: 18px;
    text-decoration: none;
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.light};
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    font-family: ${props => props.theme.fonts.mainFont};
    ${media.tablet`
      font-size: 14px;
      padding: 5px 15px;
    `};
    ${media.phoneLg`
      font-size: 12px;
      padding: 5px 10px;
    `}
    ${media.phoneSm`
      padding: 3px 10px;
    `}
  }
};
}
`;
