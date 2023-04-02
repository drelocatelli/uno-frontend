import {describe, expect, it} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestComponent } from './testComponent';
import Guest from '../guest.component';

describe('guest login', () => {
    const {container, debug} = render(<TestComponent children={<Guest />} />);

    it('wait text appers on screen', () => {
        waitFor(() => {
            expect(screen.findByText('Escolha seu nick')).toBeInTheDocument()
        });
    })

    it('fail when nickname is null', () => {
        const btn = screen.findByText('Entrar');
        waitFor(async () => {
            expect(btn).toBeInTheDocument();
            userEvent.click(await btn);
            expect(screen.findByText('Preencha este campo.')).toBeInTheDocument();
        })
    });

    it('try to get avatar', () => {
        const btnRandomAvatar = container.getElementsByClassName('reload-icon').item(0);
        waitFor(async () => {
            expect(btnRandomAvatar).toBeInTheDocument();
            if(btnRandomAvatar) {
                userEvent.click(await btnRandomAvatar);
                // expect()
            } else {
                throw new Error('Cannot find this button');
            }
            
        });
    });

})