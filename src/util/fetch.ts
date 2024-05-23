import { async } from "@firebase/util";
export const fetchData = async (baseUrl: string) => {
  const response = await fetch(baseUrl);
  const result = await response.json();
};
