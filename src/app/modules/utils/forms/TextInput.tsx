import { UseFormRegister } from "react-hook-form";
import { InputType, InputInputMode } from './index';
import clsx from 'clsx';

interface Props {
    register: UseFormRegister<any>;
    inputName: string;
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
    inputName,
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
                {...register(inputName, { valueAsNumber: isNumber })}
                className={`${clsx(className)} ${errors?.inputName ? "is-invalid" : ""
                    }`}
                id={inputName}
                type={type}
                value={value}
                pattern={pattern}
                min={min}
                step={step}
                inputMode={inputMode}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={errors?.inputName ? "true" : "false"}
                required={isRequired}
            />
            {errors?.inputName && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                        <span role='alert'>{errors?.inputName.message}</span>
                    </div>
                </div>
            )}
        </>
    );
};