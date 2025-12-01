import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap'; 
import './Masonry.css';


function importAll(r) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const allImages = importAll(require.context('Frontend/TGFrontend/src/assets', false, /\.(png|jpe?g|webp)$/));


const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const defaultItems = [
  { id: "1", img: allImages['feature1.png'], url: "https://example.com/one", height: 400, caption:"Udaipur" },
  { id: "2", img: allImages['feature1.png'], url: "https://example.com/two", height: 250, caption:"City-palace"},
  { id: "3", img: allImages['feature1.png'], url: "https://example.com/three", height: 600, caption:"Delhi" },

  { id: "4", img: allImages['feature1.png'], url: "https://example.com/four", height: 300, caption:"Train-Ride"},
  { id: "5", img: allImages['feature1.png'], url: "https://example.com/five", height: 500, caption:"Bags"},
  { id: "6", img: allImages['feature1.png'], url: "https://example.com/six", height: 350, caption:"Elephant-Ride" },

  { id: "7", img: allImages['feature1.png'], url: "https://example.com/seven", height: 450, caption:"Airport-look" },
  { id: "8", img: allImages['feature1.png'], url: "https://example.com/eight", height: 280, caption:"USA" },
  { id: "9", img: allImages['feature1.png'], url: "https://example.com/nine", height: 550, caption:"Korea" },

  { id: "10", img: allImages['feature1.png'], url: "https://example.com/ten", height: 320, caption:"Europe" },
  { id: "11", img: allImages['feature1.png'], url: "https://example.com/eleven", height: 600, caption:"Paris" },
  { id: "12", img: allImages['feature1.png'], url: "https://example.com/twelve", height: 260, caption:"Spill the TEA." }

];


const Masonry = ({
  items = defaultItems,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
  if (!width) return { items: [], height: 0 };

  const GAP_X = 16; // horizontal 
  const GAP_Y = 16; //vertical

  const totalGaps = GAP_X * (columns - 1);
  const columnWidth = (width - totalGaps) / columns;

  const colHeights = new Array(columns).fill(0);

  const arranged = items.map(child => {
    const col = colHeights.indexOf(Math.min(...colHeights));

    const x = col * (columnWidth + GAP_X);
    const height = child.height / 2;
    const y = colHeights[col];

    colHeights[col] += height + GAP_Y;

    return { ...child, x, y, w: columnWidth, h: height };
  });

  return { items: arranged, height: Math.max(...colHeights) - GAP_Y };
}, [columns, items, width]);


  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.items.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item, index);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3
        });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  return (
  <div className="masonry-wrapper">

  <h2 className="masonry-main-heading">Travel Moments That Spark Ideas</h2>
  <p className="masonry-subtext">
    A collection of scenes that capture the feeling of travel.
  </p>
    <div
      ref={containerRef}
      className="list"
      style={{ height: grid.height + 50 }}
    >
      {grid.items.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => window.open(item.url, '_blank', 'noopener')}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
              <div className="hover-text">{item.caption || "Demo Text"}</div>
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                    opacity: 0,
                    pointerEvents: 'none',
                    borderRadius: '8px'
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};

export default Masonry;