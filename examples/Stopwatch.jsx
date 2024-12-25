const MINUTE = 60000;
const SECOND = 1000;
const MILLI = 100;

/**
 * @typedef FormattedTime
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} millis
 */

/**
 * @param {number} timestamp
 * @return {FormattedTime}
 */
function formatTimestamp(timestamp) {
  const formattedTime = {
    minutes: 0,
    seconds: 0,
    millis: 0,
  };

  let q, r;

  // How many minutes have elapsed and the leftover
  [q, r] = divmod(timestamp, MINUTE);
  // Here we handle minutes overflowing 60, because this is the max we can show.
  formattedTime.minutes = q % 60;

  [q, r] = divmod(r, SECOND);
  // We are guaranteed q < 60.
  formattedTime.seconds = q;

  // Remove the decimal part, because Chromium-based browsers give higher than millisecond precision.
  [q, r] = divmod(r, MILLI);
  formattedTime.millis = Math.trunc(r);

  return formattedTime;
}

const INITIAL_TIME = formatTimestamp(0);

/**
 * Returns the quotient and the remainder of a / b
 * @param {number} a
 * @param {number} b
 * @returns {(number|number)[]}
 */
function divmod(a, b) {
  return [Math.floor(a / b), a % b];
}

const STATE = {
  stopped: "stopped",
  running: "running",
};

const STATE_TRANSITION = {
  stopped: "running",
  running: "stopped",
};

function oppositeState(state) {
  return STATE_TRANSITION[state];
}

/** @jsx MyOwnReact.createElement */
function Stopwatch() {
  const [startTime, setStartTime] = MyOwnReact.useState(0);
  const [time, setTime] = MyOwnReact.useState(INITIAL_TIME);
  const [state, setState] = MyOwnReact.useState(STATE.stopped);

  if (state === STATE.running) {
    const deltaTime = performance.now() - startTime;
    setTimeout(_ => setTime(_ => formatTimestamp(deltaTime)));
  }

  const flipState = () => {
    const newState = oppositeState(state);

    if (newState === STATE.running) {
      setStartTime(performance.now());
    }

    setState(newState);
  };

  return (
    <div>
      <h1>
        {time.minutes}:{time.seconds}:{time.millis}
      </h1>
      <button onClick={flipState}>Start/Stop</button>
    </div>
  );
}

MyOwnReact.render(<Stopwatch />, document.getElementById("root"));
