'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MONOGRAM_WIDTH = 720;
const MONOGRAM_HEIGHT = 360;
const SAMPLE_STEP = 8;
const MONOGRAM_SCALE = 0.012;
const REBUILD_DELAY = 850;
const POINTER_RADIUS = 0.72;

function createDotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 30);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.7, '#ffffff');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

function createMonogramGeometry() {
  const canvas = document.createElement('canvas');
  canvas.width = MONOGRAM_WIDTH;
  canvas.height = MONOGRAM_HEIGHT;
  const context = canvas.getContext('2d', { willReadFrequently: true });

  context.clearRect(0, 0, MONOGRAM_WIDTH, MONOGRAM_HEIGHT);
  context.fillStyle = '#ffffff';
  context.font = '700 290px Manrope, Arial, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('GH', MONOGRAM_WIDTH / 2, MONOGRAM_HEIGHT / 2 + 10);

  const pixels = context.getImageData(0, 0, MONOGRAM_WIDTH, MONOGRAM_HEIGHT).data;
  const targets = [];
  const positions = [];
  const phases = [];

  for (let y = SAMPLE_STEP / 2; y < MONOGRAM_HEIGHT; y += SAMPLE_STEP) {
    for (let x = SAMPLE_STEP / 2; x < MONOGRAM_WIDTH; x += SAMPLE_STEP) {
      const alpha = pixels[(Math.floor(y) * MONOGRAM_WIDTH + Math.floor(x)) * 4 + 3];
      if (alpha < 80) continue;

      const targetX = (x - MONOGRAM_WIDTH / 2) * MONOGRAM_SCALE;
      const targetY = (MONOGRAM_HEIGHT / 2 - y) * MONOGRAM_SCALE;
      const targetZ = (Math.random() - 0.5) * 0.12;

      targets.push(targetX, targetY, targetZ);
      positions.push(
        targetX + (Math.random() - 0.5) * 2.5,
        targetY + (Math.random() - 0.5) * 2.5,
        targetZ + (Math.random() - 0.5) * 1.2,
      );
      phases.push(Math.random() * Math.PI * 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return { geometry, targets: new Float32Array(targets), phases };
}

export function AgentNetworkScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const { geometry, targets, phases } = createMonogramGeometry();
    const dotTexture = createDotTexture();
    const material = new THREE.PointsMaterial({
      alphaTest: 0.25,
      color: 0xd8ff3e,
      map: dotTexture,
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
    });
    const monogram = new THREE.Points(geometry, material);
    const velocities = new Float32Array(targets.length);
    const pointer = { x: 0, y: 0, worldX: 0, worldY: 0, inside: false };
    const startedAt = performance.now();
    let rebuildAt = 0;
    let animationFrame;

    camera.position.z = 9;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    container.append(renderer.domElement);
    scene.add(monogram);

    function handlePointerMove(event) {
      const bounds = container.getBoundingClientRect();
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
      pointer.inside = event.clientX >= bounds.left
        && event.clientX <= bounds.right
        && event.clientY >= bounds.top
        && event.clientY <= bounds.bottom;
      pointer.worldX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8.6;
      pointer.worldY = (0.5 - (event.clientY - bounds.top) / bounds.height) * 4.3;
    }

    function handlePointerLeave() {
      pointer.inside = false;
    }

    function breakMonogram(event) {
      const bounds = container.getBoundingClientRect();
      const isInside = event.clientX >= bounds.left
        && event.clientX <= bounds.right
        && event.clientY >= bounds.top
        && event.clientY <= bounds.bottom;

      if (!isInside || event.target.closest?.('a, button, input')) return;

      const clickX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8.6;
      const clickY = (0.5 - (event.clientY - bounds.top) / bounds.height) * 4.3;
      const positions = geometry.attributes.position.array;

      for (let index = 0; index < phases.length; index += 1) {
        const offset = index * 3;
        const deltaX = positions[offset] - clickX;
        const deltaY = positions[offset + 1] - clickY;
        const distance = Math.max(Math.hypot(deltaX, deltaY), 0.18);
        const force = Math.min(0.22 / distance, 0.24) * (0.7 + Math.random() * 0.7);

        velocities[offset] += (deltaX / distance) * force + (Math.random() - 0.5) * 0.06;
        velocities[offset + 1] += (deltaY / distance) * force + (Math.random() - 0.5) * 0.06;
        velocities[offset + 2] += (Math.random() - 0.5) * 0.18;
      }

      rebuildAt = performance.now() + REBUILD_DELAY;
    }

    function resize() {
      const bounds = container.getBoundingClientRect();
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
      renderer.setSize(bounds.width, bounds.height);
      renderer.render(scene, camera);
    }

    function animate(now) {
      const elapsed = (now - startedAt) / 1000;
      const settle = reducedMotion ? 1 : Math.min(elapsed / 1.4, 1);
      const easedSettle = 1 - ((1 - settle) ** 3);
      const positions = geometry.attributes.position.array;
      const isRebuilding = now >= rebuildAt;

      for (let index = 0; index < phases.length; index += 1) {
        const offset = index * 3;
        const drift = reducedMotion ? 0 : Math.sin(elapsed * 1.2 + phases[index]) * 0.018;
        const attraction = isRebuilding ? 0.035 + easedSettle * 0.075 : 0.002;

        if (pointer.inside && isRebuilding) {
          const deltaX = positions[offset] - pointer.worldX;
          const deltaY = positions[offset + 1] - pointer.worldY;
          const distance = Math.hypot(deltaX, deltaY);
          if (distance > 0.02 && distance < POINTER_RADIUS) {
            const force = (1 - distance / POINTER_RADIUS) * 0.012;
            velocities[offset] += (deltaX / distance) * force;
            velocities[offset + 1] += (deltaY / distance) * force;
          }
        }

        velocities[offset] += (targets[offset] - positions[offset]) * attraction;
        velocities[offset + 1] += (targets[offset + 1] + drift - positions[offset + 1]) * attraction;
        velocities[offset + 2] += (targets[offset + 2] - positions[offset + 2]) * attraction;
        velocities[offset] *= isRebuilding ? 0.82 : 0.965;
        velocities[offset + 1] *= isRebuilding ? 0.82 : 0.965;
        velocities[offset + 2] *= isRebuilding ? 0.82 : 0.965;
        positions[offset] += velocities[offset];
        positions[offset + 1] += velocities[offset + 1];
        positions[offset + 2] += velocities[offset + 2];
      }

      geometry.attributes.position.needsUpdate = true;
      monogram.rotation.x += (pointer.y * 0.12 - monogram.rotation.x) * 0.035;
      monogram.rotation.y += (pointer.x * 0.18 - monogram.rotation.y) * 0.035;
      renderer.render(scene, camera);

      if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate);
    }

    resize();
    if (reducedMotion) {
      geometry.attributes.position.array.set(targets);
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    } else {
      animationFrame = window.requestAnimationFrame(animate);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerdown', breakMonogram);
      container.addEventListener('pointerleave', handlePointerLeave);
    }
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', breakMonogram);
      container.removeEventListener('pointerleave', handlePointerLeave);
      geometry.dispose();
      material.dispose();
      dotTexture.dispose();
      renderer.dispose();
      container.replaceChildren();
    };
  }, []);

  return <div className="network network-monogram" ref={containerRef} aria-hidden="true" />;
}
