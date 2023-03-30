import { useState } from 'preact/hooks';
import GameBoard from './components/GameBoard';

export function App() {
    const [reset, setReset] = useState(false);

    return (
        <div className="flex items-center justify-center mt-1">
            {reset && <GameBoard {...{ rows: 60, cols: 40, setReset }} />}
            {!reset && <GameBoard {...{ rows: 60, cols: 40, setReset }} />}
        </div>
    );
}
