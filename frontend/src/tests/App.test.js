import React, { useState } from "react";
import { render, cleanup, fireEvent, getByText } from "@testing-library/react";
import Main from "./../App";

afterEach(cleanup);

describe("test main app", () => {
  it("App initilization", () => {
    const { getByText } = render(<Main />);
    // expect the header to be shown
    expect(getByText("Search Github:")).toBeInTheDocument();
  });
});
