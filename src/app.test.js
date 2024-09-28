/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { Test } from "./components/page/test";
import "@testing-library/jest-dom";

test("should render HeLLO WORLD", () => {
  render(<Test />);
  expect(screen.getByText("Hello World!")).toBeInTheDocument();
});
