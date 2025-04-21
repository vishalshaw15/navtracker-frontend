/* The above class is a JavaScript GHL helper class that retrieves user data by sending a request to a server and
decrypting the response using a key. */
import { setAuthValue } from './src/interceptors/authInterceptor';

export class GHL {
  appId = '68037a39d1652059b012742a';

  constructor() {}

  private async getKey(): Promise<string> {
    return new Promise(resolve => {
      window.parent.postMessage({ message: 'REQUEST_USER_DATA' }, '*');
      window.addEventListener('message', ({ data }) => {
        if (data.message === 'REQUEST_USER_DATA_RESPONSE') {
          resolve(data.payload);
        }
      });
    });
  }

  async getUserData() {
    try {
      const key = await this.getKey();
      setAuthValue(key);

      const res = await fetch('https://navtrack-edge-production.up.railway.app/api/decrypt-sso', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ssoDetails: key }),
      });
      return await res.json();
    } catch (error) {
      console.error('Error in getUserData:', error);
      throw error;
    }
  }

  async getToken() {
    try {
      const key = await this.getKey();
      return key;
    } catch (error) {
      console.error('Error in getToken:', error);
      throw error;
    }
  }
}
