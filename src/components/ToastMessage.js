import React, { useEffect, useRef } from 'react';
import _ from 'lodash'

function ToastMessage({ item, remove }) {
    const removeRef = useRef()
    removeRef.current = remove

    useEffect(() => {
        console.log(JSON.stringify(item))
        const id = setTimeout(() => removeRef.current(item), 5000);
        return () => clearTimeout(id);
    }, [item])

    return (
        <div className="toast show border-0">
            <div className={"toast-header border-0 " + item.tClass}>
                <strong className="mr-auto">{item.title}</strong>
                {/* <small className="text-muted">just now</small> */}
                <span type="button" className="ml-2 mb-1 close" onClick={() => remove(item)}>
                    <span aria-hidden="true">&times;</span>
                </span>
            </div>
            <div className="toast-body">
                {item.message}
                <div className="d-flex flex-column border-info">
                    {
                        _.map(item.errors, (error, idx) =>{
                            return <span key={idx}>{_.isObject(error) ? error.message : error}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ToastMessage;