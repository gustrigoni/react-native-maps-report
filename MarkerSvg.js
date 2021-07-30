import React from 'react';
import { SvgCss } from 'react-native-svg';

function Marker (props) {

    let svgData = `
        <svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 128 128" preserveAspectRatio="slice">
            <g id="postemadeira">
                <g>
                    <circle class="cor poste" fill="#ccc" cx="64" cy="64" r="20.4" stroke="black" stroke-width="2"/>
                </g>
            </g>
        </svg>
    `;

    return <SvgCss
        {...props}
        width={35}
        height={35}
        xml={svgData}
    />
    
}

export default React.memo(Marker);