import { AuthContext } from 'contexts/auth';
import useHttp from 'hooks/http';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { button } from 'styles/button';
import { successColor } from 'styles/colors';

const TokenListDiv = styled.div`
box-shadow: 0 6px 10px 0 rgba(0,0.1,0.2,0.3);
padding: 1px 26px;
width: 35%
`;

const RevokeButton = styled.div`
${button}
`;

const RevokeAllButton = styled.div`
${button}
margin: 20px auto 15px auto
`;

const TokenListTitle = styled.p`
  font-size: 2em;
  text-align: center;
  font-weight: bold
`;

const TokenTitle = styled.p`
font-size: 1.4em;
text-align: center;
${({ active }) => active && `
    color: ${successColor};
  `}
`;

const TokenDiv = styled.div`
display: flex;
justify-content: space-around;
align-items: center
`;

const TokenList = ({ tokens }) => {

  const { logOut, authToken } = useContext(AuthContext);
  const { sendRequest } = useHttp();

  return (
    <TokenListDiv>
      <TokenListTitle>Where you are connected: </TokenListTitle>
      {tokens.map((token) => (
        <TokenDiv key={token.id}>
          <TokenTitle
            active={token.token === authToken.token}
          >
            {token.device || 'unknown'}

          </TokenTitle>
          <RevokeButton
            type="button"
            onClick={() => logOut(
              {
                tokenToRevoke: token.token,
                authToken    : authToken.token
              }
            )}
          >
            Logout
          </RevokeButton>
        </TokenDiv>
      ))}
      <RevokeAllButton onClick={() => sendRequest({
        url: 'logoutAll', method: 'POST'
      })}
      >
        Logout All
      </RevokeAllButton>
    </TokenListDiv>
  );

};

TokenList.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object),
};

TokenList.defaultProps = {
  tokens: [],
};

export default TokenList;
