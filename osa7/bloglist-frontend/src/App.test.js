import React from 'react';
import { render, waitForElement } from 'react-testing-library';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
    it('no blogs without login', async () => {
        const component = render(
            <App />
        );
        component.rerender(<App />);
        await waitForElement(
            () => component.getByText('kirjaudu')
        );

        const blogs = component.container.querySelectorAll('.blog');
        expect(blogs.length).toBe(0);

        expect(component.container).not.toHaveTextContent('Michael Chan');
    });

    it('show blogs when logged in', async () => {
        const user = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVldHVoIiwiaWQiOiI1Y2FkODk1YmRkMzZjMDJiOTZlODIwYTgiLCJpYXQiOjE1NTQ5ODk4MDB9.B1mp_8pCe96X7K-vBIbj3HKHy4svbm0ya5stfe7tilY",
            username: "eetuh",
            name: "Eetu"
        }
        window.localStorage.setItem('user', JSON.stringify(user));

        const component = render(
            <App />
        );

        component.rerender(<App />);
        await waitForElement(
            () => component.container.querySelector('.blog')
        );

        const blogs = component.container.querySelector('.blog');
        expect(blogs.length).toBe(5);
        expect(component.container).toHaveTextContent('Robert C. Martin')
    })
})