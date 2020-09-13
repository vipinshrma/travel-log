const requestAPI = "http://localhost:5000";

export const logEnteries = async () => {
  const response = await fetch(`${requestAPI}/api/logs`);
  const data = await response.json();
  return data;
};

export const createLogEntries = async (data) => {
  const response = await fetch(`${requestAPI}/api/logs`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
