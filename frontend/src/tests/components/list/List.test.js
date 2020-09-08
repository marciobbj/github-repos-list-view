import React, { useState } from "react";
import { render, cleanup, fireEvent, getByText } from "@testing-library/react";
import List from "../../../components/list";
afterEach(cleanup);

describe("test the List component", () => {
  // mocked state to pass as prop.
  let username = null;
  const testUsernameHandler = (uname) => {
    username = uname;
  };

  it("initializes with the searchbar enabled if repositories length is greater than 0", () => {
    const { getByPlaceholderText, getByText } = render(
      <List
        repositories={[
          {
            name: "nice",
            url: "test-url",
            description: "nice-description",
          },
        ]}
      />
    );
    // gets the inputNode
    const inputNode = getByPlaceholderText("Search...");
    // assert the search bar is on
    expect(inputNode).toBeInTheDocument();
  });
});
