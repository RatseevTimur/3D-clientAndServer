import React, { useRef, useState } from 'react'
import { CameraControls, Html} from "@react-three/drei"
import { Canvas } from '@react-three/fiber'

const Conus = () => {
  const colorBackground = "E8E8E8"
  const [active, setActive] = useState(true)
  const [conusSize, setConusSize] = useState({
    d: 800,
    h: 230,
    n: 6,
  });


  function Box(props) {
    const mesh = useRef()
    const [hovered, setHover] = useState(false)
    // useFrame((state, delta) => (mesh.current.rotation.x += delta*0))

    return (
      <mesh
        {...props}
        ref={mesh}
        onPointerDown={console.log}
        // scale={active ? 1.5 : 1}
        onPointerMove={(e) => console.log('move')}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        >
          <coneGeometry args={[conusSize.h/100, conusSize.d/100, conusSize.n ]} />
          <meshPhongMaterial color={hovered ? '#fcf' : '#fff'} />
      </mesh>
    )
  }


  return (
    <div id="model">
      <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}
        style={{position: "absolute", }}
        camera={{ position: [-5, -2, 10] }} width={"100%"} height={"100%"}>
        <color attach="background" args={[`#${colorBackground}`]} />
        <ambientLight /*color={}*/ intensity={.2} />
        <CameraControls makeDefault />
        <pointLight position={[5, 10, 5]} intensity={.7} />

        {active ?
          <>
            <Html transform /*occlude*/ zIndexRange={1}
              position={[-conusSize.h / 200 - 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <div className="p-inputgroup">
                Высота:
                <span className="p-inputgroup-addon">mm</span>
                <input value={conusSize.d} placeholder="size, mm" style={{ width: "100px" }}
                  step={5} min={50} type='number'
                  onChange={(e) => setConusSize({ ...conusSize, d: +e.target.value })} />
              </div>
            </Html>

            <Html transform zIndexRange={1}
              position={[0, conusSize.d / 200 + 2, 0]}>
              <div className="p-inputgroup">
                Диаметр:
                <span className="p-inputgroup-addon">mm</span>
                <input value={conusSize.h} placeholder="size, mm" style={{ width: "100px" }}
                  step={5} min={50} type='number'
                  onChange={(e) => setConusSize({ ...conusSize, h: +e.target.value })} />
              </div>
            </Html>

            <Html transform zIndexRange={1}
              position={[conusSize.h / 100 + 2, conusSize.d / 400, 0]}>
              <div className="p-inputgroup">
                грани:
                <span className="p-inputgroup-addon">шт</span>
                <input value={conusSize.n} placeholder="size, mm" style={{ width: "100px" }}
                  min={2} type='number'
                  onChange={(e) => setConusSize({ ...conusSize, n: +e.target.value })} />
              </div>
            </Html>
          </>
          : null}

        <Box position={[0, 0, 0]} active={active} setActive={setActive} />

        <gridHelper position={[0, -conusSize.d / 200, 0]} />
      </Canvas>
    </div>
  )
}

export default Conus;