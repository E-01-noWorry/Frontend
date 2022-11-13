import React from "react";
import { useLocation } from "react-router-dom";

import WriteRoom from "domain/write/components/WriteRoom";
import WriteSelect from "domain/write/components/WriteSelect";

const Write = () => {
  const { state } = useLocation();

  return <>{state.now === "/select" ? <WriteSelect /> : <WriteRoom />}</>;
};

export default Write;
