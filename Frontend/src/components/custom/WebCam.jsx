import Webcam from "react-webcam"

const WebCam = ({ isWebcamEnabled, setIsWebcamEnabled }) => {
  return (
    <Webcam
      audio={false}
      className="w-full rounded-md"
      onUserMedia={() => setIsWebcamEnabled(true)}
      onUserMediaError={() => setIsWebcamEnabled(false)}
      mirrored={true}
    />
  )
}

export default WebCam
