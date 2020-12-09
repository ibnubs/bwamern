import React, {useState} from 'react'

import propTypes from 'prop-types';
import './index.scss';

export default function Number(props) {

    //distructure
    const {value, placeholder, name, min, max, prefix, suffix, isSuffixPlural} = props;

    //call local state
    const [InputValue, setInputValue] = useState(`${prefix}${value}${suffix}`);

    //function onchange
    const onChange = e => {
        let value = String(e.target.value);
        //menghapus value yang bernilai prefix dan suffix
        if (prefix) value = value.replace(prefix);
        if (prefix) value = value.replace(suffix);

        const patternNumeric = new RegExp ("[0-9]*");
        //is digunakan untuk boolean dan eksekusi jika ditemukan pattern
        const isNumeric = patternNumeric.test(value);

        if (isNumeric && +value <= max && +value >=min){
            props.onChange({
                target: {
                    name: name,
                    value: +value
                }
            });
            setInputValue(`${prefix}${value}${suffix}${isSuffixPlural && value > 1 ? "s" : ""}`);
        }
    }

    //function add and sub
    const minus = () => {
        value > min &&
            onChange ({
                target: {
                    name: name,
                    value: +value -1
                }
            });
    };
    const plus = () => {
        value < max && onChange({
            target: {
                name: name,
                value: +value +1
            }
        });
    };

    return (
        <div className={["input-number mb3", props.outerClassName].join(" ")}>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text minus" onClick={minus}>
                        -
                    </span>
                </div>
                <input
                    min={min}
                    max={max}
                    name={name}
                    pattern="[0-9]*"
                    className="form-control"
                    placeholder={placeholder ? placeholder : "0"}
                    value={String(InputValue)}
                    onChange={onChange}
                />
                <div className="input-group-append">
                    <span className="input-group-text plus" onClick={plus}>
                        +
                    </span>
                </div>
            </div>
        </div>
    );
};

//declare default props
Number.defaultProps = {
    min:1,
    max:1, 
    prefix:"",
    suffix:""
};

//declare props type
Number.propTypes = {
    value:propTypes.oneOfType([propTypes.string, propTypes.number]),
    onChange:propTypes.func,
    isSuffixPlural: propTypes.bool,
    placeholder:propTypes.string,
    outerClassName: propTypes.string
};