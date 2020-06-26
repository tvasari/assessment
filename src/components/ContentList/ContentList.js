import React from 'react';

const ContentList = ( { content } ) => {
    console.log('contentlist content', content)
    return(
        <div style={{'display': 'grid', 'gridTemplateColumns': 'repeat(2, 1fr)', 'gridGap': '15px'}}>
            {
                content.map(obj => {
                    if (obj.tipo === 'testo') {
                        return <h1 key={obj.contenuto} style={{'gridColumnStart': 'span 2'}}>{obj.contenuto}</h1>
                    } else {
                        return <img key={obj.contenuto} alt={obj.contenuto} src={obj.contenuto} />
                    }
                })
            }
        </div>
    );
}

export default ContentList;