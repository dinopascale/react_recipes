export default async (endpoint, options, success = null, fail = null) => {
  try {
    const rawResponse = await fetch(endpoint, options);

    const json = await rawResponse.json();

    if (rawResponse.status !== 200 && rawResponse.status !== 201) {
      const e = new Error(json.error.message || rawResponse.statusText);
      e.status = rawResponse.status;
      throw e;
    }

    success(json);
  } catch (e) {
    fail(e);
  }
};
