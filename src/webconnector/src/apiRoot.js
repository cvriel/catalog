

const getRoots = () => {
  let apiRoot;
  let authRoot;
  if (window.location.host.includes("acc") ||
    window.location.host.includes("127.0.0.1") ||
    window.location.host.includes("localhost")
  ) {
    apiRoot = "https://acc.api.data.amsterdam.nl/";
    authRoot = "https://acc.api.data.amsterdam.nl/";
  } else {
    apiRoot = "https://api.data.amsterdam.nl/";
    authRoot = "https://api.data.amsterdam.nl/";
  }
  return {
      apiRoot,
      authRoot,
  }
};

export default getRoots;
