import { WebRoutes } from '@qwaroo/types';
import { Display } from '#/components/Display/Display';
import { Button } from '#/components/Input/Button';

export function Over(props: Over.Props) {
    return <Display
        header="Game Over"
        title={`You scored ${props.score} points.`}
        description="You can play again, or browse other games."
    >
        <Button onClick={props.toRestart}>Play again</Button>
        <Button linkProps={{ href: WebRoutes.games() }}>
            Browse other games
        </Button>
    </Display>;
}

export namespace Over {
    export interface Props {
        score: number;
        toRestart(): void;
    }
}