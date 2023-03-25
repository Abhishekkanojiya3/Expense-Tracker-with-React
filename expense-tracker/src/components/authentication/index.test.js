import { render as rtlRender, screen } from '@testing-library/react';
import ExpenseForm from '../signup/ExpenseForm';
import CompleteProfile from './CompleteProfile';
import DummyScreen from './DummyScreen';
import EmailVerification from './EmailVerification'
import ForgotPassword from './ForgotPassword';
import Header from "../Header";
import { Provider } from 'react-redux';
import store from "../store/store";
import Expenses from './Expenses';
import userEvent from '@testing-library/user-event';

const render =component=>rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)


describe('completeprofile component', () => {
  test('renders contact detail as a text', () => {
    // Arrange
    render(<CompleteProfile />);

    // Act
    // ... nothing

    // Assert
    const contactElement = screen.getByText('Contact Details');
    expect(contactElement).toBeInTheDocument();
  });
});
describe('dummyscreen component', () => {
    test('renders dummyscreen as a text', () => {
      // Arrange
      render(<DummyScreen />);
  
      // Act
      // ... nothing
  
      // Assert
      const DummyElement = screen.getByText('Welcome to Expense Tracker!!!');
      expect(DummyElement).toBeInTheDocument();
    });
  });
  describe('EmailVerification component', () => {
    test('renders verify email as a text', () => {
      // Arrange
      render(<EmailVerification />);
  
      // Act
      // ... nothing
  
      // Assert
      const emailElement = screen.getByText('verify your email');
      expect(emailElement).toBeInTheDocument();
    });
  });
  describe('forgotpassword component', () => {
    test('renders forgotpasssword as a text', () => {
      // Arrange
      render(<ForgotPassword />);
  
      // Act
      // ... nothing
  
      // Assert
      const passElement = screen.getByText('entered email with which you have registered?');
      expect(passElement).toBeInTheDocument();
    });
    test('renders isloading is false ', () => {
      // Arrange
      render(<ForgotPassword />);
  
      // Act
      const buttonElement = screen.getByRole('button');
      userEvent.click(buttonElement)
  
      // Assert
      const outputElement = screen.getByText('send link');
      expect(outputElement).toBeInTheDocument();
    });
    test('does not render "sending request" if the button was clicked', () => {
      // Arrange
      render(<ForgotPassword />);
 
      // Act
      const buttonElement = screen.getByRole('button');
      userEvent.click(buttonElement)
  
      // Assert
      const outputsElement = screen.queryByText('Sending request...', { exact: false });
      
      expect(outputsElement).toBeNull();
    });
  });
  describe('Header component', () => {
    test('renders Header as a text', () => {
      // Arrange
      render(<Header/>);
  
      // Act
      // ... nothing
  
      // Assert
      const hdElement = screen.getByText('Expense Tracker');
      expect(hdElement).toBeInTheDocument();
    });
  });
  describe('Expenseform component', () => {
    test('renders Expenseform as a text', () => {
      // Arrange
      render(<ExpenseForm/>);
  
      // Act
      // ... nothing
  
      // Assert
      const formElement = screen.getByText('expense Tracker');
      expect(formElement).toBeInTheDocument();
    });
  });
  describe('Expense component', () => {
    test('renders Expense as a text', () => {
      // Arrange
      render(<Expenses/>);
  
      // Act
      // ... nothing
  
      // Assert
      const expElement = screen.getByText('Daily Expenses');
      expect(expElement).toBeInTheDocument();
    });
  });



  