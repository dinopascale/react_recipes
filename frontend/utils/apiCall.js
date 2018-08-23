export default async (endpoint, options) => {
  try {
    const rawResponse = await fetch(endpoint, options);
    return await rawResponse.json();
  } catch (e) {
    return e;
  }
};
