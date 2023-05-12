import { motion } from 'framer-motion';
import type { AriaRole, Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

export function Textarea(props: Textarea.Props) {
    const [value, setValue] = props.setValue
        ? [props.value ?? '', props.setValue]
        : useState(props.value ?? '');
    const [error, setError] = useState<string | null>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout>>(null!);

    function validate() {
        const valueExists = value && value.trim() !== '';
        const doesMatch = props.mustMatch?.test(value) ?? true;

        if (props.minLength && value.length < props.minLength)
            return `Must be at least ${props.minLength} characters long`;
        if (props.maxLength && value.length > props.maxLength)
            return `Must be at most ${props.maxLength} characters long`;

        if (!valueExists && props.isRequired) return 'Required';
        if (valueExists && !doesMatch) return 'Invalid format';

        const additionalValidation =
            props.additionalValidation?.(value) ?? null;
        if (additionalValidation) return additionalValidation;

        return null;
    }

    useEffect(() => {
        const result = validate();
        setError(result);
        props.onValidate?.(result);
    }, [value]);

    return <div role={props.ariaRole} className="flex">
        {error && <p className="absolute text-red-500 bottom-1 right-1 px-1">
            {error}
        </p>}

        <motion.textarea
            placeholder={props.placeHolder}
            disabled={props.isDisabled}
            className={`w-full p-2 bg-white dark:bg-neutral-700
                rounded-xl
                ${error ? 'outline outline-red-500' : ''}
                ${props.isDisabled ? 'cursor-not-allowed' : ''}
                ${props.className ?? ''}`}
            value={value}
            //
            onChange={event => {
                const newValue = event.currentTarget.value;
                clearTimeout(searchTimeout.current);
                setValue(newValue);

                const isLengthError = error?.includes('Must have at');
                if (
                    (error && !isLengthError) ||
                    !props.enableOnChange ||
                    !props.onValue
                )
                    return;

                searchTimeout.current = setTimeout(() => {
                    if (!props.onValue) return;
                    props.onValue(value);
                }, 300);
            }}
            //
            onKeyUp={event => {
                const isLengthError = error?.includes('Must have at');
                if (error && !isLengthError) return;

                if (
                    props.enableEnter &&
                    props.onValue &&
                    event.key === 'Enter'
                ) {
                    props.onValue(value);
                    event.currentTarget.blur();
                    return;
                }

                if (props.onKeyUp) props.onKeyUp(event.key, value);
            }}
        />
    </div>;
}

export namespace Textarea {
    export interface Props {
        // Styling
        ariaRole?: AriaRole;
        className?: string;

        // State
        value?: string;
        setValue?: Dispatch<SetStateAction<string>>;

        // Validate
        isRequired?: boolean;
        mustMatch?: RegExp;
        minLength?: number;
        maxLength?: number;
        additionalValidation?(value: string): string | null;

        // Input
        placeHolder?: string;
        isDisabled?: boolean;

        // Enabling
        enableEnter?: boolean;
        enableOnChange?: boolean;

        // Callbacks
        onKeyUp?(key: string, value: string): void;
        onValue?(value: string): void;
        onValidate?(value: string | null): void;
    }
}
