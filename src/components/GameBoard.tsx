import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
    rows: number;
    cols: number;
}

function GameBoard({ rows, cols }: Props) {
    const [_rows, _setRows] = useState(Array(rows).fill(0, 0, rows));
    const [board, setBoard] = useState(Array(cols).fill(_rows, 0, rows));
    const [snake, setSnake] = useState([
        { x: 15, y: 5 },
        { x: 16, y: 5 },
    ]);
    const apple = useRef({
        x: 14,
        y: 14,
    });
    const direction = useRef('top');
    const [turns, setTurns] = useState(0);

    console.log('rendered!');

    useEffect(() => {
        const timer = setInterval(() => moveTo(direction.current), 200);
        document.addEventListener('keydown', changeDirection);
        return () => clearInterval(timer);
    }, []);

    function changeDirection(evt: KeyboardEvent) {
        if (evt.key === 'ArrowUp') {
            if (
                !snake.find((v) => v.x === snake[0].x - 1 && v.y === snake[0].y)
            )
                direction.current = 'top';
        } else if (evt.key === 'ArrowRight') {
            if (
                !snake.find((v) => v.x === snake[0].x && v.y === snake[0].y + 1)
            )
                direction.current = 'right';
        } else if (evt.key === 'ArrowDown') {
            if (
                !snake.find((v) => v.x === snake[0].x + 1 && v.y === snake[0].y)
            )
                direction.current = 'bottom';
        } else if (evt.key === 'ArrowLeft') {
            if (
                !snake.find((v) => v.x === snake[0].x && v.y === snake[0].y - 1)
            )
                direction.current = 'left';
        }
        setTurns((prev) => prev + 1);
    }

    function setSnakePos(x: number, y: number, pop = false) {
        setSnake((prev: Array<{ x: number; y: number }>) => {
            prev.unshift({ x, y });
            if (pop === false) prev.pop();
            if (pop === true) spawnApple();
            return prev;
        });
    }

    function moveTo(direction: string) {
        let pop = false;
        if (direction === 'top' && snake[0].x - 1 !== 0) {
            if (
                snake[0].x - 1 === apple.current.x &&
                snake[0].y === apple.current.y
            )
                pop = true;
            setSnakePos(snake[0].x - 1, snake[0].y, pop);
        } else if (direction === 'right' && snake[0].y !== rows - 1) {
            if (
                snake[0].x === apple.current.x &&
                snake[0].y + 1 === apple.current.y
            )
                pop = true;
            setSnakePos(snake[0].x, snake[0].y + 1, pop);
        } else if (direction === 'bottom' && snake[0].x !== cols - 1) {
            if (
                snake[0].x + 1 === apple.current.x &&
                snake[0].y === apple.current.y
            )
                pop = true;
            setSnakePos(snake[0].x + 1, snake[0].y, pop);
        } else if (direction === 'left' && snake[0].y !== 0) {
            if (
                snake[0].x === apple.current.x &&
                snake[0].y - 1 === apple.current.y
            )
                pop = true;
            setSnakePos(snake[0].x, snake[0].y - 1, pop);
        }
        setTurns((prev) => prev + 1);
    }

    function spawnApple() {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        apple.current = { x, y };
    }

    function restartGame() {}

    function generateEyes() {
        if (direction.current === 'top') {
            return (
                <>
                    <div className="top-0 right-1 h-0.5 w-0.5 bg-red-500 absolute"></div>
                    <div className="top-0 left-1 h-0.5 w-0.5 bg-red-500 absolute"></div>
                </>
            );
        } else if (direction.current === 'right') {
            return (
                <>
                    <div className="top-1 right-0 h-0.5 w-0.5 bg-red-500 absolute"></div>
                    <div className="bottom-1 right-0 h-0.5 w-0.5 bg-red-500 absolute"></div>
                </>
            );
        } else if (direction.current === 'left') {
            return (
                <>
                    <div className="top-1 left-0 h-0.5 w-0.5 bg-red-500 absolute"></div>
                    <div className="bottom-1 left-0 h-0.5 w-0.5 bg-red-500 absolute"></div>
                </>
            );
        } else if (direction.current === 'bottom') {
            return (
                <>
                    <div className="bottom-0 right-1 h-0.5 w-0.5 bg-red-500 absolute"></div>
                    <div className="bottom-0 left-1 h-0.5 w-0.5 bg-red-500 absolute"></div>
                </>
            );
        }
    }

    return (
        <table className="flex border-black border-solid border">
            <tbody>
                {board.map((column: number[], cIdx: number) => {
                    return (
                        <tr>
                            {column.map((row: number, rIdx: number) => {
                                let cls;
                                if (
                                    snake.find(
                                        (v) => v.x === cIdx && v.y === rIdx
                                    )
                                ) {
                                    cls = 'snake';
                                } else if (
                                    cIdx === apple.current.x &&
                                    rIdx === apple.current.y
                                ) {
                                    cls = 'bg-red-500';
                                }
                                return (
                                    <td className={`w-4 h-4 relative ${cls}`}>
                                        {snake[0].x === cIdx &&
                                            snake[0].y === rIdx &&
                                            generateEyes()}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default GameBoard;
