const ApiClient = (baseUrl) => ({
  async get(endpoint) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);

      if (!response.ok) {
        return [null, `HTTP error! Status: ${response.status}`];
      }

      const data = await response.json();
      return [data, null];
    } catch (error) {
      console.error("API request failed:", error);
      return [null, error.message];
    }
  },
});

const api = ApiClient("https://restcountries.com/v3.1");

const baseFiels = "cca3,flags,name,capital,region,population";

const countriesApi = {
  getAll: () => api.get(`/all?fields=${baseFiels}`),
  getCountry: (id) =>
    api.get(`/alpha/${id}?fields=${baseFiels},language,currencies,tld,borders`),
};

export { countriesApi };
