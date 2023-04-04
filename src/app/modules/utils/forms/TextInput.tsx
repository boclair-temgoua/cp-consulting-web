import { UseFormRegister } from "react-hook-form";
import { InputType, InputInputMode } from './index';
import clsx from 'clsx';

interface Props {
    register: UseFormRegister<any>;
    name: string;
    isRequired: boolean;
    label?: string;
    labelFlex?: string;
    type: InputType;
    min?: string,
    step?: string;
    isNumber?: boolean;
    inputMode?: InputInputMode,
    pattern?: any,
    required?: string;
    value?: string;
    className: string;
    validation?: { [key: string]: any };
    errors: { [key: string]: any };
    placeholder?: string;
    autoComplete?: string;
}

export const TextInput: React.FC<Props> = ({
    register,
    name,
    label,
    labelFlex,
    isRequired,
    isNumber,
    inputMode,
    min,
    step,
    pattern,
    required,
    type,
    value,
    className,
    validation = {},
    errors,
    placeholder = "",
    autoComplete,
}) => {
    return (
        <>

            {labelFlex && (
                <label className='form-label fs-6 fw-bolder text-dark'>{labelFlex}</label>
            )}

            <input
                {...register(name, { valueAsNumber: isNumber })}
                className={clsx(className)}
                id={name}
                type={type}
                value={value}
                pattern={pattern}
                min={min}
                step={step}
                inputMode={inputMode}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={errors?.name ? "true" : "false"}
                required={isRequired}
            />
            {errors?.name && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                        <span role='alert'>{errors?.name.message}</span>
                    </div>
                </div>
            )}

            {/* {label && (<label htmlFor={name} className={`${required} form-label text-dark`}>{label}</label>)} */}

        </>
    );
};