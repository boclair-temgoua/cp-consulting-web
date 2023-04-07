import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    label: string;
    required?: string;
    className: string;
    inputName: string;
    rows: number;
    validation?: { [key: string]: any };
    errors: { [key: string]: any };
    placeholder?: string;
}

export const TextareaInput: React.FC<Props> = ({
    register,
    label,
    required,
    className,
    rows,
    inputName,
    validation = {},
    errors,
    placeholder = "",
}) => {
    return (
        <>
            <label htmlFor={inputName} className={`${required} form-label fs-6 fw-bold mb-2`}><strong>{label}</strong></label>
            <textarea
                className={`${className} ${errors?.inputName ? "is-invalid" : ""
                    }`}
                {...register(inputName, validation)}
                id={inputName}
                rows={rows}
                placeholder={placeholder}
                aria-invalid={errors?.inputName ? "true" : "false"}
            />
            {errors?.inputName && (
                <strong className='fv-plugins-message-container text-danger'>
                    <div className='fv-help-block'>
                        <span role='alert'>{errors?.inputName.message}</span>
                    </div>
                </strong>
            )}
        </>
    );
};