import { nowInSec, SkyWayAuthToken, SkyWayContext, SkyWayRoom, SkyWayStreamFactory, uuidV4 } from "@skyway-sdk/room";

const token = new SkyWayAuthToken({
  jti: uuidV4(),
  iat: nowInSec(),
  exp: nowInSec() + 60 * 60 * 24,
  version: 3,
  scope: {
    appId: "db547171-425e-4336-a471-40551a7d765b",
    rooms: [
      {
        name: "*",
        methods: ["create", "close", "updateMetadata"],
        member: {
          name: "*",
          methods: ["publish", "subscribe", "updateMetadata"],
        },
      },
    ],
  },
}).encode("x6PjpSFPAiJZhsgIzrpzULlA6613MgwmyORxDduLgw4=");

(async () => {
  const localVideo = document.getElementById("local-video");
  const remoteMediaArea = document.getElementById("remote-media-area");
  const roomNameInput = document.getElementById("room-name");
  const myId = document.getElementById("my-id");
  const joinButton = document.getElementById("join");
  const leaveButton = document.getElementById("leave");

  // 自分の映像を取得・表示
  const { audio, video } = await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream();
  video.attach(localVideo);
  await localVideo.play();

  joinButton.onclick = async () => {
    if (roomNameInput.value === "") return;

    const context = await SkyWayContext.Create(token);
    const room = await SkyWayRoom.FindOrCreate(context, {
      type: "p2p",
      name: roomNameInput.value,
    });
    const me = await room.join();

    myId.textContent = me.id;

    // 自動的に音声と映像をパブリッシュ
    await me.publish(audio);
    await me.publish(video);

    // 既存のストリームをすべて購読
    room.publications.forEach((pub) => subscribeAndAttach(pub, me));

    // 新しいストリームが公開されたら自動的に購読
    room.onStreamPublished.add((e) => subscribeAndAttach(e.publication, me));

    leaveButton.onclick = async () => {
      await me.leave();
      await room.dispose();

      myId.textContent = "";
      remoteMediaArea.replaceChildren();
    };

    room.onStreamUnpublished.add((e) => {
      document.getElementById(`media-${e.publication.id}`)?.remove();
    });
  };

  // 他のユーザーのストリームを購読して表示する関数
  const subscribeAndAttach = async (publication, me) => {
    if (publication.publisher.id === me.id) return; // 自分の映像はスキップ

    const { stream } = await me.subscribe(publication.id); // 即時購読

    let newMedia;
    switch (stream.track.kind) {
      case "video":
        newMedia = document.createElement("video");
        newMedia.playsInline = true;
        newMedia.autoplay = true;
        newMedia.style.width = "300px";
        newMedia.style.height = "auto";
        newMedia.style.maxWidth = "300px";
        break;
      case "audio":
        newMedia = document.createElement("audio");
        newMedia.controls = false;
        newMedia.autoplay = true;
        break;
      default:
        return;
    }

    newMedia.id = `media-${publication.id}`;
    stream.attach(newMedia);
    remoteMediaArea.appendChild(newMedia);
  };
})();
