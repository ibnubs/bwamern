import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import Button from './index';

test('should not allowed click button if isDisabled is present', () => {
    const { container } = render(<Button isDisabled></Button>);

    expect(container.querySelector('span.disabled')).toBeInTheDocument()
});

//cek apakah ada tulisan loading atau tidak dengan component span...
test('should render loading/spinner', () => {
    const { container, getByText } = render(<Button isLoading></Button>);

    expect(getByText(/loading/i)).toBeInTheDocument()
    expect(container.querySelector('span')).toBeInTheDocument()
});

//cek button link dan tipenya external
test('should render <a> tag', () => {
    const { container } = render(<Button type="link" isExternal></Button>);

    expect(container.querySelector('a')).toBeInTheDocument()
});

//cek button link dan tipenya internal
test('should render <Link> component', () => {
    const { container } = render(<Router><Button href="" type="link"></Button></Router>);

    expect(container.querySelector('a')).toBeInTheDocument()
});