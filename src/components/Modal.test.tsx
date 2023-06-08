import { render, fireEvent, within } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('renders correctly when isOpen is false', () => {
    const { queryByRole } = render(<Modal isOpen={false} onClose={() => {}} />);
    expect(queryByRole('dialog')).toBeNull();
  });

  it('renders correctly when isOpen is true', () => {
    const { getByRole } = render(<Modal isOpen={true} onClose={() => {}} />);
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('calls the onClose prop when the Close button is clicked', () => {
    const onClose = jest.fn();
    const { getByText } = render(<Modal isOpen={true} onClose={onClose} />);
    fireEvent.click(getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders the children correctly', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Contents of modal</p>
      </Modal>
    );
    const dialog = getByRole('dialog');
    expect(within(dialog).getByText('Contents of modal')).toBeInTheDocument();
  });

  // This is a simplified test for modal focus trap.
  // In a real-world application, you might want to make it more comprehensive.
  it('traps focus when open', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <button>First Button</button>
        <button>Second Button</button>
      </Modal>
    );

    const dialog = getByRole('dialog');
    const firstButton = within(dialog).getByText('First Button');
    const secondButton = within(dialog).getByText('Second Button');

    // Initial focus is on the first button
    expect(firstButton).toHaveFocus();

    // After tabbing, the focus is on the second button
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(secondButton).toHaveFocus();

    // After tabbing again, the focus wraps around to the first button
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(firstButton).toHaveFocus();

    // After shift+tabbing, the focus wraps around to the second button
    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab', shiftKey: true });
    expect(secondButton).toHaveFocus();
  });
});
