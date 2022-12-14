import type { Game } from '@owenii/types';

export interface Source<
    K extends string | number | symbol,
    F extends Game.Type = Game.Type
> {
    for: F;
    slug: string;
    name: string;
    description: string;
    props: Record<K, Source.Prop>;

    fetchItems(options: Record<K, unknown>): Promise<Game.Item<F>[]>;
}

export namespace Source {
    export interface Prop<T extends Prop.Type = Prop.Type> {
        type: T | [T];
        description: string;
        required: boolean;
        default?: unknown;
    }

    export namespace Prop {
        export enum Type {
            String = 'string',
            Number = 'number',
            Boolean = 'boolean',
            URL = 'url',
        }
    }
}
