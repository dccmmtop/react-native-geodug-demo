function commonFetch(url, options, method = 'GET') {
  let opts = {
    method,
    credentials: 'include'
  };
  if (method === 'POST') {
    opts = Object.assign(opts, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }, options)
  }

  return fetch(url, opts).then(res => {
    return res.json();
  }).then(({errno, errtext, data}) => {
    if (errno === '200') {
      return data;
    } else {
      throw new Error(errtext);
    }
  })
}

export default {
  get(url) {
    return commonFetch(url);
  },
  post(url, options) {
    if (!('body' in options)) {
      options = {
        body: JSON.stringify(options)
      }
    }
    return commonFetch(url, options, 'POST');
  }
}