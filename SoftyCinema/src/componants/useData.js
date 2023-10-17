import React, { useEffect, useState } from "react";
import fetchData from "./fetchData";

export default function useData(url) {
  const getData = async () => await fetchData(url);
  const data = getData()
  return data;
}
