import Card from 'components/shared/Card';
import { AuthContext } from 'contexts/auth';
import useHttp from 'hooks/http';
import React, { ReactElement, useContext } from 'react';
import { useStore } from 'store/useStore';
import styled from 'styled-components';
import { button, successColor } from 'styles';

const RevokeButton = styled.div`
${button}
`;

const RevokeAllButton = styled.div`
${button}
margin: 20px auto 15px auto
`;

const TokenTitle = styled.p`
font-size: 1.4em;
text-align: center;
${({ active }: {active: boolean}) => active && `
    color: ${successColor};
  `}
`;

const TokenDiv = styled.div`
display: flex;
justify-content: space-around;
align-items: center
`;

export default function TokenList(): ReactElement {

  const { logOut } = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const [ { userData }, dispatch ] = useStore();

  const revokeToken = (tokenToRevoke: string) => {

    logOut({
      tokenToRevoke
    });

    dispatch('UPDATE_USER_DATA', { tokens: userData.tokens.filter((token) => token.token !== tokenToRevoke) });

  };

  return (
    <Card
      title="Where you are connected:"
      style={{
        width: '35%'
      }}
    >
      {userData.tokens.map((token) => (
        <TokenDiv key={token.token}>
          <TokenTitle>
            {token.device || 'unknown'}
          </TokenTitle>
          <RevokeButton
            type="button"
            onClick={() => revokeToken(token.token)}
          >
            Logout
          </RevokeButton>
        </TokenDiv>
      ))}
      <RevokeAllButton onClick={() => sendRequest({
        url   : 'logout-all',
        method: 'DELETE'
      })}
      >
        Logout All
      </RevokeAllButton>
    </Card>
  );

}
