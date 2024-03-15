import React, { useEffect } from "react";
import useAppStore from "host/StateService";
import { Grid } from "grid/Grid";

export const Search = () => {
  const setMicro = useAppStore((state) => state.setMicro);

  useEffect(() => {
    setMicro("search");
  }, []);

  return (
    <div style={{ border: "1px solid purple", margin: "2px" }}>
      <h1>Search Page App UPDATE</h1>
      <Grid />
    </div>
  );
};
