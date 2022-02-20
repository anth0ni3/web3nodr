import { useEffect, useState } from "react";
import Home from "./pages/home";
import DataProvider from "./store/context";

// function debounce(fn, ms) {
//   let timer: any;
//   return () => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = null;
//       fn.apply(this , arguments);
//     }, ms);
//   };
// }

function debounce(fn: Function, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

function App() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  return (
    <div className="App">
      <DataProvider>
        <Home dimensions={dimensions} />
      </DataProvider>
    </div>
  );
}

export default App;
