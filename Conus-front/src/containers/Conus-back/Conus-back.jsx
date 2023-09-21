import React, { useRef, useState, useEffect } from 'react'
import axios from "axios";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

const Conus = () => {
  const myContainer = useRef(null);
  const conusSize = {
    d: 8,
    h: 4,
    n: 3,
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x80A4B7)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const loader = new THREE.ObjectLoader();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.x = 1

  const modelCreat = (response) => {
    myContainer.current.appendChild(renderer.domElement)
    
    const object = loader.parse(response.data);
    console.log(response.data)

    directionalLight.position.z = Math.max(conusSize.d, conusSize.h)
    camera.position.z = conusSize.d*2;

    removeSceneChild()

    scene.add(object);
    scene.add(directionalLight);
      
    function animate() {
      requestAnimationFrame(animate);
      object.rotation.x += 0.001;
      object.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();
  }

  useEffect(()=>{
    modelRequest()
  },[])

  const modelRequest = () => {
    
    axios.post('http://localhost:2000/', { data: conusSize },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      modelCreat(response)
    }).catch(()=>{
      console.log('error')
    })
  }

  function removeSceneChild(){
    while(scene.children.length > 0){ 
      scene.remove(scene.children[0]); 
    }
  }

  return (
    <>
      <div style={{ position: 'absolute' }}
        id="model" ref={myContainer}> </div>

      <div className='panel'>        
        Диаметр
        <InputNumber value={conusSize.d} onChange={(e) => conusSize.d = +e.value } useGrouping={false} min={1} />
        Высота
        <InputNumber value={conusSize.h} onChange={(e) => conusSize.h = +e.value} useGrouping={false} min={1} />
        Число секций
        <InputNumber value={conusSize.n} onChange={(e) => conusSize.n = +e.value} useGrouping={false} min={1} />
        
        <Button label="Submit" onClick={() => modelRequest()} />
        <Button label='Remove' onClick={() => removeSceneChild()}/>
      </div>
    </>

  )
}

export default Conus;