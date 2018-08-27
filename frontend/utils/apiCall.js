export default async (endpoint, options, success = null, fail = null) => {
  try {
    const rawResponse = await fetch(endpoint, options);

    if (rawResponse.status !== 200) {
      const e = new Error(rawResponse.statusText);
      e.status = rawResponse.status;
      throw e;
    }

    const json = await rawResponse.json();
    success(json);
  } catch (e) {
    fail(e);
  }
};
