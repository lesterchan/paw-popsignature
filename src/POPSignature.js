const CryptoJS = require('crypto-js');
const { btoa } = require('abab');

@registerDynamicValueClass // eslint-disable-line
export default class POPSignature {
  static identifier = 'com.lesterchan.PawExtensions.POPSignature';
  static title = 'POP Signature';
  static inputs = [
    DynamicValueInput('clientSecret', 'Client Secret', 'String'),
    DynamicValueInput('accessToken', 'Access Token', 'String'),
    DynamicValueInput('date', 'Date', 'String'),
  ];

  constructor() {
      this.context = null
  };

  evaluate(context) {
    if (this.clientSecret && this.accessToken && this.date) {
      return this._generatePOPSignature(this.clientSecret, this.accessToken, this.date);
    }
    return null;
  };

  _base64URLEncode(str) {
    return str.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  _generatePOPSignature(clientSecret, accessToken, date) {
    const requestDate = new Date(date);
    const timestampUnix = Math.round(requestDate.getTime() / 1000);
    const message = `${timestampUnix.toString()}${accessToken}`;
    const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, clientSecret));
    const payload = {
      time_since_epoch: timestampUnix,
      sig: this._base64URLEncode(signature),
    };
    const payloadBytes = JSON.stringify(payload);
    return this._base64URLEncode(btoa(payloadBytes));
  };
};