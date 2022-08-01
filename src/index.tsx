import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import './index.css'
import Game from "./components/game";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(<Game />);