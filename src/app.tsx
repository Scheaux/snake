import GameBoard from './components/GameBoard';

export function App() {
    return (
        <div className="flex items-center justify-center">
            <GameBoard {...{ rows: 60, cols: 40 }} />
        </div>
    );
}
