/**
 * @jest-environment jsdom
 */

import { Page } from "../components/page/index";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("page test", () => {
  // expect(process.env.VITE_SUPABASE_URL).toBeDefined();

  beforeAll(async () => {
    render(<Page />); // 1つのテストごとにscreenが更新されている...？
    // element is removed
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."), {
      // ロード画面が消えるまで待つ
      timeout: 5000,
    });
    console.log("wait");
  });

  beforeEach(async () => {
    // 前のテストが原因か分からないがロード画面の状態でテストが走ったため追加
    if (await screen.queryByText("Loading...")) {
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."), {
        // ロード画面が消えるまで待つ
        timeout: 5000,
      });
    }
  });

  test("should contain title", () => {
    const titleElement = screen.getByRole("heading");
    expect(titleElement).toBeDefined();
    console.log("test 1");
  });

  test("can add a record", async () => {
    console.log("test 2");
    const buttonElement = screen.getByRole("button", { name: "登録" });
    const inputContentElement = screen.getByRole("textbox", {
      name: "学習内容",
    });
    const inputTimeElement = screen.getByRole("spinbutton"); // 数値入力のボックスはこういう名前なのか
    fireEvent.change(inputContentElement, {
      target: {
        value: "test",
      },
    });
    fireEvent.change(inputTimeElement, {
      target: {
        value: "1",
      },
    });
    fireEvent.click(buttonElement);
    const content = await screen.findAllByText("test");
    const time = await screen.findAllByText("1h");
    expect(content).toBeDefined();
    expect(time).toBeDefined();
  });

  test("can delete a record", async () => {
    const button = screen.getAllByRole("button", { name: "削除" });
    fireEvent.click(button[button.length - 1]);
    fireEvent.click(await screen.findByRole("button", { name: "削除する" }));
    screen.debug();
    await waitForElementToBeRemoved(() => screen.queryByText("test"));
  });

  test("validation", async () => {
    const buttonElement = screen.getByRole("button", { name: "登録" });
    fireEvent.click(buttonElement);
    const alertElement = await screen.findAllByText("入力必須項目です。");
    expect(alertElement.length).toBe(2);
  });
});
