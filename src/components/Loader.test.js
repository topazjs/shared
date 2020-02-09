// hello.test.js

import React from "react";

import {
    render,
    unmountComponentAtNode,
} from "react-dom";

import { act } from "react-dom/test-utils";

import Loader from './Loader';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with no props passed", () => {
    act(() => {
        render(<Loader />, container);
    });
    expect(container.textContent)
        .toBe("loading...");
});

it("renders the text passed as `message` instead of the default `loading...`", () => {
    act(() => {
        render(<Loader message={`Walmart vs. Albertson's`} />, container);
    });
    expect(container.textContent)
        .toBe("Walmart vs. Albertson's");
});

it("renders and attaches click event to the provided `handleClick` prop", () => {
    const testData = `${Math.random} + ${Date.now()}`;
    act(() => {
        render(<Loader handleClick={e => document.body.setAttribute(`data-test-body`, testData)} />, container);
        container.querySelector(`.lock-n-loader`).click();
    });
    expect(container.textContent)
        .toBe("loading...");
    expect(document.body.getAttribute(`data-test-body`))
        .toBe(testData);
});

it("renders and does nothing when clicked and no event handler provided", () => {
    act(() => {
        render(<Loader />, container);
        container.querySelector(`.lock-n-loader`).click();
    });
    expect(container.textContent)
        .toBe("loading...");
});
