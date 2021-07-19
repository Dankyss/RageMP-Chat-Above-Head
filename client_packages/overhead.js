const maxDistance = 300;
const width = 0.03;
const height = 0.0065;
const border = 0.0001;
const colour = [255, 255, 255, 255]; // colour of the message
const typingcolour = [255, 255, 255, 255]; // colour of the typing indicator
const font = 0; // fonts you can use (found here: https://wiki.rage.mp/index.php?title=Graphics::drawText)

let typing_indicator = '(( Typing ))'; // what the typing indicator says

const msgtime = 5000 // how long the message stays up in ms

mp.nametags.enabled = false;

mp.events.add('render', nametags => {
  const graphics = mp.game.graphics;
  const screenRes = graphics.getScreenResolution(0, 0);

  nametags.forEach(nametag => {
    let [player, x, y, distance] = nametag;

    if (distance <= maxDistance) {
      let scale = distance / maxDistance;
      if (scale < 0.7) scale = 0.7;

      y -= scale * (0.005 * (screenRes.y / 1080));
      if (player.isTypingInTextChat === false) {
        mp.game.graphics.drawText(
          player.getVariable('headmsg'),
          [x, y + 0.0255],
          {
            font: font,
            color: colour,
            scale: [0.3, 0.3],
            outline: true,
          }
        );
      }
      if (player.isTypingInTextChat === true) {
        mp.game.graphics.drawText(
          typing_indicator,
          [x, y + 0.0255],
          {
            font: font,
            color: typingcolour,
            scale: [0.3, 0.3],
            outline: true,
          }
        );
      }
    }
  });
});

mp.events.add('Client:runOverheadTimeout', () => {
  setTimeout(() => {
    mp.events.callRemote('Server:playerOverheadClear');
  }, msgtime);
});