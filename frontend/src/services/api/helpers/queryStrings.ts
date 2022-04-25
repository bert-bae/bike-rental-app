export const queryStringConstructor = (input: Record<string, any>) => {
  const queries = [];
  for (const key in input) {
    if (!input[key] || input[key].length === 0) {
      continue;
    }

    let query = `${key}=`;
    if (Array.isArray(input[key])) {
      query += `${input[key].join(",")}`;
    } else {
      query += `${input[key]}`;
    }
    queries.push(query);
  }
  return queries.join("&");
};
