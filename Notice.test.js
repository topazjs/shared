'use strict';

import React from "react";

import {
    render,
    unmountComponentAtNode
} from "react-dom";

import { act } from "react-dom/test-utils";
import { Notice } from './Notice';
import * as Intentions from './intentions';

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

describe(`Missing or invalid 'type'`, function () {
    it("throws when missing", () => {
        expect(() => act(() => render(<Notice />, container))).toThrow();
    });
    it("throws when invalid", () => {
        expect(() => act(() => render(<Notice type={`not-a-valid-type`} />, container))).toThrow();
    });
});

describe("Provide only a type - no title, no message, no children, no inverted", function () {
    it("renders type 'warning'", () => {
        act(() => {
            render(<Notice type={Intentions.WARNING} message={`message text`} />, container);
        });
        expect(container.textContent).toBe("message text");
    });
    it("renders type 'success'", () => {
        act(() => {
            render(<Notice type={Intentions.SUCCESS} message={`message text`} />, container);
        });
        expect(container.textContent).toBe("message text");
    });
    it("renders type 'error'", () => {
        act(() => {
            render(<Notice type={Intentions.ERROR} message={`message text`} />, container);
        });
        expect(container.textContent).toBe("message text");
    });
    it("renders type 'plain'", () => {
        act(() => {
            render(<Notice type={Intentions.PLAIN} message={`message text`} />, container);
        });
        expect(container.textContent).toBe("message text");
    });
    it("renders type 'info'", () => {
        act(() => {
            render(<Notice type={Intentions.INFO} message={`message text`} />, container);
        });
        expect(container.textContent).toBe("message text");
    });
});

it("renders with a type and a message, no title, no children", () => {
    act(() => {
        render(<Notice
            type={Intentions.WARNING}
            message={`I'm trying to test shhh`} />, container);
    });
    expect(container.textContent)
        .toBe("I'm trying to test shhh");
});

it("renders with a type and a title, no message, no children", () => {
    act(() => {
        render(<Notice
            type={Intentions.WARNING}
            title={`I'm trying to test shhh`} />, container);
    });
    expect(container.textContent)
        .toBe("I'm trying to test shhh");
});

it("renders with a type and children, no title, no message", () => {
    act(() => {
        render(<Notice type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
    });
    expect(container.textContent)
        .toBe("I'm trying to test shhh");
});

it("renders with a type, a title and children, no message", () => {
    act(() => {
        render(<Notice
            title={`It's a title!`}
            type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
    });
    expect(container.textContent)
        .toBe("It's a title!I'm trying to test shhh");
});

it("renders with a type, a message and children, no title", () => {
    act(() => {
        render(<Notice
            message={`It's a message!`}
            type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
    });
    expect(container.textContent)
        .toBe("It's a message!I'm trying to test shhh");
});

it("renders with a type, a title, a message and children", () => {
    act(() => {
        render(<Notice
            title={`Oh a title?`}
            message={`It's a message!`}
            type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
    });
    expect(container.textContent)
        .toBe("Oh a title?It's a message!I'm trying to test shhh");
});
