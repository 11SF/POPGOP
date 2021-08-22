import Layout, { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import "./App.css";
import pic2 from "./assets/IMG_7874.jpg";
import pic1 from "./assets/IMG_7875.jpg";
import isas from "./assets/sound/isas.mp3";
import noob from "./assets/sound/noob.mp3";
import popSound from "./assets/sound/pop.mp3";
import s1000 from "./assets/sound/s1000.mp3";
import s10000 from "./assets/sound/s10000.mp3";
import s500 from "./assets/sound/s500.mp3";
import start from "./assets/sound/start.mp3";
import tuturu from "./assets/sound/tuturu_1.mp3";

function App() {
  const [count, setCount] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const styles = {
    transition: { transition: "width 2s, height 2s" },
    count: { fontSize: 40, transition: "width 2s, height 2s" },
    count_active: { fontSize: 100 },
  };
  const picChange = () => {
    if (!isClick) {
      return pic1;
    } else {
      return pic2;
    }
  };
  const plusCount = () => {
    setCount(count + 1);
  };

  const onKeyDown = (e) => {
    setIsClick(true);
    if (!isClick) {
      plusCount();
      playSound();
      // setTimeout(() => {
      // setDelay(true);
      // }, 100);
    }
  };

  const onKeyUp = (e) => {
    // if(delay) {
    localStorage.setItem("count", count);
    setIsClick(false);
    // setDelay(false);
    // }
  };

  const [playPop] = useSound(popSound, { volume: 0.5 });
  const [playS500] = useSound(s500, { volume: 1 });
  const [playS1000] = useSound(s1000, { volume: 1 });
  const [playS10000] = useSound(s10000, { volume: 1 });
  const [playStart] = useSound(start, { volume: 1 });
  const [playNoob] = useSound(noob, { volume: 1 });
  const [playIsas] = useSound(isas, { volume: 1 });
  const [playTuturu] = useSound(tuturu, { volume: 1 });

  const playSound = () => {
    if (count === 500) {
      playS500();
    } else if (count === 1000) {
      playS1000();
    } else if (count === 10000) {
      playS10000();
    } else if (count % 143 === 0) {
      playNoob();
    } else if (count === 50) {
      playTuturu();
    } else if (count % 120 === 0) {
      playIsas();
    } else {
      playPop();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("count")) {
      localStorage.setItem("count", 0);
    }
    setCount(parseInt(localStorage.getItem("count")));
    playStart();
  }, [playStart]);

  return (
    <Layout
      className="App"
      tabIndex="0"
      onKeyPress={onKeyDown}
      onKeyUp={onKeyUp}
      onMouseDown={onKeyDown}
      onMouseUp={onKeyUp}
      // onTouchStart={onKeyDown}
      onTouchEnd={onKeyUp}
      style={{ backgroundImage: `url('${picChange()}')` }}
    >
      <Content className="click_area">
        <h1 className="title">🚀 POPGOP 🚀</h1>
        <h2 style={isClick ? styles.count_active : styles.count}>{count}</h2>
      </Content>
    </Layout>
  );
}

export default App;
