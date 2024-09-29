/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { HelloWorld } from "../components/page/helloWorld";
import "@testing-library/jest-dom";

test("should render HeLLO WORLD", () => {
  render(<HelloWorld />);
  expect(screen.getByText("Hello World!")).toBeInTheDocument();
});
