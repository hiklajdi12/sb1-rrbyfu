import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

export const VideoCall: React.FC = () => {
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const newPeer = new Peer({
          initiator: window.location.hash === '#init',
          trickle: false,
          stream: stream,
        });

        newPeer.on('signal', data => {
          // Send the signal data to the other peer
          console.log('Signal data:', JSON.stringify(data));
        });

        newPeer.on('stream', stream => {
          setRemoteStream(stream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }
        });

        setPeer(newPeer);
      });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const connectToPeer = () => {
    const peerData = prompt('Enter peer connection data:');
    if (peerData && peer) {
      peer.signal(JSON.parse(peerData));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between mb-4">
        <video ref={localVideoRef} autoPlay muted className="w-1/2" />
        <video ref={remoteVideoRef} autoPlay className="w-1/2" />
      </div>
      <button onClick={connectToPeer} className="bg-blue-500 text-white px-4 py-2 rounded">
        Connect to Peer
      </button>
    </div>
  );
};