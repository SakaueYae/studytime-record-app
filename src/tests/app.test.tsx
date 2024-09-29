/**
 * @jest-environment jsdom
 */

import { Page } from "../components/page/index";
import { render } from "@testing-library/react";

test("should contain title", () => {
  // expect(process.env.VITE_SUPABASE_URL).toBeDefined();
  render(<Page />);
});
