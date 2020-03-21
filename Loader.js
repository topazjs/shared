'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

import styled, { css } from 'styled-components';

export const bigSqrAnimationCss = css`
@-webkit-keyframes bigSqrShrink {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    90% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
}

@keyframes bigSqrShrink {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    90% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
}
`;

export const drop3AnimationCss = css`
@-webkit-keyframes drop3 {
    0% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
    }
    50% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}

@keyframes drop3 {
    0% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
    }
    50% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}
`;

export const drop4AnimationCss = css`

@-webkit-keyframes drop4 {
    0% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
    }
    75% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}

@keyframes drop4 {
    0% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
    }
    75% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}
`;

export const drop2AnimationCss = css`
@-webkit-keyframes drop2 {
    0% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
    }
    25% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}

@keyframes drop2 {
    0% {
        -webkit-transform: translateY(-50px);
        transform: translateY(-50px);
    }
    25% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}
`;

export const LoaderDiv = styled.div`
    will-change: opacity;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    pointer-events: auto;
    position: absolute;
    z-index: 12;
    -webkit-transition: opacity 0.08s cubic-bezier(0, 0, 0.3, 0.1);
    transition: opacity 0.08s cubic-bezier(0, 0, 0.3, 0.1);
    opacity: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
    &:after {
        pointer-events: auto;
        position: absolute;
        z-index: 2;
        background: rgba(255, 255, 255, 0.75);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
    }
`;

export const LockNLoaderDiv = styled.div`
    position: absolute;
    display: inline-block;
    line-height: 16px;
    font-size: 25px;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    z-index: 5;
    color: #2B547E;
`;

export const BigSqrDiv = styled.div`
    will-change: transform;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    overflow: hidden;
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
    -webkit-animation: bigSqrShrink 1s linear infinite;
    animation: bigSqrShrink 1s linear infinite;
    
    ${bigSqrAnimationCss}
`;

export const SquareCss = css`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #2B547E;
`;

export const FirstSquareDiv = styled.div`
    ${SquareCss}
    
    left: 0;
    top: 20px;
`;

export const SecondSquareDiv = styled.div`
    ${SquareCss}
    
    will-change: transform;
    left: 20px;
    top: 20px;
    -webkit-animation: drop2 1s linear infinite;
    animation: drop2 1s linear infinite;
    
    ${drop2AnimationCss}
`;

export const ThirdSquareDiv = styled.div`
    ${SquareCss}
    
    will-change: transform;
    left: 0;
    top: 0;
    -webkit-animation: drop3 1s linear infinite;
    animation: drop3 1s linear infinite;
    
    ${drop3AnimationCss}
`;

export const FourthSquareDiv = styled.div`
    ${SquareCss}
    
    will-change: transform;
    left: 20px;
    top: 0;
    -webkit-animation: drop4 1s linear infinite;
    animation: drop4 1s linear infinite;
    
    ${drop4AnimationCss}
`;

export const Text = styled.div`
    line-height: 16px;
    font-family: "Roboto", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", "Helvetica", "Tahoma", "Arial", sans-serif;
    color: #2B547E;
    display: block;
    margin: 10px auto;
    padding: 3px;
`;

export type propsType = {
    handleClick: Function,
    message: string,
};

export const LoaderInner = ( props: propsType ) => {
    const {
        handleClick,
        message,
    } = props;

    return (
        <LoaderDiv className={`lock-n-loader`} onClick={handleClick}>
            <LockNLoaderDiv>
                <BigSqrDiv key={`loader-sqr-key`}>
                    <FirstSquareDiv key={`loader-key-first`} />
                    <SecondSquareDiv key={`loader-key-second`} />
                    <ThirdSquareDiv key={`loader-key-third`} />
                    <FourthSquareDiv key={`loader-key-fourth`} />
                </BigSqrDiv>
                <Text key={`loader-text-key`}>
                    {message}
                </Text>
            </LockNLoaderDiv>
        </LoaderDiv>
    );
};

export type wrapPropsType = {
    handleClick: ?Function,
    message: ?string,
};

export default class Loader extends PureComponent <wrapPropsType> {
    render () {
        const {
            handleClick,
            props,
        } = this;

        const {
            message = `loading...`,
        } = props;

        return (
            <LoaderInner
                handleClick={handleClick}
                message={message} />
        );
    }

    handleClick = typeof this.props.handleClick === `function`
        ? this.props.handleClick
        : ( event: Event ) => {};
}
