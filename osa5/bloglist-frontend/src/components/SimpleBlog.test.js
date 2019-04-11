import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
    const blog = {
        title: 'Kumma juttu',
        author: 'Kummajainen',
        likes: 2
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'blog has 2 likes'
    )

    expect(component.container).toHaveTextContent(
        'Kumma juttu'
    )

    expect(component.container).toHaveTextContent(
        'Kummajainen'
    )
});

it('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Kumma juttu',
        author: 'Kummajainen',
        likes: 2
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2)
})