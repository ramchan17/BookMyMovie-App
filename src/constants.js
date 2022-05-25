const allConstants = {
  baseUrl: "http://localhost:8085/api/v1/",
  getData: async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  },
};

export default allConstants;
