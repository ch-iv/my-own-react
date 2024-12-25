/** @jsx MyOwnReact.createElement */
function Counter() {
  const [state, setState] = MyOwnReact.useState(1);

  return (
    <div>
      <h1>Count: {state}</h1>
      <button onClick={() => setState(c => c + 1)}>Increment</button>
    </div>
  );
}

MyOwnReact.render(<Counter />, document.getElementById("root"));
