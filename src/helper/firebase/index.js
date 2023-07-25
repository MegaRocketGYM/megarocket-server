import * as admin from 'firebase-admin';

require('dotenv').config();

const FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCE/7pVteTNGQwi\nNqdvMlGbQQNafs+TK5+7yHqPGyvl+DQTJ3mCEzI2LpjoXlDJg7D3qxDZJycC0NW4\nOV7zwB60c8Y1EPcz0dJXRFNa7nKjSI0raTzjdWfBBPdLgPsnCiic/WAFgN9+UBb1\nbByScXBhiobLCFVgiwsbOjJpTbp2m5vnrT9RJIWjLp+NxnOJGErpkYj2i6dvPXR7\npOA89gAkuwVtvf+iQrP7YuQnlHqVDUL1SmW606XMmEqXWuYsoCVaamuAx8K6PEKb\ngN7LRiHsOIB4yZVnDSSVG/vlGtGTnJ3ZRfDVQuhP0B84DaBOgLQ8cygRelrJzNRH\nPhAzaM6fAgMBAAECggEAARWkWO0bUXtd2/ad68IbE2mOTtAwBSRePgk+etGHe7Dp\nt5ZE0c91oa1fY072or0zOt2WWog78EHVmPRamfjGJaQJGaIZ46NyRrXLnAFFJJJ2\nJe0Am+WZF1AQNkpbEsmwNWk0X1p8GcKj9bVunV9OzzEGuxorPfUkTpHmmup87Waq\nHrq+0uRpt5crNO3lPGnH0k+bFtM7LRxDb1NjmrY9ck7lrobTQL7XC0HMqq6qUU55\nj265ovKEABSUvLBvvq10Fjs33folMtS9C1e9bf6zKAW3IdawqKpCrpWWgOt9YGBo\n870R+AqdIeAAFVeNuBjDDapmTovM2aC8DI2wcnauYQKBgQC7WQBS9QJ+MCuAD0O3\nxVAl3fhl5M3btFpoxPcVKxeiCxZKBLWymaKh3NK3SO2CBmehPYBM8Vb7DFVyGawK\n7z4E7iLwqYgc54UDuq5AscTchwuBdg+Bk+uKQ2pa4q/1GmWxWnG/QdiKCWfVNoC1\nFZ7tc03GreddjLCIRyWnpMvveQKBgQC1vEwsRMysO0X0oz7imCHjDCzP6o9n1CpV\n4bLk8GlcEp8J/nJLugVfHra8Prn0llXMrDTiygTpPiRm1ULX1PzDI6Y6lVbVgoWw\nSspH2ejLLP1l4vHCPvM5M8Op5JHl93n0pK+tCOAMjnmA4RmydisLqTzkFl//bcQ1\n5ykFzhww1wKBgARLL+S21M3LkNOohebKUOHtSmobalRkt8W67ebATBRcqLAdl4R2\nXPHUu8eTlk3qk6lwXWZmCZZLXBH3YKgHf6ZhRs+5MvNmovfI6YF2EYr0VWEsMYLI\nvxc2IFPg6iN17Wq5Je46NhpDyOtsClscGb5bbCbniWvtc4ZMCyLidgIRAoGBAITx\nAnPbvDE9htYHWOgfS6KwdFOADXlxfaqnWNsadqgwwwBnjqqQoH9Nk3UvGY6vLoJz\ncph4GZGZsL08whHqrx/8gwwV1JiJS0yD2WcoI6AFADS5CAsFS50LndU46/VizGbG\n1e/pLyRgUMeTYt3mjWSRX4amS4Ephb+8ooiplnuvAoGAWkyh2FrMqWXMiYmtQc3N\np2+VIj8ri8KzYP4i2gkJWrkyMYePhVtPApcC0kq59wPBk1u7Mm3tHDICvNyLbAwn\nlRlVknoeWynCHA/SrUyfLyKRGQRKcenvflLurg8lWHOzIULCVMlwkctEswJmEJKR\nix77t69OK001McL+Qqb2SE4=\n-----END PRIVATE KEY-----\n';
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_url: process.env.FIREBASE_AUTH_URI,
    token_url: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

export default firebaseApp;
