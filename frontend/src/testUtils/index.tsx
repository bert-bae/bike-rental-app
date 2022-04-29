import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../redux";

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const renderComponent = (component: any) => {
  return render(
    <QueryClientProvider client={testQueryClient}>
      <Provider store={store}>{component}</Provider>
    </QueryClientProvider>
  );
};

const wrapper = (input: { children: any }) => (
  <QueryClientProvider client={testQueryClient}>
    <Provider store={store}>{input.children}</Provider>
  </QueryClientProvider>
);
export const renderHookTest = (useHook: any) => {
  return renderHook(() => useHook(), { wrapper });
};
