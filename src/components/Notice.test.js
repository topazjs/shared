// hello.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import * as Intentions from '../info/intentions';

import {
    standardColorMap,
    darkerColorMap,
    iconMap,
} from '../info/colors';

import Notice from './Notice';

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

it("renders with only a type, no title, no message, no children", () => {
  act(() => {
    render(<Notice type={Intentions.WARNING} />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<Notice type={Intentions.SUCCESS} />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<Notice type={Intentions.ERROR} />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<Notice type={Intentions.PLAIN} />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<Notice type={Intentions.INFO} />, container);
  });
  expect(container.textContent).toBe("");
});

it("renders with a type and a message, no title, no children", () => {
  act(() => {
    render(<Notice type={Intentions.WARNING} message={`I'm trying to test shhh`} />, container);
  });
  expect(container.textContent).toBe("I'm trying to test shhh");
});

it("renders with a type and a title, no message, no children", () => {
  act(() => {
    render(<Notice type={Intentions.WARNING} title={`I'm trying to test shhh`} />, container);
  });
  expect(container.textContent).toBe("I'm trying to test shhh");
});

it("renders with a type and children, no title, no message", () => {
  act(() => {
      render(<Notice type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
  });
  expect(container.textContent).toBe("I'm trying to test shhh");
});

it("renders with a type, a title and children, no message", () => {
  act(() => {
      render(<Notice title={`It's a title!`} type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
  });
  expect(container.textContent).toBe("It's a title!I'm trying to test shhh");
});

it("renders with a type, a message and children, no title", () => {
  act(() => {
      render(<Notice message={`It's a message!`} type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
  });
  expect(container.textContent).toBe("It's a message!I'm trying to test shhh");
});

it("renders with a type, a title, a message and children", () => {
  act(() => {
      render(<Notice title={`Oh a title?`} message={`It's a message!`} type={Intentions.WARNING}>{`I'm trying to test shhh`}</Notice>, container);
  });
  expect(container.textContent).toBe("Oh a title?It's a message!I'm trying to test shhh");
});
