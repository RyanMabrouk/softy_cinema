import YouTube from "react-youtube";
export default function VideoPopUp({ handleToggle, videoId }) {
  return (
    <div className="videoPopUpBtn">
      <div className="videoMask" onClick={() => handleToggle()}></div>
      <div className="player">
        <YouTube videoId={videoId} />
      </div>
    </div>
  );
}
