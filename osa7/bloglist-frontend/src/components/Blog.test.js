import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
    const blog = {
        title: 'Kumma juttu',
        author: 'Kummajainen',
        likes: 2
    }

    const component = render(
        <Blog blog={blog} />
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

    const component = render(
        <Blog blog={blog} />
    );

    expect(component.container).not.toHaveTextContent('like');
})