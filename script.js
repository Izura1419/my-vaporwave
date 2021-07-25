  const canvas = document.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 5);
  camera.position.z = 20;

  const scene = new THREE.Scene();
  //scene.background = new THREE.Color('slateblue');

  const light = new THREE.DirectionalLight('blueviolet', 10);
  light.position.set(-2, 0, 20);
  scene.add(light);

  //music
  const body = document.querySelector('body'); 
  const audioMac = new Audio('macintosh-plus-420.mp3');

  body.onclick = () =>{
    audioMac.play();
    body.style.cursor = 'default';
  }

  const loader = new THREE.GLTFLoader();

  loader.load( 'scene.gltf', function ( gltf ) {
  gltf.scene.position.set(0,-2,15);
  gltf.scene.scale.set(0.8,0.8,0.8);

  gltf.scene.rotation.y = 1.5;
  gltf.scene.rotation.x = 0.4;

  scene.add( gltf.scene );
  scene.fog = new THREE.FogExp2('red', .1, 1);

  function render(time) {
    gltf.scene.rotation.y += 0.02;
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}); 

const loaderr = new THREE.FontLoader();

loaderr.load( 'helvetiker_regular.typeface.json', function ( font ) {

    const geometry = new THREE.TextGeometry( 'its all in your h e a d', {
    font: font,
    size: .2,
    height: .01,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: .01,
    bevelSize: .005,
    bevelSegments: 2
  } );
    const material = new THREE.MeshPhongMaterial({color : 'royalblue', shininess : 1});
    const textHate = new THREE.Mesh( geometry, material );

    textHate.position.x = 1.5;
    textHate.position.z = 18;    
    textHate.position.y = -.1;
    scene.add(textHate);

     function render(time) {
    textHate.position.x -= 0.001;
    textHate.rotation.y -= 0.01;
    
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render); 

} );