import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import bikeLotsApi from "../api/admin/bikeLots";
/* eslint-disable */

export const useGetBikeLotsQuery = (keys) => {
  const { jwt } = useSelector((state) => state.auth);
  const readBikeLots = async ({ queryKey }) => {
    const [_key, filters] = queryKey;
    return bikeLotsApi.read({ filters, headers: { Authorization: jwt } });
  };

  return useQuery({
    queryFn: readBikeLots,
    queryKey: ["readBikeLots", keys],
    onError: () => {},
    onSuccess: ({ data }) => {},
  });
};
