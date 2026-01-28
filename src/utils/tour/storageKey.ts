const defaultKey = 'tour-storage-key-';

const storageKey = {
  invoice: {
    home: `${defaultKey}invoice-home`,
    upload: `${defaultKey}invoice-upload`,
    viewer: `${defaultKey}invoice-viewer`,
    notices: `${defaultKey}invoice-notices`
  },
  portal: {
    home: `${defaultKey}portal-home`
  }
};

export default storageKey;
