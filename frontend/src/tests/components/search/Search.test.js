import React, {useState} from "react";
import { render, cleanup, fireEvent, getByText } from "@testing-library/react";
import Search from "../../../components/search"
afterEach(cleanup)

describe('test the search hook', () => {
    
    // mocked state to pass as prop.
    let username = null;
    const testUsernameHandler = (uname) => {
        username = uname
    }

    it('Username changes when search bar buttom is pressed', () => {
        const { getByPlaceholderText, getByText } = render(<Search usernameHandler={testUsernameHandler}/>)
        // gets the inputNode
        const inputNode = getByPlaceholderText("Username:");
        // insert the "new value" string 
        fireEvent.change(inputNode, { target: { value: 'new value' } })
        // click the button
        fireEvent.click(getByText("Go!"))
        // assert the username has changed
        expect(username).toBe("new value")})

});


