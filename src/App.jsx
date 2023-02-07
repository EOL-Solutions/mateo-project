import { useState, Suspense, useRef, useEffect } from 'react'
import './App.scss'
import Header from './components/Header/header'
import {Section} from './components/Section/section'
import { Canvas, useFrame } from 'react-three-fiber'
import { Html, useGLTF } from '@react-three/drei'
import state from './components/State/state'
import models from './models.json'



const Model = ({modelPath, scale=[1, 1, 1]}) => {
  const gltf = useGLTF(modelPath , true)
  return <primitive object={gltf.scene} dispose={null} scale={scale}/>
}
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight position={[1000, 0, 0]} intensity={1} />
    </>
  )
}

const HTMLContent = ({children, modelPath, positionY,domContent,scale=[1, 1, 1]}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return(
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model modelPath={modelPath} scale={scale}/>
        </mesh>
        <Html 
          portal={domContent}
          fullscreen>
             {children}
        </Html>
      </group>
    </Section>
  )
}

const Loading = () => {
  return (
    <div className="loading-container">
      <div className='loading-ball loading-ball-1'></div>
      <div className='loading-ball loading-ball-2'></div>
      <div className='loading-ball loading-ball-3'></div>
      <div className='loading-ball loading-ball-4'></div>
      <div className='loading-ball loading-ball-5'></div>
    </div>
  )

}

function App() {
  const [count, setCount] = useState(0)
  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
   <>      
    <Suspense fallback={<Loading />}>
        <Header />
        <Canvas
          colorManagement
          camera={{ position: [0, 0, 120], fov: 90 }}        
          >
            <Lights />
              {
                models.routes.map((item) => (
                  <HTMLContent 
                    positionY={item.position}
                    modelPath={`/models/${item.path}/scene.gltf`}
                    domContent={domContent}
                    scale={item.scale}>
                      <div className="container">
                        <h2 className="title">{item.text}</h2>
                      </div>
                  </HTMLContent>
                ))
              }</Canvas>
              <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
                <div style={{position:'sticky', top:0} } ref={domContent}>

                </div>
                <div style={{height:`${state.sections * 75}vh`}}>

                </div>
              </div>
      </Suspense>                 
   </>
  )
}

export default App
