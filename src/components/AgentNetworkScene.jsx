'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NODE_COUNT = 42;
const CONNECTION_DISTANCE = 1.3;

function createNodes() {
  const positions = new Float32Array(NODE_COUNT * 3);
  const vectors = [];

  for (let index = 0; index < NODE_COUNT; index += 1) {
    const vector = new THREE.Vector3()
      .randomDirection()
      .multiplyScalar(2.1 + Math.random() * 1.4);

    positions.set(vector.toArray(), index * 3);
    vectors.push(vector);
  }

  return { positions, vectors };
}

function createConnectionPositions(nodes) {
  const positions = [];

  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      if (nodes[first].distanceTo(nodes[second]) < CONNECTION_DISTANCE) {
        positions.push(...nodes[first].toArray(), ...nodes[second].toArray());
      }
    }
  }

  return positions;
}

export function AgentNetworkScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    camera.position.z = 7;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    container.append(renderer.domElement);

    const { positions, vectors } = createNodes();
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMaterial = new THREE.PointsMaterial({ color: 0xd7ff43, size: 0.075 });
    const points = new THREE.Points(pointGeometry, pointMaterial);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(createConnectionPositions(vectors), 3),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8d9884,
      transparent: true,
      opacity: 0.22,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

    const coreGeometry = new THREE.IcosahedronGeometry(0.55, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xd7ff43, wireframe: true });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    scene.add(points, lines, core);

    const pointer = { x: 0, y: 0 };
    let animationFrame;

    const handlePointerMove = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
      renderer.setSize(bounds.width, bounds.height);
    };

    const animate = () => {
      points.rotation.y += 0.0015;
      lines.rotation.y = points.rotation.y;
      core.rotation.x += 0.004;
      core.rotation.y += 0.006;
      scene.rotation.x += (pointer.y * 0.2 - scene.rotation.x) * 0.03;
      scene.rotation.y += (pointer.x * 0.35 - scene.rotation.y) * 0.03;
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
      container.replaceChildren();
    };
  }, []);

  return <div className="network" ref={containerRef} aria-hidden="true" />;
}
