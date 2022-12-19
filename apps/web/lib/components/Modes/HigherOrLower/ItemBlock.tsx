import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import type { Game } from '@owenii/client';
import { Button } from '#/components/Input/Button';

export function ItemBlock({
    shouldShowValue = false,
    shouldShowActions = false,
    ...props
}: ItemBlock.Props) {
    return <aside
        className="h-[50vh] xl:h-screen w-screen xl:w-[50vw] bg-no-repeat text-white
            flex flex-col justify-center items-center p-10 xl:pt-[30vw] select-none"
        style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(${props.imageSource})`,
            backgroundSize: props.imageFrame === 'fit' ? '100%' : 'cover',
            backgroundPosition:
                props.imageFrame === 'fit' ? '50% 50%' : 'center',
        }}
    >
        <h2 className="text-center text-2xl xl:text-5xl font-bold">
            "{props.display}"
        </h2>

        {props.caption && <span>{props.caption}</span>}

        <span className="text-xl">{props.verb}</span>

        {shouldShowValue && <span className="text-4xl xl:text-7xl font-bold">
            {props.prefix}
            {typeof props.value === 'number'
                ? props.value.toLocaleString()
                : props.value}
            {props.suffix}
        </span>}

        {shouldShowActions &&
            props.onMoreClick &&
            props.onLessClick && <div className="flex text-center font-bold text-lg xl:text-3xl">
                <Button
                    className="m-3 p-3 uppercase bg-red-500"
                    whileHover="brightness-125"
                    disableDefaultStyles
                    iconProp={faArrowUp}
                    onClick={props.onMoreClick}
                >
                    {props.higher}
                </Button>

                <Button
                    className="m-3 p-3 uppercase bg-blue-500"
                    whileHover="brightness-125"
                    disableDefaultStyles
                    iconProp={faArrowDown}
                    onClick={props.onLessClick}
                >
                    {props.lower}
                </Button>
            </div>}

        <span className="text-xl">{props.noun}</span>
    </aside>;
}

export namespace ItemBlock {
    export type Mode = typeof Game.Entity.Mode.HigherOrLower;

    export interface Props
        extends Omit<Game.Entity.Item<Mode>, 'value'>,
            Game.Entity.Data<Mode> {
        thisSide: 'left' | 'right';

        shouldShowValue?: boolean;
        shouldShowActions?: boolean;

        onMoreClick?(): void;
        onLessClick?(): void;

        value: string | React.ReactNode;
    }
}