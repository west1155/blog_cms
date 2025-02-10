import React from 'react';


type PropsType = {
    className?: string
}
export const PostWidget = ({className}: PropsType) => {
    return <div className={className}>
        widget
    </div>

}
