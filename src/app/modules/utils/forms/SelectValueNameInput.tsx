import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    dataItem: any;
    isRequired: boolean;
    label?: string;
    labelFlex?: string;
    required?: string;
    className: string;
    inputName: string;
    isValueInt: boolean;
    validation?: { [key: string]: any };
    errors: { [key: string]: any };
}

export const SelectValueNameInput: React.FC<Props> = ({
    register,
    label,
    dataItem,
    labelFlex,
    isRequired,
    required,
    className,
    inputName,
    isValueInt,
    validation = {},
    errors,
}) => {
    return (
        <>
            {labelFlex && (
                <label className="form-label fw-bolder text-dark fs-6 mb-2">
                    <span className={required}>{labelFlex}</span>
                    {/* {isRequired && (<i className="fas fa-exclamation-circle ms-2 fs-7"></i>)} */}
                </label>
            )}
            {label && (<label htmlFor={inputName} className={`${required} form-label`}>{label}</label>)}
            <select className={`${className} ${errors?.[inputName] ? "is-invalid" : ""
                }`} {...register(inputName, validation)} required={isRequired}>
                <option disabled>Choose options</option>
                {dataItem?.map((item: any, index: number) => (
                    <option value={isValueInt ? item?.id : item?.name} key={index}>{item?.name}</option>
                ))}
            </select>
            {errors?.[inputName] && (
                <strong className='fv-plugins-message-container text-danger'>
                    <div className='fv-help-block'>
                        <span role='alert'>{errors?.inputName.message}</span>
                    </div>
                </strong>
            )}
        </>
    );
}