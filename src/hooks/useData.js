import React, { useEffect, useState } from "react";
import fetchData from "../componants/fetchData";

export default function useData(url) {
  const getData = async () => await fetchData(url);
  const data = getData()
  return data;
}
