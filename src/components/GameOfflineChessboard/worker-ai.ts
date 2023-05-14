const loopworker = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  self.importScripts(`${self.location.origin}/stockfish.js`);
  const engine = self.STOCKFISH();

  const onEngineEvent = (event: unknown) => {
    if (typeof event === 'string') {
      const [name, bestMoveLine]: string[] = event.split(' ');
      if (name === 'bestmove' && bestMoveLine) {
        self.postMessage(JSON.stringify({ bestMoveLine }));
      }
    }
  };

  engine.onmessage = onEngineEvent;
  engine.postMessage('ucinewgame');

  self.onmessage = (e) => {
    const [fen, difficultAi] = e.data;

    engine.postMessage(`position fen ${fen}`);
    engine.postMessage(`go depth ${difficultAi}`);
  };
};

let code = loopworker.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
const blob = new Blob([code], { type: 'application/javascriptssky' });
const workerScript = URL.createObjectURL(blob);

export { workerScript };
