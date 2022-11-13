import React from "react";
import { useLocation } from "react-router-dom";

import WriteRoom from "components/features/write/WriteRoom";
import WriteSelect from "components/features/write/WriteSelect";

const Write = () => {
  const { state } = useLocation();

  return <>{state.now === "/select" ? <WriteSelect /> : <WriteRoom />}</>;
};

export default Write;
