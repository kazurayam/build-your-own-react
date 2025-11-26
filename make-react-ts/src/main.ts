console.log("Hello, Vite + TypeScript!");

const root: HTMLElement = document.querySelector('#app') as HTMLMapElement;
const p: HTMLElement = document.createElement('p');
p.textContent =  'Hello, World!';
root.appendChild(p);