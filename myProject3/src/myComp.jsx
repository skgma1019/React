export function EventComp() {
  return (
    <>
      <button onClick={handleClick}>button 1</button>
      <button onClick={handleClick}>button 2</button>
      <button
        onClick={() => handleEvent("clicked")}
        onMouseLeave={() => handleEvent("onMouseLeave")}
        onMouseEnter={() => handleEvent("onMouseEnter")}
        onDoubleClick={() => handleEvent("onDoubleClick")}
        onContextMenu={() => handleEvent("onContextMenu")}
      >
        클릭해주세요
      </button>
    </>
  );
}
const handleEvent = (eventMsg) => {
  console.log(`Event: ${eventMsg}`);
};
function handleClick(e) {
  console.log(`${e.target} clicked at (${e.clientX}, ${e.clientY})`);
}
