/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/react';
import App from './App';

describe('App Component',()=>{
    it('should render component', ()=>{
        const {getByRole} = render(<App/>)

        expect(getByRole('app-info')).toBeInTheDocument();
    })
})