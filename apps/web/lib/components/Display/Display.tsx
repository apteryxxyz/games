import { Button } from '../Input/Button';
import { SocialButtons } from '../Input/SocialButtons';
import styles from './Display.module.css';

export namespace Display {
    export interface Props {
        className?: string;
        style?: React.CSSProperties;

        header?: string;
        title: string;
        description: string;

        showRefresh?: boolean;
        showGoBack?: boolean;
        showGoHome?: boolean;
        showSocials?: boolean;

        children?: React.ReactNode | React.ReactNode[];
    }
}

export function Display(props: Display.Props) {
    return <div
        className={`flex gap-3 py-[20vh] md:py-[30vh] ${props.className ?? ''}`}
        style={{ ...props.style }}
    >
        <div className="flex flex-col gap-3 mx-auto">
            <div>
                {props.header && <h2 className="text-sky-400 text-xl font-bold">
                    {props.header}
                </h2>}

                <span className="flex items-baseline">
                    <h1 className="text-3xl font-bold">{props.title}</h1>
                    {props.title === 'Loading' && <div
                        className={`ml-5 ${styles['dot-flashing']}`}
                    ></div>}
                </span>

                <p className="max-w-[600px]">{props.description}</p>
            </div>

            <div className="flex flex-row flex-wrap gap-3">
                {props.showGoHome && <Button linkProps={{ href: '/' }}>
                    Go home
                </Button>}

                {/* IDEA: I could use the 'owenii.back_to' to handle this */}
                {props.showGoBack && <Button
                    onClick={() => window.history.back()}
                >
                    Go back
                </Button>}

                {props.showRefresh && <Button
                    onClick={() => window.location.reload()}
                >
                    Refresh page
                </Button>}

                {props.children}
            </div>

            {props.showSocials && <SocialButtons />}
        </div>
    </div>;
}