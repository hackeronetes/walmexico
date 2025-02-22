import { useState, useEffect } from 'react';
import getPkce from 'oauth-pkce';

const usePKCE = ()=>{
    const [codeVerifier, setCodeVerifier] = useState<string>('');
    const [codeChallenge, setCodeChallenge] = useState<string>('');
    useEffect(()=>{
        getPkce(43, (error, { verifier, challenge }) => {
            if (!error) {
              localStorage.setItem('code_verifier', verifier);
              setCodeVerifier(verifier);
              setCodeChallenge(challenge);
            }
          });
    }, []);

    return { codeVerifier, codeChallenge };
}

export default usePKCE;