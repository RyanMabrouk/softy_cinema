import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function Loader() {
  return (
    <div>
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#8323FF", "#FF2DAF", "#8323FF", "#FF2DAF","#8323FF"]}
      />
    </div>
  );
}
