import { useState, useEffect } from "react";

export const useFetchData = (tipo, endpoints) => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await fetch(endpoints[tipo]);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, [tipo]);

  return { data, loadData, setData };
};