import React from "react";
import PageWrapper from "./PageWrapper";

type PageProps = React.FC<{ children: any }>;

const Page: PageProps = (props) => {
  return <PageWrapper>{props.children}</PageWrapper>;
};

export default Page;
