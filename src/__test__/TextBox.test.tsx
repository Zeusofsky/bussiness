// TextBox Test

import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

import TextBox from "../components/utilities/TextBox"

let firstName:string = "johnathan wick"
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    firstName = e.target.value
}
test('Renders Customer correctly', async () => {
    render(<TextBox 
        id={"outlined-input-first-name"}
        name={"FirstName"}
        title={"First Name"}
        value={firstName}
        handleInputChange={handleInputChange}
        errorCondition={false}
        errorMessage={"FirstNme can not be empty."}
    />);
    expect(screen.getByTestId('text-box')).toBeInTheDocument();
});

