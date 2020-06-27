import { AuthContext } from 'contexts/auth';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';

const TokenListDiv = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 2px 16px;
  width: 20%
`;

const TokenDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center
`;

const TokenList = ({ tokens }) => {

  const { logOut, authToken } = useContext(AuthContext);

  return (
    <TokenListDiv>
      <h1>Where you are connected: </h1>
      {tokens.map((token) => (
        <TokenDiv key={token.id}>
          <h3>{token.device || 'unknown'}</h3>
          <button
            type="button"
            onClick={() => logOut(
              {
                tokenToRevoke: token.token,
                authToken    : authToken.token
              }
            )}
          >
            Logout
          </button>
        </TokenDiv>
      ))}
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
