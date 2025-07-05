const fetchUrl = async ({ url, method = "GET", data = [], headers = {}}) => {
  return new Promise(async (resolve, reject) => {
    try {
      setTimeout(async () => {
        const options = {
          method,
          headers: {
            ...headers
          },
        };
        if (["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase()) && data) {
          if (data instanceof FormData) {
            options.body = data;
            delete options.headers["Content-Type"];
          } else {
            options.body = JSON.stringify(data);
            options.headers["Content-Type"] = "application/json";
          }
        }
        const response = await fetch(url, options);
        // اگر response خالیه (مثل 204 No Content)
        if (response.status === 204) {
          return resolve({});
        }
        const isJSON = response.headers.get("content-type")?.includes("application/json");

        if (!response.ok) {
          const result = isJSON ? await response.json() : { detail: "Error with no response body",err:response };
          reject(result);
        } else {
          const result = isJSON ? await response.json() : {};
          resolve(result);
        }
        if (response.status === 400){          
          reject(response)
        }
      }, 1000); // شبیه‌سازی تاخیر
    } catch (err) {
      
      reject(err);
    }
  });
};

export default fetchUrl;
