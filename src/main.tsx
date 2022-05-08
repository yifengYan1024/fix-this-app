import App from "./app";
// import NotesView from "./view.js";
import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

const root = document.getElementById("app");
// new App(root);
ReactDOM.createRoot(root!).render(<App/>);
