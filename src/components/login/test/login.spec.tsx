import {describe, expect, it, test} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import { TestComponent } from './testComponent';
import Guest from '../guest.component';

describe('render guest login', () => {
    test('wait text appers on screen', async () => {
        render(<TestComponent children={<Guest />} />);

        waitFor(() => {
            expect(screen.findByText('Escolha seu nick')).toBeInTheDocument()
        });
    })
})